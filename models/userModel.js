const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    // Simple validation for phone number (this can be adjusted to your needs)
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
        },
        password: {
            type: String,
        },
        googleId : {
            type : Number
        }
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  
  // Encrypt password using bcrypt
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const User = mongoose.model('User', userSchema);

module.exports = User