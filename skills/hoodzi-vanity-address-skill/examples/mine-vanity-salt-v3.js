// Mines a bytes32 salt such that the CREATE2 address HoodGateV3.launchToken() will deploy the token to ends
// in `targetSuffix` (a uint16, e.g. 0x4663 - read it from `hoodGateV3.vanitySuffix()`).

import { encodeAbiParameters, encodePacked, keccak256, getAddress } from "viem";
import { HOODZI_V3_TOKEN_CREATION_CODE } from "./hoodzi-v3-token-bytecode.js";

function predictAddress({ tokenFactory, salt, name, symbol, totalSupply, hoodGateV3, tokenURI }) {
  const initCodeHash = keccak256(
    encodePacked(
      ["bytes", "bytes"],
      [
        HOODZI_V3_TOKEN_CREATION_CODE,
        encodeAbiParameters(
          [
            { type: "string" }, { type: "string" }, { type: "uint256" },
            { type: "address" }, { type: "address" }, { type: "string" },
          ],
          [name, symbol, totalSupply, hoodGateV3, hoodGateV3, tokenURI]
        ),
      ]
    )
  );
  const hash = keccak256(
    encodePacked(["bytes1", "address", "bytes32", "bytes32"], ["0xff", tokenFactory, salt, initCodeHash])
  );
  return getAddress("0x" + hash.slice(-40));
}

export function mineVanitySaltV3({ tokenFactory, hoodGateV3, name, symbol, tokenURI, totalSupply, targetSuffix, maxTries = 2_000_000 }) {
  for (let nonce = 0n; nonce < BigInt(maxTries); nonce++) {
    const salt = `0x${nonce.toString(16).padStart(64, "0")}`;
    const addr = predictAddress({ tokenFactory, salt, name, symbol, totalSupply, hoodGateV3, tokenURI });
    if (parseInt(addr.slice(-4), 16) === targetSuffix) {
      return salt;
    }
  }
  throw new Error(`No vanity salt found within ${maxTries} tries`);
}
