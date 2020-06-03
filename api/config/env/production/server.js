module.exports = ({ env }) => {
  const host = env("HOST", "localhost");
  const port = env.int("PORT", 1338)
  const url = `https://${host}:${port}`;
  return { host, port, url };
};
