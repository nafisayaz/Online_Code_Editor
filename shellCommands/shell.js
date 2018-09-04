




const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.shellCommand = async function(shellCommand) {
  const { stdout, stderr } = await exec(shellCommand);
  return stdout;
//  console.log('stderr:', stderr);
}





