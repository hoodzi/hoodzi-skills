---
name: hoodzi-indexer-skill
description: Index hoodzi.fun protocol activity (token launches, trades, fee harvests) from onchain events. Use when building an indexer, parser, or tracking token events.
---

# Indexing hoodzi.fun Activity

Protocol activity emits standard events on `HoodGateV3` and the Uniswap V3 pool.

## Key Events to Index

1. **Token Launch**: Listen for `Create` event on `HoodGateV3` proxy:
   - Topic0: `0x68ff1cfcdcf76864161555fc0de1878d8f83ec6949bf351df74d8a4a1a2679ab`
   - Emits: `(address asset, address indexed numeraire, address initializer, address poolOrHook, address indexed creator)`
2. **Pool Swaps**: Index standard Uniswap V3 `Swap` events on each launched token's `pool`:
   - Topic0: `0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67`
3. **Fee Harvests**: Index `FeesHarvested` on `HoodGateV3`:
   - Topic0: `0xd19200f562d4e1bf9d50d225e596997e523c3d4a04bd1b1bc12ba27d1a1f86bc`

Full details: [REFERENCE.md](REFERENCE.md).
