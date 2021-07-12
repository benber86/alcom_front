import {useMemo} from "react";
import {useTokenContract} from "./useContract";
import {
  getWalletBalanceError,
  saveWalletBalance
} from "../actions/walletActions";
import {useDispatch, useSelector} from "react-redux";
import {useGetCurrentBlockTimestamp} from './hooks'


export function useBalance(walletAddress, tokenAddress) {
  const dispatch = useDispatch()
  const timestamp = useGetCurrentBlockTimestamp()
  const tokenContract = useTokenContract(tokenAddress, false)

  useMemo(async () => {
    if (!walletAddress) {
      dispatch(getWalletBalanceError("No account"))
    } else {
      tokenContract.functions.balanceOf(walletAddress)
        .then((res) => {
            dispatch(saveWalletBalance(tokenAddress, res.balance))
          }
        ).catch((error) => {
        dispatch(getWalletBalanceError(error))
      })
    }
  }, [walletAddress, tokenContract, tokenAddress, dispatch, timestamp])
}

export function useGetBalance() {
  return useSelector((state) => state.root.walletBalance)
}