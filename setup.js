const { exec } = require("child_process");

const installDependencies = (dir) => {
  console.log(`Installing dependencies in ${dir}...`);

  const process = exec(`cd ${dir} && npm install`, { shell: true });

  process.stdout.on('data', (data) => {
    console.log(`${dir}: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`${dir}: ${data}`);
  });

  process.on('error', (error) => {
    console.error(`Error installing dependencies in ${dir}: ${error}`);
  });

  process.on('close', (code) => {
    console.log(`Installation process for ${dir} exited with code ${code}`);
  });
};

installDependencies("client");
installDependencies("api");
installDependencies("userGenerator");
