# Address Reference — Robinhood Chain (chain id `4663`)

Robinhood Chain is an **Arbitrum-Nitro-based** L2 chain.

`HoodGateV3` is deployed as a **UUPS proxy** — always interact with the proxy address, not the implementation address.

**Staging deployment (2026-07-23), not yet the officially announced live/production address.** Update this page once the address is confirmed live.

## Core Protocol Contracts

| Contract | Address | Notes |
|---|---|---|
| **HoodGateV3 Proxy** | `0x931cCca56Aa0850969c9547fFF03217F11C3d5A0` | Primary protocol proxy |
| **HoodGateV3Upgradeable** Implementation | `0x2A50A3e245800f2808E1d1279a49d0B246D3E05c` | Logic implementation |
| **HoodziV3TokenFactory** | `0x2117868FEF59A28bf20b6C9F86E61019dc0F6e00` | CREATE2 token factory |
| **UniswapV3Initializer** | `0x4958b816336fc31E9481F349246B27e49BAf3287` | Initializer for trading pools |
| **PositionLocker** | `0x51EE46355538cB228408363fB1711D37f8780455` | Immutable vault holding locked LP NFTs |

## External Infrastructure

| Contract | Address | Notes |
|---|---|---|
| **WETH** (Quote Token) | `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73` | Official WETH contract |
| **SwapRouter02HoodziUpgradeable** (proxy) | `0x18d3855ec60AED88bA7ED850AD88358cc985c218` | What `hoodGateV3.uniswapV3Router()` actually returns — use this, **not** the raw official SwapRouter02 (`0xCaf681a66D020601342297493863E78C959E5cb2`); the two are separate deployments and not interchangeable |
| **Uniswap V3 Factory** | `0x1f7d7550B1b028f7571E69A784071F0205FD2EfA` | Official V3 Factory |
| **Position Manager** | `0x73991a25C818Bf1f1128dEAaB1492D45638DE0D3` | Official Position Manager |
| **Protocol Fee Recipient** | `0x9d135133671A77B6D0F48702b53783075351b3EE` | Receives protocol fee share (deployer wallet this pass; changeable via `updateFeeConfig`) |
