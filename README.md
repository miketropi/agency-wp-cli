# Agency WP CLI

A command-line tool for quickly generating WordPress plugins from a template. This tool scaffolds a new WordPress plugin by cloning a template repository and customizing it with your plugin details.

## Description

**Agency WP CLI** (BePlus WordPress CLI Generator) is an interactive CLI tool that helps you bootstrap WordPress plugins. It:

- Clones a WordPress plugin template repository
- Prompts you for plugin configuration details
- Automatically replaces placeholders throughout the codebase
- Generates a ready-to-use WordPress plugin structure

## Installation & Usage

### Quick Start

Run the tool directly using `npx`:

```bash
npx github:miketropi/agency-wp-cli
```

### What Happens Next

The tool will prompt you for the following information:

1. **Plugin slug** (folder name) - Required
   - Example: `my-awesome-plugin`

2. **Plugin name** - The display name of your plugin
   - Example: `My Awesome Plugin`

3. **PHP Namespace** - The PHP namespace for your plugin classes
   - Default: Automatically generated from the slug (e.g., `myAwesomePlugin`)

4. **Author** - The author name
   - Default: `Your Agency`

After providing the information, the tool will:

1. Clone the template repository (`wp-plugin-template`)
2. Remove the git history
3. Replace all placeholders with your provided values
4. Generate the plugin in a new directory matching your plugin slug

The generated plugin will be created in your current working directory.

## Example

```bash
$ npx github:miketropi/agency-wp-cli

? Plugin slug (folder name): contact-form-pro
? Plugin name: Contact Form Pro
? PHP Namespace: ContactFormPro
? Author: My Agency

✅ Plugin generated at /path/to/contact-form-pro
```

## Requirements

- Node.js (for running npx)
- Git (for cloning the template repository)
- SSH access to `git@github.com:miketropi/wp-plugin-template.git` (or the template repository must be publicly accessible)

## License

ISC

