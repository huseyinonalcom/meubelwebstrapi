"use strict";

/**
 * support-ticket controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::support-ticket.support-ticket",
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
        ctx.query = {
          ...ctx.query,
          filters: {
            ...filters,
            document: {
              client: clientID,
            },
          },
        };
      }

      const { data, meta } = await super.find(ctx);

      if (!data) {
        return ctx.notFound("No support tickets found");
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
        if (
          !data ||
          !data.attributes.document.data ||
          data.attributes.document.data.attributes.client.data.id !==
            userWithRole.client_info.id
        ) {
          return ctx.notFound("Support ticket not found");
        }
      }

      return { data, meta };
    },

    async create(ctx) {
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
        const documentID = ctx.request.body.data.document;

        const document = await strapi.db
          .query("api::document.document")
          .findOne({
            where: { id: documentID, client: clientID },
          });

        if (!document) {
          return ctx.notFound(
            "Cannot create a ticket for this document with given ID"
          );
        }
      }

      const { data, meta } = await super.create(ctx);
      return { data, meta };
    },
  })
);
