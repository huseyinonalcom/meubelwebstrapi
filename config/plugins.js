module.exports = ({ env }) => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "10h",
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("MAIL_HOST"),
        port: env("MAIL_PORT"),
        secure: false,
        auth: {
          user: env("MAIL_USER"),
          pass: env("MAIL_PASS"),
        },
      },
      settings: {
        defaultFrom: env("MAIL_USER"),
        defaultReplyTo: env("MAIL_USER"),
      },
    },
  },
});
