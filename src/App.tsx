import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FeedbackAlert from './components/FeedbackAlert';
import GenerateWorkout from './components/generate/GenerateWorkout';
// import CustomizeWorkout from './components/CustomizeWorkout/CustomizeWorkout';
import PageNotFound from './components/PageNotFound';
// import About from './components/About';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { FeedbackProvider } from './context/feedback.context';
import { SessionProvider } from './context/session.context';

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        {/* <UserProvider> */}
          {/* <ExerciseProvider> */}
            <FeedbackProvider>
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />

                {/* Private Routes */}
                <Route element={<RequireAuth />}>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/generate' element={<GenerateWorkout />} />
                  {/* <Route path='/customize' element={<CustomizeWorkout />} /> */}
                  {/* <Route path='/about' element={<About />} /> */}
                  {/* <Route path='/users' element={<UserDashboard />} /> */}
                  {/* <Route path='/users/new' element={<UserFormCreate />} /> */}
                  {/* <Route path='/users/:id' element={<UserEditor />} /> */}
                  {/* <Route path='/exercises' element={<ExerciseDashboard />} /> */}
                  {/* <Route path='/exercises/new' element={<ExerciseFormCreate />} /> */}
                  {/* <Route path='/exercises/:id' element={<ExerciseEditor />} /> */}
                  <Route path='*' element={<PageNotFound />} />
                </Route>
              </Routes>
              <FeedbackAlert />
            </FeedbackProvider>
          {/* </ExerciseProvider> */}
        {/* </UserProvider> */}
      </SessionProvider>
    </Router>
  );
}

export default App;
