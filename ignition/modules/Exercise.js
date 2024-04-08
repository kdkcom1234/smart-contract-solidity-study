const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ExerciseModule", (m) => {
  const ex2_2 = m.contract("Ex2_2");
  const ex2_3 = m.contract("Ex2_3");
  const ex3_3 = m.contract("Ex3_3");
  const ex3_9 = m.contract("Ex3_9");
  const ex5_1 = m.contract("Ex5_1");
  const ex5_3 = m.contract("Ex5_3");

  return { ex2_2, ex2_3, ex3_3, ex3_9, ex5_1, ex5_3 };
});
