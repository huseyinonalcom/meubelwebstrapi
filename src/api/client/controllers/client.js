"use strict";

/**
 * client controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::client.client", ({ strapi }) => ({
  async findOne(ctx) {
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    const { data, meta } = await super.findOne(ctx);

    console.log(data);

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      if (!data || data.id !== userWithRole.client_info.id) {
        return ctx.notFound("Client not found");
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

    // Fetch the address that is being updated
    const clientToUpdate = await strapi.entityService.findOne(
      "api::client.client",
      ctx.params.id
    );

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      if (
        !clientToUpdate ||
        clientToUpdate.id !== userWithRole.client_info.id
      ) {
        return ctx.notFound("Client not found");
      }
    }

    const { data, meta } = await super.update(ctx);
    return { data, meta };
  },
}));
