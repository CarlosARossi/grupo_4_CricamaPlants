module.exports = function (sequelize, dataTypes) {

    let alias = "UserProducts";

    let cols = {
        id_user_products: {
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
        tableName: "user_products",
        timestamps: true,
        underscored: true
    }

    let UserProducts = sequelize.define (alias, cols, config);

    UserProducts.associate = function (models) {
        UserProducts.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user"
        });

        UserProducts.belongsTo(models.Products, {
            as: "products",
            foreignKey: "id_product"
        });
    }

    return UserProducts;
}