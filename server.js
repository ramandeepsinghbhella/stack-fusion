const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const validatePhoneNumber = require('validate-phone-number-node-js');
const cors = require('cors');
// const { response } = require('express');
const { sendEmail } = require('./sendEmail');
// const exp = require('constants');
const app = express();
require("dotenv").config(); 
mongoose.connect(
    process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', function (req, res) {
    const index = path.join(__dirname, '/client/build', 'index.html');
    res.sendFile(index);
  });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

app.get('/form-user', (req, res) => {
    User.find({})
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).json({message: err}))
});

app.post('/form-user', (req, res) => {
    const isMobValid = validatePhoneNumber.validate(req.body.mobile);
    if(isMobValid){
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
        });
        user
            .save()
            .then(
                () => {
                    res.status(200).json({message: 'Added Successfully'});
                    console.log("One entry added");
                }, 
                (err) => {
                    res.status(400).json({message: err.message.includes('required') ? 'Please fill all the fields with valid inputs.' : err.message});    
                    console.log(err);
                }
            );
            sendEmail(req.body.email)
    } else {
        //
    }
    
});




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port 8000.`);
  });