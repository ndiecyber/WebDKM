import { Client } from 'ssh2';
import * as fs from 'fs';
import * as path from 'path';

const conn = new Client();
const ip = '103.23.198.191';
const username = 'fast';
const password = '#Fast123';

console.log('Connecting to VPS...');

conn.on('ready', () => {
  console.log('Client :: ready');
  
  const zipPath = 'C:\\Users\\Asus ROG\\Desktop\\KP Masjid Jami Kassiti\\build_terbaru_masjid.zip';
  const remoteZipPath = '/tmp/build_terbaru_masjid.zip';
  
  conn.sftp((err, sftp) => {
    if (err) throw err;
    console.log('SFTP session started. Uploading zip...');
    
    sftp.fastPut(zipPath, remoteZipPath, (err) => {
      if (err) throw err;
      console.log('Upload successful. Executing setup commands...');
      
      const cmd = `
        echo '${password}' | sudo -S apt-get update &&
        echo '${password}' | sudo -S apt-get install -y nginx unzip &&
        echo '${password}' | sudo -S rm -rf /var/www/html/* &&
        echo '${password}' | sudo -S unzip -o /tmp/build_terbaru_masjid.zip -d /var/www/html/ &&
        echo '${password}' | sudo -S chown -R www-data:www-data /var/www/html/ &&
        echo '${password}' | sudo -S systemctl restart nginx
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
