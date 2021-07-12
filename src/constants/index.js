import { BigNumber } from '@ethersproject/bignumber'

export const MAINNET_PROVIDER = process.env.REACT_APP_MAINNET_PROVIDER
export const ALCX_TOKEN = process.env.REACT_APP_ALCX_TOKEN
export const ALCX_POOLS = process.env.REACT_APP_ALCX_STAKING_POOLS_CONTRACT
export const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID)
export const SS_VAULT = process.env.REACT_APP_VAULT_CONTRACT
export const MULTICALL = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
export const ALCX_DECIMALS = 18
export const SHARES_DECIMALS = 18

export const TOKEN_SYMBOLS = {
  [ALCX_TOKEN]: "ALCX",
  [SS_VAULT]: "ssALCX"
}

export const requestState = {
  NONE: 0,
  PENDING: 1,
  ERROR: 2,
  SUCCESS: 3
}

export const BIG_ZERO = BigNumber.from(0)