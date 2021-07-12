import {
  GET_WALLET_BALANCE_ERROR,
  SAVE_WALLET_BALANCE,
  GET_WALLET_ALLOWANCE_ERROR,
  SET_WALLET_ALLOWANCE_ERROR,
  SAVE_WALLET_ALLOWANCE,
  SET_WALLET_ALLOWANCE_PENDING,
  STAKING_ERROR,
  STAKING_PENDING,
  STAKING_SUCCESS,
  UNSTAKING_ERROR,
  UNSTAKING_PENDING,
  UNSTAKING_SUCCESS,
  GET_VAULT_POSITION_ERROR,
  SAVE_VAULT_POSITION,
  UPDATE_TIMESTAMP
} from "../constants/actionTypes";
import {requestState} from '../constants'

export const initialState = {

  poolData: null,
  getPoolDataError: null,

  walletBalance: null,
  getWalletBalanceError: null,

  walletAllowance: null,
  getWalletAllowanceError: null,

  setWalletAllowanceError: null,
  setWalletAllowancePending: false,

  stakingStatus: null,
  unstakingStatus: null,

  getVaultPositionError: null,
  vaultPosition: null,

  timeStamp: null

}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_BALANCE_ERROR:
      return {
        ...state,
        getWalletBalanceError: true
      }
    case SAVE_WALLET_BALANCE:
      return {
        ...state,
        getWalletBalanceError: false,
        walletBalance: {
          ...state.walletBalance,
          ...action.updatedBalance
        }
      }
    case GET_WALLET_ALLOWANCE_ERROR:
      return {
        ...state,
        walletAllowance: null,
        getWalletAllowanceError: true
      }
    case SET_WALLET_ALLOWANCE_ERROR:
      return {
        ...state,
        setWalletAllowanceError: true,
        setWalletAllowancePending: false,
        walletAllowance: null
      }
    case SET_WALLET_ALLOWANCE_PENDING:
      return {
        ...state,
        setWalletAllowanceError: false,
        setWalletAllowancePending: true,
        walletAllowance: null
      }
    case SAVE_WALLET_ALLOWANCE:
      return {
        ...state,
        setWalletAllowanceError: false,
        setWalletAllowancePending: false,
        walletAllowance: {
          ...state.walletAllowance,
          ...action.updatedAllowance
        }
      }
    case STAKING_ERROR:
      return {
        ...state,
        stakingStatus: requestState.ERROR
      }
    case STAKING_PENDING:
      return {
        ...state,
        stakingStatus: requestState.PENDING
      }
    case STAKING_SUCCESS:
      return {
        ...state,
        stakingStatus: requestState.SUCCESS
      }
    case UNSTAKING_ERROR:
      return {
        ...state,
        stakingStatus: requestState.ERROR
      }
    case UNSTAKING_PENDING:
      return {
        ...state,
        stakingStatus: requestState.PENDING
      }
    case UNSTAKING_SUCCESS:
      return {
        ...state,
        stakingStatus: requestState.SUCCESS
      }
    case GET_VAULT_POSITION_ERROR:
      return {
        ...state,
        getVaultPositionError: true
      }
    case SAVE_VAULT_POSITION:
      return {
        ...state,
        getVaultPositionError: false,
        vaultPosition: {
          ...state.vaultPosition,
          ...action.updatedPosition
        }
      }
    case UPDATE_TIMESTAMP:
      return {
        ...state,
        timeStamp: action.time
      }
    default:
      return state
  }
}
