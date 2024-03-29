// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// testnet address
// 0xB3026fA7BDBE17e1F56053b68Bc074eFDe159cC7

contract MyToken is ERC20 {
    address payable public owner;

    constructor(address minter) ERC20("My Token", "MTK") {
        owner = payable(msg.sender);
        // _mint(토큰보유자, 최대유통량)
        _mint(minter, 100000000 * 10 ** decimals());
    }
}
