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
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(20, 4).UNSIGNED,
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
