// ethers 6.x
const { ethers, JsonRpcProvider, Wallet, Contract, parseUnits, formatEther } = require("ethers");
require("dotenv").config();

// ABI 가져오기
const { abi } = require("../artifacts/contracts/MyToken.sol/Mytoken.json"); 
// console.log(abi);

// contract 주소
const tokenAddress = process.env.MYTOKEN_ADDRESS;

const provider = new JsonRpcProvider(
  process.env.AMOY_RPC_URL
);
const signer = new Wallet(process.env.PRIVATE_KEY, provider);
const tokenContract = new Contract(tokenAddress, abi, signer);

// 토큰 전송 함수
async function sendToken(to, amount) {
  // 'amount'는 전송하려는 토큰의 양입니다. 
  // Ethers.js는 BigNumber를 사용하여 큰 수를 처리하므로, ethers.utils.parseUnits을 사용하여 토큰 양을 설정해야 합니다.
  // 예: "100.0" 토큰을 전송하고, 토큰이 18개의 소수점을 가진다고 가정하면, "100.0"과 "18"을 인수로 사용합니다.
  const formattedAmount = parseUnits(amount.toString(), 18);
  
  // transfer 함수 호출
  const transaction = await tokenContract.transfer(to, formattedAmount);
  console.log(transaction)
  console.log(`Transaction successful with hash: ${transaction.hash}`);

  // 트랜잭션 영수증을 기다림
  const receipt = await transaction.wait();
  console.log(receipt);

  // 잔액 조회
  const balance = await tokenContract.balanceOf(to);
  console.log(formatEther(balance))
}

// 사용 예: 'to'에는 수신자 주소, '100.0'은 전송할 토큰의 양
sendToken("0x5f694aB1653A007d0025e4763e9096ffC9363F14", 100.0);
