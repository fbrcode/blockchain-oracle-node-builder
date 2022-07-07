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
  const path = 'fetches/';

  if (!fs.existsSync(path + airnodeFolderRelease)) {
    const cloneCmd = `git clone --depth 1 --branch ${airnodeLastReleaseTag} ${airnodeClone.url_clone} ${airnodeFolderRelease}`;
    console.log(
      `Fetching airnode release ${airnodeLastReleaseTag} into ${path}${airnodeFolderRelease}`
    );
    console.log(`Executing ${cloneCmd}`);
    shell.cd(path);
    shell.exec(cloneCmd);
    shell.cd(airnodeFolderRelease);
  } else {
    console.log(
      `Already fetched airnode release ${airnodeLastReleaseTag} into ${path}${airnodeFolderRelease}`
    );
    shell.cd(path + airnodeFolderRelease);
  }

  // setup proper node version for airnode build
  const nodeEngine = gitAirnode.node_engine;
  console.log(`Checking up Node.js version`);

  // check if node version is matching
  const currentNodeVersion = shell.exec(`node --version`, { silent: true });
  if (currentNodeVersion.stdout.includes(nodeEngine)) {
    console.log(`Node.js version is matching ${nodeEngine}`);
    console.log(`Building airnode ${airnodeLastReleaseTag}`);
    shell.exec('yarn run bootstrap');
    shell.exec('yarn run build');
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
