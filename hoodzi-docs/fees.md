# Fees and Revenue Split

Trading generates 1% liquidity fees (`permanentPoolConfig().fee = 10000`) in both the token and WETH.

Fees earned by the locked pool position are harvested and split between creator and protocol according to `feeConfig()`:

| Recipient | Share | Distribution Model | Notes |
|---|---|---|---|
| **Creator** | **40%** | **Pull-based** | Accrues onchain and can be claimed from the interface at any time via `collectAllCreatorFees()`. |
| **Protocol** | **60%** | **Push-based** | Transferred automatically to `protocolFeeRecipient` inside `harvestFees()`. |

## Fee Lifecycle

1. **Harvesting Fees (`harvestFees`)**:
   - Anyone (bots, frontends, creators) can call `harvestFees(asset)` or `harvestFeesBatch(assets[])` at any time.
   - Harvesting collects accrued fees from the pool's locked position into `HoodGateV3`.
   - The protocol's 60% share is transferred directly to the protocol fee recipient wallet.
   - The creator's 40% share is recorded in `getCreatorFeesBoth(asset)`.
2. **Claiming Creator Fees (`collectAllCreatorFees`)**:
   - The designated creator address can claim accrued WETH and token fee rewards in a single call via `collectAllCreatorFees(asset, to)` or across multiple tokens via `collectAllCreatorFeesBatch(assets[], to)`.
3. **Displaying Unclaimed Rewards**:
   - Frontends can simulate `harvestFees()` via `eth_call` and add the result to `getCreatorFeesBoth(asset)` to display total unclaimed creator rewards (both harvested and pending in the pool).

See [hoodzi-fees-skill](../skills/hoodzi-fees-skill/SKILL.md) for code snippets and viem integration examples.
