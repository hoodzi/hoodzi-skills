# Token Economy & Fees Reference

## Parameters

| Parameter | Value |
|---|---|
| **Total supply** | 1,000,000,000 (1B fixed) |
| **Deposited into pool** | 1,000,000,000 (100%) |
| **Presale / Team allocation** | 0% |
| **Pool fee tier** | 10000 (1%) |
| **Fee split** | 40% Creator / 60% Protocol |
| **LP locker** | `PositionLocker` (immutable, ownerless) |

## Liquidity Lock

100% of the LP position NFT created at launch is transferred to `PositionLocker`. The locker contract contains no functions to decrease liquidity or transfer position NFTs.

## Fee Distribution

- **Creator (40%)**: Pull-based. Accrues onchain and is claimed via `collectAllCreatorFees()`.
- **Protocol (60%)**: Push-based. Transferred automatically to `protocolFeeRecipient` during `harvestFees()`.
