const { validationResult, body } = require("express-validator");

const logger = require("../config/winston");

const { HttpUnprocessableEntity } = require("../utils/HttpError");

const multer = require("multer");
const path = require("path");
// Set up multer to handle text fields
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./assets/images");
	},
	filename: function (req, file, cb) {
		const date = Date.now();
		const uploadFileName = date + "-" + file.originalname;
		cb(null, uploadFileName);
	},
});

const allowedFileTypes = (req, file, cb) => {
	const fileTypes = [".png", ".svg"];

	const isFileTypeValid = fileTypes.includes(
		path.extname(file.originalname).toLowerCase()
	);

	if (isFileTypeValid) {
		return cb(null, true);
	} else {
		cb(
			new multer.MulterError(
				"Invalid file types. Please upload png or svg files with maximum 80 kilobytes in size."
			)
		);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: allowedFileTypes,
	limits: 80 * 1024,
});

module.exports = (app) => {
	function validate(req, res) {
		const ERRORS = validationResult(req);

		if (!ERRORS.isEmpty()) {
			throw new HttpUnprocessableEntity(
				"Unprocessable Entity",
				ERRORS.mapped()
			);
		}
	}

	app.post(
		"/emsp/api/v1/cpo/register",
		upload.single("logo"),
		[body("user").notEmpty().withMessage("User is empty")],
		async (req, res) => {
			logger.info({ REGISTER_CPO_API_REQUEST: { message: "Location" } });

			try {
				validate(req, res);

				logger.info({ REGISTER_CPO_API_RESPONSE: { status: 200 } });

				console.log(req.body);
				console.log(req.file);

				return res.status(200).json({ status: 200, data: [] });
			} catch (err) {
				if (err !== null) {
					logger.error({ REGISTER_CPO_API_ERROR: { message: err.message } });

					return res
						.status(err.status)
						.json({ status: err.status, data: err.data, message: err.message });
				}

				logger.error({
					REGISTER_CPO_API_ERROR: {
						message: "Internal Server Error",
					},
				});
				return res
					.status(500)
					.json({ status: 500, data: [], message: "Internal Server Error" });
			}
		}
	);
};
