const sha3      = require('web3-utils').sha3;
const fs        = require('fs');
const assert    = require('assert');

// Valid hashes using Keccak-256

const contracts = {
    Crowdsale       : fs.readFileSync('node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol'),
    ERC20Mintable   : fs.readFileSync('node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol'),
    ERC20Pausable   : fs.readFileSync('node_modules/@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol'),
    Pausable        : fs.readFileSync('node_modules/@openzeppelin/contracts/lifecycle/Pausable.sol'),
    Ownable         : fs.readFileSync('node_modules/@openzeppelin/contracts/ownership/Ownable.sol'),
    ERC20           : fs.readFileSync('node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol'),
    IERC20          : fs.readFileSync('node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol'),
    SafeMath        : fs.readFileSync('node_modules/@openzeppelin/contracts/math/SafeMath.sol'),
    TokenVesting    : fs.readFileSync('node_modules/@openzeppelin/contracts/drafts/TokenVesting.sol')
};

const hashes = {
    Crowdsale     : '0xe612eb8a3023c1a4f4d7e2d0aaf7f19c25e9d772c46a6e95790ddb42ba7baa99',
    ERC20Mintable : '0xa2b957cf89692c504962afb7506999155f83385373f808243246cd5879de5940',
    ERC20Pausable : '0xd5ae72078a1c90af870e1b9b86b0fc05eb14b4034e417bc66d151d3eb4d342ca',
    Pausable      : '0xd3e5a49edfb74654d122962cc60b917d1c60461e669a7262fd7aba201fac1260',
    Ownable       : '0x6fb9d7889769d7cc161225f9ef7a90e468ba9788b253816f8d8b6894d3472c24',
    ERC20         : '0xb15af804e2bc97db51e4e103f13de9fe13f87e6b835d7a88c897966c0e58506e',
    IERC20        : '0xe5bb0f57cff3e299f360052ba50f1ea0fff046df2be070b6943e0e3c3fdad8a9',
    SafeMath      : '0x640b6dee7a4b830bdfd52b5031a07fc2b12209f5b2e29e5d364a7d37f69d8076',
    TokenVesting  : '0x185d46b6efdd22004d93fdba8e230fbd2ae57c2d2a51ab0e4e62376733023b94'
};

Object.keys(contracts).forEach((key) => {
    try {
        assert.equal(sha3(contracts[key]), hashes[key], 'Hash mismatch: ' + key);
    } catch (error) {
        console.log(error.message + ' - Zeppelin Framework');
        console.log(key + ': ' + sha3(contracts[key]));
    }
});
