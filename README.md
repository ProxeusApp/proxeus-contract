# ProxeusFS Contract
Proxeus File Storage’s smart contract must be able to do the following:

* Register unique hashes
* Anybody should be able to register a Hash
* Should revert on duplicate Hashes
* An additional field (bytes32) to store extra data is available
* An event should be emitted when registration is complete
* Verify whether a hash is stored and if yes, return which address signed it
* Apply a signature to a hash. This hash is marked as "signed" for the calling account.
* An event should be emitted when signing is complete.
* Get signers' addresses for a specific hash

An hash in this case represents a file identifier, the file's content hashed Keccak256; for example 0x464a7b0c7920c1b544165ff5595b8f3f581e4ac47581ecf799bc34dfd1f67f32

## Setup
Open your terminal and change into your project base directory. From here, install all needed dependencies.
```
yarn install
```
This will install all required dependencies in the directory _node_modules_.

## Requirements
The server side scripts requires NodeJS >= 11 to work properly.
Go to [NVM](https://github.com/creationix/nvm) and follow the installation description.

### Use correct NodeJS version for this project
Before installing any dependencies (yarn install), ensure, you are using the right node version.
```
nvm install
nvm use
```

NVM supports both Linux and OS X, but that’s not to say that Windows users have to miss out. There is a second project named [nvm-windows](https://github.com/coreybutler/nvm-windows) which offers Windows users the possibility of easily managing Node environments.

__nvmrc support for windows users is not given, please make sure you are using the right Node version (as defined in .nvmrc) for this project!__

Yarn is required to be installed globally to minimize the risk of dependency issues.
Go to [Yarn](https://yarnpkg.com/en/docs/install) and choose the right installer for your system.

For the Rinkeby and MainNet deployment, you need Geth on your machine.
Follow the [installation instructions](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) for your OS.

Depending on your system the following components might be already available or have to be provided manually:
* [Python](https://www.python.org/downloads/windows/) 2.7 Version only! Windows users should put python into the PATH by cheking the mark in installation process. The windows build tools contain python, so you don't have to install this manually.
* GIT, should already installed on *nix systems. Windows users have to install [GIT](http://git-scm.com/download/win) manually.
* On Windows systems, PowerShell is mandatory
* On Windows systems, windows build tools are required (already installed via package.json)
* make (on Ubuntu this is part of the commonly installed `sudo apt-get install build-essential`)
* On OSX the build tools included in XCode are required

__Every command must be executed from within the projects base directory!__

## Test basic commands and deploy in develop network
To compile, deploy and test the smart contracts, go into the projects root directory and use the task runner accordingly.
### Compile
```
# Compile contract
yarn compile
```
This task will run `truffle compile --all`

### Migrate (deploy)
```
# Migrate contract
yarn migrate
```
This task will run truffle migrate --reset --compile-all --network develop
You don't need running ganache simulator, it will be run automatically

**develop** network settings are used in this task

### Test
```
# Test the contracts
yarn test
```
This task will run `truffle migrate --reset --compile-all --network develop` and then `truffle test --network develop`
**develop** network settings are used in this task

### Check test coverage
```
# Run coverage tests
yarn coverage
```
This task will run `truffle run coverage`
**coverage** network settings are used in this task

## Deploy via Infura (Ropsten, Kovan, Rinkeby, Mainnet)
Create a `.secrets.json` file in the config directory of this project and insert the following:
- your Infura API key
- mnemonic
- RPC URL for each chain

You can use `.secrets.example.json` as example

Double check and make sure that file name is included in the `.gitignore` file list.

__Never commit and push your mnemonics!__
```
{
  "mnemonic": "spot ... keep",
  "infura_key": "...",
  "infura_host": {
    "rinkeby": "https://rinkeby.infura.io/v3/",
    "kovan": "https://kovan.infura.io/v3/",
    "ropsten": "https://ropsten.infura.io/v3/",
    "mainnet": "https://mainnet.infura.io/v3/"
  }
}
```

## Test deployment via local GETH node
### Deploy to Rinkeby via local GETH node
Start local Rinkeby test node in a separate terminal window and wait for the sync is finished.
```
yarn geth-rinkeby
```

Now you can connect to your local Rinkeby Geth console.
```
geth attach ipc://<PATH>/<TO>/Library/Ethereum/rinkeby/geth.ipc

# e.g.
# geth attach ipc://Users/patrice/Library/Ethereum/rinkeby/geth.ipc
```

Upon setup the node does not contain any private keys and associated accounts. Create an account in the web3 Geth console.
```
web3.personal.newAccount()
```
Press [Enter] twice to skip the password (or set one but then later it has to be provided for unlocking the account).

Read the address and send some Rinkeby Ether to pay for deployment and management transaction fees.
```
web3.eth.accounts
```
You can [obtain Rinkeby testnet Ether](https://www.rinkeby.io/#faucet) from the faucet by pasting your address in social media and pasting the link.

Connect to your rinkeby Geth console and unlock the account for deployment (2700 seconds = 45 minutes).
```
> personal.unlockAccount(web3.eth.accounts[0], "", 2700)
```

Ensure, all config files below `./config/` folder is setup properly. The `from` address will be used for the deployment, usually accounts[0].

After exiting the console by `<STRG> + <D>`, simply run `yarn migrate-rinkeby`.
This may take several minutes to finish.

You can monitor the deployment live via [Rinkeby](https://rinkeby.etherscan.io/address/<YOUR_RINKEBY_ADDRESS>)

After all, your smart contract can be found on etherscan:
https://rinkeby.etherscan.io/address/<REAL_CONTRACT_ADDRESS_HERE>

### MainNet deployment via local GETH node
__This is the production deployment, so please doublecheck all properties in the config files below `config` folder!__

For the MainNet deployment, you need a Geth installation on your machine.
Follow the [installation instructions](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) for your OS.

Start local MainNet Ethereum node in a separate terminal window and wait for the sync is finished.
```
geth --syncmode "fast" --rpc
```

Now you can connect to your local MainNet Geth console.
```
geth attach ipc://<PATH>/<TO>/Library/Ethereum/geth.ipc

# e.g.
# geth attach ipc://Users/patrice/Library/Ethereum/geth.ipc
```

While syncing the blockchain, you can monitor the progress by typing `web3.eth.syncing`.
This shows you the highest available block and the current block you are on. If syncing is done, false will be returned. In this case, you can `web3.eth.blockNumber` and compare with the latest BlockNumber on Etherscan.

Upon setup the node does not contain any private keys and associated accounts. Create an account in the web3 Geth console.
```
web3.personal.newAccount("<YOUR_SECURE_PASSWORD>")
```
Enter <YOUR_SECURE_PASSWORD> and Press [Enter] to finish the account creation.

Read the address and send some real Ether to pay for deployment and management transaction fees.
```
web3.eth.accounts
```

Connect to your MainNet Geth console and unlock the account for deployment (240 seconds = 4 minutes).
```
personal.unlockAccount(web3.eth.accounts[0], "<YOUR_SECURE_PASSWORD>", 240)
```

Ensure, all config files below `./config/` folder is setup properly. The `from` address will be used for the deployment, usually accounts[0].

After exiting the console by `<STRG> + <D>`, simply run `yarn migrate-mainnet`.
This may take several minutes to finish.

You can monitor the deployment live via [Etherscan](https://etherscan.io/address/<YOUR_RINKEBY_ADDRESS>)

After all, your smart contract can be found on etherscan:
https://etherscan.io/address/<REAL_CONTRACT_ADDRESS_HERE>

## Validate contract on etherscan
The final step for the Rinkeby / MainNet deployment is the contract verificationSmart contract verification.

This can be done on [Etherscan](https://etherscan.io/address/<REAL_ADDRESS_HERE>) or [Rinkeby Etherscan](https://rinkeby.etherscan.io/address/<REAL_ADDRESS_HERE>).
- Click on the `Contract Creation` link in the `to` column
- Click on the `Contract Code` link

Fill in the following data.
```
Contract Address:       <CONTRACT_ADDRESS>
Contract Name:          <CONTRACT_NAME>
Compiler:               <COMPILER_VERSION>
Optimization:           YES
Solidity Contract Code: <Copy & Paste from ./build/bundle/*>
Constructor Arguments:  <ABI from deployment output>
```
Visit [Solc version number](https://github.com/ethereum/solc-bin/tree/gh-pages/bin) page for determining the correct version number for your project.

- Confirm you are not a robot
- Hit `verify and publish` button

Now your smart contract is verified.

## Linter
Please use a Solidity [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) or [Remix editor](https://remix.ethereum.org/) (see [Tutorial](https://remix-ide.readthedocs.io/fr/stable/create_deploy.html)) to ensure your contracts follows the style and security guides.

__`yarn test` only runs, if no linter issues detected!__

All security rules should be implemented according [ConsenSys Guide for Smart Contracts](https://consensys.github.io/smart-contract-best-practices/recommendations/).

All style guide rules should be implemented according [Solidity Style Guide](http://solidity.readthedocs.io/en/develop/style-guide.html).

For more information look into the [Solhint docs](https://github.com/protofire/solhint).
