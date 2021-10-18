import { Dialog, DialogTitle, Modal } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { SaveImageModal } from "../Modals/SaveImageModal/SaveImageModal";

type SaveImageModalProvider = {
  openModalFn: () => void;

  registerImageSave: (saveImage: () => string | undefined) => void;
};

const SaveImageModalProviderContext =
  React.createContext<SaveImageModalProvider>({
    openModalFn: () => {},

    registerImageSave: () => {},
  });

export const SaveImageModalProviderContextProvider = (
  props: React.PropsWithChildren<{}>
) => {
  const { children, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);

  const imageSaverRef = useRef<() => string | undefined>(() => {
    return undefined;
  });
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SaveImageModalProviderContext.Provider
      value={{
        openModalFn: () => {
          setIsOpen(true);
        },

        registerImageSave: (imageSaver) => {
          imageSaverRef.current = imageSaver;
        },
      }}
    >
      <SaveImageModal
        onClose={handleClose}
        isOpen={isOpen}
        requestImage={imageSaverRef.current}
      />
      {children}
    </SaveImageModalProviderContext.Provider>
  );
};

export const useSaveImageModalProvider = (): SaveImageModalProvider => {
  return React.useContext(SaveImageModalProviderContext);
};
