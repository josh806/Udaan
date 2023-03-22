import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as userService from '../services/user.service';
import { User } from '../types/user';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const initialUser = {
  firstName: '',
  lastName: '',
  email: 'josh@school.com',
  username: '',
  student: true,
};
// export type User = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   username: string;
//   student: boolean;
//   schoolId?: number;
//   age: number
// };

/*
First name
Last name
Set nickname (unique)
email (blocked)
*/

const Profile = () => {
  const { user } = useAuth0();
  const [currUser, setCurrUser] = useState<User>(initialUser);

  useEffect(() => {
    if (user) {
      userService.getUser(user.sub).then((response: User) => {
        console.log(response);
        setCurrUser(response);
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateCurrUser = { ...currUser };
    const userKey = e.target.name as 'firstName' | 'lastName' | 'username';
    updateCurrUser[userKey] = e.target.value;

    setCurrUser(updateCurrUser);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currUser);
  };

  return (
    currUser && (
      <div className="profile">
        <div className="_form">
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              label="First name"
              variant="outlined"
              name="firstName"
              value={currUser.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last name"
              variant="outlined"
              name="lastName"
              value={currUser.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={currUser.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              name="email"
              value={currUser.email}
              helperText="Contact administrator to change"
              disabled
            />
            <Button
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </div>
      </div>
    )
  );
};

export default Profile;
