/**
 * Truffle configuration
 */

const cnf               = require('./config/networks.json');
const HDWalletProvider  = require('@truffle/hdwallet-provider');

require('@babel/register');
require('core-js/stable');
require('regenerator-runtime/runtime');

const network   = process.env.NETWORK;
let secrets     = '';
secrets = require('./config/.secrets.json');

const path      = require('path');
const basePath  = process.cwd();

const buildDir          = path.join(basePath, 'build');
const buildDirContracts = path.join(basePath, 'build/contracts');
const srcDir            = path.join(basePath, 'contracts');
const testDir           = path.join(basePath, 'test/contracts');
const migrationsDir     = path.join(basePath, 'migrations/contracts');

module.exports = {
    plugins: [
        'solidity-coverage'
    ],
    mocha: {
        useColors: true // disable bottom for testing dev/troubleshooting
        // reporter: 'eth-gas-reporter',
        // reporterOptions: {
        //     currency: 'CHF',
        //     gasPrice: cnf.networks.develop.gasPrice
        // }
    },
    compilers: {
        solc: {
            version: '0.8.9',
            docker: false,
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },
    networks: {
        develop: {
            host:       cnf.networks.develop.host,
            port:       cnf.networks.develop.port,
            network_id: cnf.networks.develop.chainId, // eslint-disable-line
            gas:        cnf.networks.develop.gas,
            gasPrice:   cnf.networks.develop.gasPrice
        },
        coverage: {
            host:       cnf.networks.coverage.host,
            network_id: cnf.networks.coverage.chainId, // eslint-disable-line
            port:       cnf.networks.coverage.port,
            gas:        cnf.networks.coverage.gas,
            gasPrice:   cnf.networks.coverage.gasPrice
        },
        rinkebyInfura:  getInfuraConfig("rinkeby"),
        ropstenInfura:  getInfuraConfig("ropsten"),
        kovanInfura:  getInfuraConfig("kovan"),
    },
    build_directory:            buildDir,            // eslint-disable-line
    contracts_build_directory:  buildDirContracts,   // eslint-disable-line
    migrations_directory:       migrationsDir,       // eslint-disable-line
    contracts_directory:        srcDir,              // eslint-disable-line
    test_directory:             testDir              // eslint-disable-line
};

function getInfuraConfig(networkName) {
    let infuraProvider = new HDWalletProvider(secrets.mnemonic, secrets.infura_host[networkName] + secrets.infura_key);

    return {
        network_id: cnf.networks[networkName].chainId, // eslint-disable-line
        provider:   infuraProvider,
        from:       infuraProvider.getAddress(),
        gas:        cnf.networks[networkName].gas,
        gasPrice:   cnf.networks[networkName].gasPrice
    };
}
