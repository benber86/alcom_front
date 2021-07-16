import {useMemo, useCallback} from "react";
import {useTokenContract} from "./useContract";
import {
  getWalletAllowanceError,
  saveWalletAllowance,
  setWalletAllowanceError,
  setWalletAllowancePending
} from "../actions/walletActions";
import {useDispatch, useSelector} from "react-redux";
import {MaxUint256} from '@ethersproject/constants'


export function useAllowance(walletAddress, tokenAddress, spenderAddress) {
  const dispatch = useDispatch()
  const tokenContract = useTokenContract(tokenAddress, false)


  useMemo(async () => {
    if (!walletAddress) {
      dispatch(getWalletAllowanceError("No account"))
    } else {
      tokenContract.functions.allowance(walletAddress, spenderAddress)
        .then((res) => {
            dispatch(saveWalletAllowance(tokenAddress, res[0]))
          }
        ).catch((error) => {
        console.log(error)
        dispatch(getWalletAllowanceError(error))
      })
    }
  }, [walletAddress, tokenAddress, dispatch, spenderAddress, tokenContract])
}


export function useGetAllowance() {
  return useSelector((state) => state.root.walletAllowance)
}


export function useAllowanceSuccess() {
  return useSelector((state) => state.root.setWalletAllowanceSuccess)
}

export function useApprove(walletAddress, tokenAddress, spenderAddress) {
  const dispatch = useDispatch()
  const tokenContract = useTokenContract(tokenAddress, true)

  const setAllowance = useCallback(async () => {
    if (!walletAddress) {
      dispatch(setWalletAllowanceError("No account"))
    } else {
      dispatch(setWalletAllowancePending())
      tokenContract.functions.approve(spenderAddress, MaxUint256)
        .then((res) => {
            res.wait().then(
              dispatch(saveWalletAllowance(tokenAddress, MaxUint256))
            )
          }
        ).catch((error) => {
        console.log(error)
        dispatch(getWalletAllowanceError(error))
      })
    }
  }, [walletAddress, tokenContract, tokenAddress, spenderAddress, dispatch])

  return setAllowance
}
