import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'abn_alwaqf',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  termsAndConditions: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

const Service = sequelize.define('Service', {
  name: { type: DataTypes.STRING, allowNull: false },
  icon: { type: DataTypes.STRING, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

const Station = sequelize.define('Station', {
  serviceId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  numberVehiclesAvailable: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  numberPassengersWaiting: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

const Vehicle = sequelize.define('Vehicle', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  nationalIDNumber: { type: DataTypes.STRING, allowNull: false },
  idphoto: { type: DataTypes.STRING, allowNull: true },
  vehicleType: { type: DataTypes.STRING, allowNull: false },
  numberSeats: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 4 },
});

const Journey = sequelize.define('Journey', {
  role: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'active', 'completed', 'cancelled'), allowNull: false, defaultValue: 'pending' },
  startTime: { type: DataTypes.DATE, allowNull: true },
  endTime: { type: DataTypes.DATE, allowNull: true },
});

const Advertisement = sequelize.define('Advertisement', {
  image: { type: DataTypes.STRING, allowNull: false },
  owner: { type: DataTypes.STRING, allowNull: false },
  startDay: { type: DataTypes.DATE, allowNull: false },
  endDay: { type: DataTypes.DATE, allowNull: false },
  cost: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
});

const RequestAdvertisement = sequelize.define('RequestAdvertisement', {
  phone: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
});

const TukTukTrip = sequelize.define('TukTukTrip', {
  pickupLocation: { type: DataTypes.STRING, allowNull: false },
  dropoffLocation: { type: DataTypes.STRING, allowNull: false },
  tripDate: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: true },
  fare: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'), allowNull: false, defaultValue: 'requested' },
  rating: { type: DataTypes.INTEGER, allowNull: true },
  commentReview: { type: DataTypes.TEXT, allowNull: true },
});

Station.hasMany(Vehicle, { foreignKey: 'stationId' });
Vehicle.belongsTo(Station, { foreignKey: 'stationId' });

Vehicle.hasMany(Journey, { foreignKey: 'vehicleId' });
Journey.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

User.hasMany(TukTukTrip, { foreignKey: 'userId' });
TukTukTrip.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(TukTukTrip, { foreignKey: 'vehicleId' });
TukTukTrip.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

export { sequelize, User, Service, Station, Vehicle, Journey, Advertisement, RequestAdvertisement, TukTukTrip };
