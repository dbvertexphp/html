import React, { useEffect } from 'react';
import AllRoutes from './Routes/AllRoutes';

const App = () => {
  useEffect(() => {
    // Set the initial timestamp in local storage on component mount
    localStorage.setItem('lastActivity', Date.now());

    // Define the session timeout duration in milliseconds (30 minutes)
    const sessionTimeout = 60 * 60 * 1000;
    //const sessionTimeout = 10 * 1000;
    // Check for inactivity and remove local storage after timeout
    const checkInactivity = () => {
      const lastActivity = parseInt(localStorage.getItem('lastActivity'), 10) || 0;
      const currentTime = Date.now();

      if (currentTime - lastActivity > sessionTimeout) {
        // Remove local storage keys
        localStorage.removeItem('vendor_detail_carvendor');
        localStorage.removeItem('vendor_token_carvendor');

        localStorage.removeItem('user_detail_carvendor');
        localStorage.removeItem('admin_token_carvendor');

        localStorage.removeItem('employee_detail_carvendor');
        localStorage.removeItem('employee_token_carvendor');

        localStorage.removeItem('customer_detail_carvendor');
        localStorage.removeItem('customer_token_carvendor');
        localStorage.removeItem('customer_detail_email');
        // Perform any additional logout or session expiration actions here
        //console.log('Session expired due to inactivity.');
      }
    };

    // Set up interval to check for inactivity
    const intervalId = setInterval(checkInactivity, 1000); // Check every second

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run only once on component mount

  // Update lastActivity timestamp on user activity
  const handleActivity = () => {
    localStorage.setItem('lastActivity', Date.now());
    // Add any other activity-related logic here
    //console.log('User activity detected.');
  };

  return (
    <div onMouseMove={handleActivity} onClick={handleActivity}>
      <AllRoutes />
    </div>
  );
};

export default App;
