import { Client } from 'ssh2';

const conn = new Client();
const ip = '103.23.198.191';
const username = 'fast';
const password = '#Fast123';

console.log('Connecting to VPS to finish setup...');

conn.on('ready', () => {
  console.log('Client :: ready');
      
  const cmd = `
    echo '${password}' | sudo -S chown -R www-data:www-data /var/www/html/ ;
    echo '${password}' | sudo -S systemctl start nginx ;
    echo '${password}' | sudo -S systemctl enable nginx
  `;
  
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).on('error', (err) => {
    console.error('Connection error:', err);
}).connect({
  host: ip,
  port: 22,
  username: username,
  password: password,
  readyTimeout: 20000
});
