import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Paper, Chip, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import IncrementCountIcon from '@material-ui/icons/Add';
import DecrementCountIcon from '@material-ui/icons/Remove';
import Loader from './Loader';
import { COUNTER_CONTRACT } from 'contracts';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  paper: { marginTop: 50, padding: 50 },
  paperInactive: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  resetContainer: { marginTop: 20 },
  loader: {
    position: 'absolute',
    top: '50%',
  },
}));

function Component({
  isTrackingTransaction,
  account,
  count,
  incrementCount,
  decrementCount,
  resetCount,
  activateWallet,
  networkName,
  networkSupported,
  updateWallet,
  updateData,
}) {
  const classes = useStyles();

  React.useEffect(() => {
    if (networkSupported) {
      COUNTER_CONTRACT.on('Count', function(err, result) {
        if (err) {
          return console.error(err);
        }
        updateData({ count: parseInt(result.returnValues.count) });
      });
    }

    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        document.location.reload();
      });

      window.ethereum.on('accountsChanged', function(accounts) {
        updateWallet({ account: accounts[0] });
      });
    }
  }, [networkSupported, updateData, updateWallet]);

  let pane;

  if (!networkSupported) {
    pane = (
      <div className="flex flex--column flex--justify-center flex--align-center">
        Unsuported network: {networkName}
      </div>
    );
  } else if (!account) {
    pane = (
      <Button
        variant="contained"
        onClick={activateWallet}
        disabled={!window.ethereum}
        fullWidth
        color="secondary"
      >
        CONNECT TO METAMASK
      </Button>
    );
  } else {
    pane = (
      <React.Fragment>
        <div className="flex flex--justify-center flex--align-center">
          <IconButton aria-label="Decrement Count" onClick={decrementCount}>
            <DecrementCountIcon />
          </IconButton>

          <Chip label={count} />

          <IconButton aria-label="Increment Count" onClick={incrementCount}>
            <IncrementCountIcon />
          </IconButton>
        </div>

        <div className={classes.resetContainer}>
          <Button
            variant="contained"
            onClick={resetCount}
            fullWidth
            color="secondary"
          >
            RESET
          </Button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={clsx('flex flex--justify-center', classes.container)}>
      <Paper
        className={clsx(classes.paper, {
          [classes.paperInactive]: isTrackingTransaction,
        })}
      >
        {pane}
      </Paper>

      {!isTrackingTransaction ? null : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default connect(
  ({
    data: { count },
    wallet: { isTrackingTransaction, account, networkName, networkSupported },
  }) => ({
    count,
    isTrackingTransaction,
    account,
    networkName,
    networkSupported,
  }),
  mapDispatchToProps
)(Component);
