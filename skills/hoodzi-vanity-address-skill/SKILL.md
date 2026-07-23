---
name: hoodzi-vanity-address-skill
description: Mine a CREATE2 salt so a HoodziV3Token deploys to an address ending in HoodGateV3's required vanity suffix, and predict a token's future address before launching it. Use when building a launchToken() call that needs vanitySalt, hitting InvalidVanitySalt, or needing to show a user their token's address before launch.
---

# Vanity Address Mining (HoodGateV3)

`HoodGateV3.launchToken()` requires `vanitySalt` to produce a `HoodziV3Token` address ending in `hoodGateV3.vanitySuffix()` (e.g. `0x4663`). Passing `bytes32(0)` or an invalid salt reverts `InvalidVanitySalt(predicted, vanitySuffix, actualSuffix)`.

Mine a salt locally (no RPC calls, no gas) offchain before submitting the launch transaction.

## Instructions

1. **CREATE2 Formula**: `HoodziV3Token` constructor has 6 params (name, symbol, supply, gate, gate, URI), and deployer is `HoodziV3TokenFactory` (`hoodGateV3.tokenFactory()`).
2. **Recipient and Owner**: Both constructor args are set to `hoodGateV3` address at creation time.
3. **bytecode**: Read `totalSupply`, `tokenFactory`, and `vanitySuffix` live onchain or use the embedded bytecode in `examples/hoodzi-v3-token-bytecode.js`.

Full detail: [REFERENCE.md](REFERENCE.md). Runnable code: [examples/mine-vanity-salt-v3.js](examples/mine-vanity-salt-v3.js).
