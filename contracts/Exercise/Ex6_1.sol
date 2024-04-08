// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex6_1 {
    event MyFunction(uint result, string name);

    function add(uint _a, uint _b) public {
        uint total = _a + _b;
        emit MyFunction(total, "add");
    }

    function mul(uint _a, uint _b) public {
        uint total = _a + _b;
        emit MyFunction(total, "mul");
    }
}
