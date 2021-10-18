import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GenericModal } from "../GenericModal/GenericModal";

import DownloadIcon from "@material-ui/icons/GetApp";
import { StyledImageModalContent } from "./SaveImageModal.style";
import { useTracking } from "../../Providers/TrackingProvider";
import { GifSaver } from "../../Saving/GifSaver";

export type SaveImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  requestImage: () => string | undefined;
};

export const SaveImageModal = (props: SaveImageModalProps) => {
  const { isOpen, onClose, requestImage } = props;

  const [image, setImage] = useState<string | null>(null);
  const { trackShareImageModalOpened, trackDownloadImageClicked } =
    useTracking();
  useEffect(() => {
    if (isOpen) {
      trackShareImageModalOpened();
      setImage(requestImage() || null);
    }
  }, [isOpen, requestImage, trackShareImageModalOpened]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      title={<span>Share your creation</span>}
    >
      <StyledImageModalContent>
        <GifSaver />

        {image ? (
          <>
            {" "}
            <img src={image} alt="your creation" />
            <div className="button-container">
              <Button
                component="a"
                size="large"
                href={image}
                download
                onClick={trackDownloadImageClicked}
              >
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
