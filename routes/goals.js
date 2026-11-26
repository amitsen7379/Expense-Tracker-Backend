const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/authMiddleware');

// 1. सभी गोल्स लाएं
router.get('/', auth, async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });
        res.json({ success: true, data: goals });
    } catch (err) { res.status(500).send('Server Error'); }
});

// 2. नया गोल जोड़ें
router.post('/', auth, async (req, res) => {
    try {
        const newGoal = new Goal({ ...req.body, user: req.user.id });
        await newGoal.save();
        res.status(201).json({ success: true, data: newGoal });
    } catch (err) { res.status(400).send('Error saving goal'); }
});

// 3. गोल में पैसे जोड़ें (Update Progress)
router.put('/:id', auth, async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal || goal.user.toString() !== req.user.id) return res.status(404).json({ msg: 'Goal not found' });
        
        goal.currentAmount += parseFloat(req.body.amount);
        await goal.save();
        res.json({ success: true, data: goal });
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;
