import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as pages from './pages';
import routes from './utils/routes';
import './App.css';

import CustomAlert from './components/CustomAlert/CustomAlert';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';

function App() {
  const alert = useSelector((state: RootState) => state.alert);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(alert.checked);
  }, [alert]);

  return (
    <div className="App">
      <Routes>
        <Route
          path={routes.home}
          element={<pages.Home />}
        />
        <Route
          path={routes.profile}
          element={<pages.Profile />}
        />
        <Route
          path={routes.school}
          element={<pages.School />}
        />
        <Route
          path={routes.lessons}
          element={<pages.Lessons />}
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
