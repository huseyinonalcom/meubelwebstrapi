"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::address.address", ({ strapi }) => ({
  async find(ctx) {
    const { filters } = ctx.query;

    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...filters,
          client: {
            id: userWithRole.client_info.id,
          },
        },
      };
    }

    const { data, meta } = await super.find(ctx);

    if (!data) {
      return ctx.notFound("No addresses found");
    }

    return { data, meta };
  },
  async findOne(ctx) {
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    const { data, meta } = await super.findOne(ctx);

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      if (
        !data ||
        !data.attributes.client.data ||
        data.attributes.client.data.id !== userWithRole.client_info.id
      ) {
        return ctx.notFound("Address not found");
      }
    }

    return { data, meta };
  },
  async update(ctx) {
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    const addressToUpdate = await strapi.entityService.findOne(
      "api::address.address",
      ctx.params.id,
      { populate: { client: true } }
    );

    console.log(addressToUpdate);

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      if (
        !addressToUpdate ||
        !addressToUpdate.client ||
        addressToUpdate.client.id !== userWithRole.client_info.id
      ) {
        return ctx.notFound("Address creation failed!");
      }
    }

    const { data, meta } = await super.update(ctx);
    return { data, meta };
  },
}));
