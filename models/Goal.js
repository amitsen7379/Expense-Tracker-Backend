const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true }, // उदा. "नया लैपटॉप"
    targetAmount: { type: Number, required: true }, // उदा. 60000
    currentAmount: { type: Number, default: 0 }, // अभी तक कितने बचाए
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', GoalSchema);
