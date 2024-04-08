// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

interface Math {
    function add(uint _num1, uint _num2) external pure returns (uint);

    function mul(uint _num1, uint _num2) external pure returns (uint);
}

contract Quiz14 is Math {
    function add(uint _num1, uint _num2) public pure override returns (uint) {
        return (_num1 + _num2);
    }

    function mul(uint _num1, uint _num2) public pure override returns (uint) {
        return (_num1 + _num2);
    }
}
