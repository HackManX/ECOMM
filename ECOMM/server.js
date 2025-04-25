const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cartroute=require('./routes/cartroute');

const app = express();
const port = 3000; 

// Middleware
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());
app.use(cartroute);


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecomm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);  // Exit if MongoDB connection fails
  });

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);



// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Error saving user', error: err });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login', error: err });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
