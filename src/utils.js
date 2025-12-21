import fs from 'fs';
import path from 'path';

export async function replaceRecursive(dir, replacements) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await replaceRecursive(fullPath, replacements);
    } else {
      let content = fs.readFileSync(fullPath, 'utf8');

      for (const [key, value] of Object.entries(replacements)) {
        content = content.replaceAll(key, value);
      }

      fs.writeFileSync(fullPath, content);
    }
  }
}
