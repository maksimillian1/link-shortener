const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const router = Router();

router.post('/register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimal length is 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data during the registration'
            });
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'User with entered email already registered!'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({ message: 'New user successfuly created!' });

    }catch(e) {
        res.status(500).json({message: 'Server error on register route'});
    }
});


router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data during the login'
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Didn\'t find user with such email, please try again or register in the system!'});
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if(!passMatch) {
            return res.status(400).json({ message: 'Invalid password entered, please try again!' });
        }

        const token = jwt.sign(
            { userId: user._id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user._id });

    }catch(e) {
        res.status(500).json({message: 'Server error on register route'});
    }
});

module.exports = router;