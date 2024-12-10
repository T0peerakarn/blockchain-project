const fs = require("fs");
const path = require("path");

const main = async () => {
  const contracts = ["HelloWorld", "MedicalRecordValidator"];

  for (const contractName of contracts) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();

    console.log(`${contractName} deployed to: ${contract.address}`);

    const contractsDir = path.join(
      __dirname,
      `../src/lib/contracts/${contractName}`
    );

    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(contractsDir, "contractAddress.json"),
      JSON.stringify({ address: contract.address }, null, 2)
    );
  }
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
