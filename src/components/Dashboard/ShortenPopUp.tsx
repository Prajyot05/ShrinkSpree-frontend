import React from "react";
import { Modal } from "@mui/material";
import CreateNewShorten from "./CreateNewShorten";

interface ShortenPopUpProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const ShortenPopUp: React.FC<ShortenPopUpProps> = ({
  open,
  setOpen,
  refetch,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center h-full w-full">
        <CreateNewShorten setOpen={setOpen} refetch={refetch} />
      </div>
    </Modal>
  );
};

export default ShortenPopUp;
