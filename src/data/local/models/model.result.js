const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const {User} = require("./model.user");

const Result = sequelize.define("Result", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    submission: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    result: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    full_matching_score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    list_matching_score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "uuid",
        },
    },
    status: {
        type: DataTypes.ENUM("RESULT_AWAITED", "RESULT_PUBLISHED", "RESULT_SENT"),
        defaultValue: "RESULT_AWAITED",
    }
});

async function insertSubmission({submission, uid}) {
    const data = await Result.create({submission, uid})
    return data
}

module.exports = {
    Result,
    insertSubmission
};
