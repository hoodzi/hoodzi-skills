# How Launches Work

Creating a launch deploys the token and its trading pool in a single transaction, and the pool's liquidity is locked automatically.

A creator calls `HoodGateV3Upgradeable.launchToken()`:

```solidity
function launchToken(HoodziTokenParams calldata params)
    external
    payable
    returns (
        address asset,
        address pool,
        address governance,
        address timelock,
        address migrationPool
    );
```

## Launch Mechanics

In one atomic transaction:

1. **Create Token**: The token (`HoodziV3Token`) is deployed via CREATE2 using a mined salt (`vanitySalt`). The token address ends with the protocol's `vanitySuffix()` (e.g. `0x4663`).
2. **Fixed Supply Minted**: The entire fixed supply of 1,000,000,000 tokens (100%) is minted to `HoodGateV3`.
3. **Pool Deployed & Liquidity Locked**:
   - A dedicated Uniswap V3 pool paired against WETH is created and initialized.
   - 100% of the token supply is deposited into an open-ended liquidity position starting at `initialTick` (`204200`, ~$2,500 MC).
   - The position LP NFT is transferred directly to `PositionLocker`, locking liquidity permanently.
4. **Ownership Burned**: Token ownership is transferred directly to `0x000000000000000000000000000000000000dEaD`.
5. **No Transfer Restrictions**: The token trades freely and is P2P transferable from the instant it launches.

## Creator Prebuy

The creator can optionally buy into the pool in the launch transaction by supplying WETH (`creatorPresaleAmount > 0` with `msg.value > 0`). The prebuy swaps WETH for tokens on the fresh pool atomically before any other transaction can execute.

See [hoodzi-launch-skill](../skills/hoodzi-launch-skill/SKILL.md) and [hoodzi-vanity-address-skill](../skills/hoodzi-vanity-address-skill/SKILL.md) for developer integration guides.
