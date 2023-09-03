import './App.css';

import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing-page/LandingPage';
import CourseMapWizard from './pages/course-map-wizard/CourseMapWizard';
import CourseMap from './pages/course-map/CourseMap';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="dashboard" element={<h1>Dashboard</h1>} />
        <Route path="course-map-wizard" element={<CourseMapWizard />} />
        <Route path="course-map/:courseMapId" element={<CourseMap />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
