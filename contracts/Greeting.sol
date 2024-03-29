// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Greeting {
    uint256 public count;
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function incrementCounter() public {
        count += 1;
    }

    function greet(string memory name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello, ", name));
    }
}
