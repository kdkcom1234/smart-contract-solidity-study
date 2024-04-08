// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz15 {
    function revertFunction(uint _num) public pure returns (uint) {
        if (_num >= 6) {
            revert("_num must not be more than 5");
        }

        return _num;
    }
}
