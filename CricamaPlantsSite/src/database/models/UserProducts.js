module.exports = function (sequelize, dataTypes) {

    let alias = "UserProducts";

    let cols = {
        id_user_products: {
            type: dataTypes.SMALLINT(6),
            unsigned: true,
            notNull: true,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at: {
            type: dataTypes.TIMESTAMP,
            null: true,
            default: true
        },
        updated_at: {
            type: dataTypes.TIMESTAMP,
            null: true,
            default: true
        },
        id_user: {
            type: dataTypes.SMALLINT(6),
            unsigned: true,
            notNull: true,
            foreignKey: true
        },
        id_prduct: {
            type: dataTypes.SMALLINT(6),
            unsigned: true,
            notNull: true,
            foreignKey: true
        },
        quantity: {
            data: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DECIMAL(10,2)
        }
    }

    let config = {
        tableName: "user_products",
        timestamps: true
    }

    let userProducts = sequelize.define (alias, cols, config);

    userProducts.associate = function (models) {
        userProducts.belongsTo(models.Users, {
            as: "users",
            foreignKey: "id_user"
        });

        userProducts.belongsTo(models.Products, {
            as: "products",
            foreignKey: "id_product"
        });
    }

    return userProducts;
}