# hoodzi.fun — Integration Skills

This repository is an integration reference for services interacting with the hoodzi.fun protocol on-chain (Robinhood Chain, chain id `4663`).

## Agent Skills Structure

Each subfolder within `skills/` is a standalone **Agent Skill**:

- `SKILL.md`: Core instructions with YAML frontmatter.
- `REFERENCE.md`: Detailed technical specification and contract interfaces.

## Skills Index

| Skill | Covers |
|---|---|
| [hoodzi-addresses-skill/](skills/hoodzi-addresses-skill/SKILL.md) | Contract addresses on Robinhood Chain and onchain asset lookups |
| [hoodzi-launch-skill/](skills/hoodzi-launch-skill/SKILL.md) | Launching a token via `HoodGateV3.launchToken()` |
| [hoodzi-vanity-address-skill/](skills/hoodzi-vanity-address-skill/SKILL.md) | Mining CREATE2 vanity salts for token addresses |
| [hoodzi-swap-skill/](skills/hoodzi-swap-skill/SKILL.md) | Buying and selling tokens via SwapRouter02 |
| [hoodzi-fees-skill/](skills/hoodzi-fees-skill/SKILL.md) | Harvesting and claiming creator fee rewards |
| [hoodzi-token-economy-skill/](skills/hoodzi-token-economy-skill/SKILL.md) | Tokenomics overview: 1B fixed supply, locked LP, 1% pool fee |
| [hoodzi-indexer-skill/](skills/hoodzi-indexer-skill/SKILL.md) | Onchain event topic0 signatures and indexing guides |
| [abis/](abis/README.md) | Complete JSON ABI artifacts for protocol contracts |

## Protocol Shape

```text
launchToken()  →  Uniswap V3 Trading Pool (locked LP)
     │                         │
HoodGateV3Upgradeable   SwapRouter02 (buys & sells)
     │                         │
     └───────────┬─────────────┘
                 ▼
          hoodzi-fees-skill
   (harvestFees / collectAllCreatorFees)
```

- **One launch transaction**: Deploys token, deposits 100% of fixed 1B supply into a Uniswap V3 trading pool, and locks LP in `PositionLocker`.
- **Direct pool trading**: No bonding curve, no migration step, no transfer locks.
- **1% Pool Fee**: Split 40% Creator / 60% Protocol.

## Protocol Documentation

For a plain-language walkthrough, see [hoodzi-docs/](hoodzi-docs/README.md).
