module.exports = function (sequelize, dataTypes) {

    let alias = "Products";

    let cols = {
        id_product: {
            type: dataTypes.SMALLINT,
            unsigned: true,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at: {
            type: dataTypes.TIMESTAMP,
            null: true
        },
        updated_at: {
            type: dataTypes.TIMESTAMP,
            null: true
        },
        name: {
            type: dataTypes.VARCHAR(100),
        },
        description: {
            type: dataTypes.TEXT,
        },
        image: {
            type: dataTypes.VARCHAR(255),
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
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
        Products.belongsTo(models.Categories, {
            as: "category",
            foreignKey: "id_category"
        });
    }

    return Products;
}