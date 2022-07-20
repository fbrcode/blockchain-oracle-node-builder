import fs from 'fs';
import { AirnodeClone } from './types';
import { integrationItem } from '../config/config-helper';
import { fetchLatestAirnodeRelease } from './1a-airnode-save-last-release';
import * as gitAirnode from '../config/airnode-git.json';

export const loadIntegrationConfig = async (): Promise<boolean> => {
  const airnodeClone: AirnodeClone = gitAirnode;
  const airnodeLastReleaseTag = (await fetchLatestAirnodeRelease()).tag;
  const targetPath = `${airnodeClone.fetchPath}/${airnodeClone.oracleNodePrefix}${airnodeLastReleaseTag}/${airnodeClone.examplesPath}`;
  const file = `${targetPath}/${airnodeClone.integrationConfigFile}`;
  console.log(`Writing integration config to ${file}`);
  try {
    fs.writeFileSync(file, JSON.stringify(integrationItem, null, 2));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

loadIntegrationConfig()
  .then((validResponse) => {
    if (validResponse) {
      console.log('Done loading integration config ✅');
    } else {
      console.log('Integration config not loaded ❌');
    }
  })
  .catch((err) => {
    console.error(err);
  });
