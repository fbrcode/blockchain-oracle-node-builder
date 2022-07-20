import shell from 'shelljs';
import { AirnodeClone } from './types';
import { fetchLatestAirnodeRelease } from './1a-airnode-save-last-release';
import * as gitAirnode from '../config/airnode-git.json';
import fs from 'fs';

const main = async () => {
  const airnodeClone: AirnodeClone = gitAirnode;
  const airnodeLastReleaseTag = (await fetchLatestAirnodeRelease()).tag;
  const airnodeFolderRelease = `${airnodeClone.oracleNodePrefix}${airnodeLastReleaseTag}`;

  // clone airnode latest release
  if (!fs.existsSync(`${airnodeClone.fetchPath}/${airnodeFolderRelease}`)) {
    const cloneCmd = `git clone --depth 1 --branch ${airnodeLastReleaseTag} ${airnodeClone.urlClone} ${airnodeFolderRelease}`;
    console.log(
      `Fetching airnode release ${airnodeLastReleaseTag} into ${airnodeClone.fetchPath}/${airnodeFolderRelease}`
    );
    console.log(`Executing: ${cloneCmd}`);
    shell.cd(airnodeClone.fetchPath);
    shell.exec(cloneCmd, { silent: true });
    shell.cd(airnodeFolderRelease);
  } else {
    console.log(
      `Already fetched airnode release ${airnodeLastReleaseTag} into ${airnodeClone.fetchPath}/${airnodeFolderRelease}`
    );
    shell.cd(`${airnodeClone.fetchPath}/${airnodeFolderRelease}`);
  }

  // check if node version is matching
  const currentNodeVersion = shell.exec(`node --version`, { silent: true });
  if (currentNodeVersion.stdout.includes(`v${gitAirnode.nodeEngine}`)) {
    console.log(`Node.js version is matching ${gitAirnode.nodeEngine}`);
    // build airnode packages
    const bootstrapLog = `../lerna-bootstrap-${airnodeFolderRelease}.log`;
    const buildLog = `../lerna-build-${airnodeFolderRelease}.log`;
    console.log(`Building airnode ${airnodeLastReleaseTag}`);

    if (fs.existsSync(bootstrapLog)) {
      console.log(
        `Airnode already bootstrapped and log saved at: ${bootstrapLog.replace(
          '..',
          'fetches'
        )}`
      );
    } else {
      fs.writeFileSync(
        bootstrapLog,
        shell.exec('yarn run bootstrap', { silent: true }).stdout
      );
      console.log(
        `Airnode bootstrap log saved at: ${bootstrapLog.replace(
          '..',
          'fetches'
        )}`
      );
    }
    if (fs.existsSync(buildLog)) {
      console.log(
        `Airnode already built and log saved at: ${buildLog.replace(
          '..',
          'fetches'
        )}`
      );
    } else {
      fs.writeFileSync(
        buildLog,
        shell.exec('yarn run build', { silent: true }).stdout
      );
      console.log(
        `Airnode build log saved at: ${buildLog.replace('..', 'fetches')}`
      );
    }
  } else {
    console.log(
      `Node.js version should be ${
        gitAirnode.nodeEngine
      }. It's using ${currentNodeVersion.stdout.trim()} instead.`
    );
    console.log(
      `Run "nvm install ${gitAirnode.nodeEngine}" and then "nvm use ${gitAirnode.nodeEngine}" to install and use the correct version`
    );
  }
};

main()
  .then(() => {
    console.log('Done building airnode latest release ✅');
  })
  .catch((err) => {
    console.error(err);
  });
