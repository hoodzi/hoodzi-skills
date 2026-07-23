# Trading and Pool Mechanics

Every token launched on hoodzi.fun trades against WETH in its own dedicated **Uniswap V3 liquidity pool** from the moment it is created.

There is no bonding curve, no price ceiling, no multi-stage migration, and no liquidity withdrawal path.

## How Trading Works

- **Single Locked Pool**: Every token trades directly against WETH in a single Uniswap V3 pool. The pool's initial liquidity position is locked automatically upon launch in `PositionLocker`, an immutable and ownerless contract.
- **Fixed Supply**: Every launch uses a fixed supply of 1,000,000,000 tokens (1B). 100% of the token supply is deposited directly into the pool at launch.
- **Open-Ended Pricing**: The pool position starts at `initialTick` (`204200`, corresponding to a starting market cap of ~$2,500) and extends to the maximum usable tick. Price moves freely based on buy and sell volume with no artificial ceiling.
- **No Migration**: Trading continues in the same pool indefinitely. Nothing moves or migrates to another DEX or pool version later.

## Placing Trades

Swaps run against the pool via the standard Uniswap V3 **SwapRouter02**:

- **Buys**: Execute an `exactInputSingle` (WETH → Token) or `exactOutputSingle` for an exact token amount. `sqrtPriceLimitX96` can safely be set to `0`.
- **Sells**: Execute an `exactInputSingle` (Token → WETH).
- **Slippage & Impact**: The pool price moves with every trade. Use `amountOutMinimum` or `amountInMaximum` to protect against execution slippage.

For developer instructions and viem code examples, see [hoodzi-swap-skill](../skills/hoodzi-swap-skill/SKILL.md).
