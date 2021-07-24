import { IconButton, Typography } from '@material-ui/core';
import BugReport from "@material-ui/icons/BugReport";
import Pause from "@material-ui/icons/Pause";
import React from 'react';
import { useUserPreferences } from '../../Providers/UserPreferencesProvider';
import { StyledHeader } from './Header.styles';



export type HeaderProps = {

}

export const Header = (props: HeaderProps) => {
  const { } = props;


  const { getPreference, setPreference } = useUserPreferences();

  const showDebugPanel = getPreference("showDebug");
  const isPaused = getPreference("isPaused");

  const handlePauseClick = () => {
    setPreference("isPaused", !isPaused)
  }

  const handleDebugClick = () => {
    setPreference("showDebug", !showDebugPanel)

  }

  return <><StyledHeader>
    <Typography variant="h1" className ="header-text">GeoPlanets - interactive geometric art</Typography>


    <div className="buttons">
      {/* TODO: better toggle styling */}
      <IconButton aria-label="toggle pause" onClick={handlePauseClick}>
        <Pause />
      </IconButton>
      <IconButton aria-label="toggle debug panel" onClick={handleDebugClick}>
        <BugReport />
      </IconButton>
    </div>
  </StyledHeader>
  </>;
};
