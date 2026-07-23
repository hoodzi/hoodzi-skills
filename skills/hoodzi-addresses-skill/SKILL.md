---
name: hoodzi-addresses-skill
description: Look up deployed HoodGateV3 protocol contract addresses (HoodGateV3 proxy, token factory, pool initializer, position locker, router) on Robinhood Chain, and query onchain data for a launched token. Use when integrating with hoodzi.fun.
---

# hoodzi.fun Deployed Addresses

hoodzi.fun currently runs on **Robinhood Chain** (chain id `4663`).

## Quick Lookup

See [REFERENCE.md](REFERENCE.md) for the full address table.

## Finding Addresses for a Token

Given any token launched via `launchToken()`, query `HoodGateV3.getAssetData(tokenAddress)`:

```solidity
(
    address numeraire,
    address timelock,
    address governance,
    address liquidityMigrator,
    address poolInitializer,
    address pool,
    address migrationPool,
    uint256 numTokensToSell,
    uint256 totalSupply,
    address creator
) = hoodGateV3.getAssetData(tokenAddress);
```

- `pool` — The Uniswap V3 pool address created for this token.
- `numeraire` — The WETH contract address paired with this token (`0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73`, real WETH).
- `creator` — The address authorized to collect creator fee rewards.
- `governance` / `timelock` — Always `0x000000000000000000000000000000000000dEaD`.
- `migrationPool` — Always `address(0)` (no migration).
