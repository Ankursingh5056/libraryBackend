// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,  // Removes whitespace
    minlength: 2, // Minimum 2 characters
    maxlength: 50 // Maximum 50 characters
  },
  description: { 
    type: String, 
    maxlength: 200 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true  // Automatically manage createdAt and updatedAt
});

// Add a method to the schema
categorySchema.methods.getDisplayName = function() {
  return `${this.name} (${this.isActive ? 'Active' : 'Inactive'})`;
};

// Add a static method to the schema
categorySchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

module.exports = mongoose.model("Category", categorySchema); 