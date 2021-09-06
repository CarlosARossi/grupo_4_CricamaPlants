module.exports = function (sequelize, dataTypes) {

    let alias = "ShopCart";

    let cols = {
        id_shop: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        quantity: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DECIMAL(10,2)
        },
        id_user: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            foreignKey: true
        },
        id_product: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            foreignKey: true
        }
        
    }

    let config = {
        tableName: "shopCart",
        timestamps: false,
        underscored: true
    }

    let ShopCart = sequelize.define (alias, cols, config);

    ShopCart.associate = function (models) {
        ShopCart.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_user"
        });

        ShopCart.belongsTo(models.Product, {
            as: "product",
            foreignKey: "id_product"
        });
    }

    return ShopCart;
}