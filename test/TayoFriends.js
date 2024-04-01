const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TayoFriends", function () {
  let TayoFriends;
  let tayoFriends;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // 컨트랙트 가져오기
    TayoFriends = await ethers.getContractFactory("TayoFriends");
    // 서명자 목록 가져오기
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    // 토큰 배포(baseURI)
    tayoFriends = await TayoFriends.deploy("https://kdkcom1234.github.io/smart-contract-solidity-study/meta/tayo/");
  });

  describe("Minting", function () {
    it("Should mint a new token and assign it to owner", async function () {
      // console.log("----addr1---");
      // console.log(addr1);
      // 민트
      const tx =  await tayoFriends.connect(addr1).mint({ value: ethers.parseEther("0.001") });
      // console.log("----tx----");
      // console.log(tx);

      // 소유자 체크
      expect(await tayoFriends.ownerOf(1)).to.equal(addr1.address);
    });

    it("Should fail if sent ether is below the mint price", async function () {
      // 민트 프라이스 미만
      await expect(tayoFriends.connect(addr1).mint({ value: ethers.parseEther("0.0001") }))
        .to.be.revertedWith("Ether sent is not correct.");
    });
  });

  describe("Setting mint price", function () {
    it("Should let the owner set the mint price", async function () {
      await tayoFriends.setMintPrice(ethers.parseEther("0.002"));
      expect(await tayoFriends.mintPrice()).to.equal(ethers.parseEther("0.002"));
    });

    it("Should not let non-owners set the mint price", async function () {
      await expect(tayoFriends.connect(addr1).setMintPrice(ethers.parseEther("0.002")))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Withdraw", function () {
    it("Should allow the owner to withdraw funds", async function () {
      await tayoFriends.connect(addr1).mint({ value: ethers.parseEther("0.001") });
      const initialOwnerBalance = await owner.provider.getBalance(owner.address);

      const tx = await tayoFriends.withdraw();
      const receipt = await tx.wait();

      const transactionFee = (receipt.effectiveGasPrice || receipt.gasPrice) * receipt.cumulativeGasUsed;
      const finalOwnerBalance = await owner.provider.getBalance(owner.address);

      expect(finalOwnerBalance + transactionFee).to.equal(initialOwnerBalance + ethers.parseEther("0.001"));
    });
  });
});
