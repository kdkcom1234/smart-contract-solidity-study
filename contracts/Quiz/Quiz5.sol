// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz5 {
    function fun1(uint a) public pure returns (bool) {
        if (a >= 11) {
            return true;
        } else {
            return false;
        }
    }
}
