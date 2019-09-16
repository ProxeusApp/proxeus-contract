const truffleAssert = require('truffle-assertions');

const ProxeusFS = artifacts.require('../contracts/ProxeusFS.sol');

contract('ProxeusFS', async accounts => {
  let contract;

  const ownerAccount = accounts[1];
  const userAccount = accounts[2];

  before(async () => {
    contract = await ProxeusFS.new(ownerAccount);
  });

  it('should registerFile correctly', async () => {
    const hash = '0x46696f6e61000000000000000000000000000000000000000000000000000000';
    //register & check event
    const tx = await contract.registerFile(hash, '0x00', {from: userAccount});
    truffleAssert.eventEmitted(tx, 'UpdatedEvent', (ev) => {
      return ev.hash === hash;
    });
  });

  it('should fail on verifying a non existing hash', async () => {
    const result = await contract.verifyFile.call('0xabe96f6e61000000000000000000000000000000000000000000000000000000');

    assert.equal(false, result['exists'])
  });

  it('should revert on trying to sign non existing file', async () => {
    await truffleAssert.reverts(contract.signFile('0x001'), "file does not exist")
  });

  it('should fail on getting signers from non-existing file', async() => {
    await truffleAssert.reverts(contract.getFileSigners('0x001'), "file does not exist")
  })
});
