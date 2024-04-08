// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz8 {
    mapping(address => string) public names;

    function addName(address key_, string memory name_) public {
        names[key_] = name_;
    }

    function getName(address key_) public view returns (string memory) {
        return (names[key_]);
    }

    function deleteName(address key_) public {
        delete (names[key_]);
    }
}
