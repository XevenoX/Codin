const { overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  return {
    ...config,
    allowedHosts: ['localhost', 'your-domain.com'], // 确保 'your-domain.com' 是你的实际域名
  };
};

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
};
