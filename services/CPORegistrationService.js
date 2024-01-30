const CPORegistrationRepository = require("../repository/CPORegistrationRepository");

module.exports = class CPORegistrationService {
	#repository;

	constructor() {
		this.#repository = new CPORegistrationRepository();
	}

	async RegisterCPO(cpoData) {
		this.#repository.RegisterCPO(cpoData);
	}
};
