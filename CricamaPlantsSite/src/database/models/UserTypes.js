module.exports = function (sequelize, dataTypes) {

    let alias = "UserTypes";

    let cols = {
        id_user_type: {
            type: dataTypes.SMALLINT(4),
            unsigned: true,
            notNull: true,
            primaryKey: true
        },
        created_at: {
            type: dataTypes.TIMESTAMP,
            null: true,
            default: null
        },
        updated_at: {
            type: dataTypes.TIMESTAMP,
            null: true,
            default: null
        },
        type: {
            type: dataTypes.VARCHAR(100),
        }
    }

    let config = {
        tableName: "products",
        timestamps: true
    }

    let UserTypes = sequelize.define (alias, cols, config);

    UserTypes.associate = function (models) {
        UserTypes.belongsToMany(models.Users, {
            as: "users",
            foreignKey: "id_users"
        });
    }

    return UserTypes;
}