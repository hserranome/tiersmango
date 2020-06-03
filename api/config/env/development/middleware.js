module.exports = {
  settings: {
    cors: {
      enable: true,
      origin: "*",
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "Access-Control-Allow-Origin",
      ],
    },
  },
};
