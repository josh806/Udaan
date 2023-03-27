import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import * as pages from './pages';
import './App.css';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/user';
import { useAuth0 } from '@auth0/auth0-react';
import * as userService from './services/user.service';

import Loading from './features/Loading';

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    (async () => {
      console.log('app level');
      console.log(user);
      if (user && user.sub) {
        try {
          console.log('here');
          const response = await userService.getUser(user.sub);
          response.newUser = false;
          console.log(response);
          dispatch(updateUser(response));
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [user]);

  return (
    <>
      {!loading ? (
        <div className='App'>
          <Routes>
            <Route path='/' element={<pages.Home />} />
            <Route path='/profile' element={<pages.Profile />} />
            <Route path='/school' element={<pages.School />} />
            <Route path='*' element={<pages.NotFound />} />
          </Routes>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
