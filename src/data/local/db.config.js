const sequelize = require("./database");
const {User} = require("./models/model.user");
const {Result} = require("./models/model.result");

function initDatabase() {

    Result.belongsTo(User, {foreignKey: 'uid'})

    sequelize.sync()
        .then(async () => {
            console.log('Database and tables created!');
        })
        .catch(err => {
            console.error('Error syncing database:', err);
        });
}

module.exports = {initDatabase}