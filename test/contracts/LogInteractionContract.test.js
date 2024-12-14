const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("LogInteraction", () => {

    let log;

    const uuidToHex = (uuid) => {
        const hex = uuid.replace(/-/g, ''); // Remove dashes from the UUID
        return '0x' + hex.slice(0, 32);
    };

    const interactionRecords = [
        {
            patientId: uuidToHex("68f9bc2d-393b-43c7-972a-6f0752a6a6f2"),
            doctorId: uuidToHex("9daa14cd-70d8-4282-9e82-5e7249d350f8"),
            action: "read",
            createdAt: "2024-12-11 17:06:57.160274+00",
        },
        {
            patientId: uuidToHex("5b0d63e8-c6b7-4de9-9db2-c04a87897225"),
            doctorId: uuidToHex("91aa14cd-70d8-4282-9e82-5e7249d350f8"),
            action: "write",
            createdAt: "2024-11-11 17:06:57.160274+00",
        },
    ]

    beforeEach(async function () {

        const LogInteractionContractFactory = await ethers.getContractFactory("PatientDataInteraction");

        // Deploy the contract before each test
        log = await LogInteractionContractFactory.deploy();
        await log.deployed();

    });

    it("should log an interaction when doctor read a patient's data", async function () {

        await log.logInteraction(interactionRecords[0].patientId, interactionRecords[0].doctorId, interactionRecords[0].action, interactionRecords[0].createdAt);
        const interaction = await log.getInteractionById(1);

        expect(interaction.id).to.equal(1);
        expect(interaction.patientId).to.equal(interactionRecords[0].patientId);
        expect(interaction.doctorId).to.equal(interactionRecords[0].doctorId);
        expect(interaction.action).to.equal(interactionRecords[0].action);
        expect(interaction.timestamp).to.equal(interactionRecords[0].createdAt);
    });

    it("should emit InteractionLogged event when logging an interaction", async function () {
        await expect(log.logInteraction(interactionRecords[0].patientId, interactionRecords[0].doctorId, interactionRecords[0].action, interactionRecords[0].createdAt))
            .to.emit(log, "InteractionLogged")
            .withArgs(1, interactionRecords[0].patientId, interactionRecords[0].doctorId, interactionRecords[0].action, interactionRecords[0].createdAt);
    });

    it("should return all interaction correctly", async function () {
        await log.logInteraction(interactionRecords[0].patientId, interactionRecords[0].doctorId, interactionRecords[0].action, interactionRecords[0].createdAt);
        await log.logInteraction(interactionRecords[1].patientId, interactionRecords[1].doctorId, interactionRecords[1].action, interactionRecords[1].createdAt);

        const interactions = await log.getNumberOfInteractions();
        expect(interactions).to.equal(2);
    });

    it("should return the correct details when get by id", async function () {
        await log.logInteraction(interactionRecords[0].patientId, interactionRecords[0].doctorId, interactionRecords[0].action, interactionRecords[0].createdAt);
        await log.logInteraction(interactionRecords[1].patientId, interactionRecords[1].doctorId, interactionRecords[1].action, interactionRecords[1].createdAt);

        const interaction = await log.getInteractionById(2);

        expect(interaction.id).to.equal(2);
        expect(interaction.patientId).to.equal(interactionRecords[1].patientId);
        expect(interaction.doctorId).to.equal(interactionRecords[1].doctorId);
        expect(interaction.action).to.equal(interactionRecords[1].action);
        expect(interaction.timestamp).to.equal(interactionRecords[1].createdAt);
    });

});