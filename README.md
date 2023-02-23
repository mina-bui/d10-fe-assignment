# Drupal 10 Front End Assignment

A project to showcase the Wonders of the World.

## Getting started

### Requirements

This project requires [DDEV](https://ddev.readthedocs.io/en/latest/users/install/) and [Composer 2](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos) be installed before you begin.

### Setup

Checkout the project and run the following commands from project root:

- `ddev start`
- `composer install`
- `ddev auth ssh`

Now you are ready to install Drupal and test modules:

- `ddev install`

This command will install Drupal 10 plus the following useful modules: `devel`, `config_inspector`, `admin_toolbar`, and `admin_toolbar_tools`. You can login with `admin / admin` at https://d10.ddev.site/user.

### Frontend Setup

Run the following commands in our custom theme, `mytheme`.

- `npm install`
- `gulp`
- Optional: run `nvm use 19.3.0`

### Drush

`drush 11` is installed by default and can be run with `ddev drush COMMAND`. You can use `ddev drush site:install` if you want to customize the install.

### Composer

The use of `composer require` is assumed to be used for maintenance of the core framework, not adding modules for testing.

You can use `composer require` to add modules that you need -- and to check dependencies. Do not commit those additions to the project.

### Install locations

Modules are installed to `web/modules/contrib`, which is leveraged by our [common ddev tasks](#common-tasks).

## Developer notes

The `main` branch is locked against commits that are not in approved pull requests.
