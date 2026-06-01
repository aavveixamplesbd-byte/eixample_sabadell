export default function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  // Detect if protocol is https (standard on Vercel)
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirect_uri = `${protocol}://${host}/api/callback`;
  
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  res.redirect(url);
}
