const {DataTypes, Op} = require("sequelize");
const sequelize = require("../database");


const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {type: DataTypes.STRING, allowNull: false},
        mobile: {type: DataTypes.STRING, allowNull: false, unique: true},
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        gender: {type: DataTypes.ENUM("MALE", "FEMALE"), allowNull: false},
        city: {type: DataTypes.STRING, allowNull: true},
        state: {type: DataTypes.STRING, allowNull: true},
        count: {type: DataTypes.INTEGER, defaultValue: 0},
        has_consent: {type: DataTypes.BOOLEAN, defaultValue: false},
        status: {
            type: DataTypes.ENUM("FORM_SUBMITTED", "TEST_TAKEN"),
            defaultValue: "TEST_TAKEN",
        }
    },
    {
        tableName: "user"
    }
);

async function insertUser({name, mobile, email, gender, city, has_consent}) {
    const user = await User.create({name, mobile, email, gender, city, has_consent})
    return user
}

async function isUserExist({mobile, email}) {
    const user = await User.findOne({
        where: {
            [Op.or]:{
                mobile,
                email
            }
        }
    })

    if(user)
        return true
    else
        return false
}

async function getUserById(id) {
    const user = await User.findByPk(id)
    return user
}

async function getTotalUserCount() {
    const count = await User.count()
    return count
}

module.exports = {
    User, insertUser, getUserById, isUserExist, getTotalUserCount
};
