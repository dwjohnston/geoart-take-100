import React from "react";
import { useUserPreferences } from "./UserPreferencesProvider";

type GlobalControls = {
  isPaused: boolean;
};

const GlobalControlsContext = React.createContext<GlobalControls>({
  isPaused: false,
});

export const GlobalControlsContextProvider = (
  props: React.PropsWithChildren<{}>
) => {
  const { children } = props;

  const { getPreference } = useUserPreferences();

  const isPaused = getPreference("isPaused");

  return (
    <GlobalControlsContext.Provider
      value={{
        isPaused: isPaused || false,
      }}
    >
      {children}
    </GlobalControlsContext.Provider>
  );
};

export const useGlobalControls = (): GlobalControls => {
  return React.useContext(GlobalControlsContext);
};
