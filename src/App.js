import DarkTheme from './theme'
import TopBar from './components/TopBar'
import CompoundBox from "./components/CompoundBox";
import {Web3Provider} from "@ethersproject/providers"
import {Web3ReactProvider} from '@web3-react/core'
import {Provider} from "react-redux"
import {store} from './store'


function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 5000
  return library
}


function App() {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
          <DarkTheme>
            <div className="App">
              <TopBar/>

              <CompoundBox/>

            </div>
          </DarkTheme>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
