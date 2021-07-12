import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, Grid} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import LoadingButton from '@material-ui/lab/LoadingButton';
import {ALCX_TOKEN, BIG_ZERO, requestState, SS_VAULT} from "../../constants";
import {useBalance} from "../../hooks/useBalance";
import {useWeb3React} from "@web3-react/core";
import SelectAmount from "../SelectAmount"
import {
  useStake,
  useUnstake,
  useUnstakingStatus,
  usePosition,
  useGetPosition,
  useStakingStatus
} from "../../hooks/useVault"
import {
  useAllowance,
  useApprove,
  useGetAllowance
} from "../../hooks/useAllowance"
import {formatGwei} from "../../utils";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  button: {
    textAlign: 'right'
  }
}));

export default function CompoundBox() {
  const classes = useStyles();
  const [position, setPosition] = useState(BIG_ZERO)
  const [currentTab, setCurrentTab] = useState(0);
  const [pool, setPool] = useState(1);
  const [amount, setAmount] = useState(BIG_ZERO);
  const [balance, setBalance] = useState(BIG_ZERO);
  const [vault, setVault] = useState(SS_VAULT)
  const [allowance, setAllowance] = useState(BIG_ZERO);
  const [relevantToken, setRelevantToken] = useState(ALCX_TOKEN);

  const context = useWeb3React()
  const tokenAllowances = useGetAllowance()
  const {account} = context
  useBalance(account, relevantToken)
  useAllowance(account, relevantToken, vault)
  usePosition(account, vault)
  const approvePending = useSelector((state) => state.root.setWalletAllowancePending)

  const stake = useStake(account, relevantToken, vault, amount)
  const unstake = useUnstake(account, relevantToken, vault, amount)
  const stakingStatus = useStakingStatus()
  const unstakingStatus = useUnstakingStatus()
  const vaultPosition = useGetPosition()
  const handleTabChange = (event, newValue) => {
    newValue === 0 ? setRelevantToken(ALCX_TOKEN) : setRelevantToken(SS_VAULT)
    setCurrentTab(newValue);
  };

  const handlePoolChange = (event, newValue) => {
    setPool(newValue);
  };

  const approveTokenForVault = useApprove(account, relevantToken, vault)

  function onApprove() {
    approveTokenForVault()
  }

  useEffect(() => {
    if (vaultPosition && vaultPosition[SS_VAULT]) {
      setPosition(vaultPosition[SS_VAULT])
    }
    else {
      setPosition(BIG_ZERO)
    }
  }, [vaultPosition])

  useEffect(() => {
    if (tokenAllowances && tokenAllowances[relevantToken]) {
      setAllowance(tokenAllowances[relevantToken])
    } else {
      setAllowance(BIG_ZERO)
    }
  }, [tokenAllowances, relevantToken, account])


  return (
    <div className={classes.root}>
      <Grid container
            alignItems='center'
            justifyContent='center'
            style={{minHeight: "80vh"}}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {!account ? (
              <Typography variant="body2" color="primary"
                          className={classes.title}>
                Use the button above to connect with Metamask.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Tabs value={currentTab} onChange={handleTabChange}
                        variant="fullWidth">
                    <Tab label="Deposit"/>
                    <Tab label="Withdraw"/>
                  </Tabs>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth={true}>
                        <InputLabel>Select pool</InputLabel>
                        <Select
                          value={pool}
                          onChange={handlePoolChange}
                          label="Select pool"
                        >
                          <MenuItem value={1}>ALCX Single Staking</MenuItem>
                          <MenuItem value={2} disabled={true}>ALCX/ETH SLP
                            (Soon™)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <SelectAmount relevantToken={relevantToken}
                                amount={amount}
                                setAmount={setAmount}
                                balance={balance}
                                setBalance={setBalance}/>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="primary">
                        Staked: {formatGwei(position, 2)} ALCX
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <div className={classes.button}>
                        {allowance.gte(amount) ? (
                            (currentTab === 0) ? (
                              <LoadingButton onClick={stake}
                                             loading={stakingStatus === requestState.PENDING}
                                             disabled={amount.eq(0)}
                                             variant="contained" color="primary">
                                Stake
                              </LoadingButton>) : (
                              <LoadingButton onClick={unstake}
                                             loading={unstakingStatus === requestState.PENDING}
                                             disabled={amount.eq(0)}
                                             variant="contained" color="primary">
                                Unstake
                              </LoadingButton>
                            )
                          )
                          :
                          (
                            <LoadingButton loading={approvePending}
                                           variant="contained" color="primary"
                                           onClick={onApprove}>
                              Approve
                            </LoadingButton>
                          )
                        }

                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="primary"
                                  className={classes.title}>
                        This project is a community-driven effort. It is not
                        associated in any way with the Alchemix team and its
                        developers. Use at your own risk.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
