//var HDWalletProvider = require("truffle-hdwallet-provider");
//var infura_apikey = "n1HoAn4TRnGMa7RSDToo";
//var mnemonic_ropsten = "twelve words you can find in metamask/settings/reveal seed words";
//var mnemonic_mainnet = "twelve words you can find in metamask/settings/reveal seed words";

module.exports = {
  compilers: {
    solc: {
      version: "0.5.3"
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
/*    ropsten: {
      provider: new HDWalletProvider(mnemonic_ropsten, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    },
    mainnet: {
      provider: new HDWalletProvider(mnemonic_mainnet, "https://mainnet.infura.io/"+infura_apikey),
      network_id: 1
    }*/
  }
};
