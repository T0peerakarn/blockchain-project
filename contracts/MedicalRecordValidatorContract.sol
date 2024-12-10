// SPDX-License-Identifier: MIT 

pragma solidity >=0.8.0 <0.9.0;

contract MedicalRecordValidator {

  struct Record {
    string id;
    string patientId;
    string doctorId;
    string detail;
    string createdAt;
  }

  bytes32[] chain;
  uint chainLength;

  constructor() {
    // add a genesis
    chain.push(bytes32(0));
    chainLength++;
  }

  function getNumberOfRecords() public view returns(
    uint
  ) {
    // -1 offset to ignore the genesis
    return chainLength - 1;
  }

  function addRecord(
    Record calldata record
  ) public {
    // calculate hash value
    bytes32 hash = keccak256(abi.encodePacked(
      record.id,
      record.patientId,
      record.doctorId,
      record.detail,
      record.createdAt,
      chain[chainLength - 1]
    ));

    // append the hash to chain
    chain.push(hash);
    chainLength++;
  }

  function validateRecords(
    Record[] calldata records
  ) public view returns(
    bool
  ) {

    // check if the records length is equal to the chain length
    if (records.length != getNumberOfRecords()) {
      return false;
    }
    
    bytes32 previousHash = chain[0];
    for (uint i = 1 ; i < chainLength ; i++) {
      // calculate hash
      bytes32 calculatedHash = keccak256(abi.encodePacked(
        records[i-1].id,
        records[i-1].patientId,
        records[i-1].doctorId,
        records[i-1].detail,
        records[i-1].createdAt,
        previousHash
      ));

      // check if the calculated hash equal to the chain
      if (calculatedHash != chain[i]) {
        return false;
      }

      previousHash = calculatedHash;
    }

    return true;
  }
}