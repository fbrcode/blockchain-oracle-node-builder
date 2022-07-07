# Oracle Node for Sample API data

Blockportal Oracle Node uses [API3](https://api3.org/) open source (MIT license) implementation to generate off-chain communication and push necessary data on-chain.

## Lerna

It might be necessary to use Lerna for a more fluid deployment. To be defined..

Sample code for Node.Js/Yarn configuration **`package.json`**:

```json
{
  {
    "bootstrap": "yarn install && lerna bootstrap",
    "build": "lerna run build --stream && ts-node scripts/make-cli-executable.ts",
    "clean": "lerna run clean --stream",
    "cli:deployer": "lerna run --scope @api3/airnode-deployer cli -- --",
    "pack": "lerna run pack --stream",
    "postinstall": "husky install && lerna link",
    "publish": "lerna publish",
    "test": "lerna run test --stream",
    "test:e2e": "lerna run test:e2e --stream"
  },
  "devDependencies": {
    "@types/node": "^17.0.18",
    "@typescript-eslint/eslint-plugin": "^4.29.0",
    "@typescript-eslint/parser": "^4.29.0",
    "eslint": "^7.32.0",
    "eslint-plugin-functional": "^3.5.0",
    "eslint-plugin-import": "^2.23.4",
    "eslint-plugin-jest": "^26.1.1",
    "husky": "^7.0.2",
    "lerna": "^4.0.0",
    "prettier": "^2.3.2",
    "prettier-plugin-solidity": "^1.0.0-beta.18",
    "solhint": "^3.3.6",
    "ts-node": "^10.1.0",
    "typescript": "^4.2.4"
  }
}
```

Sample code for Lerna configuration **`lerna.json`**:

```json
{
  "npmClient": "yarn",
  "packages": ["packages/*"],
  "useWorkspaces": true,
  "version": "0.1.0"
}
```

## Checkout

```sh
# https://github.com/api3dao/airnode/tree/v0.6.2
git clone --depth 1 --branch v0.6.2 git@github.com:api3dao/airnode.git

# node dependency
nvm install 14.17.1
nvm use 14.17.1

# install & build
yarn run bootstrap
yarn run build

# mocked web server
yarn run dev:api:background
yarn run dev:list

# run eth node - hardhat
yarn run dev:eth-node
```

## Quick deploy stats

```sh
➜  airnode-operation git:(7c7e69f) ✗ yarn dev:eth-deploy
yarn run v1.22.18
$ ts-node src/scripts/evm-dev-deploy.ts
--> Loading configuration...
  - Build initial deployable object
--> Deploying contracts...
    * Airnode RRP Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  - AirnodeRrp contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    * Mock Requester Address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    * Requesters By Name (key) >> MockRrpRequesterFactory
    * Requesters By Name (tnx hash) >> "0x5ce34030aa0e1e62069bf8d9c2026c2ac6761a51b4aa1ed82388f0390716be01"
  - Requester contract address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
  - Access control registry contract address: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
  - Authorizers contract address: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
--> Assigning wallets...
  - Airnode "IotAirnode" wallet address: 0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace
  - Sponsor address (alice): 0x3e247Fa2B9Db04d5f41E7FE444639C9b1f65a7d6
  - Sponsor address (bob): 0x6d264e585EF97139345e773605987C34B480fB45
  - Sponsor wallet address (alice): 0xEA4D3e96C391c1b27784507c0622A2Ef3B34102F
  - Sponsor wallet address (bob): 0xB7ff74C757417EEF7AcaC6a37F46C065Bc4630d8
--> Funding wallets...
    * Fund Airnode "IotAirnode"
      + transaction: 0x7e01e17bd2f003a060d067e4a52a32a1039788a9b685e8005c3ceb031d18454b
      + from: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      + to: 0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace
      + amount: 5.0 ETH
    * Fund Sponsor (id = alice) Account "0x3e247Fa2B9Db04d5f41E7FE444639C9b1f65a7d6"
      + transaction: 0x8a65c37847ecdcffc7858f4b67b4fd002800a30d7b1ee137ac8e65b4b2947ed4
      + from: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      + to: 0x3e247Fa2B9Db04d5f41E7FE444639C9b1f65a7d6
      + amount: 2.0 ETH
    * Fund Sponsor (id = bob) Account "0x6d264e585EF97139345e773605987C34B480fB45"
      + transaction: 0x8e9a8e761da85431945ac8e2e0c20464a870c5c250123bfee7349d12c68eeb0d
      + from: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      + to: 0x6d264e585EF97139345e773605987C34B480fB45
      + amount: 2.0 ETH
    * Fund Sponsor (id = alice) Wallet "0xEA4D3e96C391c1b27784507c0622A2Ef3B34102F"
      + transaction: 0x56a475feb6351cca2c4983692b34016485e00d811b53b42863c3cc7194d13261
      + from: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      + to: 0xEA4D3e96C391c1b27784507c0622A2Ef3B34102F
      + amount: 1 ETH
    * Fund Sponsor (id = bob) Wallet "0xB7ff74C757417EEF7AcaC6a37F46C065Bc4630d8"
      + transaction: 0x2dcfacf1846ed153f629f9541acffb65d796e5b4089bb05f2f9fbe0bd3504d3a
      + from: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      + to: 0xB7ff74C757417EEF7AcaC6a37F46C065Bc4630d8
      + amount: 5 ETH
--> Sponsoring requester contracts...
    * Set true (enabled) sponsor status (id = bob) to requester (name = MockRrpRequesterFactory) contract: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
      + transaction: 0xed7e3963f5b1f1859db399124fafbaab877a7d639f9dc4ab465620c123a0a25b
      + from: 0x6d264e585EF97139345e773605987C34B480fB45
      + to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
--> Creating templates...
    * Create template "template-1"
      + transaction: 0x22bc4e9d6a61d29d59e9d4ad218815c8e29d37d82576ba1f9bd89085ac553426
      + from: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      + to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    * Template by name: IotAirnode-template-1... Id: 0x3cc8c8de5cde3f35f6da2d25020ee728977ac5ec1070726fc620a293945df9db
--> Deployment successful!
--> Saving deployment...
--> Deployment saved!
✨  Done in 2.19s.
```

## AIQ Sample Data

```json
{
  "name": "AIQ IoT #23247",
  "description": "AIQ IoT NY area cluster #23247",
  "image": "https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTxyz?filename=green_status.png",
  "attributes": [
    {
      "trait_type": "Air Quality Score Average",
      "value": 85.4254
    },
    {
      "trait_type": "Air Quality Score Max",
      "value": 93.7328
    },
    {
      "trait_type": "Air Quality Score Min",
      "value": 72.9943
    },
    {
      "trait_type": "Up Time",
      "value": 1843626
    },
    {
      "trait_type": "Devices Count",
      "value": 46
    },
    {
      "trait_type": "Industry",
      "value": "AIQ"
    },
    {
      "trait_type": "Benchmark::City::Rank",
      "value": "+10"
    },
    {
      "trait_type": "Benchmark::County::Rank",
      "value": "+5"
    },
    {
      "trait_type": "Benchmark::State::Rank",
      "value": "-1"
    }
  ]
}
```
