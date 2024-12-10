const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("HelloWorldContract", () => {
  let name = "Alice";

  const greetingMessage = (name) => `Hello ${name}!`;

  it("should return a greeting message with name", async () => {
    const HelloWorldContract = await ethers.getContractFactory("HelloWorld");

    const helloWorldContract = await HelloWorldContract.deploy();
    await helloWorldContract.deployed();

    expect(await helloWorldContract.greeting(name)).to.equal(
      greetingMessage(name)
    );
  });
});
