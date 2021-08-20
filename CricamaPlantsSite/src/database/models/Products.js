module.exports = function (sequelize, dataTypes) {

    let alias = "Products";

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
        id_category: {
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false,
            foreignKey: true
        }
    }

    let config = {
        tableName: "products",
        timestamps: true,
        underscored: true
    }

    let Products = sequelize.define (alias, cols, config);

    Products.associate = function (models) {
        Products.belongsTo(models.Category, {
            as: "category",
            foreignKey: "id_category"
        });
    }

    return Products;
}