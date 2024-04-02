// ethers 6.x
const {
  ethers,
  JsonRpcProvider,
  Wallet,
  Contract,
  parseUnits,
  formatEther,
  parseEther,
} = require("ethers");
require("dotenv").config();

// ABI 가져오기
const {
  abi,
} = require("../artifacts/contracts/TayoFriends.sol/TayoFriends.json");
// console.log(abi);

// contract 주소
const tokenAddress = process.env.TAYO_FRIENDS_ADDRESS;

const provider = new JsonRpcProvider(process.env.AMOY_RPC_URL);
const signer = new Wallet(process.env.PRIVATE_KEY, provider);

const tokenContract = new Contract(tokenAddress, abi, signer);

async function mintToken() {
  // 민트 함수 호출 (함수 이름과 파라미터는 실제 컨트랙트에 따라 다를 수 있음)
  const tx = await tokenContract.mint({ value: parseEther("0.001") });
  await tx.wait();
  console.log(`Token minted`);
}

async function transferToken(fromAddress, toAddress, tokenId) {
  // transferFrom 함수 호출
  const tx = await tokenContract.transferFrom(fromAddress, toAddress, tokenId);
  await tx.wait();
  console.log(
    `Token transferred: ${tokenId} from ${fromAddress} to ${toAddress}`
  );
}

async function getOwnedNFTs(address) {
  const fromFilter = tokenContract.filters.Transfer(address, null);
  const toFilter = tokenContract.filters.Transfer(null, address);

  const fromEvents = await provider.getLogs(fromFilter);
  const toEvents = await provider.getLogs(toFilter);
  console.log(fromEvents);
  console.log(toEvents);

  let owned = new Set(toEvents.map((event) => event.topics[3]));

  // 소유한 NFT에서 전송된 NFT 제거
  fromEvents.forEach((event) => {
    owned.delete(event.topics[3]);
  });

  Array.from(owned)
    .map((id) => parseInt(id, 16))
    .forEach((v) => console.log(v));
}

// 컨트랙트의 모든 로그 조회
async function getAllLogs() {
  // fromBlock과 toBlock을 설정하여 검색 범위를 지정할 수 있습니다.
  // 예제에서는 최근 10000블록을 대상으로 조회합니다.
  const latest = await provider.getBlockNumber();
  const fromBlock = latest - 10000;
  const toBlock = "latest";

  const logs = await provider.getLogs({
    fromBlock,
    toBlock,
    address: tokenAddress,
  });

  console.log(logs);
  // 로그 데이터를 파싱하거나 필요한 정보를 추출하는 로직을 추가할 수 있습니다.
}

async function getMintedTokens() {
  const filter = tokenContract.filters.Transfer(ethers.ZeroAddress, null);

  const logs = await provider.getLogs({
    fromBlock: "earliest",
    toBlock: "latest",
    address: tokenAddress,
    topics: filter.topics,
  });

  // console.log(logs);

  // console.log("----로그 개수-------");
  // console.log(logs.length);

  // 토큰 발행 트랜잭션 제외
  logs.splice(0, 1);

  const mintedTokens = logs.map((log) => {
    // 로그의 데이터를 디코드하여 토큰 ID를 추출
    const decoded = tokenContract.interface.decodeEventLog(
      "Transfer",
      log.data,
      log.topics
    );

    // console.log(decoded);

    return {
      from: decoded.from,
      to: decoded.to,
      tokenId: decoded.tokenId.toString(),
    };
  });

  for (token of mintedTokens) {
    console.log(token);
  }
}

// // 토큰 민팅 실행
// mintToken();
// // 토큰 전송
// transferToken(
//   "0x0D9Def42463d4f17a90Aaf9D0076a3c4365059f8",
//   "0x5f694aB1653A007d0025e4763e9096ffC9363F14",
//   1
// );

// // 특정 주소의 NFT 목록 조회
// getOwnedNFTs("0x0D9Def42463d4f17a90Aaf9D0076a3c4365059f8");

// getAllLogs();

getMintedTokens();
