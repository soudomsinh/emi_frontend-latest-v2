import { Outlet, useNavigate } from "react-router-dom"
import Drawer from "../components/Drawer"
import { useState, useEffect } from "react";
import AuthenticationPage from "../pages/AuthenticationPage";
import LoginPage from "../pages/LoginPage";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = ()=>{
    setIsAuthenticated(true);
  };

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/authen');
    }
  },[isAuthenticated, navigate]);

  return (
    <div className="flex" >
      {isAuthenticated && <Drawer />}
      <div className="flex-grow">
        {isAuthenticated ? 
          (<Outlet />
        ) : (
          <AuthenticationPage onLogin={handleLogin} />
        )}
        
      </div>
      
    </div>
  );
};

export default MainLayout