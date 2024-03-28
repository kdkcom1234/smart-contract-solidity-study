require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.25",
  networks: {
    amoy: {
      url: process.env.AMOY_RPC_URL, // 환경 변수에서 RPC URL을 읽어옵니다.
      accounts: [process.env.PRIVATE_KEY], // 개인 키를 환경 변수에서 읽어옵니다.
    },
  },
};
