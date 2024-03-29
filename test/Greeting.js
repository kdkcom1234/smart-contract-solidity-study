const { expect } = require("chai");

describe("Greeting contract", function() {
  let Greeting; 
  let greeting; // 배포된 컨트랙트
  let owner; // signer
  let addr1; // signer address

  // Greeting 컨트랙트를 가져오고 배포합니다.
  beforeEach(async function () {
    // 컨트랙트 가져오기
    Greeting = await ethers.getContractFactory("Greeting");
    // 배포 서명자
    [owner, addr1] = await ethers.getSigners();
    // 배포
    greeting = await Greeting.deploy();

    // console.log("------deploy-----")
    // console.log(greeting);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // console.log("------test-----")
      // console.log(greeting)
      // 컨트랙트 소유자와 현재 서명자를 비교
      expect(await greeting.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should increment the counter", async function () {
      // 카운터 실행
      await greeting.incrementCounter();
      // 카운트 변수 조회
      const count = await greeting.count();
      // 1 증가되었는지 확인
      expect(count).to.equal(1);
    });

    it("Should return the correct greeting message", async function () {
      const message = await greeting.greet("Hardhat")
      expect(message).to.equal("Hello, Hardhat");
    });
  });
})