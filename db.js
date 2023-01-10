const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './.env' });

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true }).then(() => {
    console.log('Connected to database');
}
).catch(err => {
    console.log(err);
}
);