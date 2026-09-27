const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/jobportal';
const JWT_SECRET = process.env.JWT_SECRET || 'jobportal_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// --- Database Connection ---
let isConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`Connected to MongoDB successfully at: ${MONGO_URI}`);
    await seedInitialData();
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}. Retrying in 5 seconds...`);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// --- Schemas & Models ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  salary: { type: String, default: '$80,000 - $120,000' },
  description: { type: String, required: true },
  applicationsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);

// --- Seed Initial Data ---
const seedInitialData = async () => {
  try {
    const count = await Job.countDocuments();
    if (count === 0) {
      const defaultJobs = [
        { title: 'Frontend Developer', company: 'TechCorp', location: 'New York', category: 'Programming', description: 'Build responsive web apps with HTML/CSS/JS and React.' },
        { title: 'Data Scientist', company: 'Analytics AI', location: 'Texas', category: 'Data Science', description: 'Analyze complex datasets and train predictive ML models.' },
        { title: 'UI/UX Designer', company: 'Creative Studio', location: 'Mumbai', category: 'Designing', description: 'Design modern, interactive UI interfaces and prototypes.' },
        { title: 'Cyber Security Analyst', company: 'SecureNet', location: 'Hyderabad', category: 'Cybersecurity', description: 'Monitor network security infrastructure and mitigate vulnerabilities.' }
      ];
      await Job.insertMany(defaultJobs);
      console.log('Seed job data inserted successfully.');
    }
  } catch (err) {
    console.error('Error seeding initial job data:', err.message);
  }
};

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- API Endpoints ---

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'job-portal-backend',
    timestamp: new Date().toISOString(),
    database: isConnected ? 'Connected' : 'Disconnected'
  });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (isConnected) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '24h' });

      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      });
    } else {
      // Fallback for demo when DB is establishing connection
      const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(201).json({
        message: 'Registration successful (memory mode)',
        token,
        user: { name, email }
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (isConnected) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      const token = jwt.sign({ email, name: email.split('@')[0] }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(200).json({
        message: 'Login successful (memory mode)',
        token,
        user: { email }
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authenticated User Info
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Get All Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    if (isConnected) {
      const jobs = await Job.find().sort({ createdAt: -1 });
      return res.status(200).json(jobs);
    } else {
      return res.status(200).json([
        { id: '1', title: 'Frontend Developer', company: 'TechCorp', location: 'New York', category: 'Programming', description: 'Build responsive web apps.' },
        { id: '2', title: 'Data Scientist', company: 'Analytics AI', location: 'Texas', category: 'Data Science', description: 'Analyze data models.' }
      ]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Job Posting
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, company, location, category, description, salary, type } = req.body;
    if (!title || !company || !location || !category) {
      return res.status(400).json({ error: 'Title, company, location, and category are required' });
    }

    if (isConnected) {
      const newJob = await Job.create({ title, company, location, category, description, salary, type });
      return res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } else {
      return res.status(201).json({ message: 'Job posted successfully (memory mode)', job: { title, company, location, category, description } });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply for Job
app.post('/api/jobs/:id/apply', async (req, res) => {
  try {
    const { id } = req.params;
    if (isConnected && mongoose.Types.ObjectId.isValid(id)) {
      const job = await Job.findByIdAndUpdate(id, { $inc: { applicationsCount: 1 } }, { new: true });
      if (!job) return res.status(404).json({ error: 'Job not found' });
      return res.status(200).json({ message: 'Application submitted successfully', job });
    } else {
      return res.status(200).json({ message: 'Application submitted successfully for job ' + id });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Job Portal Backend API server running on port ${PORT}`);
});
