'use strict';

/**
 * supplier-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::supplier-order.supplier-order');
