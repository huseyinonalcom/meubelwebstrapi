"use strict";

/**
 * document controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::document.document",
  ({ strapi }) => ({
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
            client: clientID,
          },
        };
      }

      const { data, meta } = await super.find(ctx);
      if (!data) {
        return ctx.notFound("No documents found");
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
        const clientID = userWithRole.client_info.id;

        if (
          !data ||
          !data.attributes.client ||
          data.attributes.client.data.id != clientID
        ) {
          return ctx.notFound("Document not found");
        }
      }

      return { data, meta };
    },
  })
);
