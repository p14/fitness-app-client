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
import WorkoutDashboard from './components/workout/WorkoutDashboard';
import WorkoutFormCreate from './components/workout/WorkoutFormCreate';
import { ExerciseProvider } from './context/exercise.context';
import { FeedbackProvider } from './context/feedback.context';
import { SessionProvider } from './context/session.context';
import { WorkoutProvider } from './context/workout.context';
import WorkoutEditor from './components/workout/WorkoutEditor';
import WorkoutRender from './components/workout/WorkoutRender';

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
