import fs from 'fs';
import path from 'path';

export const replaceRecursive = async (dir, map) => {
  const ignore = ['.git', 'node_modules', 'vendor'];

  for (const file of fs.readdirSync(dir)) {
    if (ignore.includes(file)) continue;

    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      await replaceRecursive(full, map);
    } else {
      let content = fs.readFileSync(full, 'utf8');
      for (const [key, value] of Object.entries(map)) {
        content = content.replaceAll(key, value);
      }
      fs.writeFileSync(full, content);
    }
  }
}

/**
 * Find the main plugin file in a directory
 * 
 * @param {string} dir - The directory to search
 * @returns {string|null} The main plugin file or null if not found
 */
export const findMainPluginFile = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.php')) {
      const filePath = path.join(dir, file);
      const contents = fs.readFileSync(filePath, 'utf8');
      // Check for WordPress plugin header (simple detection)
      if (/^\s*\/\*\s*\n?/m.test(contents) && /Plugin\s+Name\s*:/i.test(contents)) {
        return file;
      }
    }
  }
  return null;
}