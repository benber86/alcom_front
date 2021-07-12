import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useWeb3React, UnsupportedChainIdError} from "@web3-react/core";
import {injected} from "../../connectors";
import {useCurrentBlockTimestamp, useInactiveListener} from "../../hooks/hooks"
import {useEffect, useState} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 45,
    marginRight: 10
  },
  title: {
    flexGrow: 1,
  },
  tiny: {
    fontSize: 8,
  },
}));

export default function TopBar(props) {
  const classes = useStyles();
  const context = useWeb3React()
  const {
    connector,
    chainId,
    activate,
    deactivate,
    error
  } = context


  useCurrentBlockTimestamp()

  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const activating = injected === activatingConnector
  let isDisconnect = !error && chainId
  useInactiveListener(!props.triedEager || !!activatingConnector)
  const buttonText = isDisconnect ? 'Disconnect' : (activating ? 'Connecting' : 'Connect')
  const onClick = () => {
    if (!isDisconnect) {
      setActivatingConnector(injected)
      activate(injected)
    } else {
      deactivate()
    }
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <img src="AlchemixLogo.png" alt="alCompound" className={classes.logo}/>
          <Typography variant="h6" color="primary" className={classes.title}>
            Alchemix Community Compounding Tool
          </Typography>

            <Button variant="outlined" color="primary"
                    onClick={onClick}>{error instanceof UnsupportedChainIdError ? "Invalid network" : buttonText}</Button>

        </Toolbar>
      </AppBar>
    </div>
  )

}