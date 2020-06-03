module.exports = ({ env }) => {
  const host = env("HOST", "0.0.0.0")
  const port = env.int("PORT", 1338)
  const url = `http://${host}:${port}`;
  return { host, port, url };
};
