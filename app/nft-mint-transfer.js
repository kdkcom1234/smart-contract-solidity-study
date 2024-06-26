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

// 민팅받은 목록 조회
async function getMintedTokens(toAddress) {
  const startTime = new Date().getTime();
  // 민팅 전송 로그 토픽 필터
  // 0x0 -> toAddress
  const mintTopics = await tokenContract.filters
    .Transfer(ethers.ZeroAddress, toAddress, null)
    .getTopicFilter();
  console.log("----mintTopics----");
  console.log(mintTopics);

  // 민팅 전송 로그 조회
  const mintLogs = await provider.getLogs({
    fromBlock: "earliest",
    toBlock: "latest",
    address: tokenAddress,
    topics: mintTopics,
  });

  console.log(mintLogs);
  console.log(mintLogs.length);

  const decodedLogs = mintLogs
    // 로그의 데이터를 디코드하여 토큰 ID를 추출
    .map((log) => {
      const { from, to, tokenId } = tokenContract.interface.decodeEventLog(
        "Transfer",
        log.data,
        log.topics
      );
      return { from, to, tokenId };
    });
  console.log("----decodedLogs----");
  console.log(decodedLogs);
}

// 민팅 받은 것에서 전송 한 것 제외
// 정확히는 민팅 받은 것, 전송 받은 것 포함, 전송한 것 제외
async function getOwnedTokens(toAddress) {
  const startTime = new Date().getTime();
  // 전체 전송 로그 조회
  const topics = await tokenContract.filters
    .Transfer(null, null, null)
    .getTopicFilter();
  const logs = await provider.getLogs({
    fromBlock: "earliest",
    toBlock: "latest",
    address: tokenAddress,
    topics,
  });

  const decodedLogs = logs
    // 로그의 데이터를 디코드하여 토큰 ID를 추출
    .map((log) => {
      const { from, to, tokenId } = tokenContract.interface.decodeEventLog(
        "Transfer",
        log.data,
        log.topics
      );
      return { from, to, tokenId };
    });
  // console.log("----decodedLogs----");
  // console.log(decodedLogs);

  const mintedTokens = decodedLogs
    // zero-address에서 toAddres에서 전송한 로그만 남김
    .filter(
      (token) => token.from === ethers.ZeroAddress && token.to === toAddress
    );
  console.log("----mintedTokens----");
  console.log(mintedTokens);

  const transferedTokenIds = decodedLogs
    .filter((token) => token.from === toAddress)
    .map((token) => token.tokenId);
  console.log("----transferedTokenIds----");
  console.log(transferedTokenIds);

  const ownedTokens = mintedTokens.filter(
    (token) => !transferedTokenIds.includes(token.tokenId)
  );

  console.log("----ownedTokens----");
  console.log(ownedTokens);

  const endTime = new Date().getTime();

  console.log("-----response Time");
  console.log(endTime - startTime);
}

// // 토큰 민팅 실행
// mintToken();
// // 토큰 전송
// transferToken(
//   "0x0D9Def42463d4f17a90Aaf9D0076a3c4365059f8",
//   "0x5f694aB1653A007d0025e4763e9096ffC9363F14",
//   1
// );

// // 민팅 받은 목록 조회
// getMintedTokens("0x0D9Def42463d4f17a90Aaf9D0076a3c4365059f8");
// 특정 주소의 NFT 목록 조회
getOwnedTokens("0x0D9Def42463d4f17a90Aaf9D0076a3c4365059f8");
