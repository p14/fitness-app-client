import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountEditor from './components/account/AccountEditor';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/Dashboard';
import FeedbackAlert from './components/FeedbackAlert';
import GenerateWorkout from './components/generate/GenerateWorkout';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import RegisterForm from './components/RegisterForm';
import WorkoutDashboard from './components/workout/WorkoutDashboard';
import WorkoutEditor from './components/workout/WorkoutEditor';
import WorkoutFormCreate from './components/workout/CreateForm';
import WorkoutRender from './components/workout/WorkoutRender';
import { ExerciseProvider } from './context/exercise.context';
import { FeedbackProvider } from './context/feedback.context';
import { SessionProvider } from './context/session.context';
import { WorkoutProvider } from './context/workout.context';

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        <WorkoutProvider>
          <ExerciseProvider>
            <FeedbackProvider>
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path='/' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />

                {/* Private Routes */}
                <Route element={<RequireAuth />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/account' element={<AccountEditor />} />
                  <Route path='/generate' element={<GenerateWorkout />} />
                  <Route path='/workouts' element={<WorkoutDashboard />} />
                  <Route path='/workouts/new' element={<WorkoutFormCreate />} />
                  <Route path='/workouts/:id' element={<WorkoutRender />} />
                  <Route path='/workouts/:id/edit' element={<WorkoutEditor />} />
                  <Route path='*' element={<PageNotFound />} />
                </Route>
              </Routes>
              <FeedbackAlert />
            </FeedbackProvider>
          </ExerciseProvider>
        </WorkoutProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;
