const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Load environment variables
const AIRLINES_SERVICE_URL = process.env.AIRLINES_SERVICE_URL || 'http://localhost:3001/api/airlines';
const FLIGHTS_SERVICE_URL = process.env.FLIGHTS_SERVICE_URL || 'http://localhost:3002/api/flights';
const PASSENGERS_SERVICE_URL = process.env.PASSENGERS_SERVICE_URL || 'http://localhost:3003/api/passengers';

// Proxy for Airlines Service
app.use('/api/airlines', createProxyMiddleware({
    target: AIRLINES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/airlines': '' } // Remove /api/airlines from the path when forwarding
}));

// Proxy for Flights Service
app.use('/api/flights', createProxyMiddleware({
    target: FLIGHTS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/flights': '' } // Remove /api/flights from the path when forwarding
}));

// Proxy for Passengers Service
app.use('/api/passengers', createProxyMiddleware({
    target: PASSENGERS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/passengers': '' } // Remove /api/passengers from the path when forwarding
}));

// Start the API Gateway server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
