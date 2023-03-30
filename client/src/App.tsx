import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import routes from './utils/routes';
import './App.css';

import CustomAlert from './components/CustomAlert/CustomAlert';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const noNavbar = ['/', '/school'];

function App() {
  const alert = useSelector((state: RootState) => state.alert);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowAlert(alert.checked);
  }, [alert]);

  const renderNavbar = () => {
    if (!noNavbar.includes(location.pathname)) {
      return <Navbar />;
    }
  };

  return (
    <div className="App">
      {renderNavbar()}
      <Routes>
        <Route
          path={routes.home.url}
          element={<pages.Home />}
        />
        <Route
          path={routes.profile.url}
          element={<pages.Profile />}
        />
        <Route
          path={routes.school.url}
          element={<pages.School />}
        />
        <Route
          path={routes.lessons.url}
          element={<pages.LessonsPage />}
        />
        <Route
          path="*"
          element={<pages.NotFound />}
        />
      </Routes>

      {showAlert && (
        <CustomAlert
          message={alert.message}
          severity={alert.severity}
          checked={alert.checked}
        />
      )}
    </div>
  );
}

export default App;
