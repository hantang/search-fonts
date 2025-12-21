const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
const isProd = process.env.PROD === 'true' && !isDeployPreview;

module.exports = {
  imageLocation: '',
  urlPrefixLarge: '',
  urlPrefixMedium: '',
  urlPrefixSmall: ''
};
