# Agency WP CLI

A command-line tool for scaffolding WordPress plugins, themes, and generating blocks within existing projects. This tool helps you quickly bootstrap new WordPress resources and add blocks to your plugins.

## Features

- 🚀 **Create new plugins** - Scaffold complete WordPress plugins from templates
- 🎨 **Create new themes** - Generate WordPress theme structures
- 🧩 **Make blocks** - Generate custom Gutenberg blocks inside existing plugins
- 🔄 **Auto-replace placeholders** - Automatically customize templates with your details
- 📦 **Template-based** - Uses proven template repositories for consistency

## Installation

### Quick Start (Recommended)

Run directly with `npx`:

```bash
npx github:miketropi/agency-wp-cli <command>
```

### Local Installation

```bash
npm install -g github:miketropi/agency-wp-cli
```

Then use:

```bash
agency-wp-cli <command>
```

## Commands

### `create` - Scaffold New Resources

Create new WordPress plugins or themes from templates.

#### Create a Plugin

```bash
npx github:miketropi/agency-wp-cli create plugin
```

**Prompts:**
- **Plugin slug** (folder name) - Required
  - Example: `my-awesome-plugin`
- **Plugin name** - Display name
  - Example: `My Awesome Plugin`
- **PHP Namespace** - Auto-generated from slug (uppercase, special chars removed)
  - Example: `MYAWESOMEPLUGIN`
- **Author** - Default: `Your Agency`

**What it does:**
1. Clones the plugin template repository
2. Removes git history
3. Replaces placeholders throughout the codebase
4. Generates plugin in `./{slug}/` directory

**After creation, you'll see:**
```
🎉 Plugin scaffolded successfully!
Next steps to get started:

1. Move into your plugin directory:
   cd "my-awesome-plugin"

2. Install PHP dependencies with Composer:
   composer install

3. Install JavaScript dependencies:
   npm install --legacy-peer-deps

4. Start your development/build process:
   npm run dev     # or 'npm run build' for a production build
```

#### Create a Theme

```bash
npx github:miketropi/agency-wp-cli create theme
```

**Prompts:**
- **Theme slug** (folder name) - Required
  - Example: `my-awesome-theme`
- **Theme name** - Display name
  - Example: `My Awesome Theme`
- **PHP Namespace** - Auto-generated from slug (uppercase, special chars removed)
  - Example: `MYAWESOMETHEME`
- **Author** - Default: `Your Agency`

**What it does:**
1. Clones the theme template repository
2. Removes git history
3. Replaces placeholders throughout the codebase
4. Generates theme in `./{slug}/` directory

### `make` - Generate Code in Existing Projects

Generate blocks and other resources inside existing WordPress projects.

#### Make a Block

```bash
npx github:miketropi/agency-wp-cli make block
```

**Requirements:**
- Must be run inside a WordPress plugin directory
- Plugin must have a main PHP file with a plugin header (`Plugin Name:`)

**Prompts:**
- **Block name** - Display name
  - Example: `Hero Section`
- **Block slug** - Auto-generated from name (lowercase, hyphenated)
  - Example: `hero-section`

**What it does:**
1. Detects the current plugin directory
2. Creates block files in `src/blocks/{slug}/`
3. Generates:
   - `block.json` - Block configuration
   - `block.jsx` - React component
   - `render.php` - Server-side render template
   - `style.css` - Block styles
4. Replaces placeholders with plugin and block details

**Block structure:**
```
your-plugin/
  src/
    blocks/
      hero-section/
        block.json
        block.jsx
        render.php
        style.css
```

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

🎉 Plugin scaffolded successfully!
Next steps to get started:
...
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

### Making a Block

```bash
$ cd my-wordpress-plugin
$ npx github:miketropi/agency-wp-cli make block

? Block name: Hero Section
? Block slug (folder name): hero-section

✅ Block created: hero-section

🎉 Block created successfully!
```

## Project Structure

```
agency-wp-cli/
├── bin/
│   └── index.js              # CLI entry point
├── src/
│   ├── commands/
│   │   ├── create.js         # Create command router
│   │   ├── create-plugin.js  # Plugin creation handler
│   │   ├── create-theme.js   # Theme creation handler
│   │   ├── make.js           # Make command router
│   │   └── make-block.js     # Block generation handler
│   ├── generator/
│   │   ├── plugin.js         # Plugin generator
│   │   ├── theme.js          # Theme generator
│   │   └── make-block.js     # Block generator
│   ├── prompts/
│   │   ├── plugin.js         # Plugin prompts
│   │   ├── theme.js          # Theme prompts
│   │   └── make-block.js     # Block prompts
│   ├── templates/
│   │   └── make-block/       # Block template files
│   ├── constants.js          # Template repository URLs
│   └── utils.js              # Utility functions
└── package.json
```

## How It Works

### Placeholder Replacement

The tool automatically replaces placeholders in template files:

**For plugins:**
- `__PLUGIN_SLUG__` → Your plugin slug
- `__PLUGIN_NAME__` → Your plugin name
- `__NAMESPACE__` → Your PHP namespace
- `__AUTHOR__` → Author name
- `__TEXT_DOMAIN__` → Plugin slug (for translations)
- `__PLUGIN_SLUG_FLAT__` → Slug without special characters

**For blocks:**
- `__PLUGIN_SLUG__` → Parent plugin slug
- `__BLOCK_SLUG__` → Block slug
- `__BLOCK_NAME__` → Block display name

### Ignored Directories

When replacing placeholders, these directories are skipped:
- `.git`
- `node_modules`
- `vendor`

## Requirements

- **Node.js (v24^)** - For running the CLI tool
- **Git** - For cloning template repositories
- **Access to template repositories:**
  - `https://github.com/miketropi/wp-plugin-template.git`
  - `https://github.com/miketropi/wp-theme-template.git`

## Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/miketropi/agency-wp-cli.git
cd agency-wp-cli

# Install dependencies
npm install

# Link globally for testing
npm link

# Now you can use it
agency-wp-cli create plugin
```

### Dependencies

- `commander` - CLI framework
- `inquirer` - Interactive prompts
- `fs-extra` - Enhanced file system operations

## Troubleshooting

### "Can't spot your main plugin file"

When running `make block`, ensure you're:
- Inside a WordPress plugin directory
- The plugin has a PHP file with a plugin header (`Plugin Name:`)

### Template repository access

If you get cloning errors:
- Ensure you have access to the template repositories
- Check your Git credentials
- Verify the repository URLs in `src/constants.js`

## License

ISC
