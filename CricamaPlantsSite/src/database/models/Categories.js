module.exports = function (sequelize, dataTypes) {

    let alias = "Category";

    let cols = {
        id_category: {
            type: dataTypes.SMALLINT,
            unsigned: true, 
            null: true,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at: {
            type: dataTypes.TIMESTAMP,
            null: true,
            default: null
        },
        updated_at: {
            type: dataTypes.TIMESTAMP,
            null: true,
            default: null
        },
        category: {
            type: dataTypes.VARCHAR(100),
        }
    }

    let config = {
        tableName: "categories",
        timestamps: true,
        underscored: true
    }

    let Categories = sequelize.define (alias, cols, config);

    Categories.associate = function (models) {
        Categories.hasMany(models.Products, {
            as: "products",
            foreignKey: "id_category"
        });
    }

    return Categories;
}