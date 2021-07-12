# Alchemix Community Compounding Tool - Front End 

This is a React based front-end for the autocompounding contracts for ALCX pools.
To run it, set the following environment variables or specify them in a `.env` file:

```
REACT_APP_MAINNET_PROVIDER= your RPC provider url
REACT_APP_ALCX_STAKING_POOLS_CONTRACT= "0xAB8e74017a8Cc7c15FFcCd726603790d26d7DeCa" (on ETH Mainnet)
REACT_APP_ALCX_TOKEN= "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF" (on ETH Mainnet)
REACT_APP_VAULT_CONTRACT= Address of the autocompounding vault's contract
REACT_APP_CHAIN_ID= 1 (for ETH Mainnet)
```
Install the dependencies,

`yarn install`

Then launch the app in development mode: 

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To build the app for production, use 

`yarn build`


## To do:

- [ ] Refactor the contract calling logic to reduce duplicated code (create a higher order function that takes contract function name + arguments and returns ready to call function)
- [ ] Split root reducer
- [ ] Add tests
- [ ] Better error handling for actions
- [ ] Rewrite and DRY the selector hooks