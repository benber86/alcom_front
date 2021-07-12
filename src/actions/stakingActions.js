import {STAKING_ERROR,
  STAKING_PENDING,
  STAKING_SUCCESS,
  UNSTAKING_ERROR,
  UNSTAKING_PENDING,
  UNSTAKING_SUCCESS,
  GET_VAULT_POSITION_ERROR,
  SAVE_VAULT_POSITION
} from "../constants/actionTypes";


export function setStakingError(error) {
  return {
    type: STAKING_ERROR,
    error: error
  }
}

export function setStakingPending() {
  return {
    type: STAKING_PENDING,
  }
}

export function setStakingSuccess() {

  return {
    type: STAKING_SUCCESS,
  }
}


export function setUnstakingError(error) {
  return {
    type: UNSTAKING_ERROR,
    error: error
  }
}

export function setUnstakingPending() {
  return {
    type: UNSTAKING_PENDING,
  }
}

export function setUnstakingSuccess() {

  return {
    type: UNSTAKING_SUCCESS,
  }
}

export function getVaultPositionError(error) {
  return {
    type: GET_VAULT_POSITION_ERROR,
    error: error
  }
}

export function saveVaultPosition(token, balance) {

  return {
    type: SAVE_VAULT_POSITION,
    updatedPosition: {[token]: balance},
  }
}