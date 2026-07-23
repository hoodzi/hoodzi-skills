# HoodGateV3 Swap Reference

## Router & Parameters

`hoodGateV3.uniswapV3Router()` on the staging proxy (2026-07-23, not yet the officially announced live
address) resolves to the **SwapRouter02HoodziUpgradeable** proxy at
`0x18d3855ec60AED88bA7ED850AD88358cc985c218` — always query it live rather than hardcoding, but this is the
current value. This is a separate deployment from the raw official SwapRouter02
(`0xCaf681a66D020601342297493863E78C959E5cb2`); the two are not interchangeable.

```solidity
struct ExactInputSingleParams {
    address tokenIn;
    address tokenOut;
    uint24 fee;               // 10000 (1%)
    address recipient;
    uint256 amountIn;
    uint256 amountOutMinimum;
    uint160 sqrtPriceLimitX96; // 0 = no limit
}

struct ExactOutputSingleParams {
    address tokenIn;
    address tokenOut;
    uint24 fee;
    address recipient;
    uint256 amountOut;
    uint256 amountInMaximum;
    uint160 sqrtPriceLimitX96;
}
```

## Pricing and Market Cap Formula

Derived from the pool's `slot0().sqrtPriceX96`:

```js
function marketCapUsd(sqrtPriceX96, isToken0, totalSupply, ethUsdPriceX100 = 184_243n) {
  const priceX96 = sqrtPriceX96;
  const pricePerTokenWeth = isToken0
    ? (priceX96 * priceX96 * 10n ** 18n) >> 192n
    : (10n ** 18n << 192n) / (priceX96 * priceX96);
  const marketCapWeth = (pricePerTokenWeth * totalSupply) / 10n ** 18n;
  return (marketCapWeth * ethUsdPriceX100) / (100n * 10n ** 18n);
}
```

## Swapping Mechanics

- **Small round trip**:
  - Buy: `exactInputSingle` WETH → Token
  - Sell: `exactInputSingle` Token → WETH
- **Large 80% supply buy**:
  - Buy: `exactOutputSingle` (800M tokens)
  - Sell: `exactInputSingle` (800M tokens back)
