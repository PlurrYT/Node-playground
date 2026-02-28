const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Node Playground</title>
                <style>
                    body { font-family: Arial; background: #f5f5f5; }
                    .container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px #ccc; }
                    textarea { width: 100%; height: 120px; font-family: monospace; font-size: 16px; }
                    button { padding: 10px 20px; font-size: 16px; }
                    .output { margin-top: 20px; background: #eee; padding: 15px; border-radius: 6px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Node Playground</h2>
                    <form method="POST" action="/run">
                        <label for="code">Enter JavaScript code:</label><br>
                        <textarea name="code" id="code"></textarea><br><br>
                        <button type="submit">Run</button>
                    </form>
                    <div class="output">
                        <strong>Output:</strong>
                        <pre id="result">${req.query.result || ''}</pre>
                    </div>
                </div>
            </body>
        </html>
    `);
});

app.post('/run', (req, res) => {
    let output = '';
    try {
        output = eval(req.body.code);
        if (typeof output !== 'string') output = JSON.stringify(output);
    } catch (e) {
        output = e.toString();
    }
    res.redirect('/?result=' + encodeURIComponent(output));
});

app.listen(port, () => {
    console.log(`Node Playground listening at http://localhost:${port}`);
});
 
