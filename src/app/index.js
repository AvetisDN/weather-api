import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/:city", async (req, res) => {
  const city = req.params.city;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c93761f0cfd02f56a37c775dc01adf7`;

  const owm = await fetch(apiUrl);
  const data = await owm.json();

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  data.iconUrl = iconUrl;

  return { data };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
