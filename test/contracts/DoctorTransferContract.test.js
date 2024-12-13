const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("DoctorTransferContract", () => {

    let dtr;

    const uuidToHex = (uuid) => {
        const hex = uuid.replace(/-/g, ''); // Remove dashes from the UUID
        return '0x' + hex.slice(0, 32);
    };

    const transferRecord = [
        {
            currentDoctorId: uuidToHex("9daa14cd-70d8-4282-9e82-5e7249d350f8"),
            newDoctorId: uuidToHex("92aa14cd-70d8-4282-9e82-5e7249d350f8"),
            patientId: uuidToHex("68f9bc2d-393b-43c7-972a-6f0752a6a6f2"),
            createdAt: "01/01/2025, 12:00",
        },
        {
            currentDoctorId: uuidToHex("91aa14cd-70d8-4282-9e82-5e7249d350f8"),
            newDoctorId: uuidToHex("92da14cd-70d8-4282-9e82-5e7249d350f8"),
            patientId: uuidToHex("5b0d63e8-c6b7-4de9-9db2-c04a87897225"),
            createdAt: "01/01/2024, 15:00",
        },
    ]

    beforeEach(async function () {

        const DoctorTransferContract = await ethers.getContractFactory("DoctorTransfer");

        // Deploy the contract before each test
        dtr = await DoctorTransferContract.deploy();
        await dtr.deployed();

        for (const record of transferRecord) {
            await dtr.transferRecordToNewDoctor(record.currentDoctorId, record.newDoctorId, record.patientId, record.createdAt);
        }

    });

    it("record a transfer and emit an event", async function () {
        const currentDoctorId = uuidToHex("9daa14cd-70d8-4282-9e82-5e7249d350f8");
        const newDoctorId = uuidToHex("92aa14cd-70d8-4282-9e82-5e7249d350f8");
        const patientId = uuidToHex("68f9bc2d-393b-43c7-972a-6f0752a6a6f2");
        const createdAt = "2024-12-11 17:06:57.160274+00";

        // Expect the TransferRecorded event to be emitted when we record a transfer
        await expect(
            dtr.transferRecordToNewDoctor(currentDoctorId, newDoctorId, patientId, createdAt)
        ).to.emit(dtr, "TransferRecorded")
            .withArgs(
                transferRecord.length + 1, // because the transferRecord is already added and then we add one more so + 1
                patientId,
                currentDoctorId,
                newDoctorId,
                createdAt
            );

    });

    it("should return the correct number of records", async function () {
        const numberOfRecords = await dtr.getNumberOfRecords();
        expect(numberOfRecords, `Expected 1, but got ${numberOfRecords}`).to.equal(transferRecord.length);
    });

    it("should increment the record ID for each new transfer", async function () {
        const currentDoctorId1 = uuidToHex("2daa14cd-70d8-4282-9e82-5e7249d350f8");
        const newDoctorId1 = uuidToHex("32aa14cd-70d8-4282-9e82-5e7249d350f8");
        const patientId1 = uuidToHex("78f9bc2d-393b-43c7-972a-6f0752a6a6f2");
        const createdAt1 = "2024-11-11 11:06:57.160274+00";

        const currentDoctorId2 = uuidToHex("22aa14cd-70d8-4212-9e82-5e7249d350f8");
        const newDoctorId2 = uuidToHex("33aa14cd-70d8-4212-9e82-5e7249d350f8");
        const patientId2 = uuidToHex("44f9bc2d-313b-43c7-972a-6f0752a6a6f2");
        const createdAt2 = "2024-11-11 11:06:57.160274+00";

        // Record the first transfer
        await dtr.transferRecordToNewDoctor(currentDoctorId1, newDoctorId1, patientId1, createdAt1);

        // Record the second transfer
        await dtr.transferRecordToNewDoctor(currentDoctorId2, newDoctorId2, patientId2, createdAt2);

        // Fetch the transfer records and check that they have the correct IDs
        const transferRecord1 = await dtr.getTransferRecord(3);
        const transferRecord2 = await dtr.getTransferRecord(4);

        expect(transferRecord1.id).to.equal(3);
        expect(transferRecord2.id).to.equal(4);
    });

    it("should return the correct transfer details when request by id", async function () {
        const currentDoctorId = uuidToHex("2daa14cd-70d8-4282-9e82-5e7249d350f8");
        const newDoctorId = uuidToHex("32aa14cd-70d8-4282-9e82-5e7249d350f8");
        const patientId = uuidToHex("78f9bc2d-393b-43c7-972a-6f0752a6a6f2");
        const createdAt = "2024-11-11 11:06:57.160274+00";

        // Record a transfer
        await dtr.transferRecordToNewDoctor(currentDoctorId, newDoctorId, patientId, createdAt);

        // Fetch the record details using the record ID
        const transferRecord = await dtr.getTransferRecord(3);

        expect(transferRecord.id).to.equal(3);
        expect(transferRecord.currentDoctorId).to.equal(currentDoctorId);
        expect(transferRecord.newDoctorId).to.equal(newDoctorId);
        expect(transferRecord.patientId).to.equal(patientId);
        expect(transferRecord.createdAt).to.equal(createdAt);
    });

    it("should return all ids of records for the same patient", async function () {
        const doctor1 = uuidToHex("11aa14cd-70d8-4282-9e82-5e7249d350f8");
        const doctor2 = uuidToHex("22aa14cd-70d8-4282-9e82-5e7249d350f8");
        const doctor3 = uuidToHex("33aa14cd-70d8-4282-9e82-5e7249d350f8");
        const patientId = uuidToHex("5559bc2d-393b-43c7-972a-6f0752a6a6f2");
        const createdAt1 = "2024-11-11 11:06:57.160274+00";
        const createdAt2 = "2024-12-12 12:06:57.160274+00";


        // record transfers from doc1 -> doc2 and doc2 -> doc3
        await dtr.transferRecordToNewDoctor(doctor1, doctor2, patientId, createdAt1);
        await dtr.transferRecordToNewDoctor(doctor2, doctor3, patientId, createdAt2);

        // Get the list of transfers for the patient
        const patientTransfers = await dtr.getPatientTransfers(patientId);

        expect(patientTransfers.length).to.equal(2); // Two transfers for this patient
        expect(patientTransfers[0]).to.equal(3); // First transfer
        expect(patientTransfers[1]).to.equal(4); // Second transfer
        // 3 and 4 because transferRecord already took id 1 and 2.
        // patientTransfers returns the record IDs of the transfers not patient
    });


});

