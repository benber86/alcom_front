import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import {ethers} from "ethers";
import {ALCX_DECIMALS} from "../constants";

export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function formatGwei(amount, decimals) {
  return formatDecimals(ethers.utils.formatUnits(amount, 18), decimals)
}

export function formatDecimals(amount, decimals) {
  return parseFloat(amount).toFixed(decimals).toString()
}

export function shortenAddress(address, chars = 4) {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account))
}