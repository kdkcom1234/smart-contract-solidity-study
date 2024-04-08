// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex7_2 {
    function runRevert(uint _num) public pure returns (uint) {
        if (_num <= 3) {
            // 에러메시지와 함께 오류 반환, 가스비는 반환됨
            revert("Revert error: should input more than 3");
        }
        return _num;
    }

    function runRequire(uint _num) public pure returns (uint) {
        // require(조건식, 메시지);
        // 조건식이 false이면 오류 반환
        require(_num <= 3, "Revert error: should input more than 3");
        return _num;
    }
}
