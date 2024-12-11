const {ethers} = require("hardhat");
const {expect} = require("chai");
const crypto = require('crypto');

describe("MedicalRecordValidatorContract", () => {
    let mrv;

    const uuidToHex = (uuid) => {
        const hex = uuid.replace(/-/g, ''); // Remove dashes from the UUID
        return '0x' + hex.slice(0, 32);
    };

    const recordsConsentData = [
        {
            "title": "Knee Surgery",
            "consent": true,
            "created_at": "2024-12-11 17:06:57.160274+00"
        }
    ]
    const records = [
        {
            id: "1",
            patientId: uuidToHex("68f9bc2d-393b-43c7-972a-6f0752a6a6f2"),
            doctorId: uuidToHex("9daa14cd-70d8-4282-9e82-5e7249d350f8"),
            detail: "Headache",
            createdAt: "01/01/2025, 12:00",
            consentDataHash: ethers.constants.HashZero,
        },
        {
            id: "2",
            patientId: uuidToHex("3b0d63e8-c6b7-4de9-9db2-c04a87897225"),
            doctorId: uuidToHex("9daa14cd-70d8-4282-9e82-5e7249d350f8"),
            detail: "Covid",
            createdAt: "01/01/2025, 15:00",
            consentDataHash: '0x' + crypto.createHash("sha256").update(JSON.stringify(recordsConsentData)).digest("hex"),
            // We will hash the consent data on the backend then store it in the blockchain instead
        },
    ];
    const anotherRecords = [
        {
            id: "3",
            patientId: uuidToHex("78f9bc2d-393b-43c7-972a-6f0752a6a6f2"),
            doctorId: uuidToHex("92aa14cd-70d8-4282-9e82-5e7249d350f8"),
            detail: "Follow-up",
            createdAt: "01/01/2025, 14:00",
            consentDataHash: ethers.constants.HashZero,
        },
        {
            id: "4",
            patientId: uuidToHex("18f9bc2d-393b-43c7-972a-6f0752a6a6f2"),
            doctorId: uuidToHex("91aa14cd-70d8-4282-9e82-5e7249d350f8"),
            detail: "Influenza",
            createdAt: "02/01/2025, 09:00",
            consentDataHash: ethers.constants.HashZero,
        },
    ];

    beforeEach(async () => {
        const MedicalRecordValidatorContract = await ethers.getContractFactory(
            "MedicalRecordValidator"
        );

        mrv = await MedicalRecordValidatorContract.deploy();
        await mrv.deployed();

        for (const record of records) {
            await mrv.addRecord(record);
        }
    });

    it("record should be added", async () => {
        expect(await mrv.getNumberOfRecords()).to.equal(records.length);
    });

    it("should return true when the chain is valid", async () => {
        expect(await mrv.validateRecords(records)).to.equal(true);
    });

    it("should return false when the chain is invalid", async () => {
        // different length
        expect(await mrv.validateRecords(records.slice(1))).to.equal(false);

        // different data
        expect(await mrv.validateRecords(anotherRecords)).to.equal(false);
    });
});
