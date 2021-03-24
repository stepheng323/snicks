export default (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lga: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Address;
};
