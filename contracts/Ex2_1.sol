// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24; // 컴파일러 버전

// contract 컨트랙트명(카멜케이스)
contract Ex2_1 {
    // 행단위
    /* 
    블록단위
    */

    // 자료형 변수명 = 값;
    // uint8: 0 ~ 255
    // int8/16/32/64/128/256
    // uint8/16/32/64/128/256
    uint8 a = 5;

    // bytes1~32, bytes
    bytes1 b1 = "a";
    bytes2 b2 = "ab";
    bytes b3 = "1234567890"; // bytes: 동적크기

    string str = "contract";

    address addr = 0x66B0b1d2930059407DcC30F1A2305435fc37315E;
    address[] admins = [
        0x66B0b1d2930059407DcC30F1A2305435fc37315E,
        0x6827b8f6cc60497d9bf5210d602C0EcaFDF7C405
    ];
}
