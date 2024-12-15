// SPDX-License-Identifier: MIT 

pragma solidity >=0.8.0 <0.9.0;

contract HelloWorld {
  function greeting(string memory name) public pure returns(string memory) {
    return string.concat("Hello ", name, "!");
  }
}