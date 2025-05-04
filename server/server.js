const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/User');
const Tour = require('./models/Tour');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Verify MongoDB connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            username,
            email,
            password
        });

        await user.save();

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, name: user.name });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, name: user.name });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Tour Management Routes
// Get all tours
app.get('/api/tours', async (req, res) => {
    try {
        const tours = await Tour.find().sort({ createdAt: -1 });
        res.json(tours);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get single tour
app.get('/api/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ msg: 'Tour not found' });
        }
        res.json(tour);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add new tour (Admin only)
app.post('/api/tours', async (req, res) => {
    try {
        console.log('Received tour creation request:', req.body);
        console.log('Request headers:', req.headers);
        
        const { destination, location, date, duration, description, fees, image } = req.body;
        
        // Validate required fields
        if (!destination || !location || !date || !duration || !description || !fees) {
            console.log('Missing fields:', {
                destination: !destination,
                location: !location,
                date: !date,
                duration: !duration,
                description: !description,
                fees: !fees
            });
            return res.status(400).json({ 
                msg: 'Missing required fields',
                missingFields: {
                    destination: !destination,
                    location: !location,
                    date: !date,
                    duration: !duration,
                    description: !description,
                    fees: !fees
                }
            });
        }

        // Convert date to proper format
        const tourDate = new Date(date);
        if (isNaN(tourDate.getTime())) {
            console.log('Invalid date format:', date);
            return res.status(400).json({ msg: 'Invalid date format' });
        }

        // Convert fees to number
        const tourFees = Number(fees);
        if (isNaN(tourFees)) {
            console.log('Invalid fees format:', fees);
            return res.status(400).json({ msg: 'Invalid fees format' });
        }

        const newTour = new Tour({
            destination,
            location,
            date: tourDate,
            duration,
            description,
            fees: tourFees,
            image: image || 'default-tour.jpg'
        });

        console.log('Attempting to save tour:', newTour);
        const tour = await newTour.save();
        console.log('Tour saved successfully:', tour);
        res.json(tour);
    } catch (err) {
        console.error('Tour creation error:', err);
        console.error('Error stack:', err.stack);
        res.status(500).json({ 
            msg: 'Server error',
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// Delete tour (Admin only)
app.delete('/api/tours/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Invalid tour ID format' });
    }
    try {
        const deleted = await Tour.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ msg: 'Tour not found' });
        }
        res.json({ msg: 'Tour removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update tour (Admin only)
app.put('/api/tours/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Invalid tour ID format' });
    }
    try {
        const { destination, location, date, duration, description, fees, image } = req.body;
        const updateFields = {
            destination,
            location,
            date: date ? new Date(date) : undefined,
            duration,
            description,
            fees: fees !== undefined ? Number(fees) : undefined,
            image
        };
        // Remove undefined fields
        Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);
        const tour = await Tour.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!tour) {
            return res.status(404).json({ msg: 'Tour not found' });
        }
        res.json(tour);
    } catch (err) {
        console.error('Tour update error:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 