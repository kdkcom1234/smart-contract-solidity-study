// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz16 {
    function requireFunction(uint _num) public pure returns (uint) {
        require(_num <= 5, "_num must not be more than 5");
        return _num;
    }
}
