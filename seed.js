require('dotenv').config();
const connectDB = require('./config/db.js');
const User = require('./models/User.js');
const Transaction = require('./models/Transaction.js');

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Transaction.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const analystUser = await User.create({
      name: 'Analyst User',
      email: 'analyst@example.com',
      password: 'password123',
      role: 'analyst',
    });

    const viewerUser = await User.create({
      name: 'Viewer User',
      email: 'viewer@example.com',
      password: 'password123',
      role: 'viewer',
    });

    await Transaction.create([
      {
        user: analystUser._id,
        amount: 5000,
        type: 'income',
        category: 'Salary',
        notes: 'Monthly salary',
      },
      {
        user: analystUser._id,
        amount: 1200,
        type: 'expense',
        category: 'Groceries',
      },
      // Add more...
    ]);

    console.log('Seed data imported');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
