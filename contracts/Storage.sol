// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SimpleStorage {
  struct Entry {
    string id;
    string timestamp;
    string dataHash;
  }

  // uint data;
  Entry[] public hashDB;
  
  // function updateData(uint _data) external {
  //   data = _data;
  // }

  // function readData() external view returns(uint) {
  //   return data;
  // }

  function recordHash(string calldata _id,
                      string calldata _timestamp,
                      string calldata _newHash) public {
    // Reading memory x;
    // x.sensor = msg.sender;
    // x.temp = _data;
    // x.timestamp = block.timestamp;
    // readings.push(x);
    Entry memory newEntry = Entry({
        id: _id,
        timestamp: _timestamp,
        dataHash: _newHash
    });

    hashDB.push(newEntry);
  }

//   function getReadings() public view returns(string[] memory) {
//     return ipfsHashes;
//   }
    function viewDB() public view returns (Entry[] memory db){
        return hashDB;
    }
}
