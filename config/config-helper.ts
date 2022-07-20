import { IntegrationGroup, IntegrationConfig } from '../src/types';

export const deploymentPath = './deployment';

export const integrationList: IntegrationGroup = {
  apiConfigData: [
    {
      integration: 'api-multi-value',
      airnodeType: 'local',
      network: 'localhost',
      mnemonic: 'test test test test test test test test test test test junk',
      providerUrl: 'http://localhost:8545',
    },
  ],
};

export const integrationItem: IntegrationConfig =
  integrationList.apiConfigData[0];
