const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("QuizModule", (m) => {
  const quiz1 = m.contract("Quiz1");
  const quiz2 = m.contract("Quiz2");
  const quiz6 = m.contract("Quiz6");

  return { quiz1, quiz2, quiz6 };
});
