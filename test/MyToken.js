const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken contract", function() {
  let Mytoken; 
  let token; // 배포된 컨트랙트
  let owner; // signer
  let addr1; // signer address

  // MyToken 컨트랙트를 가져오고 배포합니다.
  beforeEach(async function () {
    // 컨트랙트 가져오기
    Mytoken = await ethers.getContractFactory("MyToken");
    // 배포 서명자
    [owner, addr1] = await ethers.getSigners();
    // 배포
    token = await Mytoken.deploy(owner);

    // console.log("------deploy-----")
    // console.log(token);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // console.log("------test-----")
      // console.log(token)
      // 컨트랙트 소유자와 현재 서명자를 비교
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Supply", function() {
    it("The max supply and owner balance must be equals", async function() {
      const totalSupply = await token.totalSupply();
      // console.log("----totalSupply----")
      // console.log(totalSupply);

      const balance = await token.balanceOf(owner.address);
      // console.log("----balance----");
      // console.log(balance);

      expect(totalSupply).to.equal(balance);

    });
  })
});