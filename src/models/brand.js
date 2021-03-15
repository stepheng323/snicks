export default (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    'Brand',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );
  Brand.associate = (models) => {
    Brand.hasMany(models.Product, { foreignKey: 'brandId', onDelete: 'CASCADE' });
  };
  return Brand;
};
