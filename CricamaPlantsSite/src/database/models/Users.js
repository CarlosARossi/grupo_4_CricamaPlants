module.exports = function (sequelize, dataTypes) {

    let alias = "Users";

    let cols = {
        id_user: {
            type: dataTypes.SMALLINT(6),
            unsigned: true,
            notNull: true,
            autoIncrement: true,
            primaryKey: true,
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
        first_name: {
            type: dataTypes.VARCHAR(100),
        },
        last_name: {
            type: dataTypes.VARCHAR(100),
        },
        email: {
            type: dataTypes.VARCHAR(100),
        },
        password: {
            type: dataTypes.VARCHAR(255),
        },
        image: {
            type: dataTypes.VARCHAR(255),
        },
        id_user_type: {
            type: dataTypes.SMALLINT(4),
            unsigned: true,
            notNull: true,
            foreignKey: true
        }
    }

    let config = {
        tableName: "users",
        timestamps: true,
        underscored: true
    }

    let Users = sequelize.define (alias, cols, config);

    Users.associate = function (models) {
        Users.belongsTo(models.UserTypes, {
            as: "userTypes",
            foreignKey: "id_user_type"
        });
    }

    return Users;
}