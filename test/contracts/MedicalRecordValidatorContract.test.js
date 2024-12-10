const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MedicalRecordValidatorContract", () => {
  let mrv;
  const records = [
    {
      id: "1",
      patientId: "P001",
      doctorId: "D001",
      detail: "Headache",
      createdAt: "01/01/2025, 12:00",
    },
    {
      id: "2",
      patientId: "P002",
      doctorId: "D001",
      detail: "Covid",
      createdAt: "01/01/2025, 15:00",
    },
  ];
  const anotherRecords = [
    {
      id: "3",
      patientId: "P001",
      doctorId: "D002",
      detail: "Follow-up",
      createdAt: "01/01/2025, 14:00",
    },
    {
      id: "4",
      patientId: "P003",
      doctorId: "D002",
      detail: "Influenza",
      createdAt: "02/01/2025, 09:00",
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
