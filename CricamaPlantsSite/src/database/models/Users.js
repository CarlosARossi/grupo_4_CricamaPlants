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
            type: dataTypes.DATE,
            null: true,
            default: null
        },
        updated_at: {
            type: dataTypes.DATE,
            null: true,
            default: null
        },
        first_name: {
            type: dataTypes.STRING,
        },
        last_name: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.STRING,
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
    Users.associate = function (models) {
        Users.belongsTo(models.UserProducts, {
            as: "userProducts",
            foreignKey: "id_product"
        });
    }
    
    return Users;
    
}