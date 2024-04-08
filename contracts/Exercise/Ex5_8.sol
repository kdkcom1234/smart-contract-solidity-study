// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ex5_8 {
    struct Human {
        string name;
        uint age;
    }

    Human[] public humanArray;
    mapping(address => Human) public humanMapping;

    function addArray(string memory _name, uint _age) public {
        humanArray.push(Human(_name, _age));
    }

    function getArrayName(uint _index) public view returns (string memory) {
        return humanArray[_index].name;
    }

    function addMapping(address _key, string memory _name, uint _age) public {
        humanMapping[_key] = Human(_name, _age);
    }

    function getMappingAge(address _key) public view returns (uint) {
        return humanMapping[_key].age;
    }
}
