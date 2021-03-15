export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      specification: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(20, 4).UNSIGNED,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'products',
      onDelete: 'CASCADE',
    });
    Product.belongsTo(models.Brand, {
      foreignKey: 'brandId',
      as: 'brandProducts',
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'productReviews',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};
