const CPORegistrationRepository = require("../repository/CPORegistrationRepository");

module.exports = class CPORegistrationService {
	#repository;

	constructor() {
		this.#repository = new CPORegistrationRepository();
	}

	async RegisterCPO(cpoData) {
		await this.#repository.RegisterCPO(cpoData);
	}

	async GetListOfPartyIDs() {
		const partyIDs = await this.#repository.GetListOfPartyIDs();

		return partyIDs;
	}
};
