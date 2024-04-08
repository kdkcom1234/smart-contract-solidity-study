// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex5_3 {
    // 동적 크기
    uint[] public array1;
    // 고정 크기
    string[5] public array2 = ["apple", "banana", "coconut"];

    function getLength1() public view returns (uint) {
        return array1.length;
    }

    function getLength2() public view returns (uint) {
        return array2.length;
    }

    function getArray1(uint _index) public view returns (uint) {
        return array1[_index];
    }

    function getArray2(uint _index) public view returns (string memory) {
        return array2[_index];
    }

    function addArray1(uint _value) public {
        array1.push(_value);
    }

    function changeArray1(uint _index, uint _value) public {
        array1[_index] = _value;
    }

    function changeArray2(uint _index, string memory _value) public {
        array2[_index] = _value;
    }

    function popArray1() public {
        array1.pop();
    }

    function deleteArray(uint _index) public {
        // 해당 인덱스의 값은 기본값으로 변경됨
        delete array2[_index];
    }
}
