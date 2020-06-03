module.exports = ({ env }) => ({
  host: env("HOST", "localhost"),
  port: env.int("HOST", 1337),
  url: `http://${env("HOST", "localhost")}:${env.int("HOST", 1337)}`,
});
