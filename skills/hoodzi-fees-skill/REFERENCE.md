# HoodGateV3 Fees Reference

## Functions

```solidity
struct V3FeeConfig { uint16 creatorFeeBps; uint16 protocolFeeBps; address protocolFeeRecipient; }
function feeConfig() external view returns (V3FeeConfig memory); // (40, 60, protocolRecipient)

function harvestFees(address asset) external returns (
    uint256 creatorFees0, uint256 protocolFees0,
    uint256 creatorFees1, uint256 protocolFees1
);

function harvestFeesBatch(address[] calldata assets) external returns (
    uint256[] memory creatorFees0, uint256[] memory protocolFees0,
    uint256[] memory creatorFees1, uint256[] memory protocolFees1
);

function getCreatorFeesBoth(address asset) external view returns (uint256 wethAmount, uint256 tokenAmount);

function collectAllCreatorFees(address asset, address to) external returns (uint256 wethAmount, uint256 tokenAmount);

function collectAllCreatorFeesBatch(address[] calldata assets, address to) external returns (
    uint256[] memory wethAmounts, uint256[] memory tokenAmounts
);
```

## Push vs. Pull Mechanics

- **Protocol Share (Push)**: Transferred automatically to `protocolFeeRecipient` inside `harvestFees()`.
- **Creator Share (Pull)**: Recorded in `getCreatorFees[asset][token]` mapping inside `harvestFees()`. Creator claims it via `collectAllCreatorFees()`.

## Displaying Unclaimed Creator Rewards

```js
totalUnclaimed = alreadyHarvested (getCreatorFeesBoth) + wouldBeHarvested (simulate harvestFees)
```

Simulating `harvestFees()` via `eth_call` computes unharvested LP fees accrued in the pool position without spending gas or sending a transaction.
