import {Routes, Route} from 'react-router-dom';
import { useStore } from './store';


import Header from './components/Header';
import Footer from './components/Footer';
import ProtectRoute from './components/ProtectRoute';

import AuthForm from './pages/AuthForm';
import Landing from './pages/Landing';
import About from './pages/About';
import ContactForm from './pages/ContactForm';
import WorkoutPlan from './pages/Dashboard';
import AddExercise from './pages/AddExercise';
import WorkoutSearch from './components/WorkoutSearch';



function App() {
  const {state} = useStore()!;
  
  return (
    <>
      {state.loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <h2 className="fw-light">Loading...</h2>
        </div>
      )}

      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<ContactForm />} />

          <Route path="/register" element={(
            <ProtectRoute>
              <AuthForm isLogin={false} />
            </ProtectRoute>
          )} />
          <Route path="/login" element={(
            <ProtectRoute>
              <AuthForm isLogin={true} />
            </ProtectRoute>
          )} />

          <Route path="/workout" element={(
            <ProtectRoute>
              <AddExercise />
            </ProtectRoute>

          )} />

          <Route path="/plan" element={(
            <ProtectRoute>
              <WorkoutPlan />
            </ProtectRoute>
          )} />
          <Route path="/search" element={
            <WorkoutSearch query="defaultQuery" />
          } />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App