import { IconButton } from '@material-ui/core';
import React from 'react';
import { useUserPreferences } from '../../Providers/UserPreferencesProvider';
import CloseIcon from '@material-ui/icons/Close';

export type InfoPanelProps = {

}

export const InfoPanel = (props: InfoPanelProps): React.ReactElement => {
    const { } = props;

    const { getPreference, setPreference } = useUserPreferences();
    const showPanel = getPreference("showInfoPanel");

    console.log(showPanel);

    return <> {showPanel && <div>

        <IconButton aria-label="close" style = {{marginLeft: "auto"}} onClick = {() => {
            console.log("click");
            setPreference("showInfoPanel", false); 
        }}>
            <CloseIcon />
        </IconButton>

        <strong> I'm rebuilding this!</strong>
        <p>
            The{" "}
            <a
                href="https://github.com/dwjohnston/geoart-v4"
                target="_blank"
                rel="noreferrer"
            >
                original
            </a>{" "}
            project died as it was running on an old version of node (6) using GCP
            Firebase, which they discontinued support on.{" "}
        </p>
        <p>
            THat project was my first real foray in to React development, and I'm
            since a lot better developer
        </p>
        <p>
            The focus this time around is to allow more declarative creation of
            models, and that will enable users to create their own models
        </p>

        <p>
            Follow along with the{" "}
            <a
                href="https://github.com/dwjohnston/geoart-take-100/tree/master/blog"
                target="_blank"
                rel="noreferrer"
            >
                blog
            </a>{" "}
            if you're interested
        </p>
    </div>}</>;
};
