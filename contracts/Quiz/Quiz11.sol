// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz11 {
    event Info(uint num);

    uint public num;

    constructor(uint _num) {
        num = _num;
    }

    function changeNum(uint _num) public {
        num = _num;
        emit Info(num);
    }
}
