// ethers 6.x
const { JsonRpcProvider, Wallet, Contract } = require("ethers");
require("dotenv").config();

// ABI 가져오기
const { abi } = require("../artifacts/contracts/Greeting.sol/Greeting.json"); 
// console.log(abi);

// contract 주소
const greetingAddress = process.env.GREETING_ADDRESS;

const provider = new JsonRpcProvider(
  process.env.AMOY_RPC_URL
);
const signer = new Wallet(process.env.PRIVATE_KEY, provider);
const greetingContract = new Contract(greetingAddress, abi, signer);

async function main() {
  let count = await greetingContract.count();
  console.log(`before count: ${count}`);

  const tx = await greetingContract.incrementCounter();
  console.log('-------tx--------');
  console.log(tx);

  const receipt = await tx.wait();
  console.log('-------receipt--------');
  console.log(receipt);
  
  count = await greetingContract.count();
  console.log(`after count: ${count}`);

  const greeting = await greetingContract.greet("World");
  console.log("------------greeting------------")
  console.log(greeting);
}

main();

