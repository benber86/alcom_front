import {useDispatch, useSelector} from "react-redux";
import {useSingleStakingVaultContract} from "./useContract";
import {useCallback, useMemo} from "react";
import {
  setStakingError,
  setStakingPending,
  setStakingSuccess,
  saveVaultPosition,
  setUnstakingError,
  setUnstakingPending,
  setUnstakingSuccess,
  getVaultPositionError
} from "../actions/stakingActions";
import {useGetCurrentBlockTimestamp} from './hooks'

export function useStake(walletAddress, tokenAddress, vaultAddress, amount) {
  const dispatch = useDispatch()

  const vaultContract = useSingleStakingVaultContract(true)

  const stake = useCallback(async () => {
    dispatch(setStakingPending())
    if (!walletAddress) {
      dispatch(setStakingError("No account"))
    } else {
      vaultContract.functions.deposit(amount)
        .then((res) => {
            dispatch(setStakingSuccess())
          }
        ).catch((error) => {
        console.log(error)
        dispatch(setStakingError(error))
      })
    }
  }, [walletAddress, vaultContract, dispatch, amount])

  return stake
}

export function useStakingStatus() {
  return useSelector((state) => state.root.stakingStatus)
}

export function useUnstake(walletAddress, tokenAddress, vaultAddress, amount) {
  const dispatch = useDispatch()

  const vaultContract = useSingleStakingVaultContract(true)


  const unstake = useCallback(async () => {
    dispatch(setUnstakingPending())
    if (!walletAddress) {
      dispatch(setUnstakingError("No account"))
    } else {
      vaultContract.functions.withdraw(amount)
        .then((res) => {
            dispatch(setUnstakingSuccess())
          }
        ).catch((error) => {
        console.log(error)
        dispatch(setUnstakingError(error))
      })
    }
  }, [walletAddress, vaultContract, dispatch, amount])

  return unstake
}

export function useUnstakingStatus() {
  return useSelector((state) => state.root.unstakingStatus)
}

export function usePosition(walletAddress, vaultAddress) {
  const dispatch = useDispatch()

  const vaultContract = useSingleStakingVaultContract(true)
  const timestamp = useGetCurrentBlockTimestamp()
  useMemo(async () => {
      if (!walletAddress) {
        dispatch(setStakingError("No account"))
      } else {
        vaultContract.functions.getPositionValue()
          .then((res) => {
              dispatch(saveVaultPosition(vaultAddress, res[0]))
            }
          ).catch((error) => {
            dispatch(getVaultPositionError(error))
          }
        )
      }
    },
    [walletAddress, vaultContract, vaultAddress, dispatch, timestamp]
  )
}

export function useGetPosition() {
  return useSelector((state) => state.root.vaultPosition)
}
