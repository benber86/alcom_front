import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import {MAINNET_PROVIDER, CHAIN_ID} from '../constants'

const POLLING_INTERVAL = 12000;


export const network = new NetworkConnector({
  urls: { [CHAIN_ID]: MAINNET_PROVIDER },
  defaultChainId: CHAIN_ID,
  pollingInterval: POLLING_INTERVAL,
});

export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID]
})