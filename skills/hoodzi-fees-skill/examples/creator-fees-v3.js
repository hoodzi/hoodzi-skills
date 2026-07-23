// Read and claim creator fees on a HoodGateV3 token.

import { encodeFunctionData } from "viem";

const HOOD_GATE_V3_ABI = [
  {
    type: "function", name: "harvestFees", stateMutability: "nonpayable",
    inputs: [{ name: "asset", type: "address" }],
    outputs: [
      { name: "creatorFees0", type: "uint256" }, { name: "protocolFees0", type: "uint256" },
      { name: "creatorFees1", type: "uint256" }, { name: "protocolFees1", type: "uint256" },
    ],
  },
  {
    type: "function", name: "harvestFeesBatch", stateMutability: "nonpayable",
    inputs: [{ name: "assets", type: "address[]" }],
    outputs: [
      { name: "creatorFees0", type: "uint256[]" }, { name: "protocolFees0", type: "uint256[]" },
      { name: "creatorFees1", type: "uint256[]" }, { name: "protocolFees1", type: "uint256[]" },
    ],
  },
  {
    type: "function", name: "getCreatorFeesBoth", stateMutability: "view",
    inputs: [{ name: "asset", type: "address" }],
    outputs: [{ name: "wethAmount", type: "uint256" }, { name: "tokenAmount", type: "uint256" }],
  },
  {
    type: "function", name: "collectAllCreatorFees", stateMutability: "nonpayable",
    inputs: [{ name: "asset", type: "address" }, { name: "to", type: "address" }],
    outputs: [{ name: "wethAmount", type: "uint256" }, { name: "tokenAmount", type: "uint256" }],
  },
  {
    type: "function", name: "collectAllCreatorFeesBatch", stateMutability: "nonpayable",
    inputs: [{ name: "assets", type: "address[]" }, { name: "to", type: "address" }],
    outputs: [{ name: "wethAmounts", type: "uint256[]" }, { name: "tokenAmounts", type: "uint256[]" }],
  },
];

export async function readPendingCreatorFees({ publicClient, hoodGateV3, asset }) {
  const [wethAmount, tokenAmount] = await publicClient.readContract({
    address: hoodGateV3, abi: HOOD_GATE_V3_ABI, functionName: "getCreatorFeesBoth", args: [asset],
  });
  return { wethAmount, tokenAmount };
}

export async function harvestThenClaimAllCreatorFees({ walletClient, hoodGateV3, asset, to }) {
  const harvestTx = await walletClient.sendTransaction({
    to: hoodGateV3,
    data: encodeFunctionData({ abi: HOOD_GATE_V3_ABI, functionName: "harvestFees", args: [asset] }),
  });

  const claimTx = await walletClient.sendTransaction({
    to: hoodGateV3,
    data: encodeFunctionData({ abi: HOOD_GATE_V3_ABI, functionName: "collectAllCreatorFees", args: [asset, to] }),
  });

  return { harvestTx, claimTx };
}
