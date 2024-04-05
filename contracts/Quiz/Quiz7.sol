// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz7 {
    function fun1() public pure returns (uint) {
        uint result = 0;
        uint i = 10;

        while (true) {
            if (i == 5) {
                break;
            }

            result += i;
            --i;
        }

        return result;
    }
}
