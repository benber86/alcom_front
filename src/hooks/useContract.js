import {useWeb3React} from "@web3-react/core";
import { useMemo } from 'react'
import { getContract } from '../utils'
import ERC20_ABI from '../constants/abis/ERC20.json'
import VAULT_ABI from '../constants/abis/Vault.json'

export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useVaultContract(vaultAddress, withSignerIfPossible) {
  return useContract(vaultAddress, VAULT_ABI, withSignerIfPossible)
}


