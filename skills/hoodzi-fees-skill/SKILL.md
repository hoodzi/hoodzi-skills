---
name: hoodzi-fees-skill
description: Read pending creator fees (getCreatorFeesBoth), simulate harvestFees()/harvestFeesBatch() to display total unclaimed rewards on frontends, and claim creator fee rewards (collectAllCreatorFees, collectAllCreatorFeesBatch) for HoodGateV3 tokens. Use when a user asks about creator fee claims or frontend reward displays.
---

# Creator & Protocol Fees on HoodGateV3

Swaps pay a 1% LP fee (`permanentPoolConfig().fee = 10000`). `harvestFees()` permissionlessly collects accrued fees from the pool position and splits them: **Creator 40%** (pull-based claim) / **Protocol 60%** (auto-pushed to protocol recipient).

## Instructions

1. **Read Pending Fees**: `getCreatorFeesBoth(asset)` returns `(uint256 wethAmount, uint256 tokenAmount)` for already harvested creator fees.
2. **Harvesting Fees**: `harvestFees(asset)` or `harvestFeesBatch(assets[])` is permissionless. It transfers protocol's 60% share automatically and updates creator's 40% claimable balance.
3. **Claiming Creator Fees**: `collectAllCreatorFees(asset, to)` or `collectAllCreatorFeesBatch(assets[], to)` allows the token creator to claim accrued WETH and token rewards.
4. **Displaying Total Unclaimed Rewards**: Frontend dashboards should simulate `harvestFees()` via `eth_call` and add the result to `getCreatorFeesBoth(asset)` to display total unclaimed rewards.
5. **Claim Handler Sequence**: When a user clicks "Claim", execute a real `harvestFees()` transaction first, followed by `collectAllCreatorFees()`.

Full detail: [REFERENCE.md](REFERENCE.md). Code examples: [examples/creator-fees-v3.js](examples/creator-fees-v3.js).
