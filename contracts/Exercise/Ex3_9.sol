// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex3_9 {
    uint public a = 3;

    function myFun(uint b) public returns (uint) {
        a = b;

        return (a);
    }
}
