import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />

                {/* Wrap protected routes with ProtectedRoute */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route path="/" element={<SignIn />} />
            </Routes>
        </Router>
    );
};

export default App;
