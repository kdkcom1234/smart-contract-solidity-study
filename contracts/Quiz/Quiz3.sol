// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz3 {
    uint public num = 10;

    function doubledNum() public returns (uint) {
        num = num * 2;

        return (num);
    }
}
