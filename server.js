const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./app/models');

require('dotenv/config');

const corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Import Router --> Here <-- */
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to NodeJS-Express with MySQL : Sequelize',
    });
});

const usersRoutes = require('./app/routes/UsersRoutes');
const authRoutes = require('./app/routes/AuthRoutes');

app.use('/api/user', usersRoutes);
app.use('/api/auth', authRoutes);

/** End Import Router */

/** Listen Port Server */
app.listen(3000, () => console.log(`Server is running on port 3000`));

/** Connet To Database */
db.sequelize
    // .sync({ force: true }) /** DROP TABLE IF EXISTS */
    .sync()
    .then(() => {
        console.log(`Connected to Database MySQL`);
    })
    .catch((err) => {
        console.log(err);
    });
