// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Student {
    // virtual(오버라이딩이 가능한 함수)
    function university() public pure virtual returns (string memory) {
        return "The University of Solidity";
    }
}

contract Quiz13 is Student {
    // virtual(오버라이딩 함수)
    function university() public pure override returns (string memory) {
        return "The University of Blockchain";
    }
}
