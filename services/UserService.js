const UserRepository = require("../repository/UserRepository");

module.exports = class UserService {
	#repository;

	constructor() {
		this.#repository = new UserRepository();
	}

	async GetUsers() {
		const users = await this.#repository.GetUsers();

		return users;
	}
};
