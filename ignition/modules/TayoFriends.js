const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config();

module.exports = buildModule("TayoFriendsModule", (m) => {
  const token = m.contract(
    "TayoFriends", // 컨트랙트 이름
    ["https://kdkcom1234.github.io/smart-contract-solidity-study/meta/tayo/"], // 생성자 매개변수 배열
    {} // 추가 옵션({ value: 보낼 네이티브코인수량 })
  );

  return { token };
});
