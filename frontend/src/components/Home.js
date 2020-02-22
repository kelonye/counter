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
  count,
  incrementCount,
  decrementCount,
  resetCount,
}) {
  const classes = useStyles();

  return (
    <div className={clsx('flex flex--justify-center', classes.container)}>
      <Paper
        className={clsx(classes.paper, {
          [classes.paperInactive]: isTrackingTransaction,
        })}
      >
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
  ({ count, wallet }) => ({
    count,
    isTrackingTransaction: wallet.isTrackingTransaction,
  }),
  mapDispatchToProps
)(Component);
