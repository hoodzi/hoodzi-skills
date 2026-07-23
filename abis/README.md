# Contract ABIs

Full ABI JSON files for the contracts used in the **HoodGateV3** flow on Robinhood Chain (chain id `4663`).

Regenerated directly from `out/` (`forge build` artifacts):

```bash
jq '.abi' out/<Contract>.sol/<Contract>.json > hoodzi-skills/abis/<Contract>.json
```

## ABI Index

| File | Contract | Description |
|---|---|---|
| [HoodGateV3Upgradeable.json](HoodGateV3Upgradeable.json) | `HoodGateV3Upgradeable` | Primary entry point proxy: `launchToken()`, `harvestFees()`, `harvestFeesBatch()`, `getCreatorFeesBoth()`, `collectAllCreatorFees()`, `collectAllCreatorFeesBatch()`, `getAssetData()`, `feeConfig()`, `permanentPoolConfig()`. Emits `Create`, `FeesHarvested`, `Collect`, `CreatorPrebuy`. |
| [HoodziV3Token.json](HoodziV3Token.json) | `HoodziV3Token` | The launched asset token itself — standard OpenZeppelin `ERC20` + `Permit` with `tokenURI()` and `updateTokenURI()`. Ownership is burned to `0xdead` upon launch. |
| [HoodziV3TokenFactory.json](HoodziV3TokenFactory.json) | `HoodziV3TokenFactory` | `create()` — factory contract that deploys `HoodziV3Token` instances. |
| [PermanentUniswapV3Initializer.json](PermanentUniswapV3Initializer.json) | `PermanentUniswapV3Initializer` | `initialize()` (mints initial full-range/open-ended LP position to `PositionLocker`), `collectFees()` (called during fee harvesting). |
| [PermanentPositionLocker.json](PermanentPositionLocker.json) | `PermanentPositionLocker` | Immutable, ownerless vault holding locked Uniswap V3 LP position NFTs. |
| [IUniswapV3Pool.json](IUniswapV3Pool.json) | `IUniswapV3Pool` | Interface for the live Uniswap V3 pool created for each launched token. |
| [IUniswapV3Factory.json](IUniswapV3Factory.json) | `IUniswapV3Factory` | Interface for the Uniswap V3 factory. |

## Third-Party Contracts

For trading on Uniswap V3 pools, use a SwapRouter02-compatible ABI (`exactInputSingle` / `exactOutputSingle`).
Which router address to use depends on the deployment stack:
- **`HoodGateV3` Router**: `SwapRouter02HoodziUpgradeable` proxy `0x18d3855ec60AED88bA7ED850AD88358cc985c218` (returned by `hoodGateV3.uniswapV3Router()`).
- Raw official Uniswap V3 SwapRouter02 on Robinhood Chain: `0xCaf681a66D020601342297493863E78C959E5cb2`.
