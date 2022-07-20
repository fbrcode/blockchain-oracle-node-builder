import { AirnodeClone } from './types';
import { fetchLatestAirnodeRelease } from './1a-airnode-save-last-release';
import * as gitAirnode from '../config/airnode-git.json';
import path from 'path';
import fs from 'fs';

export const deployRRP = async (): Promise<boolean> => {
  const airnodeClone: AirnodeClone = gitAirnode;
  const airnodeLastReleaseTag = (await fetchLatestAirnodeRelease()).tag;
  const targetPath = `${airnodeClone.fetchPath}/${airnodeClone.oracleNodePrefix}${airnodeLastReleaseTag}/${airnodeClone.examplesPath}`;
  try {
    const artifact = getArtifact(
      targetPath,
      '@api3/airnode-protocol/contracts/rrp/AirnodeRrpV0.sol'
    );
    console.log(
      `✅ Acquired airnode RRP compiled contract: ${artifact.contractName}`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getArtifact = (baseFolderPath: string, artifactsFolderPath: string) => {
  const fullArtifactsPath = path.join(
    __dirname,
    '../',
    baseFolderPath,
    'artifacts/',
    artifactsFolderPath
  );
  const files = fs.readdirSync(fullArtifactsPath);
  const artifactName = files.find((f) => !f.endsWith('.dbg.json'))!;
  const artifactPath = path.join(fullArtifactsPath, artifactName);
  return require(artifactPath);
};

deployRRP()
  .then((validResponse) => {
    if (validResponse) {
      console.log('Done deploying airnode request-response protocol ✅');
    } else {
      console.log('Airnode RRP deployment failed ❌');
    }
  })
  .catch((err) => {
    console.error(err);
  });
