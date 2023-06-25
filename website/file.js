const os = require('os');

const networkInterfaces = os.networkInterfaces();

Object.keys(networkInterfaces).forEach((interfaceName) => {
    
    const addresses = networkInterfaces[interfaceName];
    
    addresses.forEach((address) => {
        if (address.family === 'IPv4') {
            console.log(`Interface: ${interfaceName}`);
            console.log(`IP Address: ${address.address}`);
        }
    });
});