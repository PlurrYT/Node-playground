const { execSync } = require('child_process');

/**
 * @param {string} code
 * @returns {string}
 */
function runInDocker(code) {
  const fs = require('fs');
  const tmp = require('os').tmpdir();
  const filename = `${tmp}/usercode_${Date.now()}.js`;
  fs.writeFileSync(filename, code);

  try {
    const result = execSync(`docker run --rm -v ${filename}:/usr/src/app/code.js node:18-alpine node /usr/src/app/code.js`, { timeout: 5000 });
    fs.unlinkSync(filename);
    return result.toString();
  } catch (e) {
    fs.unlinkSync(filename);
    return e.toString();
  }
}

module.exports = { runInDocker };
