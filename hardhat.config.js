require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    viaIR: true,
  },
};
