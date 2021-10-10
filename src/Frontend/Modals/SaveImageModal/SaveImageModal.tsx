import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GenericModal } from "../GenericModal/GenericModal";

import DownloadIcon from "@material-ui/icons/GetApp";
import { StyledImageModalContent } from "./SaveImageModal.style";

export type SaveImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  requestImage: () => string | undefined;
};

export const SaveImageModal = (props: SaveImageModalProps) => {
  const { isOpen, onClose, requestImage } = props;

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setImage(requestImage() || null);
    }
  }, [isOpen, requestImage]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={<span>Share your creation</span>}
    >
      <StyledImageModalContent>
        {image ? (
          <>
            {" "}
            <img src={image} alt="your creation" />
            <div className="button-container">
              <Button component="a" size="large" href={image} download>
                {" "}
                <DownloadIcon />
              </Button>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </StyledImageModalContent>
    </GenericModal>
  );
};
