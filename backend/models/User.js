const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    totalPoints: Number,
    Tournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    }]
    });

    // Hash the password before saving it to the database
    UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  // Compare the given password with the hashed password in the database
  UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', UserSchema);