const truffleAssert = require('truffle-assertions');

const ProxeusFS = artifacts.require('../contracts/ProxeusFS.sol');

contract('ProxeusFS end-to-end', async accounts => {
  let contract;

  const creatorAccount = accounts[0];
  const ownerAccount = accounts[1];
  const userAccount = accounts[2];

  before(async () => {
    contract = await ProxeusFS.new(ownerAccount);
  });

  it("should verify a registered hash correctly", async () => {
    const hash = '0x47196f6e61000000000000000000000000000000000000000000000000000000';
    //register & check event
    const tx = await contract.registerFile(hash, '0x00', {from: userAccount});
    truffleAssert.eventEmitted(tx, 'UpdatedEvent', (ev) => {
      return ev.hash === hash;
    });

    //check file registered
    const result = await contract.verifyFile.call(hash);

    assert.equal(result[0],true);
    assert.equal(result[1],userAccount);
  });

  it("should fail for duplicate", async () => {
    const hash = '0x46696f6e62000000000000000000000000000000000000000000000000000000';
    await contract.registerFile(hash, '0x00', {from: userAccount});

    //try registering again & fail
    await truffleAssert.reverts(contract.registerFile(hash, '0x00', {from: userAccount}),"file already exists");
  });

  it('should sign file correctly', async () => {
    const hash = '0x3333334560000000000000000000000000000000000000000000000000000000';
    await contract.registerFile(hash, "0x0");

    const tx = await contract.signFile(hash);

    await truffleAssert.eventEmitted(tx, 'FileSignedEvent', (ev) => {
      return ev.hash === hash;
    });
  });

  it('should revert on file already signed', async() => {
    const hash = "0x0123334560000000000000000000000000000000000000000000000000000000";
    await contract.registerFile(hash, "0x0");

    await contract.signFile(hash, {from: userAccount});

    await truffleAssert.reverts(contract.signFile(hash, {from: userAccount}),"file already signed by sender");
  });

  it('should return correct signers', async() => {
    const hash = "0x1233334560000000000000000000000000000000000000000000000000000000";
    const anotherHash = "0x2222234560000000000000000000000000000000000000000000000000000000"
    await contract.registerFile(hash, "0x0");
    await contract.signFile(hash, {from: userAccount});
    await contract.signFile(hash, {from: ownerAccount});
    await contract.registerFile(anotherHash, "0x0"); // Register and sign another random file, then make sure the signer isn't in the list
    await contract.signFile(anotherHash, {from: creatorAccount});

    const signers = await contract.getFileSigners(hash);

    assert.equal(2, signers.length)
    assert.equal(userAccount, signers[0])
    assert.equal(ownerAccount, signers[1])
  });

  it('getFileSigners should return an empty array with existing file but no signers', async() => {
    const hash = "0x4313334560000000000000000000000000000000000000000000000000000000";
    await contract.registerFile(hash, "0x0");

    const signers = await contract.getFileSigners(hash);

    assert.equal(0, signers.length)
  })
});
