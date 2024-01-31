const mysql = require("../database/mysql");

module.exports = class CPORegistrationRepository {
	RegisterCPO(cpoData) {
		const query = `INSERT INTO cpos (country_code, cpo_name, contact_name, contact_email, logo) VALUES (?,?,?,?,?)`;
		return new Promise((resolve, reject) => {
			mysql.query(
				query,
				[
					"PH",
					cpoData.cpo_name,
					cpoData.contact_name,
					cpoData.contact_email,
					cpoData.filename,
				],
				(err, result) => {
					if (err) {
						reject(err);
					}

					resolve(result);
				}
			);
		});
	}
};
