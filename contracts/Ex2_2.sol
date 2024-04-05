// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // 컴파일러 버전

contract Ex2_2 {
    string public text = "Hello";

    function assignment() public returns (string memory) {
        text = "Hello Solidity";
        return (text);
    }
}
