// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Quiz18 {
    receive() external payable {}

    function sendEther(address _address) public payable {
        payable(_address).transfer(msg.value);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
