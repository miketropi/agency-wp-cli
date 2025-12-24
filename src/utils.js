import fs from 'fs';
import path from 'path';

export async function replaceRecursive(dir, map) {
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
