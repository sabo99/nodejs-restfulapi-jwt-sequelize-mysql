module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Users',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: true },
    );
};
