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

- **services**

  - This folder consists all of the services or business logic of a certain API. It also includes the ability to transform data to be be sent at the controller.

- **test**

  - This folder consists all of the test files.

- **utils**

  - This folder consists of other important classes or functions for the system. Example is Email sender.

- **.env**

  - A file that consists all of the environment variables for the app.

- **.gitignore**

  - A file that consists all of the paths that will be ignored when pushing to a remote repository.

- **app.js**

  - A starting point file. This is where you include (import) all of your controllers.

- **package.json**

  - List of required packages for the app.

- **server.js**

  - A file that will start a server.
