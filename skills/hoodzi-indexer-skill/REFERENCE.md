# Event Indexing Reference

## Event Flow

```text
Create (HoodGateV3)
   │
   ▼
Swap × N  (Uniswap V3 Pool)
   │
   ▼
FeesHarvested / Collect  (HoodGateV3)
```

## Event Signatures & Hashes

### HoodGateV3 (`HoodGateV3Upgradeable.sol`)

| Event | Topic0 |
|---|---|
| `Create(address asset, address indexed numeraire, address initializer, address poolOrHook, address indexed creator)` | `0x68ff1cfcdcf76864161555fc0de1878d8f83ec6949bf351df74d8a4a1a2679ab` |
| `FeesHarvested(address indexed asset, address indexed integrator, uint256 creatorFeeAmount, uint256 protocolFeeAmount, address indexed token)` | `0xd19200f562d4e1bf9d50d225e596997e523c3d4a04bd1b1bc12ba27d1a1f86bc` |
| `Collect(address indexed to, address indexed token, uint256 amount)` | `0x1314fd112a381beea61539dbd21ec04afcff2662ac7d1b83273aade1f53d1b97` |
| `CreatorPrebuy(address indexed creator, address indexed token, uint256 ethAmount, uint256 tokenAmount)` | `0x620f133507554037b60bae5f7b47c771f3e99dfb2725d062fbd6ba5ef41a361d` |

### Uniswap V3 Pool

| Event | Topic0 |
|---|---|
| `Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)` | `0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67` |
