# Agency WP CLI

A command-line tool for quickly generating WordPress plugins, themes, and blocks from templates. This tool scaffolds new WordPress resources by cloning template repositories and customizing them with your details.

## Description

**Agency WP CLI** is an interactive CLI tool that helps you bootstrap WordPress resources. It:

- Clones WordPress template repositories (plugins, themes, blocks)
- Prompts you for configuration details
- Automatically replaces placeholders throughout the codebase
- Generates ready-to-use WordPress resource structures

## Installation & Usage

### Quick Start

Run the tool directly using `npx`:

```bash
npx github:miketropi/agency-wp-cli create <type>
```

Where `<type>` is one of: `plugin`, `theme`, or `block`.

### Commands

#### Create a Plugin

```bash
npx github:miketropi/agency-wp-cli create plugin
```

The tool will prompt you for:

1. **Plugin slug** (folder name) - Required
   - Example: `my-awesome-plugin`

2. **Plugin name** - The display name of your plugin
   - Example: `My Awesome Plugin`

3. **PHP Namespace** - The PHP namespace for your plugin classes
   - Default: Automatically generated from the slug (uppercase, special chars removed)
   - Example: `MYAWESOMEPLUGIN`

4. **Author** - The author name
   - Default: `Your Agency`

#### Create a Theme (Waiting for update)

```bash
npx github:miketropi/agency-wp-cli create theme
```

The tool will prompt you for:

1. **Theme slug** (folder name) - Required
   - Example: `my-awesome-theme`

2. **Theme name** - The display name of your theme
   - Example: `My Awesome Theme`

3. **PHP Namespace** - The PHP namespace for your theme classes
   - Default: Automatically generated from the slug (uppercase, special chars removed)
   - Example: `MYAWESOMETHEME`

4. **Author** - The author name
   - Default: `Your Agency`

#### Create a Block (Waiting for update)

```bash
npx github:miketropi/agency-wp-cli create block
```

The tool will prompt you for:

1. **Block slug** (folder name) - Required
   - Example: `my-custom-block`

2. **Block name** - The display name of your block
   - Example: `My Custom Block`

3. **PHP Namespace** - The PHP namespace for your block classes
   - Default: Automatically generated from the slug
   - Example: `MyCustomBlock`

## Examples

### Creating a Plugin

```bash
$ npx github:miketropi/agency-wp-cli create plugin

? Plugin slug (folder name): contact-form-pro
? Plugin name: Contact Form Pro
? PHP Namespace: CONTACTFORMPRO
? Author: My Agency

📦 Cloning plugin template...
✅ Plugin created: contact-form-pro
```

### Creating a Theme

```bash
$ npx github:miketropi/agency-wp-cli create theme

? Theme slug (folder name): modern-portfolio
? Theme name: Modern Portfolio
? PHP Namespace: MODERNPORTFOLIO
? Author: My Agency

📦 Cloning theme template...
✅ Theme created: modern-portfolio
```

### Creating a Block

```bash
$ npx github:miketropi/agency-wp-cli create block

? Block slug (folder name): hero-section
? Block name: Hero Section
? PHP Namespace: HeroSection

📦 Cloning block template...
✅ Block created: hero-section
```

## What Happens

After providing the information, the tool will:

1. Clone the appropriate template repository
2. Remove the git history
3. Replace all placeholders with your provided values
4. Generate the resource in a new directory matching your slug

The generated resource will be created in your current working directory.

## Requirements

- Node.js (for running npx)
- Git (for cloning the template repositories)
- Access to the template repositories:
  - `https://github.com/miketropi/wp-plugin-template.git`
  - `https://github.com/miketropi/wp-theme-template.git` (Waiting for update)
  - `https://github.com/miketropi/wp-block-template.git` (Waiting for update)

## License

ISC
