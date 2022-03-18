module.exports = {
    port: 7545,
    copyNodeModules: false,
    // compileCommand: '../node_modules/.bin/truffle compile',
    testrpcOptions: '--port 7545 --defaultBalanceEther 1000000', //-e or --defaultBalanceEther: Amount of ether to assign each test account. Default is 100.
    // testCommand: '../node_modules/.bin/truffle test --network coverage',
    norpc: false
};

