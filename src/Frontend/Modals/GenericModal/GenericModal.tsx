import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import {
  StyledCloseButtonContainer,
  StyledDialogTitle,
} from "./GenericModal.style";
import CloseIcon from "@material-ui/icons/Close";

export type GenericModalProps = {
  onClose: () => void;
  isOpen: boolean;
  title: React.ReactElement;
};
export const GenericModal = (props: PropsWithChildren<GenericModalProps>) => {
  const { children, isOpen, title, onClose } = props;
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <StyledCloseButtonContainer>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </StyledCloseButtonContainer>

      <StyledDialogTitle>{title}</StyledDialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
