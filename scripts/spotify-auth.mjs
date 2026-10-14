import http from 'http';
import { URL } from 'url';
import readline from 'readline';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = ['user-read-currently-playing', 'user-read-recently-played'].join(' ');

// Try reading existing values from .env.local
let existingClientId = '';
let existingClientSecret = '';
const envPath = path.resolve(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const idMatch = envContent.match(/SPOTIFY_CLIENT_ID=([^\r\n]+)/);
  const secretMatch = envContent.match(/SPOTIFY_CLIENT_SECRET=([^\r\n]+)/);
  if (idMatch) existingClientId = idMatch[1].trim();
  if (secretMatch) existingClientSecret = secretMatch[1].trim();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function openUrl(url) {
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${start} "${url}"`);
}

async function main() {
  console.log('\n🎵 --- Spotify Setup Assistant ---\n');
  console.log('To connect your Spotify to your portfolio, you need a Spotify Developer App.');
  console.log('1. Go to: https://developer.spotify.com/dashboard');
  console.log('2. Click "Create App" (e.g. Name: "Portfolio", Redirect URI: http://127.0.0.1:8888/callback)');
  console.log('3. In App Settings, find your Client ID and Client Secret.\n');

  const clientId = existingClientId || (await question('Enter your Spotify Client ID: ')).trim();
  const clientSecret = existingClientSecret || (await question('Enter your Spotify Client Secret: ')).trim();

  if (!clientId || !clientSecret) {
    console.error('❌ Client ID and Client Secret are required.');
    process.exit(1);
  }

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  }).toString()}`;

  const server = http.createServer(async (req, res) => {
    try {
      const reqUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
      if (reqUrl.pathname === '/callback') {
        const code = reqUrl.searchParams.get('code');
        const error = reqUrl.searchParams.get('error');

        if (error || !code) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h2>Authentication Failed: ${error || 'No code provided'}</h2>`);
          server.close();
          process.exit(1);
        }

        // Exchange code for refresh token
        const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
          }),
        });

        const tokenData = await tokenRes.json();

        if (tokenData.refresh_token) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <div style="font-family: sans-serif; text-align: center; padding: 40px;">
              <h1 style="color: #1DB954;">🎉 Spotify Connected Successfully!</h1>
              <p>You can close this tab and check your terminal.</p>
            </div>
          `);

          console.log('\n\n✅ SUCCESS! Here are your environment variables to add to .env.local:\n');
          console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
          console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
          console.log(`SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}\n`);

          // Ask to automatically update .env.local
          const shouldUpdate = await question('Would you like to automatically append these to your .env.local? (y/n): ');
          if (shouldUpdate.toLowerCase().startsWith('y')) {
            let envData = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
            // Remove old entries if any
            envData = envData
              .split('\n')
              .filter(line => !line.startsWith('SPOTIFY_CLIENT_ID=') && !line.startsWith('SPOTIFY_CLIENT_SECRET=') && !line.startsWith('SPOTIFY_REFRESH_TOKEN='))
              .join('\n')
              .trim();

            const additions = `\nSPOTIFY_CLIENT_ID=${clientId}\nSPOTIFY_CLIENT_SECRET=${clientSecret}\nSPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}\n`;
            fs.writeFileSync(envPath, envData + additions, 'utf-8');
            console.log('🚀 .env.local updated successfully!\n');
          }

          rl.close();
          server.close();
          process.exit(0);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h2>Failed to obtain refresh token: ${JSON.stringify(tokenData)}</h2>`);
          console.error('Failed to obtain refresh token:', tokenData);
          server.close();
          process.exit(1);
        }
      }
    } catch (err) {
      console.error('Server error:', err);
      res.writeHead(500);
      res.end('Server error');
      server.close();
      process.exit(1);
    }
  });

  server.listen(PORT, '127.0.0.1', () => {
    console.log(`🔗 Opening browser for Spotify Authorization...\nIf it does not open automatically, visit:\n${authUrl}\n`);
    openUrl(authUrl);
  });
}

main().catch(console.error);
