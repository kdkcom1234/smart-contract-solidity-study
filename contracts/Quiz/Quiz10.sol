// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Quiz10 {
    struct Item {
        string name;
        uint price;
    }

    Item[] public items;

    function addItem(string memory name_, uint price_) public {
        items.push(Item(name_, price_));
    }

    function getPriceByName(string memory name_) public view returns (uint) {
        for (uint i = 0; i < items.length; ++i) {
            if (keccak256(bytes(items[i].name)) == keccak256(bytes(name_))) {
                return items[i].price;
            }
        }

        return 0;
    }
}
