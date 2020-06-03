module.exports = ({ env }) => ({
  host: env("HOST", "localhost"),
  port: env.int("HOST", 1337),
});
