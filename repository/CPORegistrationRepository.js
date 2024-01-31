const mysql = require("../database/mysql");

module.exports = class CPORegistrationRepository {
	RegisterCPO(cpoData) {
		const query = `INSERT INTO cpos (country_code, party_id, cpo_name, contact_name, contact_email, logo) VALUES (?,?,?,?,?,?)`;
		return new Promise((resolve, reject) => {
			mysql.query(
				query,
				[
					"PH",
					cpoData.party_id,
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

	GetListOfPartyIDs() {
		const query = `SELECT party_id, company_name FROM company_partner_details`;

		return new Promise((resolve, reject) => {
			mysql.query(query, (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}
};
