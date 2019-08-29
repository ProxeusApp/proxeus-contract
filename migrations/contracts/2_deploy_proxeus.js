/**
 * Migration
 */
const ProxeusFS = artifacts.require('./ProxeusFS.sol');
const XesMainToken  = artifacts.require('./XesMainToken.sol');

module.exports = function (deployer, network, accounts) { // eslint-disable-line
    const OWNER = accounts[1];

    deployer.deploy(ProxeusFS, OWNER).then(() => {
        return ProxeusFS.deployed().then((proxeusFSInstance) => {
            console.log('[ ProxeusFSInstance.address ]:' + proxeusFSInstance.address);
            return deployer.deploy(XesMainToken).then(() => {
                return XesMainToken.deployed().then((tokenInstance) => {
                    console.log('[ XesMainTokenInstance.address ]: ' + tokenInstance.address);
                });
            });
        });
    });
};
