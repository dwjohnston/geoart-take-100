import React, { useEffect, useRef } from "react";

import * as Algorithms from "../../Algorithms/_index";

type UserPreferences = {
  showInfoPanel: boolean;
  showDebug: boolean;
  isPaused: boolean;
  selectedAlgorithm: keyof typeof Algorithms;
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

  //We prevent a flash of 'initialPreferences' by setting them all to null to start.
  //initial values will be set in the useEffect
  const [inMemoryState, setInMemoryState] = React.useState(
    Object.entries(initialPreferences).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: null,
      };
    }, {} as typeof initialPreferences)
  );

  useEffect(() => {
    Object.entries(initialPreferences).forEach(([_key, value]) => {
      const key = _key as keyof UserPreferences;
      const valueFromLocalStorage = window.localStorage.getItem(
        prefix + "__" + key
      );

      const existingPreference = JSON.parse(valueFromLocalStorage || "null");
      console.log(key, existingPreference);
      if (existingPreference === null) {
        setUserPreference(key, value);
      } else {
        console.log(key, existingPreference);
        setInMemoryState((state) => {
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
    console.log(inMemoryState);
    return inMemoryState[key];
  };

  const setUserPreference = <T extends keyof UserPreferences>(
    key: T,
    value: UserPreferences[T]
  ): UserPreferences[T] => {
    console.log(key, value);
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
