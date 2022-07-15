import fs from 'fs';
import { integrationItem } from '../config/config-helper';
import { fetchLatestAirnodeRelease } from './airnode-save-last-release';

export const loadIntegrationConfig = async (): Promise<boolean> => {
  const airnodeLastRelease = await fetchLatestAirnodeRelease();
  const targetPath = `fetches/airnode-${airnodeLastRelease.tag}/packages/airnode-examples`;
  const file = `${targetPath}/integration-info.json`;
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
