module.exports = function (sequelize, dataTypes) {

    let alias = "User";
    
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
        id_shop: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            foreignKey: true
        }
    }

    let config = {
        tableName: "users",
        timestamps: false,
        underscored: true
    }

    let User = sequelize.define (alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.UserType, {
            as: "userType",
            foreignKey: "id_user_type"
        });
        User.belongsTo(models.ShopCart, {
            as: "shopCart",
            foreignKey: "id_product"
        });
    }
    
    return User;
    
}