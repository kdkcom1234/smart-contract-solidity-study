// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Student {
    string public schoolName = "The University of Solidity";
    string public major;
    // 현재 컨트랙트와 상속 받은 컨트랙트에서 접근가능
    string internal schoolNumbers = "02-1234-5678";

    constructor(string memory _major) {
        major = _major;
    }
}

// 부모 컨트랙트의 생성자에 상수를 매개변수로 넣어 호출
contract ArtStudent is Student("Art") {

}

// 부모 컨트랙트의 생성자에 필드값을 매개변수로 넣어 호출
contract MusicStudent is Student {
    string internal degree = "Music";

    constructor() Student(degree) {}
}

// 부모 컨트랙트의 생성자에 자식 컨트랙트의 생성자 매개변수를 넣어 호출
contract MathStudent is Student {
    constructor(string memory _major) Student(_major) {}
}
