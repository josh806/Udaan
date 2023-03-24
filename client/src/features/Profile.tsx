import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as userService from '../services/user.service';
import AuthRequired from '../pages/AuthRequired';
import { User } from '../types/types';

import Field from '../components/Field';

import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  student: true,
  schoolId: 1,
};

const Profile = () => {
  const { user } = useAuth0();

  const [currUser, setCurrUser] = useState<User>(initialUser);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [content, setContent] = useState('');
  const [usernameProps, setUsernameProps] = useState({
    name: 'username',
    label: 'Username',
    isRequired: true,
    isError: false,
    helperText: '',
  });

  useEffect(() => {
    (async () => {
      if (user && user.sub) {
        try {
          const response = await userService.getUser(user.sub);
          setCurrUser(response);

          if ('error' in response) {
            // New user
            if (user.email) {
              setCurrUser({
                ...currUser,
                id: user.sub,
                email: user.email,
                newUser: true,
              });
            }
            setContent('Please fill out your information');
          } else {
            // Existing user
            setContent('Update your information');
          }
        } catch (error) {
          console.log('--- Error occured ---'); //------------- handle error
          console.log(error);
        }
      }
    })();
  }, [user]);

  const usernameExists = async (username: string) => {
    const result = await userService.getUserByUsername(username);
    return !('error' in result);
  };

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updateCurrUser = { ...currUser };
    const userKey = e.target.name as 'firstName' | 'lastName' | 'username';
    updateCurrUser[userKey] = e.target.value;

    if (userKey === 'username') setUsernameChanged(true);

    setCurrUser(updateCurrUser);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameChanged && (await usernameExists(currUser.username))) {
      // Username already exists
      console.log('--- username already exists ---');
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
      if (currUser.newUser) {
        // Create user
        console.log('--- user info ---');
        userFromDb = await userService.createUser(currUser);

        // Message: Successfully created
      } else {
        // Update user
        userFromDb = await userService.updateUser(currUser);

        // Message: Successfully updated
      }
      // set redux user-------------------
    }
  };

  function getCommonInputProps() {
    return {
      handleChange: handleChange,
      isRequired: true,
    };
  }

  return (
    <AuthRequired>
      {currUser && (
        <div className="profile">
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
                  <Button
                    className="_form__field _form__field--submit"
                    type="submit"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      )}
    </AuthRequired>
  );
};

export default Profile;
