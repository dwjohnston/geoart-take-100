import App from "../App";
import { GlobalControlsContextProvider } from "../Providers/GlobalControlsProvider";
import { SaveImageModalProviderContextProvider } from "../Providers/SaveImageModalProvider";
import { UserPreferencesContextProvider } from "../Providers/UserPreferencesProvider";

export function Main() {
  return (
    <UserPreferencesContextProvider
      initialPreferences={{
        showDebug: false,
        showInfoPanel: true,
        isPaused: false,
        selectedAlgorithm: "EarthVenusAlgorithm",
      }}
    >
      <GlobalControlsContextProvider>
        <SaveImageModalProviderContextProvider>
          <App />
        </SaveImageModalProviderContextProvider>
      </GlobalControlsContextProvider>
    </UserPreferencesContextProvider>
  );
}
