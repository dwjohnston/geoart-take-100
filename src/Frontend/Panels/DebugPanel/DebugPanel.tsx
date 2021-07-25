import React from "react";
import { Debug } from "../../DebugTools/Debug";
import { useUserPreferences } from "../../Providers/UserPreferencesProvider";

export type DebugPanelProps = {
  onChangeValue: unknown;
};

export const DebugPanel = (props: DebugPanelProps) => {
  const { onChangeValue } = props;

  const { getPreference } = useUserPreferences();
  const showDebug = getPreference("showDebug");
  return <>{showDebug && <Debug label="onChange" item={onChangeValue} />}</>;
};
