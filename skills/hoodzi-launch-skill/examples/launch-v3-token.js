// Launches a token via HoodGateV3.launchToken().
// Real params/addresses below are exactly what produced tx
// 0xe3765798ddc81370f3a8da26db0baea2915f2ec4c5d3eb5f1faf41c8398bbfee on Robinhood Chain (chain id 4663).

import { encodeFunctionData } from "viem";
import { mineVanitySaltV3 } from "../../hoodzi-vanity-address-skill/examples/mine-vanity-salt-v3.js";

const HOOD_GATE_V3_ABI = [
  {
    type: "function", name: "launchToken", stateMutability: "payable",
    inputs: [{ type: "tuple", components: [
      { name: "tokenName", type: "string" }, { name: "tokenSymbol", type: "string" },
      { name: "tokenURI", type: "string" }, { name: "creator", type: "address" },
      { name: "creatorPresaleAmount", type: "uint256" }, { name: "vanitySalt", type: "bytes32" },
      { name: "useDynamicFeeMigration", type: "bool" },
    ]}],
    outputs: [
      { name: "asset", type: "address" }, { name: "pool", type: "address" },
      { name: "governance", type: "address" }, { name: "timelock", type: "address" },
      { name: "migrationPool", type: "address" },
    ],
  },
  {
    type: "function", name: "tokenFactory", stateMutability: "view",
    inputs: [], outputs: [{ type: "address" }],
  },
  {
    type: "function", name: "vanitySuffix", stateMutability: "view",
    inputs: [], outputs: [{ type: "uint16" }],
  },
  {
    type: "function", name: "permanentPoolConfig", stateMutability: "view",
    inputs: [], outputs: [{ type: "uint24" }, { type: "int24" }, { type: "uint256" }],
  },
];

/**
 * Launches a token on the Uniswap V3 pool path.
 */
export async function launchV3Token({
  walletClient, publicClient, hoodGateV3, tokenName, tokenSymbol, tokenURI, creator,
  creatorPresaleAmount = 0n, value = 0n,
}) {
  const tokenFactory = await publicClient.readContract({
    address: hoodGateV3, abi: HOOD_GATE_V3_ABI, functionName: "tokenFactory",
  });
  const targetSuffix = await publicClient.readContract({
    address: hoodGateV3, abi: HOOD_GATE_V3_ABI, functionName: "vanitySuffix",
  });
  const [, , totalSupply] = await publicClient.readContract({
    address: hoodGateV3, abi: HOOD_GATE_V3_ABI, functionName: "permanentPoolConfig",
  });

  const vanitySalt = mineVanitySaltV3({
    tokenFactory, hoodGateV3, name: tokenName, symbol: tokenSymbol, tokenURI, totalSupply, targetSuffix,
  });

  return walletClient.sendTransaction({
    to: hoodGateV3,
    value,
    data: encodeFunctionData({
      abi: HOOD_GATE_V3_ABI,
      functionName: "launchToken",
      args: [{ tokenName, tokenSymbol, tokenURI, creator, creatorPresaleAmount, vanitySalt, useDynamicFeeMigration: false }],
    }),
  });
}
