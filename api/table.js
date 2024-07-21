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
    if (req.method === 'GET') {
        const tableData = loadTableData();
        res.status(200).json(tableData);
    } else if (req.method === 'POST') {
        const { tableData } = req.body;
        saveTableData(tableData);
        res.status(200).json({ success: true });
    }
}
