// SPDX-License-Identifier: MIT 

pragma solidity >=0.8.0 <0.9.0;

contract MedicalRecordValidator {

    struct Record {
        string id;
        bytes16 patientId;
        bytes16 doctorId;
        string detail;
        string createdAt;
        bytes32 consentDataHash;
    }

    bytes32[] chain;
    uint chainLength;

    constructor() {
        // add a genesis
        chain.push(bytes32(0));
        chainLength++;
    }

    function getNumberOfRecords() public view returns (
        uint
    ) {
        // -1 offset to ignore the genesis
        return chainLength - 1;
    }

    function addRecord(
        Record calldata record
    ) public {
        // calculate hash value
        bytes32 hash = getRecordHash(record);

        // append the hash to chain
        chain.push(hash);
        chainLength++;
    }

    function getRecordHash(
        Record calldata record
    ) internal view returns (
        bytes32
    ) {
        return keccak256(abi.encodePacked(
            record.id,
            record.patientId,
            record.doctorId,
            record.detail,
            record.createdAt,
            record.consentDataHash,
            chain[chainLength - 1]
        ));
    }

    function validateRecords(
        Record[] calldata records
    ) public view returns (
        bool
    ) {

        // check if the records length is equal to the chain length
        if (records.length != getNumberOfRecords()) {
            return false;
        }

        bytes32 previousHash = chain[0];
        for (uint i = 1; i < chainLength; i++) {
            // calculate hash
            bytes32 calculatedHash = getPreviousRecordHash(previousHash, records[i - 1]);

            // check if the calculated hash equal to the chain
            if (calculatedHash != chain[i]) {
                return false;
            }

            previousHash = calculatedHash;
        }

        return true;
    }

    function getPreviousRecordHash(
        bytes32 previousHash,
        Record calldata record
    ) internal view returns (
        bytes32
    ) {
        return keccak256(abi.encodePacked(
            record.id,
            record.patientId,
            record.doctorId,
            record.detail,
            record.createdAt,
            record.consentDataHash,
            previousHash
        ));
    }
}