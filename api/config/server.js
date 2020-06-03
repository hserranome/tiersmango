module.exports = ({ env }) => {
  const host = env("HOST", "localhost");
  const port = env.int("PORT", 1337);
  const url = `http://${host}:${port}`;
  return { host, port, url };
};