const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

const tableFilePath = './tableData.json';

function loadTableData() {
    if (fs.existsSync(tableFilePath)) {
        const rawData = fs.readFileSync(tableFilePath);
        return JSON.parse(rawData);
    } else {
        // Initialize with default data if file doesn't exist
        return [
            ["lorem", "lorem"],
            ["lorem", "lorem"],
            ["lorem", "lorem"],
            ["lorem", "lorem"],
            ["lorem", "lorem"]
        ];
    }
}

function saveTableData(data) {
    fs.writeFileSync(tableFilePath, JSON.stringify(data, null, 2));
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin1' && password === 'admin1p') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/table', (req, res) => {
    const tableData = loadTableData();
    res.json(tableData);
});

app.post('/table', (req, res) => {
    const { tableData } = req.body;
    saveTableData(tableData);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
