// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex5_1 {
    // node.js에서 조회
    // await contract.balances(키);
    // await contract.balances("0x0D9Def42463d4f17a90Aaf9D0076a3c4365059f8");
    mapping(address => uint) public balances;

    function addMapping(address _key, uint _amount) public {
        balances[_key] = _amount;
    }

    function getMapping(address _key) public view returns (uint) {
        return balances[_key];
    }

    function deleteMapping1(address _key) public {
        // 맵핑을 삭제하면, 기본값으로 조회됨
        delete (balances[_key]);
    }

    function deleteMapping2(address _key) public {
        // 기본값으로
        balances[_key] = 0;
    }
}
