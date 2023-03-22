import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as userService from '../services/user.service';
import AuthRequired from '../pages/AuthRequired';
import { User } from '../types/user';

import Field from '../components/Field';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Typography } from '@mui/material';

// export type User = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   student: boolean;
//   schoolId?: number;
// };

/*
First name
Last name
Set nickname (unique)
email (blocked)
*/

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  student: true,
};
const mockUser = {
  firstName: 'Josh',
  lastName: 'Smith',
  email: 'hello@helloworld.com',
  username: 'jsmith',
  student: true,
};

const Profile = () => {
  const { user } = useAuth0();

  const [currUser, setCurrUser] = useState<User>(initialUser);
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log(user);
    if (user) {
      userService
        .getUser(user.sub)
        .then((response) => {
          console.log(response);
          setCurrUser(response);
          if ('error' in response) {
            console.log('--- Create user ---');
            if (user.email)
              setCurrUser({ ...currUser, email: user.email, newUser: true });
            setContent('Please fill out your information');
          } else {
            console.log('--- Update user ---');
            setCurrUser(mockUser);
            setContent('Update your information');
          }
        })
        .catch((error) => {
          console.log('--- Error occured ---'); //------------- handle error
          console.log(error);
        });
    }
  }, [user]);

  const usernameExists = async (username: string) => {
    return await userService.getUser(username).then((response) => {
      console.log(response);
      return !('error' in response);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateCurrUser = { ...currUser };
    const userKey = e.target.name as 'firstName' | 'lastName' | 'username';
    updateCurrUser[userKey] = e.target.value;

    if (userKey === 'username') setUsernameChanged(true);

    setCurrUser(updateCurrUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameChanged && (await usernameExists(currUser.username))) {
      console.log('--- username already exists ---');
    } else {
      if (currUser.newUser) {
        // create user
        userService.createUser(currUser);
        console.log(currUser);
        // firstName,
        //   lastName,
        //   email,
        //   username,
        //   student,
        //   schoolId,
      } else {
        // update user
      }
    }
    console.log(currUser);
  };

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
                    name="firstName"
                    label="First name"
                    value={currUser.firstName}
                    handleChange={handleChange}
                    isRequired={true}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <Field
                    name="lastName"
                    label="Last name"
                    value={currUser.lastName}
                    handleChange={handleChange}
                    isRequired={true}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <Field
                    name="username"
                    label="Username"
                    value={currUser.username}
                    handleChange={handleChange}
                    isRequired={true}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <Field
                    name="email"
                    label="Email"
                    value={currUser.email}
                    handleChange={handleChange}
                    isRequired={true}
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
