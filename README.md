# Oracle Node Builder

This is a blockchain oracle node generator based on [API3](https://api3.org/) Airnode infrastructure.

The workflow will be a fork and test of the latest API3 implementation with a use-case builder based on a sample JSON file which represents the desired content to be exposed on-chain.

## Key features

- Generate node (airnode) configuration based on the JSON use-case;
- Be able to update the node with different endpoints;
- Access APIs endpoints with api-key header instead of parameters;
- Spin up a local server serving the JSON data content (for end-to-end testing);
- Manage administration wallets for the node execution;
- Deploy infrastructure for the use-case;
- Deploy specific requestor contract for the select data responses;

## Steps

1. Clone specific airnode tag version
2. Build infrastructure using appropriate node version
3. Generate use-case configurations (OAS, OIS, airnode config, requester contract)
4. Validate/test scripts generation
5. TBD...

## Requirements

- [**_Node Version Manager (nvm)_**](https://github.com/nvm-sh/nvm) needs to be installed to manage different project [Node.js](https://nodejs.org) versions.

## Scripts

List if scripts ready for use:

- `yarn dev` - get the latest release available from API3 airnode.
