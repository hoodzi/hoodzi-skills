# Changelog

## HoodGateV3 Protocol Upgrade

Upgraded `hoodzi-skills` completely to the **HoodGateV3** protocol stack, removing legacy migration logic and bonding curves.

### Summary of Changes

1. **Architecture Transition**:
   - Switched from legacy 4-stage lifecycle (launch → bonding curve → migrate → V4 pool) to a single-stage locked pool launch model.
   - 100% of fixed total supply (1,000,000,000 tokens) is deposited into a dedicated Uniswap V3 pool at launch.
   - Position LP is locked automatically in `PositionLocker`.
2. **Removed Migration & Bonding Curve Logic**:
   - Completely deleted `hoodzi-bonding-curve-skill`, `hoodzi-migrate-skill`, `hoodzi-v4-swap-skill`, and `migration.md`.
   - Removed transfer lock, whitelist, vesting, and inflation minting references.
3. **Updated Fee Structure**:
   - Flat 1% pool fee split 40% Creator (pull-based claim) / 60% Protocol (push-based inside `harvestFees`).
   - Added batch harvest (`harvestFeesBatch`) and batch claim (`collectAllCreatorFeesBatch`) support.
4. **New / Updated Skills**:
   - `hoodzi-launch-skill`: Launching tokens via `HoodGateV3.launchToken()`.
   - `hoodzi-vanity-address-skill`: CREATE2 vanity salt mining for `HoodziV3Token`.
   - `hoodzi-swap-skill`: Buying/selling via SwapRouter02 on Robinhood Chain.
   - `hoodzi-fees-skill`: Fee harvesting, claiming, and simulated unclaimed fee calculations.
   - `hoodzi-indexer-skill`: Event topic0 hashes for `Create`, `FeesHarvested`, `Collect`, and V3 `Swap`.
   - `hoodzi-token-economy-skill`: Fixed 1B supply tokenomics summary.
