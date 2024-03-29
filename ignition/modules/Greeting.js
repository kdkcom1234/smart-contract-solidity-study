const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreetingModule", (m) => {
  const greeting = m.contract(
    "Greeting", // 컨트랙트 이름
    [], // 생성자 매개변수 배열
    {}, // 추가 옵션({ value: 보낼 네이티브코인수량 })
    );

  return { greeting };
});