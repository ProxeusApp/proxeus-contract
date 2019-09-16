pragma solidity 0.5.3;

contract ProxeusFS{ // solhint-disable-line
  struct File {
    address issuer;
    bytes32 data;
    bool exists;
    mapping(address => bool) signers;
    mapping (uint => address) signerIndex;
    uint signersCount;
  }

  mapping(bytes32 => File) public files;

  address internal owner;

  event UpdatedEvent(bytes32 indexed hash);
  event FileSignedEvent(bytes32 indexed hash, address indexed signer);

  modifier fileMustExist(bytes32 _hash) {
    if(!files[_hash].exists) revert("file does not exist");// solhint-disable-line
    _;
  }

  constructor(address _owner) public {
    owner = _owner;
  }

  function registerFile(bytes32 _hash, bytes32 _data) external {
    if(files[_hash].exists) revert("file already exists"); // solhint-disable-line

    files[_hash].issuer = msg.sender;
    files[_hash].data = _data;
    files[_hash].exists = true;
    files[_hash].signersCount = 0;

    emit UpdatedEvent(_hash);
  }

  function verifyFile(bytes32 _hash) external view returns (bool exists, address issuer) {
    return (files[_hash].exists,files[_hash].issuer);
  }

  function signFile(bytes32 _hash) fileMustExist(_hash) external { // solhint-disable-line
    if(files[_hash].signers[msg.sender]) revert("file already signed by sender"); // solhint-disable-line

    files[_hash].signerIndex[files[_hash].signersCount] = msg.sender;
    files[_hash].signersCount++;
    files[_hash].signers[msg.sender] = true;

    emit FileSignedEvent(_hash, msg.sender);
  }

  function getFileSigners(bytes32 _hash) external view fileMustExist(_hash) returns(address[] memory) {
    //map to array
    address[] memory signerAddresses = new address[](files[_hash].signersCount);
    for (uint i = 0; i < files[_hash].signersCount; i++){ // solhint-disable-line
      address signerAddress = files[_hash].signerIndex[i];
      if (files[_hash].signers[signerAddress]) {  //if has signer has been set to false do not add
        signerAddresses[i] = signerAddress;
      }
    }

    return signerAddresses;
  }
}
