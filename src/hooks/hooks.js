import {useState, useCallback, useEffect} from 'react'
import {useWeb3React} from '@web3-react/core'
import {injected} from '../connectors'
import {MULTICALL} from "../constants";
import MULTICALL_ABI from "../constants/abis/Multicall.json"
import {useContract} from './useContract'
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_TIMESTAMP} from '../constants/actionTypes'

export function useEagerConnect() {
  const {activate, active} = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [activate])

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress = false) {
  const {active, error, activate} = useWeb3React()

  useEffect(() => {
    const {ethereum} = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}

export function useCurrentBlockTimestamp() {
  const dispatch = useDispatch()
  const contract = useContract(MULTICALL, MULTICALL_ABI, false)
  const getTimeStamp = useCallback(async () => {
    if (!contract) {
      return
    }
    contract.functions.getCurrentBlockTimestamp()
      .then((res) => {
          dispatch({type: UPDATE_TIMESTAMP, time: res[0]})
        }
      ).catch((error) => {
        dispatch({type: UPDATE_TIMESTAMP, time: null})
      }
    )
  }, [contract, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      getTimeStamp();
    }, 5000);
    return () => clearInterval(interval);
  }, [contract, getTimeStamp]);

}

export function useGetCurrentBlockTimestamp() {
  return useSelector((state) => state.root.timeStamp)
}