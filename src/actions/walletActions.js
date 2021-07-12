import {SAVE_WALLET_BALANCE,
  GET_WALLET_BALANCE_ERROR,
  SAVE_WALLET_ALLOWANCE,
  GET_WALLET_ALLOWANCE_ERROR,
  SET_WALLET_ALLOWANCE_ERROR,
  SET_WALLET_ALLOWANCE_PENDING,
} from "../constants/actionTypes";


export function getWalletBalanceError(error) {
  return {
    type: GET_WALLET_BALANCE_ERROR,
    error: error
  }
}

export function saveWalletBalance(token, balance) {
  return (dispatch) => {
    dispatch({
      type: SAVE_WALLET_BALANCE,
      updatedBalance: {[token]: balance},
    })
  }
}

export function getWalletAllowanceError(error) {
  return {
    type: GET_WALLET_ALLOWANCE_ERROR,
    error: error
  }
}

export function saveWalletAllowance(token, balance) {
  return (dispatch) => {
    dispatch({
      type: SAVE_WALLET_ALLOWANCE,
      updatedAllowance: {[token]: balance},
    })
  }
}


export function setWalletAllowanceError(error) {
  return {
    type: SET_WALLET_ALLOWANCE_ERROR,
    error: error
  }
}

export function setWalletAllowancePending() {
  return {
    type: SET_WALLET_ALLOWANCE_PENDING
  }
}
