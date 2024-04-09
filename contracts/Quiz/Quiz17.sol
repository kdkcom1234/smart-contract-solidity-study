// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz17 {
    function sendEther(address _address) public payable {
        (bool success, ) = _address.call{value: msg.value}("");
        require(success, "Failed");
    }
}
