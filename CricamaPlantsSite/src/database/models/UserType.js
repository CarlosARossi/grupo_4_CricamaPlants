module.exports = function (sequelize, dataTypes) {

    let alias = "UserType";

    let cols = {
        id_user_type: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false,
            default: dataTypes.NOW
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false,
            default: dataTypes.NOW
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    }

    let config = {
        tableName: "userTypes",
        timestamps: false,
        underscored: true
    }

    let UserType = sequelize.define (alias, cols, config);

    UserType.associate = function (models) {
        UserType.hasMany(models.User, {
            as: "user",
            foreignKey: "id_user"
        });
    }

    return UserType;
}