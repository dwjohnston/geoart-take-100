import React from "react";

type Tracking = {
  trackAlgorithmSelected: (algorithmName: string) => void;
  trackControlChanged: (data: {
    controlKey: string;
    controlType: string;
  }) => void;
  trackFeatureToggled: (featureName: string, state: boolean) => void;

  trackShareImageModalOpened: () => void;
  trackDownloadImageClicked: () => void;
};

const TrackingContext = React.createContext<Tracking>({
  trackAlgorithmSelected: () => undefined,
  trackControlChanged: () => undefined,
  trackFeatureToggled: () => undefined,
  trackShareImageModalOpened: () => undefined,
  trackDownloadImageClicked: () => undefined,
});

export const TrackingContextProvider = (
  props: React.PropsWithChildren<Partial<Tracking>>
) => {
  const { children, ...rest } = props;

  return (
    <TrackingContext.Provider
      value={{
        trackAlgorithmSelected: (algorithmName: string) => {
          window.analytics.track("algorithm selected", {
            algorithmName,
          });
        },
        trackControlChanged: (data: {
          controlKey: string;
          controlType: string;
        }) => {
          window.analytics.track("control changed", data);
        },
        trackFeatureToggled: (featureName: string, state: boolean) => {
          window.analytics.track("feature toggled", {
            featureName,
            state,
          });
        },

        trackShareImageModalOpened: () => {
          window.analytics.track("share image modal opened");
        },

        trackDownloadImageClicked: () => {
          window.analytics.track("download image clicked");
        },

        ...rest,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = (): Tracking => {
  return React.useContext(TrackingContext);
};
