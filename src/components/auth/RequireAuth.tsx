import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '../../context/session.context';

const RequireAuth = () => {

  const sessionContext = useSessionContext();

  if (!sessionContext.isLoggedIn) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}

export default RequireAuth;
