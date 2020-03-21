import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';  
import { AuthContext } from './context/AuthContext';
import { NavBar } from './components/NavBar';
import 'materialize-css';


function App() {
  const {login, logout, token, userId} = useAuth();

  const isAuthentificated = !!token;

  const routes = useRoutes(isAuthentificated);
  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthentificated
    }}>
      <Router>
        { isAuthentificated && <NavBar /> }
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
