"use strict";

/**
 * promo controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::promo.promo", ({ strapi }) => ({
  async find(ctx) {
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

    const { data, meta } = await super.find(ctx);

    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      const clientID = userWithRole.client_info.id;
      if (!data) {
        return ctx.notFound("Promo was not found");
      }
      const filteredData = data.filter(
        (item) =>
          item.attributes.clients.data.length == 0 ||
          item.attributes.clients.data.some((client) => client.id === clientID)
      );

      if (filteredData.length == 0) {
        return ctx.notFound("Promo was not found");
      } else {
        return { data: filteredData, meta };
      }
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
        !data.attributes.clients.length ||
        !data.attributes.clients.some((client) => client.id === clientID)
      ) {
        return ctx.notFound("Promo was not found");
      }
    }

    return { data, meta };
  },
}));
