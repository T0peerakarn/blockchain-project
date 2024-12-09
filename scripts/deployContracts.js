const fs = require("fs");
const path = require("path");

const main = async () => {
  const HelloWorldContract = await ethers.getContractFactory("HelloWorld");
  const helloWorldContract = await HelloWorldContract.deploy();

  console.log(`HelloWorldContract deployed to: ${helloWorldContract.address}`);

  const contractsDir = path.join(__dirname, "../src/lib/contracts/HelloWorld");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(contractsDir, "contractAddress.json"),
    JSON.stringify({ address: helloWorldContract.address }, null, 2)
  );
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
