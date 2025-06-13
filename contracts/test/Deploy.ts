import { createWalletClient, http, parseAbi, Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/TradeTalk.sol/TradeTalk.json";

dotenv.config();

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);

const client = createWalletClient({
  account,
  chain: sepolia,
  transport: http(process.env.SEPOLIA_RPC),
});

async function deploy() {
  const hash = await client.deployContract({
    abi: abi as any,
    bytecode: bytecode as Hex,
    account,
  });

  console.log("Sepolia deployment tx hash:", hash);
}

deploy();
