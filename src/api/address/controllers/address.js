"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::address.address", ({ strapi }) => ({
  async find(ctx) {
    // Check if the user is logged in
    if (!ctx.state.user) {
      return ctx.unauthorized(`You're not logged in!`);
    }

    // Fetch user with role information
    const userWithRole = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: { role: true },
      }
    );

    // Check if the user's role is 'Client'
    if (
      userWithRole &&
      userWithRole.role &&
      userWithRole.role.name === "Client"
    ) {
      // Modify the query to filter addresses based on the logged-in user
      ctx.query = { ...ctx.query, filters: { user: ctx.state.user.id } };
    }

    // Call the default find method with the updated context
    const { data, meta } = await strapi.entityService.findMany(
      "api::address.address",
      ctx.query
    );

    return { data, meta };
  },

  // Similar customization for findOne, update, and delete
}));
