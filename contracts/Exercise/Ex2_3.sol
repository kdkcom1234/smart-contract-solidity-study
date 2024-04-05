// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // 컴파일러 버전

contract Ex2_3 {
    int a;
    uint b;
    bool c;
    bytes d;
    string e;
    address f;

    // 기본값 확인
    // view: storage의 state만 읽음
    function assignment()
        public
        view
        returns (int, uint, bool, bytes memory, string memory, address)
    {
        return (a, b, c, d, e, f);
    }
}
