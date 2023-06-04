"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var si = require("systeminformation");
var frequencyInSeconds = parseInt(process.argv[2]);
function getSystemInformation() {
    Promise.all([
        si.osInfo(),
        si.cpu(),
        si.users(),
        si.cpuTemperature(),
        si.graphics(),
        si.mem(),
        si.battery(),
    ])
        .then(function (_a) {
        var osInfo = _a[0], cpuInfo = _a[1], users = _a[2], cpuTemperature = _a[3], graphics = _a[4], memInfo = _a[5], batteryInfo = _a[6];
        console.log('Operating System:', osInfo.distro, osInfo.release);
        console.log('Architecture:', osInfo.arch);
        console.log('Current User Name:', users[0].user);
        //console.log('Processor Core Models:', (cpuInfo.cores as any[]).map((core) => core.model));
        console.log('Processor Temperature:', cpuTemperature.main);
        console.log('Manufacturers and Models of Graphic Controllers:');
        graphics.controllers.forEach(function (controller) {
            console.log('Manufacturer:', controller.vendor);
            console.log('Model:', controller.model);
        });
        console.log('Total Memory:', formatBytes(memInfo.total));
        console.log('Used Memory:', formatBytes(memInfo.used));
        console.log('Free Memory:', formatBytes(memInfo.free));
        console.log('Battery Data:');
        console.log('Charge:', batteryInfo.hasBattery ? 'Plugged in' : 'Not Plugged in');
        console.log('Percentage:', batteryInfo.percent);
        console.log('Remaining Time:', batteryInfo.timeRemaining);
    })
        .catch(function (error) {
        console.error('Error retrieving system information:', error);
    });
}
function formatBytes(bytes) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB'];
    var size = bytes;
    var unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return "".concat(size.toFixed(2), " ").concat(units[unitIndex]);
}
setInterval(getSystemInformation, frequencyInSeconds * 1000);
