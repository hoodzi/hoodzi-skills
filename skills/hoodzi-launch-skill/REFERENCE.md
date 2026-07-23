# HoodGateV3 Launch Reference

## Function Signature

```solidity
function launchToken(HoodziTokenParams calldata params)
    external
    payable
    returns (
        address asset,
        address pool,
        address governance,
        address timelock,
        address migrationPool
    );

struct HoodziTokenParams {
    string tokenName;
    string tokenSymbol;
    string tokenURI;
    address creator;
    uint256 creatorPresaleAmount; // in wei of WETH; 0 = no prebuy
    bytes32 vanitySalt;           // cannot be 0x0
    bool useDynamicFeeMigration;  // unused ABI placeholder
}
```

### Return Tuple Values
- `asset`: Address of the newly deployed `HoodziV3Token`.
- `pool`: Address of the Uniswap V3 pool.
- `governance`: Always `0x000000000000000000000000000000000000dEaD`.
- `timelock`: Always `0x000000000000000000000000000000000000dEaD`.
- `migrationPool`: Always `address(0)` (no migration).

## Launch Process Flow

1. Encodes `tokenFactoryData = abi.encode(tokenName, tokenSymbol, tokenURI)`.
2. Validates vanity salt via `HoodGateV3Lib.predictV3TokenAddress()` against `hoodGateV3.tokenFactory()`.
3. Deploys `HoodziV3Token` via `HoodziV3TokenFactory.create()`.
4. Deposits the full 1B supply into `UniswapV3Initializer.initialize()` and locks the position LP in `PositionLocker`.
5. Transfers `HoodziV3Token` ownership to `0xdead`.
6. Stores asset mapping `getAssetData[asset] = { pool, creator }` and emits `Create(asset, weth, poolInitializer, pool, creator)`.
7. Executes creator prebuy if `creatorPresaleAmount > 0` and `msg.value > 0`.
