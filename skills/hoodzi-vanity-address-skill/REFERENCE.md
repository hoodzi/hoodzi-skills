# Vanity Address Mining Reference

## CREATE2 Formula

```text
tokenFactory = hoodGateV3.tokenFactory()
initCodeHash = keccak256(
  HoodziV3Token.creationCode ++
  abiEncode(name, symbol, totalSupply, hoodGateV3, hoodGateV3, tokenURI)
)
predicted = last20Bytes(keccak256(0xff ++ tokenFactory ++ salt ++ initCodeHash))
```

Iterate `salt = 0, 1, 2, ...` until `uint16(predicted) == hoodGateV3.vanitySuffix()`.

Both `HoodziV3Token`'s `recipient` and `owner` constructor args are set to `hoodGateV3` address at launch time.

## Verification

The offchain salt mining math derives the exact CREATE2 token deployment address using `HoodziV3TokenFactory`, `hoodGateV3`, `totalSupply` (`1_000_000_000e18`), and `targetSuffix` (`0x4663`).
