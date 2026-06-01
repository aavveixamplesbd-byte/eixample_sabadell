export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();
    const token = data.access_token;
    const error = data.error;

    if (error) {
      res.status(400).send(`Error: ${error}`);
      return;
    }

    // Sends the authorization token back to Decap CMS window using postMessage
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Autenticació Completada</title>
        </head>
        <body>
          <script>
            const receiveMessage = (e) => {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({
                  token,
                  provider: 'github',
                })}',
                e.origin
              );
            };
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`Error Intern: ${err.message}`);
  }
}
