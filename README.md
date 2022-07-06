# Oracle Node Builder

This is a blockchain oracle node generator based on API3 Airnode infrastructure.

The workflow will be a fork and test of the latest API3 implementation with a use-case builder based on a sample JSON file which represents the desired content to be exposed on-chain.

## Key features

- Generate node (airnode) configuration based on the JSON use-case.
- Spin up a local server serving the JSON data content (for end-to-end testing)
- Manage administration wallets for the node execution
- Deploy infrastructure for the use-case
- Deploy specific requestor contract for the select data responses

## Steps

1. Clone specific airnode tag version
2. Build infrastructure using appropriate node version
3. Generate use-case configurations (OAS, OIS, airnode config, requester contract)
4. Validate/test scripts generation
5. TBD...
