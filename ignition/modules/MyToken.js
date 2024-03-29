const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config();

module.exports = buildModule("MyTokenModule", (m) => {
  const token = m.contract(
    "MyToken", // 컨트랙트 이름
    [m.getAccount(0)], // 생성자 매개변수 배열
    {} // 추가 옵션({ value: 보낼 네이티브코인수량 })
  );

  return { token };
});