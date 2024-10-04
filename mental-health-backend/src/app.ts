import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import emotionRoutes from './routes/emotionRoutes';
// Import other routes as needed

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/emotions', emotionRoutes);
// Add other routes here

export default app;
