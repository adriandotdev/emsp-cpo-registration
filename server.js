require("dotenv").config();
const app = require("./app");

const logger = require("./config/winston");

const httpServer = require("http").createServer(app);

httpServer.listen(process.env.PORT, () => {
	logger.info("Server is running on port: " + process.env.PORT);
});
