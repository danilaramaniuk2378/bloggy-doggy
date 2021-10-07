module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/index.js',
      env: {
        PORT: 80,
        NODE_ENV: 'production',
      },
    },
  ],
};
