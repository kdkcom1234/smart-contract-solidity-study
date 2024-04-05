// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz4 {
    function returnTwoValues() public pure returns (string memory, uint) {
        return ("Hello Solidity", 5);
    }
}
