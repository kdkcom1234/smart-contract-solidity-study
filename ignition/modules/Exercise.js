const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ExerciseModule", (m) => {
  const ex2_1 = m.contract("Ex2_2");

  return { ex2_1 };
});
