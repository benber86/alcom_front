import {useWeb3React} from "@web3-react/core";
import { useMemo } from 'react'
import { getContract } from '../utils'
import ERC20_ABI from '../constants/abis/ERC20.json'
import {ALCX_POOLS, SS_VAULT} from '../constants'
import POOL_ABI from '../constants/abis/IStakingPools.json'
import SS_VAULT_ABI from '../constants/abis/Vault.json'

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

export function useStakingPoolContract(withSignerIfPossible) {
  return useContract(ALCX_POOLS, POOL_ABI, withSignerIfPossible)
}

export function useSingleStakingVaultContract(withSignerIfPossible) {
  return useContract(SS_VAULT, SS_VAULT_ABI, withSignerIfPossible)
}
