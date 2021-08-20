module.exports = function (sequelize, dataTypes) {

    let alias = "Users";
    
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at: {
            type: dataTypes.DATE,
            null: true,
            default: dataTypes.NOW
        },
        updated_at: {
            type: dataTypes.DATE,
            null: true,
            default: dataTypes.NOW
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        id_user_type: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
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