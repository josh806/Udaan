import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
  textAlign: 'center',
};

type Props = {
  open: any;
  handleModal?: any;
  children: JSX.Element;
  padding?: number;
};

function BasicModal({ open, handleModal, padding = 6, children }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={{ ...style, p: padding }}>{children}</Box>
    </Modal>
  );
}

export default BasicModal;
