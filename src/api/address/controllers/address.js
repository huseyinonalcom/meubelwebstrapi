"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::address.address", ({ strapi }) => ({
  // find all query
  async find(ctx) {
    // fetch filters from received query
    const { filters } = ctx.query;

    // Fetch user with role, client_info and user_info information
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    // If the users role is 'Client', modify the query to add a filter to fetch only the clients own addresses
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

    // Call the possibly modified query
    const { data, meta } = await super.find(ctx);

    if (!data) {
      return ctx.notFound("No addresses found");
    }

    // Return data
    return { data, meta };
  },
  async findOne(ctx) {

    // Fetch user with role, client_info and user_info information
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    // Call the possibly modified query
    const { data, meta } = await super.findOne(ctx);

    // If the users role is 'Client', modify the query to add a filter to fetch only the clients own addresses
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

    // Return data
    return { data, meta };
  },
  async update(ctx) {
    // Fetch user with role, client_info, and user_info information
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true, client_info: true, user_info: true },
      }
    );

    // Fetch the address that is being updated
    const addressToUpdate = await strapi.entityService.findOne(
      "api::address.address",
      ctx.params.id, // Assuming the address ID is in the URL params
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
        addressToUpdate.client.id !==
          userWithRole.client_info.id
      ) {
        return ctx.notFound("Address not found");
      }
    }

    // Proceed with the update
    const { data, meta } = await super.update(ctx);
    return { data, meta };
  },
}));
