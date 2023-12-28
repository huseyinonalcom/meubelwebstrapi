"use strict";

/**
 * delivery controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::delivery.delivery",
  ({ strapi }) => ({
    async find(ctx) {
      const { filters } = ctx.query;

      const userWithRole = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.state.user.id,
        {
          populate: { role: true, client_info: true, user_info: true },
        }
      );

      const clientID = userWithRole.client_info.id;

      if (
        userWithRole &&
        userWithRole.role &&
        userWithRole.role.name === "Client"
      ) {
        ctx.query = {
          ...ctx.query,
          filters: {
            ...filters,
            document_product: {
              document: {
                client: clientID,
              },
            },
          },
        };
      }

      const { data, meta } = await super.find(ctx);

      if (!data) {
        return ctx.notFound("No deliveries found");
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
          !data.attributes.document_product.data.attributes.document ||
          data.attributes.document_product.data.attributes.document.data
            .attributes.client.data.id !== userWithRole.client_info.id
        ) {
          return ctx.notFound("Delivery not found");
        }
      }

      return { data, meta };
    },
  })
);
