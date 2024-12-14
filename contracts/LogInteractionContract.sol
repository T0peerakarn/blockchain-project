pragma solidity >=0.8.0 <0.9.0;

contract PatientDataInteraction {

    struct InteractionRecord {
        uint256 id;
        bytes16 doctorId;
        bytes16 patientId;
        string action;
        string timestamp;
    }

    mapping(uint256 => InteractionRecord) public interactions;
    uint256[] public interactionIds;

    uint256 private nextInteractionId;

    function getNumberOfInteractions() public view returns (uint256) {
        return interactionIds.length;
    }

    event InteractionLogged(
        uint256 interactionId,
        bytes16 patientId,
        bytes16 doctorId,
        string action,
        string timestamp
    );

    constructor() {
        nextInteractionId = 1; // Start interaction IDs from 1
    }

    function logInteraction(bytes16 patientId, bytes16 doctorId, string memory action, string memory timestamp) public {
        require(keccak256(bytes(action)) == keccak256("read") ||
        keccak256(bytes(action)) == keccak256("write") ||
        keccak256(bytes(action)) == keccak256("update"),
            "Actions must be read, write, or update");

        InteractionRecord memory newRecord = InteractionRecord({
            id: nextInteractionId,
            patientId: patientId,
            doctorId: doctorId,
            action: action,
            timestamp: timestamp
        });

        // Create new record and emit event
        interactions[nextInteractionId] = newRecord;
        interactionIds.push(nextInteractionId);
        emit InteractionLogged(nextInteractionId, patientId, doctorId, action, timestamp);
        nextInteractionId++;
    }

    function getInteractionById(uint256 interactionId) public view returns (InteractionRecord memory) {
        require(interactions[interactionId].id != 0, "Interaction not found.");
        return interactions[interactionId];
    }


}