import { IconButton, Typography } from "@material-ui/core";
import BugReport from "@material-ui/icons/BugReport";
import Pause from "@material-ui/icons/Pause";
import Play from "@material-ui/icons/PlayArrow";
import React from "react";
import { useTracking } from "../../Providers/TrackingProvider";
import { useUserPreferences } from "../../Providers/UserPreferencesProvider";
import { StyledHeader } from "./Header.styles";

export type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  const {} = props;

  const { trackFeatureToggled } = useTracking();

  const { getPreference, setPreference } = useUserPreferences();

  const showDebugPanel = getPreference("showDebug");
  const isPaused = getPreference("isPaused");

  const handlePauseClick = () => {
    setPreference("isPaused", !isPaused);
    // Possibly move the tracking events into the preferences provider?
    trackFeatureToggled("isPaused", !isPaused);
  };

  const handleDebugClick = () => {
    setPreference("showDebug", !showDebugPanel);
    trackFeatureToggled("showDebug", !showDebugPanel);
  };

  return (
    <>
      <StyledHeader>
        <Typography variant="h1" className="header-text">
          GeoPlanets - interactive geometric art
        </Typography>

        <div className="buttons">
          {/* TODO: better toggle styling */}
          <IconButton aria-label="toggle pause" onClick={handlePauseClick}>
            {isPaused ? <Play /> : <Pause />}
          </IconButton>
          <IconButton
            aria-label="toggle debug panel"
            onClick={handleDebugClick}
          >
            <BugReport />
          </IconButton>
        </div>
      </StyledHeader>
    </>
  );
};
