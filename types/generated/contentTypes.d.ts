import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    client_info: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::client.client'
    >;
    user_info: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAddressAddress extends Schema.CollectionType {
  collectionName: 'addresses';
  info: {
    singularName: 'address';
    pluralName: 'addresses';
    displayName: 'Address';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    country: Attribute.String & Attribute.Required;
    province: Attribute.String;
    city: Attribute.String & Attribute.Required;
    zipCode: Attribute.String & Attribute.Required;
    doorNumber: Attribute.String & Attribute.Required;
    street: Attribute.String & Attribute.Required;
    floor: Attribute.String & Attribute.DefaultTo<'0'>;
    client: Attribute.Relation<
      'api::address.address',
      'manyToOne',
      'api::client.client'
    >;
    deliveries: Attribute.Relation<
      'api::address.address',
      'oneToMany',
      'api::delivery.delivery'
    >;
    name: Attribute.String & Attribute.Required;
    supplier: Attribute.Relation<
      'api::address.address',
      'manyToOne',
      'api::supplier.supplier'
    >;
    tasks: Attribute.Relation<
      'api::address.address',
      'oneToMany',
      'api::task.task'
    >;
    documents: Attribute.Relation<
      'api::address.address',
      'oneToMany',
      'api::document.document'
    >;
    establishment: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'api::establishment.establishment'
    >;
    documentsDel: Attribute.Relation<
      'api::address.address',
      'oneToMany',
      'api::document.document'
    >;
    user: Attribute.Relation<
      'api::address.address',
      'manyToOne',
      'api::user-info.user-info'
    >;
    user_info: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::address.address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    subCategories: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::category.category'
    >;
    headCategory: Attribute.Relation<
      'api::category.category',
      'manyToOne',
      'api::category.category'
    >;
    products: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::product.product'
    >;
    image: Attribute.Media;
    promos: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::promo.promo'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClientClient extends Schema.CollectionType {
  collectionName: 'clients';
  info: {
    singularName: 'client';
    pluralName: 'clients';
    displayName: 'Client';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstName: Attribute.String & Attribute.Required;
    lastName: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    createrFsID: Attribute.String;
    category: Attribute.String & Attribute.Required;
    company: Attribute.String;
    taxID: Attribute.String;
    documents: Attribute.Relation<
      'api::client.client',
      'oneToMany',
      'api::document.document'
    >;
    fsID: Attribute.String;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    addresses: Attribute.Relation<
      'api::client.client',
      'oneToMany',
      'api::address.address'
    >;
    promos: Attribute.Relation<
      'api::client.client',
      'manyToMany',
      'api::promo.promo'
    >;
    user: Attribute.Relation<
      'api::client.client',
      'manyToOne',
      'api::user-info.user-info'
    >;
    establishment: Attribute.Relation<
      'api::client.client',
      'manyToOne',
      'api::establishment.establishment'
    >;
    login: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDeliveryDelivery extends Schema.CollectionType {
  collectionName: 'deliveries';
  info: {
    singularName: 'delivery';
    pluralName: 'deliveries';
    displayName: 'Delivery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date: Attribute.Date & Attribute.Required;
    timeStart: Attribute.Time & Attribute.Required;
    timeEnd: Attribute.Time;
    completed: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    note: Attribute.String;
    files: Attribute.Media;
    deliveryTaker: Attribute.String;
    deliveryTakerPhone: Attribute.String;
    lift: Attribute.Boolean & Attribute.DefaultTo<false>;
    liftPhone: Attribute.String;
    establishment: Attribute.Relation<
      'api::delivery.delivery',
      'manyToOne',
      'api::establishment.establishment'
    >;
    incoming: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    document_products: Attribute.Relation<
      'api::delivery.delivery',
      'oneToMany',
      'api::document-product.document-product'
    >;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    deliveryAddress: Attribute.Relation<
      'api::delivery.delivery',
      'manyToOne',
      'api::address.address'
    >;
    supplier_order_products: Attribute.Relation<
      'api::delivery.delivery',
      'oneToMany',
      'api::supplier-order-product.supplier-order-product'
    >;
    issuingUser: Attribute.Relation<
      'api::delivery.delivery',
      'manyToOne',
      'api::user-info.user-info'
    >;
    receivingUser: Attribute.Relation<
      'api::delivery.delivery',
      'manyToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::delivery.delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::delivery.delivery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentDocument extends Schema.CollectionType {
  collectionName: 'documents';
  info: {
    singularName: 'document';
    pluralName: 'documents';
    displayName: 'Document';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    number: Attribute.BigInteger & Attribute.Required;
    type: Attribute.String & Attribute.Required;
    prefix: Attribute.String & Attribute.Required;
    date: Attribute.Date & Attribute.Required;
    phase: Attribute.Integer & Attribute.Required;
    files: Attribute.Media;
    comment: Attribute.Text;
    reference: Attribute.String;
    note: Attribute.String;
    client: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::client.client'
    >;
    establishment: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::establishment.establishment'
    >;
    document_products: Attribute.Relation<
      'api::document.document',
      'oneToMany',
      'api::document-product.document-product'
    >;
    payments: Attribute.Relation<
      'api::document.document',
      'oneToMany',
      'api::payment.payment'
    >;
    support_tickets: Attribute.Relation<
      'api::document.document',
      'oneToMany',
      'api::support-ticket.support-ticket'
    >;
    tasks: Attribute.Relation<
      'api::document.document',
      'oneToMany',
      'api::task.task'
    >;
    invoiced: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    decisionMaker: Attribute.String;
    fsID: Attribute.String;
    docAddress: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::address.address'
    >;
    fromDocID: Attribute.BigInteger;
    toDocID: Attribute.BigInteger;
    managerNote: Attribute.Text;
    delAddress: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::address.address'
    >;
    user: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentProductDocumentProduct
  extends Schema.CollectionType {
  collectionName: 'document_products';
  info: {
    singularName: 'document-product';
    pluralName: 'document-products';
    displayName: 'DocumentProduct';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    value: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    subTotal: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    discount: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    amount: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    tax: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    taxSubTotal: Attribute.Decimal &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    delivered: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    delivery: Attribute.Relation<
      'api::document-product.document-product',
      'manyToOne',
      'api::delivery.delivery'
    >;
    product: Attribute.Relation<
      'api::document-product.document-product',
      'manyToOne',
      'api::product.product'
    >;
    document: Attribute.Relation<
      'api::document-product.document-product',
      'manyToOne',
      'api::document.document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::document-product.document-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::document-product.document-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEstablishmentEstablishment extends Schema.CollectionType {
  collectionName: 'establishments';
  info: {
    singularName: 'establishment';
    pluralName: 'establishments';
    displayName: 'Establishment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    documents: Attribute.Relation<
      'api::establishment.establishment',
      'oneToMany',
      'api::document.document'
    >;
    deliveries: Attribute.Relation<
      'api::establishment.establishment',
      'oneToMany',
      'api::delivery.delivery'
    >;
    supplier_orders: Attribute.Relation<
      'api::establishment.establishment',
      'oneToMany',
      'api::supplier-order.supplier-order'
    >;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    phone: Attribute.String & Attribute.Required;
    taxID: Attribute.String & Attribute.Required;
    bankAccount1: Attribute.String & Attribute.Required;
    bankAccount2: Attribute.String;
    bankAccount3: Attribute.String;
    phone2: Attribute.String;
    category: Attribute.String & Attribute.Required;
    address: Attribute.Relation<
      'api::establishment.establishment',
      'oneToOne',
      'api::address.address'
    >;
    shelves: Attribute.Relation<
      'api::establishment.establishment',
      'oneToMany',
      'api::shelf.shelf'
    >;
    logo: Attribute.Media;
    users: Attribute.Relation<
      'api::establishment.establishment',
      'oneToMany',
      'api::user-info.user-info'
    >;
    clients: Attribute.Relation<
      'api::establishment.establishment',
      'oneToMany',
      'api::client.client'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::establishment.establishment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::establishment.establishment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Schema.CollectionType {
  collectionName: 'payments';
  info: {
    singularName: 'payment';
    pluralName: 'payments';
    displayName: 'Payment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    value: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    date: Attribute.Date & Attribute.Required;
    method: Attribute.String & Attribute.Required;
    note: Attribute.String;
    verified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    origin: Attribute.String;
    document: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'api::document.document'
    >;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    user: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    productLine: Attribute.String;
    supplierCode: Attribute.String & Attribute.Required;
    value: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    tax: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    width: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    depth: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    minStock: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    minOrderAmount: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    height: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    color: Attribute.String;
    material: Attribute.String;
    images: Attribute.Media;
    supplier: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::supplier.supplier'
    >;
    document_products: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::document-product.document-product'
    >;
    discountRange: Attribute.Decimal &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    active: Attribute.Boolean & Attribute.DefaultTo<true>;
    deleted: Attribute.Boolean & Attribute.DefaultTo<false>;
    shelves: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::shelf.shelf'
    >;
    supplier_order_products: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::supplier-order-product.supplier-order-product'
    >;
    category: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::category.category'
    >;
    priceBeforeDiscount: Attribute.Decimal;
    internalCode: Attribute.String & Attribute.Required;
    product_extra: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'api::product-extra.product-extra'
    >;
    promos: Attribute.Relation<
      'api::product.product',
      'manyToMany',
      'api::promo.promo'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductExtraProductExtra extends Schema.CollectionType {
  collectionName: 'product_extras';
  info: {
    singularName: 'product-extra';
    pluralName: 'product-extras';
    displayName: 'ProductExtra';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    barcode: Attribute.String;
    weight: Attribute.Decimal;
    per_box: Attribute.Integer;
    product: Attribute.Relation<
      'api::product-extra.product-extra',
      'oneToOne',
      'api::product.product'
    >;
    packaged_weight: Attribute.Decimal;
    packaged_dimensions: Attribute.String;
    seat_height: Attribute.Integer;
    diameter: Attribute.Decimal;
    surface_area: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-extra.product-extra',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-extra.product-extra',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPromoPromo extends Schema.CollectionType {
  collectionName: 'promos';
  info: {
    singularName: 'promo';
    pluralName: 'promos';
    displayName: 'Promo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    startDate: Attribute.Date & Attribute.Required;
    endDate: Attribute.Date & Attribute.Required;
    code: Attribute.String & Attribute.Unique;
    description: Attribute.Text;
    products: Attribute.Relation<
      'api::promo.promo',
      'manyToMany',
      'api::product.product'
    >;
    discount: Attribute.Decimal & Attribute.Required;
    discountIsPercentage: Attribute.Boolean & Attribute.Required;
    clients: Attribute.Relation<
      'api::promo.promo',
      'manyToMany',
      'api::client.client'
    >;
    image: Attribute.Media;
    perAmount: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<1>;
    maxUsesTotal: Attribute.Integer;
    maxUsesPerClient: Attribute.Integer;
    categories: Attribute.Relation<
      'api::promo.promo',
      'manyToMany',
      'api::category.category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promo.promo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::promo.promo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShelfShelf extends Schema.CollectionType {
  collectionName: 'shelves';
  info: {
    singularName: 'shelf';
    pluralName: 'shelves';
    displayName: 'Shelf';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    region: Attribute.String & Attribute.Required & Attribute.DefaultTo<'A'>;
    stack: Attribute.String & Attribute.Required & Attribute.DefaultTo<'0'>;
    level: Attribute.String & Attribute.Required & Attribute.DefaultTo<'0'>;
    establishment: Attribute.Relation<
      'api::shelf.shelf',
      'manyToOne',
      'api::establishment.establishment'
    >;
    product: Attribute.Relation<
      'api::shelf.shelf',
      'manyToOne',
      'api::product.product'
    >;
    stock: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    supplier_order_products: Attribute.Relation<
      'api::shelf.shelf',
      'oneToMany',
      'api::supplier-order-product.supplier-order-product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shelf.shelf',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shelf.shelf',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplierSupplier extends Schema.CollectionType {
  collectionName: 'suppliers';
  info: {
    singularName: 'supplier';
    pluralName: 'suppliers';
    displayName: 'Supplier';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    orderMail: Attribute.Email;
    contactMail: Attribute.Email;
    orderTime: Attribute.Integer;
    products: Attribute.Relation<
      'api::supplier.supplier',
      'oneToMany',
      'api::product.product'
    >;
    supplier_orders: Attribute.Relation<
      'api::supplier.supplier',
      'oneToMany',
      'api::supplier-order.supplier-order'
    >;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    addresses: Attribute.Relation<
      'api::supplier.supplier',
      'oneToMany',
      'api::address.address'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supplier.supplier',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supplier.supplier',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplierOrderSupplierOrder extends Schema.CollectionType {
  collectionName: 'supplier_orders';
  info: {
    singularName: 'supplier-order';
    pluralName: 'supplier-orders';
    displayName: 'SupplierOrder';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    reference: Attribute.String;
    date: Attribute.Date & Attribute.Required;
    supplier: Attribute.Relation<
      'api::supplier-order.supplier-order',
      'manyToOne',
      'api::supplier.supplier'
    >;
    discount: Attribute.Decimal & Attribute.DefaultTo<0>;
    establishment: Attribute.Relation<
      'api::supplier-order.supplier-order',
      'manyToOne',
      'api::establishment.establishment'
    >;
    completed: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    supplier_order_products: Attribute.Relation<
      'api::supplier-order.supplier-order',
      'oneToMany',
      'api::supplier-order-product.supplier-order-product'
    >;
    user: Attribute.Relation<
      'api::supplier-order.supplier-order',
      'manyToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supplier-order.supplier-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supplier-order.supplier-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplierOrderProductSupplierOrderProduct
  extends Schema.CollectionType {
  collectionName: 'supplier_order_products';
  info: {
    singularName: 'supplier-order-product';
    pluralName: 'supplier-order-products';
    displayName: 'SupplierOrderProduct';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amountOrdered: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<1>;
    amountDelivered: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<0>;
    product: Attribute.Relation<
      'api::supplier-order-product.supplier-order-product',
      'manyToOne',
      'api::product.product'
    >;
    supplier_order: Attribute.Relation<
      'api::supplier-order-product.supplier-order-product',
      'manyToOne',
      'api::supplier-order.supplier-order'
    >;
    delivery: Attribute.Relation<
      'api::supplier-order-product.supplier-order-product',
      'manyToOne',
      'api::delivery.delivery'
    >;
    shelf: Attribute.Relation<
      'api::supplier-order-product.supplier-order-product',
      'manyToOne',
      'api::shelf.shelf'
    >;
    value: Attribute.Decimal & Attribute.Required;
    tax: Attribute.Integer & Attribute.Required;
    subTotal: Attribute.Decimal & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supplier-order-product.supplier-order-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supplier-order-product.supplier-order-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupportTicketSupportTicket extends Schema.CollectionType {
  collectionName: 'support_tickets';
  info: {
    singularName: 'support-ticket';
    pluralName: 'support-tickets';
    displayName: 'SupportTicket';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    document: Attribute.Relation<
      'api::support-ticket.support-ticket',
      'manyToOne',
      'api::document.document'
    >;
    description: Attribute.Text & Attribute.Required;
    note: Attribute.String;
    solved: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    openDate: Attribute.Date & Attribute.Required;
    solvedDate: Attribute.Date;
    solution: Attribute.Text;
    reference: Attribute.Text;
    files: Attribute.Media;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    support_ticket_messages: Attribute.Relation<
      'api::support-ticket.support-ticket',
      'oneToMany',
      'api::support-ticket-message.support-ticket-message'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::support-ticket.support-ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::support-ticket.support-ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupportTicketMessageSupportTicketMessage
  extends Schema.CollectionType {
  collectionName: 'support_ticket_messages';
  info: {
    singularName: 'support-ticket-message';
    pluralName: 'support-ticket-messages';
    displayName: 'SupportTicketMessage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    support_ticket: Attribute.Relation<
      'api::support-ticket-message.support-ticket-message',
      'manyToOne',
      'api::support-ticket.support-ticket'
    >;
    message: Attribute.Text & Attribute.Required;
    dateTime: Attribute.DateTime & Attribute.Required;
    images: Attribute.Media;
    user: Attribute.Relation<
      'api::support-ticket-message.support-ticket-message',
      'manyToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::support-ticket-message.support-ticket-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::support-ticket-message.support-ticket-message',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTaskTask extends Schema.CollectionType {
  collectionName: 'tasks';
  info: {
    singularName: 'task';
    pluralName: 'tasks';
    displayName: 'Task';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.String & Attribute.Required;
    dateCreated: Attribute.Date & Attribute.Required;
    taskDate: Attribute.Date & Attribute.Required;
    completed: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    files: Attribute.Media;
    document: Attribute.Relation<
      'api::task.task',
      'manyToOne',
      'api::document.document'
    >;
    notes: Attribute.String;
    deleted: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    address: Attribute.Relation<
      'api::task.task',
      'manyToOne',
      'api::address.address'
    >;
    description: Attribute.Text & Attribute.Required;
    receivingUser: Attribute.Relation<
      'api::task.task',
      'manyToOne',
      'api::user-info.user-info'
    >;
    issuingUser: Attribute.Relation<
      'api::task.task',
      'manyToOne',
      'api::user-info.user-info'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiUserInfoUserInfo extends Schema.CollectionType {
  collectionName: 'user_infos';
  info: {
    singularName: 'user-info';
    pluralName: 'user-infos';
    displayName: 'UserInfo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstName: Attribute.String;
    fsAPIKey: Attribute.Text;
    fsID: Attribute.Text;
    lastName: Attribute.String;
    phone: Attribute.String;
    documents: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::document.document'
    >;
    clients: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::client.client'
    >;
    login: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    establishment: Attribute.Relation<
      'api::user-info.user-info',
      'manyToOne',
      'api::establishment.establishment'
    >;
    support_ticket_messages: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::support-ticket-message.support-ticket-message'
    >;
    receivedTasks: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::task.task'
    >;
    supplier_orders: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::supplier-order.supplier-order'
    >;
    payments: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::payment.payment'
    >;
    addresses: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::address.address'
    >;
    issuedTasks: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::task.task'
    >;
    receivedDeliveries: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::delivery.delivery'
    >;
    issuedDeliveries: Attribute.Relation<
      'api::user-info.user-info',
      'oneToMany',
      'api::delivery.delivery'
    >;
    ownAddress: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'api::address.address'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-info.user-info',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::address.address': ApiAddressAddress;
      'api::category.category': ApiCategoryCategory;
      'api::client.client': ApiClientClient;
      'api::delivery.delivery': ApiDeliveryDelivery;
      'api::document.document': ApiDocumentDocument;
      'api::document-product.document-product': ApiDocumentProductDocumentProduct;
      'api::establishment.establishment': ApiEstablishmentEstablishment;
      'api::payment.payment': ApiPaymentPayment;
      'api::product.product': ApiProductProduct;
      'api::product-extra.product-extra': ApiProductExtraProductExtra;
      'api::promo.promo': ApiPromoPromo;
      'api::shelf.shelf': ApiShelfShelf;
      'api::supplier.supplier': ApiSupplierSupplier;
      'api::supplier-order.supplier-order': ApiSupplierOrderSupplierOrder;
      'api::supplier-order-product.supplier-order-product': ApiSupplierOrderProductSupplierOrderProduct;
      'api::support-ticket.support-ticket': ApiSupportTicketSupportTicket;
      'api::support-ticket-message.support-ticket-message': ApiSupportTicketMessageSupportTicketMessage;
      'api::task.task': ApiTaskTask;
      'api::user-info.user-info': ApiUserInfoUserInfo;
    }
  }
}
