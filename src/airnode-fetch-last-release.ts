import shell from 'shelljs';
import { AirnodeClone, AirnodeLastRelease } from './types';
import * as gitAirnode from '../config/airnode-git.json';
import * as gitAirnodeLastRelease from '../config/airnode-last-release-tag.json';
import fs from 'fs';

const main = async () => {
  const airnodeClone: AirnodeClone = gitAirnode;
  const airnodeLastRelease: AirnodeLastRelease = gitAirnodeLastRelease;
  const airnodeLastReleaseTag = airnodeLastRelease.tag;
  const airnodeFolderRelease = `airnode-${airnodeLastReleaseTag}`;
  const fetchPath = 'fetches/';

  // clone airnode latest release
  if (!fs.existsSync(fetchPath + airnodeFolderRelease)) {
    const cloneCmd = `git clone --depth 1 --branch ${airnodeLastReleaseTag} ${airnodeClone.url_clone} ${airnodeFolderRelease}`;
    console.log(
      `Fetching airnode release ${airnodeLastReleaseTag} into ${fetchPath}${airnodeFolderRelease}`
    );
    console.log(`Executing: ${cloneCmd}`);
    shell.cd(fetchPath);
    shell.exec(cloneCmd, { silent: true });
    shell.cd(airnodeFolderRelease);
  } else {
    console.log(
      `Already fetched airnode release ${airnodeLastReleaseTag} into ${fetchPath}${airnodeFolderRelease}`
    );
    shell.cd(fetchPath + airnodeFolderRelease);
  }

  // check if node version is matching
  const nodeEngine = gitAirnode.node_engine;
  const currentNodeVersion = shell.exec(`node --version`, { silent: true });
  if (currentNodeVersion.stdout.includes(nodeEngine)) {
    console.log(`Node.js version is matching ${nodeEngine}`);
    // build airnode packages
    console.log(`Building airnode ${airnodeLastReleaseTag}`);
    fs.writeFileSync(
      `../lerna-bootstrap-${airnodeFolderRelease}.log`,
      shell.exec('yarn run bootstrap', { silent: true }).stdout
    );
    fs.writeFileSync(
      `../lerna-build-${airnodeFolderRelease}.log`,
      shell.exec('yarn run build', { silent: true }).stdout
    );
  } else {
    console.log(
      `Node.js version should be ${nodeEngine}. It's using ${currentNodeVersion.stdout.trim()} instead.`
    );
    console.log(
      `Run "nvm install ${nodeEngine.substring(
        1
      )}" and then "nvm use ${nodeEngine.substring(
        1
      )}" to install and use the correct version`
    );
  }
};

main()
  .then(() => {
    console.log('Done');
  })
  .catch((err) => {
    console.error(err);
  });
