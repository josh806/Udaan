import React, { useEffect, useState } from 'react';
import * as userService from '../services/user.service';
import { User } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/user';
import { showNewAlert } from '../redux/alert';

import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

import Field from '../components/Field';
import Avatars from './Avatars/Avatars';
import { Box, Button, Grid, Typography, AlertColor } from '@mui/material';
import routes from '../utils/routes';

const RegisterProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const [currUser, setCurrUser] = useState<User>(storedUser);

  const [usernameChanged, setUsernameChanged] = useState(false);
  const content = location.state?.message || 'Update your information';

  const [usernameProps, setUsernameProps] = useState({
    name: 'username',
    label: 'Username',
    isRequired: true,
    isError: false,
    helperText: '',
  });

  useEffect(() => {
    if (location.state?.authUser) {
      const { authUser } = location.state;

      // New user
      setCurrUser({
        ...currUser,
        id: authUser.sub,
        email: authUser.email,
        newUser: true,
      });
    } else {
      setCurrUser(storedUser);
    }
  }, [storedUser]);

  const usernameExists = async (username: string) => {
    const result = await userService.getUserByUsername(username);
    return !('error' in result);
  };

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tmpCurrUser = { ...currUser };
    const userKey = e.target.name as
      | 'firstName'
      | 'lastName'
      | 'username'
      | 'avatar';
    tmpCurrUser[userKey] = e.target.value;

    if (userKey === 'username') setUsernameChanged(true);

    setCurrUser(tmpCurrUser);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameChanged && (await usernameExists(currUser.username))) {
      // Username already exists
      setUsernameProps({
        ...usernameProps,
        isError: true,
        helperText: 'Username already in use',
      });
    } else {
      // Reset username error
      setUsernameProps({
        ...usernameProps,
        isError: false,
        helperText: '',
      });

      let userFromDb;
      let successMessage;
      if (currUser.newUser) {
        // Create user
        userFromDb = await userService.createUser(currUser);
        successMessage = 'Successfully created user';
      } else {
        // Update user
        userFromDb = await userService.updateUser(currUser);
        successMessage = 'Successfully updated user';
      }

      // Update user
      dispatch(
        updateUser({
          ...userFromDb,
          newUser: false,
          inCall: false,
        })
      );

      // Refresh page
      navigate(0);

      // Show alert
      dispatch(
        showNewAlert({
          message: successMessage,
          severity: 'success' as AlertColor,
          checked: true,
        })
      );
    }
  };

  function getCommonInputProps() {
    return {
      handleChange: handleChange,
      isRequired: true,
    };
  }

  return (
    <>
      <div className="profile">
        <div className="profile__content">
          <Typography
            variant="h4"
            gutterBottom
          >
            My Profile
          </Typography>

          {content && (
            <Typography
              variant="subtitle1"
              gutterBottom
            >
              {content}
            </Typography>
          )}
        </div>

        <div className="_form">
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={6}
              >
                <Field
                  {...getCommonInputProps()}
                  name="firstName"
                  label="First name"
                  value={currUser.firstName}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Field
                  {...getCommonInputProps()}
                  name="lastName"
                  label="Last name"
                  value={currUser.lastName}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Field
                  {...usernameProps}
                  value={currUser.username}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Field
                  {...getCommonInputProps()}
                  name="email"
                  label="Email"
                  value={currUser.email}
                  isDisabled={true}
                  helperText="Contact administrator to change"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  align="left"
                >
                  Choose avatar
                </Typography>
                <Avatars
                  valChecked={currUser.avatar}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Button
                  className="_form__field _form__field--submit"
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default RegisterProfile;
