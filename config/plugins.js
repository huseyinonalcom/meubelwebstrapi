module.exports = ({ env }) => ({
'transformer': {
    enabled: true,
    config: { responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },}
  },
'users-permissions': {
    config: {
      jwt: {
        expiresIn: '10h',
      },
    },
  }
});

