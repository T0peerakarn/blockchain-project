// SPDX-License-Identifier: MIT 

pragma solidity >=0.8.0 <0.9.0;

contract DoctorTransfer {

    struct TransferRecord {
        uint256 id;
        bytes16 currentDoctorId;
        bytes16 newDoctorId;
        bytes16 patientId;
        string createdAt;
    }

    uint256 public nextRecordId = 1;
    mapping(uint256 => TransferRecord) public transferRecords;
    mapping(bytes16 => uint256[]) public patientTransfers;

    function getNumberOfRecords() public view returns (uint256) {
        return nextRecordId - 1;
    }

    event TransferRecorded(
        uint256 indexed recordId,
        bytes16 indexed patientId,
        bytes16 currentDoctorId,
        bytes16 newDoctorId,
        string createdAt
    );

    function transferRecordToNewDoctor(
        bytes16 _currentDoctorId,
        bytes16 _newDoctorId,
        bytes16 _patientId,
        string memory _createdAt
    ) public {
        // Create the transfer record
        uint256 recordId = nextRecordId;

        transferRecords[recordId] = TransferRecord({
            id: recordId,
            currentDoctorId: _currentDoctorId,
            newDoctorId: _newDoctorId,
            patientId: _patientId,
            createdAt: _createdAt
        });

        // Store the transfer record under the patient's history
        patientTransfers[_patientId].push(recordId);

        // Emit an event to notify about new transfer record added
        emit TransferRecorded(recordId, _patientId, _currentDoctorId, _newDoctorId, _createdAt);

        // Increment the nextRecordId for the next transfer
        nextRecordId++;
    }

    function getTransferRecord(uint256 _recordId) public view returns (
        uint256 id,
        bytes16 currentDoctorId,
        bytes16 newDoctorId,
        bytes16 patientId,
        string memory createdAt
    ) {
        TransferRecord memory record = transferRecords[_recordId];
        return (
            record.id,
            record.currentDoctorId,
            record.newDoctorId,
            record.patientId,
            record.createdAt
        );
    }

    // Function to get all transfer records for a specific patient
    function getPatientTransfers(bytes16 _patientId) public view returns (uint256[] memory) {
        return patientTransfers[_patientId];
    }


}

