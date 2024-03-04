const fastify = require('fastify')({
	logger: false
})

fastify.register(require("@fastify/cors"), {
	origin: '*'
});

const { Skolengo } = require('scolengo-api');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('data/skolengo.json'));
require('dotenv').config();

// Initialisation de Skolengo
Skolengo.fromConfigObject(config).then(async user => {
	async function refreshToken() {
		config.tokenSet = await user.refreshToken(true);
		fs.writeFileSync("data/skolengo.json", JSON.stringify(config));
	}
	setInterval(refreshToken, 1000 * 60 * 60 * 3)
	refreshToken()

	let studentId = (await user.getUserInfo()).id;

	fastify.get("/", async (request, reply) => {
		if (request.query.key !== process.env.APIKEY) reply.send({ error: "Invalid API key" });

		let currentDate = new Date();
		let futureDate = new Date();
		futureDate.setDate(currentDate.getDate() + 14);
		futureDate = futureDate.toISOString().split("T")[0];
		currentDate = currentDate.toISOString().split("T")[0];

		reply.send((await user.getAgenda(studentId, currentDate, futureDate)).toICalendar());
	});

	fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
		if (err) throw err;
		console.log(`Server listening on ${address}`)
	});
})