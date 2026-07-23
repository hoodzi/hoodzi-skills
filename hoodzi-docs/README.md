# hoodzi.fun — How It Works

hoodzi.fun is a meme token launchpad on **Robinhood Chain** (chain id `4663`): anyone can launch a token where the **entire supply** is immediately deposited into a locked Uniswap V3 trading pool.

Every launch and trade is non-custodial. There are no pre-sales, no team allocations, no transfer restrictions, and **no migration step**.

This is a plain-language walkthrough of the protocol. If you are building an indexer, trading bot, or frontend, see [skills/](../README.md) for developer guides, ABIs, viem code examples, and verified onchain data.

## How Launches Work

1. **[Launch](launch.md)** — A creator deploys a token and its WETH trading pool in a single transaction. The entire supply of 1,000,000,000 tokens is minted, liquidity is locked automatically, and token ownership is burned to `0xdead`.
2. **[Trading](trading.md)** — Every token trades against WETH in its own locked Uniswap V3 pool. Buys and sells happen in that same pool from the moment it launches. Price moves freely with no artificial ceiling.
3. **[Fees](fees.md)** — Trading generates liquidity fees in both token and WETH (1% pool fee), split between **Creator (40%)** and **Protocol (60%)**.

## Deployed Addresses

- **[Deployments](deployments.md)** — Clean reference of all contract addresses on Robinhood Chain.
