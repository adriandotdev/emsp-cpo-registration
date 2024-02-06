const request = require("supertest");
const app = require("../app");
const mysql = require("../database/mysql");

const path = require("path");
const PORT = 4008;

const server = app.listen(PORT, () => {
	console.log(`PORT LISTENING IN ${PORT}`);
});

describe("CPO Testing API", () => {
	beforeAll(async () => {
		mysql.on("connection", () => {
			console.log("SQL Connected");
		});
	}, 5000);

	afterAll((done) => {
		mysql.query("DELETE FROM cpos", (err, result) => {
			server.close(done);
			mysql.end();
		});
	}, 5000);

	test("Should Register a CPO", async () => {
		const response = await request(app)
			.post("/emsp/api/v1/cpo/register")

			.field("cpo_name", "CPO Name")
			.field("address", "CPO Address")
			.field("contact_name", "CPO Contact Name")
			.field("contact_email", "sample@gmail.com")
			.field("contact_number", "+639341123341")
			.attach(
				"logo",
				path.join(
					__dirname,
					"assets",
					"images",
					"1707188925496-EXECUTION QUERY.png"
				)
			)
			.expect(200);

		expect(response.status).toBe(200);
	}, 3000);
});
