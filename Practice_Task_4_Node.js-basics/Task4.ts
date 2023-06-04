import * as si from 'systeminformation';

const frequencyInSeconds = parseInt(process.argv[2]);

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
    .then(([osInfo, cpuInfo, users, cpuTemperature, graphics, memInfo, batteryInfo]) => {
      console.log('Operating System:', osInfo.distro, osInfo.release);
      console.log('Architecture:', osInfo.arch);
      console.log('Current User Name:', users[0].user);
      //console.log('Processor Core Models:', (cpuInfo.cores as any[]).map((core) => core.model));
      console.log('Processor Temperature:', cpuTemperature.main);

      console.log('Manufacturers and Models of Graphic Controllers:');
      graphics.controllers.forEach((controller) => {
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
    .catch((error) => {
      console.error('Error retrieving system information:', error);
    });
}

function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

setInterval(getSystemInformation, frequencyInSeconds * 1000);
