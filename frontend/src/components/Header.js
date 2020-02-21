import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import {
  IconButton,
  Tooltip,
  AppBar,
  Typography,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';
import { isDarkSelector } from 'selectors/theme';

function Component({ toggleTheme, isDark }) {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar color="inherit">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          className={'flex flex--justify-center flex--grow'}
        >
          Counter
        </Typography>

        <Tooltip title="Toggle light/dark theme">
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Toggle light/dark theme"
          >
            {isDark ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return {
    isDark: isDarkSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
