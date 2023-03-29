import React, { useEffect, useState } from 'react';
import { Alert, AlertColor, Slide } from '@mui/material';

import './CustomAlert.css';
import { useDispatch } from 'react-redux';
import { showNewAlert } from '../../redux/alert';

type Props = {
  message: string;
  severity?: AlertColor;
  checked?: boolean;
};

function CustomAlert({
  message,
  severity = 'success',
  checked = false,
}: Props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(checked);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => {
      clearTimeout(timeId);
      dispatch(
        showNewAlert({
          message: '',
          severity: '' as AlertColor,
          checked: false,
        })
      );
    };
  }, []);

  return (
    <div className="customAlert">
      <Slide
        direction="up"
        in={show}
        mountOnEnter
        unmountOnExit
      >
        <Alert severity={severity}>{message}</Alert>
      </Slide>
    </div>
  );
}

export default CustomAlert;
