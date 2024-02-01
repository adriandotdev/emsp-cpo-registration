const mysql = require("../database/mysql");

module.exports = class CPORegistrationRepository {
	RegisterCPO(cpoData) {
		const query = `INSERT INTO cpos (country_code, cpo_name, address, contact_name, contact_email, contact_number, logo) VALUES (?,?,?,?,?,?,?)`;
		return new Promise((resolve, reject) => {
			mysql.query(
				query,
				[
					"PH",
					cpoData.cpo_name,
					cpoData.address,
					cpoData.contact_name,
					cpoData.contact_email,
					cpoData.contact_number,
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
