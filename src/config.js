module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    // DB_URL: process.env.DB_URL || 'meal_deal@localhost/meal_deal',
    DB_URL: process.env.DATABASE_URL || 'meal_deal@localhost/meal_deal',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',

  }