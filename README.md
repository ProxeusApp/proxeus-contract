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

## Requirements
 NodeJS 8.*

### Setup
    npm install

### Run Tests
    ganache-cli
    npm run test
