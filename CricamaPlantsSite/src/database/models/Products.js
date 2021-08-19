module.exports = function (sequelize, dataTypes) {

    let alias = "Products";

    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            unsigned: true,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at: {
            type: dataTypes.DATE,
            null: true
        },
        updated_at: {
            type: dataTypes.DATE,
            null: true
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.TEXT,
        },
        image: {
            type: dataTypes.STRING,
        },
        price: {
            type: dataTypes.INTEGER,
        },
        id_category: {
            type: dataTypes.SMALLINT(6),
            unsigned: true,
            notNull: true,
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