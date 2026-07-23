---
name: hoodzi-launch-skill
description: Launch a token via HoodGateV3Upgradeable.launchToken() into a locked Uniswap V3 pool (100% supply deposited, LP locked automatically). Use when a user wants to create a token on HoodGateV3, or hits InvalidVanitySalt.
---

# Launching a Token on HoodGateV3

`HoodGateV3Upgradeable.launchToken()` deploys a token and deposits its **entire supply** into a dedicated Uniswap V3 liquidity pool with an open-ended price range (starting tick `204200`), locking the position LP automatically in `PositionLocker`.

There is **no bonding curve, no migration step, no anti-snipe transfer lock, and no transfer whitelist** — the token trades freely from the moment it is created.

## Instructions

1. **Mine a vanity salt first**: `launchToken()` reverts with `InvalidVanitySalt` if `vanitySalt` is `bytes32(0)` or fails to match `hoodGateV3.vanitySuffix()`. Use [hoodzi-vanity-address-skill](../hoodzi-vanity-address-skill/SKILL.md).
2. **Pool parameters**: `permanentPoolConfig()` (fee tier `10000` = 1%, starting tick `204200`, total supply `1,000,000,000 * 1e18`) is read at launch time.
3. **`HoodziTokenParams` struct shape**:
   ```solidity
   struct HoodziTokenParams {
       string tokenName;
       string tokenSymbol;
       string tokenURI;
       address creator;
       uint256 creatorPresaleAmount;
       bytes32 vanitySalt;
       bool useDynamicFeeMigration; // unused ABI placeholder
   }
   ```
4. **Token ownership is burned to `0xdead`** upon launch.
5. **Creator prebuy works atomically**: `msg.value > 0` and `creatorPresaleAmount > 0` swaps WETH for tokens on the new pool inside `launchToken()`.

## Example Call

```text
to:     [HOOD_GATE_V3_ADDRESS]   (HoodGateV3 proxy)
func:   launchToken((string,string,string,address,uint256,bytes32,bool))
params: ("HoodGateV3 Test Token", "HV3T", "ipfs://test",
         creatorAddress, 0, 0x...(mined), false)
→ asset:         [LAUNCHED_TOKEN_ADDRESS]
→ pool:          [UNISWAP_V3_POOL_ADDRESS]
→ governance:    0x000000000000000000000000000000000000dEaD
→ timelock:      0x000000000000000000000000000000000000dEaD
→ migrationPool: 0x0000000000000000000000000000000000000000
```

Full detail: [REFERENCE.md](REFERENCE.md). Code example: [examples/launch-v3-token.js](examples/launch-v3-token.js).
