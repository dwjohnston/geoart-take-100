import React, { useEffect } from "react";

type UserPreferences = {
  showInfoPanel: boolean;
  showDebug: boolean;
  isPaused: boolean;
};

type UserPreferencesContextProps = {
  prefix?: string;
  initialPreferences: UserPreferences;
};

type UserPreferencesContextType = {
  getPreference: <T extends keyof UserPreferences>(
    key: T
  ) => UserPreferences[T] | null;
  setPreference: <T extends keyof UserPreferences>(
    key: T,
    value: UserPreferences[T]
  ) => UserPreferences[T];
};

const UserPreferencesContext = React.createContext<UserPreferencesContextType>({
  getPreference: () => {
    throw new Error("Context not yet initialized");
  },
  setPreference: () => {
    throw new Error("Context not yet initialized");
  },
});

export const UserPreferencesContextProvider = (
  props: React.PropsWithChildren<UserPreferencesContextProps>
) => {
  const { children, prefix = "user-preference", initialPreferences } = props;

  const [inMemoryState, setInMemoryState] = React.useState(initialPreferences);

  useEffect(() => {
    Object.entries(initialPreferences).forEach(([_key, value]) => {
      const key = _key as keyof UserPreferences;
      const valueFromLocalStorage = window.localStorage.getItem(
        prefix + "__" + key
      );
      const existingPreference = JSON.parse(valueFromLocalStorage || "null");
      if (existingPreference === null) {
        setUserPreference(key, value);
      } else {
        setInMemoryState((state) => {
          console.log("got here", value);
          return {
            ...state,
            [key]: existingPreference,
          };
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix, initialPreferences]);

  const getUserPreference = <T extends keyof UserPreferences>(
    key: T
  ): UserPreferences[T] | null => {
    return inMemoryState[key];
  };

  const setUserPreference = <T extends keyof UserPreferences>(
    key: T,
    value: UserPreferences[T]
  ): UserPreferences[T] => {
    setInMemoryState((state) => {
      const keyToUse = prefix + "__" + key;
      window.localStorage.setItem(keyToUse, JSON.stringify(value));
      return {
        ...state,
        [key]: value,
      };
    });

    return value;
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        getPreference: getUserPreference,
        setPreference: setUserPreference,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = (): UserPreferencesContextType => {
  return React.useContext(UserPreferencesContext);
};
