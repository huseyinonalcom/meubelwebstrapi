import type { Schema, Attribute } from '@strapi/strapi';

export interface ReservationsReservations extends Schema.Component {
  collectionName: 'components_reservations_reservations';
  info: {
    displayName: 'reservations';
    icon: 'file';
  };
  attributes: {
    client_name: Attribute.String;
    amount: Attribute.Integer & Attribute.DefaultTo<1>;
    is_deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'reservations.reservations': ReservationsReservations;
    }
  }
}
