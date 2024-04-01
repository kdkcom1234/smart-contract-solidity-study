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
    tayoFriends = await TayoFriends.deploy("https://example.com/api/token/");
    await tayoFriends.deployed();
  });

  describe("Minting", function () {
    it("Should mint a new token and assign it to owner", async function () {
      await tayoFriends.connect(addr1).mint({ value: ethers.utils.parseEther("0.001") });
      expect(await tayoFriends.ownerOf(1)).to.equal(addr1.address);
    });

    it("Should fail if sent ether is below the mint price", async function () {
      await expect(tayoFriends.connect(addr1).mint({ value: ethers.utils.parseEther("0.0001") }))
        .to.be.revertedWith("Ether sent is not correct.");
    });
  });

  describe("Setting mint price", function () {
    it("Should let the owner set the mint price", async function () {
      await tayoFriends.setMintPrice(ethers.utils.parseEther("0.002"));
      expect(await tayoFriends.mintPrice()).to.equal(ethers.utils.parseEther("0.002"));
    });

    it("Should not let non-owners set the mint price", async function () {
      await expect(tayoFriends.connect(addr1).setMintPrice(ethers.utils.parseEther("0.002")))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Withdraw", function () {
    it("Should allow the owner to withdraw funds", async function () {
      await tayoFriends.connect(addr1).mint({ value: ethers.utils.parseEther("0.001") });
      const initialOwnerBalance = await owner.getBalance();

      const tx = await tayoFriends.withdraw();
      const receipt = await tx.wait();
      const transactionFee = receipt.effectiveGasPrice.mul(receipt.cumulativeGasUsed);
      const finalOwnerBalance = await owner.getBalance();

      expect(finalOwnerBalance.add(transactionFee)).to.equal(initialOwnerBalance.add(ethers.utils.parseEther("0.001")));
    });
  });
});
