import type { Schema, Attribute } from '@strapi/strapi';

export interface PipelineEmail extends Schema.Component {
  collectionName: 'components_pipeline_emails';
  info: {
    displayName: 'email';
    icon: 'envelop';
    description: '';
  };
  attributes: {
    subject: Attribute.Text & Attribute.Required;
    body: Attribute.Text & Attribute.Required;
    receivers_client: Attribute.Boolean & Attribute.Required;
    receivers_creator: Attribute.Boolean & Attribute.Required;
    receivers_userids: Attribute.JSON;
    sent: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface PipelinePipelineSegment extends Schema.Component {
  collectionName: 'components_pipeline_pipeline_segments';
  info: {
    displayName: 'pipeline_segment';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    order: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    emails: Attribute.Component<'pipeline.email', true>;
    tasks: Attribute.Component<'pipeline.task', true>;
  };
}

export interface PipelineTask extends Schema.Component {
  collectionName: 'components_pipeline_tasks';
  info: {
    displayName: 'task';
    icon: 'check';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    first_deadline: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    condition: Attribute.Enumeration<
      [
        'paid_partial',
        'paid_full',
        'deliveries_planned',
        'deliveries_fulfilled'
      ]
    >;
    task: Attribute.Relation<'pipeline.task', 'oneToOne', 'api::task.task'>;
  };
}

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
      'pipeline.email': PipelineEmail;
      'pipeline.pipeline-segment': PipelinePipelineSegment;
      'pipeline.task': PipelineTask;
      'reservations.reservations': ReservationsReservations;
    }
  }
}
