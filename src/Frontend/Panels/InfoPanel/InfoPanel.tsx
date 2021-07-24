import { IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useUserPreferences } from '../../Providers/UserPreferencesProvider';
import CloseIcon from '@material-ui/icons/Close';
import { StyledInfoPanel } from './InfoPanel.styles';

export type InfoPanelProps = {

}

export const InfoPanel = (props: InfoPanelProps): React.ReactElement => {
    const { } = props;

    const { getPreference, setPreference } = useUserPreferences();
    const showPanel = getPreference("showInfoPanel");

    return <> {showPanel && <StyledInfoPanel>

        <div>
            <IconButton aria-label="close" className="close-button" onClick={() => {
                console.log("click");
                setPreference("showInfoPanel", false);
            }}>
                <CloseIcon />
            </IconButton>
        </div>
        <strong> I'm rebuilding this!</strong>
        <Typography variant="body2">
            The{" "}
            <a
                href="https://github.com/dwjohnston/geoart-v4"
                target="_blank"
                rel="noreferrer"
            >
                original
            </a>{" "}
            project is still there, but a lot of the features have rotted. 
        </Typography>
        <Typography variant="body2">
            That project was my first real foray in to React development, and I'm
            since a lot better developer
        </Typography>
        <Typography variant="body2">
            The focus this time around is to allow more declarative creation of
            models, and that will enable users to create their own models
        </Typography>

        <Typography variant="body2">
            Follow along with the{" "}
            <a
                href="https://github.com/dwjohnston/geoart-take-100/tree/master/blog"
                target="_blank"
                rel="noreferrer"
            >
                blog
            </a>{" "}
            if you're interested
        </Typography>
    </StyledInfoPanel>}</>;
};
