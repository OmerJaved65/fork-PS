import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import HomePage from './Pages/Home';
import { disconnect } from 'process';
import Web3 from 'web3';
import { injected } from './Constants/Injected';


function getLibrary() {
  const provider1 = new WalletConnectProvider({
    rpc: {
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      1287: "https://rpc.api.moonbase.moonbeam.network",
    },
  });
  return new Web3(provider1._provider)
}
function MetamaskProvider({ children }: { children: JSX.Element }): JSX.Element {
  const { active: networkActive, error: networkError, activate: activateNetwork, deactivate } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized: any) => {
        setLoaded(false)
        if (localStorage.getItem('key') == 'true') {
          activateNetwork(injected)
        }
        else if (localStorage.getItem('key') === 'false') {
          disconnect()
        }
      })
      .catch(() => {
        setLoaded(false)

      })
  }, [activateNetwork, networkActive, networkError])

  return <>
    <HomePage />
  </>
}

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary} >
        <MetamaskProvider>
          <HomePage />
        </MetamaskProvider>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
