---
name: hoodzi-token-economy-skill
description: Explain hoodzi.fun's token economics (1B fixed supply, locked LP, 1% pool fee) and revenue split in plain language. Use when a user asks about tokenomics or fee structures.
---

# Token Economy & Fees

Every token launched on hoodzi.fun shares the same fixed, protocol-level parameters.

## Key Tokenomics Summary

1. **Fixed 1B Supply**: Every token is minted with a fixed supply of 1,000,000,000 tokens (1 Billion).
2. **100% Deposited at Launch**: 100% of the token supply is deposited directly into the Uniswap V3 pool at creation time. No presale, no team allocation, no vesting.
3. **Locked Liquidity**: The LP position NFT is transferred directly to `PositionLocker`, an immutable, ownerless contract. Liquidity cannot be withdrawn by anyone.
4. **Trading Fee Split**: Swaps incur a 1% LP fee (`permanentPoolConfig().fee = 10000`), split **40% Creator** / **60% Protocol**.

Full detail: [REFERENCE.md](REFERENCE.md).
