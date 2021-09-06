module.exports = function (sequelize, dataTypes) {

    let alias = "Product";

    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            unsigned: true,
            autoIncrement: true,
            allowNull: false,
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
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        quantity: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
        },
        id_category: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            foreignKey: true
        }
    }

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true
    }

    let Product = sequelize.define (alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "id_category"
        });
        Product.hasMany(models.ShopCart, {
            as: "shopCart",
            foreignKey: "id_product"
        });
    }

    return Product;
}