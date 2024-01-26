# Codebase Template

## Folder Structures

- **config**

  - This folder consists all of the configuration files such as loggers.

- **controllers**

  - This folder consists all of the APIs.
  - File Naming Convention
    - user.api.js

- **database**

  - This folder must only consists all of the configurations of a specific database.

- **middlewares**

  - This folder consists all of the middlewares to be used in the APIs in the controllers.

- **repository**

  - This folder consists all of the files related to persistence layer access.
  - Repositories File Name Convention
    - UserRepository.js

- **services**

  - This folder consists all of the services or business logic of a certain API. It also includes the ability to transform data to be be sent at the controller.
  - Services File Name Convention
    - UserService.js

- **test**

  - This folder consists all of the test files.
  - Test File Naming Convention
    - User.test.js
    - UserUnit.test.js
    - UserIntegration.test.js
    - UserRegression.test.js

- **utils**

  - This folder consists of other important classes or functions for the system. Example is Email sender.

- **.env**

  - A file that consists all of the environment variables for the app.
  - Environment Variable Naming Convention
    - NODE_ENV=stg
    - DB_HOST=localhost
    - DB_PASSWORD=password

- **.gitignore**

  - A file that consists all of the paths that will be ignored when pushing to a remote repository.

- **app.js**

  - A starting point file. This is where you include (import) all of your controllers.

- **package.json**

  - List of required packages for the app.

- **server.js**

  - A file that will start a server.

> **NOTE**: Ignore the readme-images folder

## package.json

![Package.json Scripts](./readme-images/image.png)

In `package.json`, you can set the environment into testing, by running the command `npm run test`. To be able to change an environment variable in a script, install `dotenv`, and `cross-env` npm package.
