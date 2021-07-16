import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {formatGwei} from "../../utils";
import Slider from "@material-ui/core/Slider";
import React, {useEffect, useState} from "react";
import {ethers} from 'ethers'
import {TOKEN_SYMBOLS, BIG_ZERO} from "../../constants";
import {useWeb3React} from "@web3-react/core";
import {useGetBalance} from "../../hooks/useBalance";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
  slider: {
    padding: 5
  }
}));

export default function SelectAmount({
                                       relevantToken,
                                       amount,
                                       setAmount,
                                       balance,
                                       setBalance
                                     }) {

  const classes = useStyles();
  const context = useWeb3React()
  const tokenBalances = useGetBalance()
  const [lock, setLock] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const [displayedAmount, setDisplayedAmount] = useState(formatGwei(amount,2))
  const { account } = context

  useEffect(() => {
    if (tokenBalances && tokenBalances[relevantToken]) {
      setBalance(tokenBalances[relevantToken])
    }
    else {
      setBalance(BIG_ZERO)
    }
  }, [tokenBalances, relevantToken, account, setBalance])

  useEffect(() => {
    if (lock) {
      return
    }
    setDisplayedAmount(formatGwei(amount, 2))
    const percentage = (balance > 0) ? amount.mul(100).div(balance) : BIG_ZERO
    setSliderValue(percentage)
  }, [amount, balance]);

  const handleInputChange = (event) => {
    setLock(true)
    let targetValue = event.target.value.replace(/,/g, '.')
    setDisplayedAmount(targetValue)
  };
  
  const handleInputBlur = (event) => {
    let targetValue = event.target.value
    let newGweiAmount = BIG_ZERO
    if (targetValue) {
        targetValue = targetValue.replace(/,/g, '.')
        targetValue = targetValue.replace(/[^0-9.]/g, '');
        newGweiAmount = ethers.utils.parseEther(targetValue)
      }

    if (newGweiAmount.gt(balance)) {
      newGweiAmount = balance
    }
    setAmount(newGweiAmount)
    setLock(false)
  };

  const getBalanceHelperText = () => {
    let res = "Balance: " + formatGwei(balance,2) + ' '
    if (account) {
      res += (TOKEN_SYMBOLS[relevantToken] ? TOKEN_SYMBOLS[relevantToken] : '')
    }
    return res
  }

  function ValueLabelComponent(props) {
    const {children, open, value} = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top"
               title={value + '%'}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue)
    const percentage = balance.mul(newValue).div(100)
    setAmount(percentage);
    setDisplayedAmount(formatGwei(percentage, 2));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          onBlur={handleInputBlur}
          value={displayedAmount}
          onChange={handleInputChange}
          label="Amount"
          type="number"
          title="Enter the amount"
          inputProps={{
            min: 0,
            max: ethers.utils.formatUnits(balance, 18),
          }}
          fullWidth={true}
          variant="outlined"
          helperText={getBalanceHelperText()}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.slider}>
          <Slider
            disabled={balance <= 0}
            value={sliderValue}
            ValueLabelComponent={ValueLabelComponent}
            onChange={handleSliderChange}
          />
        </div>
      </Grid>
    </Grid>
  )
}
