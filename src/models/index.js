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

const Package = sequelize.define('Package', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
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
  departureLocation: { type: DataTypes.STRING, allowNull: false },
  destinationLocation: { type: DataTypes.STRING, allowNull: false },
  tripTimeType: { type: DataTypes.STRING, allowNull: true },
  timeFrom: { type: DataTypes.TIME, allowNull: true },
  timeTo: { type: DataTypes.TIME, allowNull: true },
  tripDate: { type: DataTypes.DATE, allowNull: true },
  endTime: { type: DataTypes.DATE, allowNull: true },
  fare: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.ENUM('requested', 'accepted', 'in_progress', 'completed', 'cancelled'), allowNull: false, defaultValue: 'requested' },
  rating: { type: DataTypes.INTEGER, allowNull: true },
  commentReview: { type: DataTypes.TEXT, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: true },
  vehicleId: { type: DataTypes.INTEGER, allowNull: true },
});

const Shipment = sequelize.define('Shipment', {
  departureLocation: { type: DataTypes.STRING, allowNull: false },
  destinationLocation: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  sizeShipment: { type: DataTypes.STRING, allowNull: true },
});

const Event = sequelize.define('Event', {
  eventType: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  numberOfPassengers: { type: DataTypes.INTEGER, allowNull: true },
  departurePoint: { type: DataTypes.STRING, allowNull: true },
  destinationPoint: { type: DataTypes.STRING, allowNull: true },
});

const Pharmacy = sequelize.define('Pharmacy', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  whatsapp: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  openTime: { type: DataTypes.TIME, allowNull: true },
  closeTime: { type: DataTypes.TIME, allowNull: true },
  is24Hours: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  image: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' },
  serviceId: { type: DataTypes.INTEGER, allowNull: true },
  packageId: { type: DataTypes.INTEGER, allowNull: true },
});

const Lab = sequelize.define('Lab', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  whatsapp: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  openTime: { type: DataTypes.TIME, allowNull: true },
  closeTime: { type: DataTypes.TIME, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' },
  serviceId: { type: DataTypes.INTEGER, allowNull: true },
  packageId: { type: DataTypes.INTEGER, allowNull: true },
});

const Clinic = sequelize.define('Clinic', {
  name: { type: DataTypes.STRING, allowNull: false },
  doctorName: { type: DataTypes.STRING, allowNull: true },
  specialty: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  whatsapp: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  consultationFee: { type: DataTypes.DECIMAL(10, 2), allowNull: true, defaultValue: 0 },
  waitingTime: { type: DataTypes.INTEGER, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  openTime: { type: DataTypes.TIME, allowNull: true },
  closeTime: { type: DataTypes.TIME, allowNull: true },
  status: { type: DataTypes.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' },
  serviceId: { type: DataTypes.INTEGER, allowNull: true },
  packageId: { type: DataTypes.INTEGER, allowNull: true },
});

const Workshop = sequelize.define('Workshop', {
  name: { type: DataTypes.STRING, allowNull: false },
  ownerName: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  whatsapp: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  openTime: { type: DataTypes.TIME, allowNull: true },
  closeTime: { type: DataTypes.TIME, allowNull: true },
  status: { type: DataTypes.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' },
  serviceId: { type: DataTypes.INTEGER, allowNull: true },
  packageId: { type: DataTypes.INTEGER, allowNull: true },
});

const HomeServiceProblem = sequelize.define('HomeServiceProblem', {
  problemDescription: { type: DataTypes.TEXT, allowNull: false },
  contactPhone: { type: DataTypes.STRING, allowNull: false },
});

const HomeServiceTechnician = sequelize.define('HomeServiceTechnician', {
  fullName: { type: DataTypes.STRING, allowNull: false },
  profileImage: { type: DataTypes.STRING, allowNull: true },
  workField: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
});

Station.hasMany(Vehicle, { foreignKey: 'stationId' });
Vehicle.belongsTo(Station, { foreignKey: 'stationId' });

Vehicle.hasMany(Journey, { foreignKey: 'vehicleId' });
Journey.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Service.hasMany(Station, { foreignKey: 'serviceId' });
Station.belongsTo(Service, { foreignKey: 'serviceId' });

Service.hasMany(Pharmacy, { foreignKey: 'serviceId' });
Pharmacy.belongsTo(Service, { foreignKey: 'serviceId' });

Service.hasMany(Lab, { foreignKey: 'serviceId' });
Lab.belongsTo(Service, { foreignKey: 'serviceId' });

Service.hasMany(Clinic, { foreignKey: 'serviceId' });
Clinic.belongsTo(Service, { foreignKey: 'serviceId' });

Service.hasMany(Workshop, { foreignKey: 'serviceId' });
Workshop.belongsTo(Service, { foreignKey: 'serviceId' });

Package.hasMany(Pharmacy, { foreignKey: 'packageId' });
Pharmacy.belongsTo(Package, { foreignKey: 'packageId' });

Package.hasMany(Lab, { foreignKey: 'packageId' });
Lab.belongsTo(Package, { foreignKey: 'packageId' });

Package.hasMany(Clinic, { foreignKey: 'packageId' });
Clinic.belongsTo(Package, { foreignKey: 'packageId' });

Package.hasMany(Workshop, { foreignKey: 'packageId' });
Workshop.belongsTo(Package, { foreignKey: 'packageId' });

User.hasMany(TukTukTrip, { foreignKey: 'userId' });
TukTukTrip.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(TukTukTrip, { foreignKey: 'vehicleId' });
TukTukTrip.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

export {
  sequelize,
  User,
  Service,
  Package,
  Station,
  Vehicle,
  Journey,
  Advertisement,
  RequestAdvertisement,
  TukTukTrip,
  Shipment,
  Event,
  Pharmacy,
  Lab,
  Clinic,
  Workshop,
  HomeServiceProblem,
  HomeServiceTechnician,
};
