const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destinations: {
        type: [String],
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // adds createdAt & updatedAt
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
