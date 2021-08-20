module.exports = function (sequelize, dataTypes) {

    let alias = "UserTypes";

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
        tableName: "products",
        timestamps: true,
        underscored: true
    }

    let UserTypes = sequelize.define (alias, cols, config);

    UserTypes.associate = function (models) {
        UserTypes.hasMany(models.Users, {
            as: "users",
            foreignKey: "id_users"
        });
    }

    return UserTypes;
}