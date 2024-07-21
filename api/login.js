const fs = require('fs');
const tableFilePath = './tableData.json';

function loadTableData() {
    if (fs.existsSync(tableFilePath)) {
        const rawData = fs.readFileSync(tableFilePath);
        return JSON.parse(rawData);
    } else {
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

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username === 'admin1' && password === 'admin1p') {
            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false });
        }
    }
}
