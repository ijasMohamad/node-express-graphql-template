import sequelize from 'sequelize';

export function getAttributes(sequelizer, DataTypes) {
  return {
    id: {
      type: DataTypes.INTERGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
      allowNull: true
    }
  };
}

export function model(sequelize, DataTypes) {
  const subjects = sequelize.define('subjects', getAttributes(sequelize, DataTypes), {
    tableName: 'subjects',
    paranoid: true,
    timestamps: true
  });
  return subjects;
}
