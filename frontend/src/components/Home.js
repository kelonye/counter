import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import IncrementCountIcon from '@material-ui/icons/Add';
import DecrementCountIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  paper: { marginTop: 50, padding: 50 },
  resetContainer: { marginTop: 20 },
}));

function Component({ count, incrementCount, decrementCount, resetCount }) {
  const classes = useStyles();

  return (
    <div className="flex flex--justify-center">
      <Paper className={classes.paper}>
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
    </div>
  );
}

export default connect(
  ({ count }) => ({ count }),
  mapDispatchToProps
)(Component);
