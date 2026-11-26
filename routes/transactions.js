const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/authMiddleware');

// लॉगिन यूजर के सभी लेन-देन लाएं
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: transactions });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// नए लेन-देन में यूजर ID जोड़ें
router.post('/', auth, async (req, res) => {
    try {
        const newTransaction = new Transaction({ ...req.body, user: req.user.id });
        await newTransaction.save();
        res.status(201).json({ success: true, data: newTransaction });
    } catch (err) {
        res.status(400).send('Error saving');
    }
});

// डिलीट करें
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'डेटा नहीं मिला' });
        }
        await transaction.deleteOne();
        res.json({ success: true, data: {} });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
