const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ExerciseModule", (m) => {
  const ex2_1 = m.contract("Ex2_1");
  const ex2_2 = m.contract("Ex2_2");
  const ex2_3 = m.contract("Ex2_3");

  return { ex2_1, ex2_2, ex2_3 };
});
