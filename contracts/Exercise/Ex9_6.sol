// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex9_6 {
    event Obtain(address from, uint amount);

    // 컨트랙트 배포와 동시에 이더를 보낼 수 있음
    constructor() payable {}

    // 컨트랙트로  이더를 받을 때 호출 됨
    receive() external payable {
        emit Obtain(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function sendEther() public payable {
        payable(address(this)).transfer(msg.value);
    }
}
