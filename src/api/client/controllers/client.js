"use strict";

/**
 * client controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::client.client", ({ strapi }) => ({
  async find(ctx) {
    const { filters } = ctx.query;
    var userWithRole;
      if (ctx.state.auth.strategy.name == "users-permissions") {
        userWithRole = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          ctx.state.user.id,
          {
            populate: { role: true, client_info: true, user_info: true },
          }
        );
      }

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      const clientID = userWithRole.client_info.id;
      // Modify query to filter deliveries based on document IDs
      ctx.query = {
        ...ctx.query,
        filters: {
          ...filters,
          id: clientID,
        },
      };
    }

    const { data, meta } = await super.find(ctx);

    if (!data) {
      return ctx.notFound("No clients found");
    }


    return { data, meta };
  },
  async findOne(ctx) {
    var userWithRole;
      if (ctx.state.auth.strategy.name == "users-permissions") {
        userWithRole = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          ctx.state.user.id,
          {
            populate: { role: true, client_info: true, user_info: true },
          }
        );
      }

    const { data, meta } = await super.findOne(ctx);


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
    var userWithRole;
      if (ctx.state.auth.strategy.name == "users-permissions") {
        userWithRole = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          ctx.state.user.id,
          {
            populate: { role: true, client_info: true, user_info: true },
          }
        );
      }

    // Fetch the client that is being updated
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
