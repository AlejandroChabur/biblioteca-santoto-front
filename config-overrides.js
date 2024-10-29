module.exports = function override(config, env) {
  if (config.devServer) {
    config.devServer.setupMiddlewares = (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      // Configura tus middlewares aquí, si es necesario

      return middlewares;
    };
  }
  return config;
};
