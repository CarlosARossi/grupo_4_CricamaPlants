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
            type: dataTypes.DATE,
            null: true,
            default: true
        },
        updated_at: {
            type: dataTypes.DATE,
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
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DECIMAL(10,2)
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