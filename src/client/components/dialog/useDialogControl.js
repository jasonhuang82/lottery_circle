import { useState, useCallback } from "react";
const useDialogControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [
    isOpen,
    openDialog,
    closeDialog,
  ];
};

export default useDialogControl;
