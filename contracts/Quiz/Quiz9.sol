// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz9 {
    uint[] public numbers;

    function addNumber(uint num_) public {
        numbers.push(num_);
    }

    function getNumber(uint index_) public view returns (uint) {
        return (numbers[index_]);
    }

    function deleteNumber() public {
        numbers.pop();
    }
}
