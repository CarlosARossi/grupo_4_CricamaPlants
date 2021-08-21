module.exports = function (sequelize, dataTypes) {

    let alias = "Category";

    let cols = {
        id_category: {
            type: dataTypes.INTEGER,
            unsigned: true, 
            null: true,
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
        category: {
            type: dataTypes.STRING,
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false,
        underscored: true
    }

    let Category = sequelize.define (alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "product",
            foreignKey: "id_category"
        });
    }

    return Category;
}