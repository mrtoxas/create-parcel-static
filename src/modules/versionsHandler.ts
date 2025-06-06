import fs from 'fs-extra';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const getPackage = () => {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    return fs.readJsonSync(join(__dirname, '../package.json'));
  } catch (error) {
    console.log(error);
    // Keep quiet
  }
};
