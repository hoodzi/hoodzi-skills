---
name: hoodzi-swap-skill
description: Buy or sell a HoodGateV3 token using the SwapRouter02HoodziUpgradeable proxy on Robinhood Chain. Use when a user wants to trade a token launched via HoodGateV3, or setup buy/sell code.
---

# Buy and Sell Tokens on HoodGateV3

Tokens launched via `HoodGateV3` trade on a dedicated **Uniswap V3 liquidity pool** via the **SwapRouter02HoodziUpgradeable** proxy (`0x18d3855ec60AED88bA7ED850AD88358cc985c218` on Robinhood Chain, staging deployment as of 2026-07-23 — not yet the officially announced live address) — this is what `hoodGateV3.uniswapV3Router()` returns, not the raw official SwapRouter02 (`0xCaf681a66D020601342297493863E78C959E5cb2`); the two are separate deployments and not interchangeable.

The pool has an open-ended price range starting from `initialTick` (`204200`) to the max usable tick, with liquidity locked automatically in `PositionLocker`. There is no price ceiling, no tail position, and no migration step.

## Instructions

1. **Pool Address & Fee Tier**: Query `hoodGateV3.getAssetData(token).pool` for the pool address. The fee tier is `permanentPoolConfig().fee` (`10000` = 1%).
2. **SwapRouter02 Call Shape**: Use standard `exactInputSingle` / `exactOutputSingle` without `deadline` parameter.
3. **`sqrtPriceLimitX96`**: Safe default is `0` (no limit). Use `amountOutMinimum` or `amountInMaximum` for slippage protection.
4. **`exactOutputSingle`**: Use when you know the exact token quantity you want (e.g. buying 80% of supply).
5. **Fee Accounting**: Swaps incur the 1% pool fee, split 40% Creator / 60% Protocol. See [hoodzi-fees-skill](../hoodzi-fees-skill/SKILL.md).

## Code Example & Reference

Full detail: [REFERENCE.md](REFERENCE.md). Viem code examples: [examples/buy-sell-v3.js](examples/buy-sell-v3.js).
