import fs from 'fs';
import path from 'path';

export const replaceRecursive = async (dir, map) => {
  const ignore = ['.git', 'node_modules', 'vendor'];

  // Get directory entries
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    if (ignore.includes(entry)) continue;

    let entryPath = path.join(dir, entry);
    let newName = entry;
    
    // Replace placeholders in file/directory name
    for (const [key, value] of Object.entries(map)) {
      if (newName.includes(key)) {
        newName = newName.replaceAll(key, value);
      }
    }
    
    // Rename if the name changed
    if (newName !== entry) {
      const newPath = path.join(dir, newName);
      fs.renameSync(entryPath, newPath);
      entryPath = newPath;
    }

    if (fs.statSync(entryPath).isDirectory()) {
      await replaceRecursive(entryPath, map);
    } else {
      let content = fs.readFileSync(entryPath, 'utf8');
      for (const [key, value] of Object.entries(map)) {
        content = content.replaceAll(key, value);
      }
      fs.writeFileSync(entryPath, content);
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