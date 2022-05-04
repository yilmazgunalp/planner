module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/day-planner',
        permanent: true,
      },
    ];
  },
};
