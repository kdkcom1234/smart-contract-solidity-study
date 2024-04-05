const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("QuizModule", (m) => {
  const quiz1 = m.contract("Quiz1");
  const quiz2 = m.contract("Quiz2");

  return { quiz1, quiz2 };
});
