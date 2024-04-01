// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TayoFriends is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter; // 토큰 ID 카운터(오픈제플린 4.x까지만 사용)

    string private _baseURIextended; // 수정 가능한 baseUri
    uint256 public mintPrice = 0.001 ether; // 기본 민트 가격 설정
    uint256 public constant maxTokenId = 4; // 최대 토큰 ID 설정

    constructor(
        string memory baseURI_
    ) ERC721("Tayo The Little Bus Friends", "TTBF") {
        setBaseURI(baseURI_);
    }

    function mint() public payable {
        // 최대 토큰 수량 체크
        require(
            _tokenIdCounter.current() < maxTokenId,
            "Maximum number of tokens minted."
        );
        require(msg.value >= mintPrice, "Ether sent is not correct."); // 가격 검증

        _tokenIdCounter.increment();
        uint256 currentTokenId = _tokenIdCounter.current();

        string memory newTokenURI = tokenURI(currentTokenId); // 메타데이터 URI 계산
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, newTokenURI);
    }

    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice; // 민트 가격 변경
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIextended;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            string(
                abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json")
            );
    }

    // 소유자가 컨트랙트 내의 이더를 인출할 수 있도록 하는 함수
    function withdraw() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}
