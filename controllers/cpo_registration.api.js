const { validationResult, body } = require("express-validator");

const logger = require("../config/winston");

const { HttpUnprocessableEntity } = require("../utils/HttpError");

const multer = require("multer");
const path = require("path");

// Service
const CPORegistrationService = require("../services/CPORegistrationService");

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
			new HttpUnprocessableEntity(
				"Invalid File Types. Accepted File Types: [png, svg]",
				[]
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
	const service = new CPORegistrationService();

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
		[
			body("cpo_name")
				.notEmpty()
				.withMessage("Missing required property: cpo_name"),
			body("contact_name")
				.notEmpty()
				.withMessage("Missing required property: contact_name"),
			body("contact_email")
				.notEmpty()
				.withMessage("Missing required property: contact_email"),
		],
		async (req, res) => {
			const { cpo_name, contact_name, contact_email } = req.body;

			logger.info({
				REGISTER_CPO_API_REQUEST: {
					body: { ...req.body },
					file: { ...req.file },
				},
			});

			if (!req.file) {
				return res
					.status(422)
					.json({ status: 422, data: [], message: "Unprocessable Entity" });
			}

			try {
				validate(req, res);

				await service.RegisterCPO({
					cpo_name,
					contact_name,
					contact_email,
					filename: req.file?.filename,
				});

				logger.info({ REGISTER_CPO_API_RESPONSE: { status: 200 } });

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
