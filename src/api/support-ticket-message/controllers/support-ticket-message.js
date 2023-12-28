"use strict";

/**
 * support-ticket-message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::support-ticket-message.support-ticket-message",
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

      if (
        userWithRole &&
        userWithRole.role &&
        userWithRole.role.name === "Client"
      ) {
        const clientID = userWithRole.client_info.id;

        // Modify query to filter support ticket messages based on client ID
        ctx.query = {
          ...ctx.query,
          filters: {
            ...filters,
            support_ticket: {
              document: {
                client: clientID,
              },
            },
          },
        };
      }

      const { data, meta } = await super.find(ctx);

      if (!data) {
        return ctx.notFound("No support ticket messages found");
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
          !data.attributes.support_ticket.data ||
          data.attributes.support_ticket.data.attributes.document.data
            .attributes.client.data.id !== userWithRole.client_info.id
        ) {
          return ctx.notFound("Support ticket message not found");
        }
      }

      return { data, meta };
    },

    async create(ctx) {
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
        const clientID = userWithRole.client_info.id;
        const supportTicketID = ctx.request.body.data["support_ticket"]; // Adjust the path according to your request structure

        const supportTicket = await strapi.db
          .query("api::support-ticket.support-ticket")
          .findOne({
            where: { id: supportTicketID },
            populate: { document: { populate: { client: true } } },
          });

        if (!supportTicket || supportTicket.document.client.id !== clientID) {
          return ctx.badRequest(
            "Cannot create a message for support ticket with given ID"
          );
        }
      }

      // Proceed with creating the support ticket message
      const { data, meta } = await super.create(ctx);
      return { data, meta };
    },
  })
);
