const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3001;

const sql = require("msnodesqlv8");
const connectionstring = "Server=LAPTOP-VUR8T7R2;Database=OfficeTransactions;Trusted_Connection=Yes;Driver={SQL Server}";


app.get('/transactions', (req, res) => {
    const query = "SELECT * from Transactions order by Date asc";
    sql.query(connectionstring, query, (err, rows) => {
        if (err) {
            console.error('Error fetching records:', err);
        } else {
            console.log('Record fetched successfully', rows[0]);
            res.send(Object.values(rows));
        }
    });
});

app.post('/transactions', async (req, res) => {
    let jsonRequest = req.body;
    const query = `INSERT INTO Transactions (Date, Description, Type, Amount) VALUES (?, ?, ?, ?)`;
    const params = [new Date().toISOString(), jsonRequest.description, jsonRequest.type, jsonRequest.amount];
    sql.query(connectionstring, query, params, (err, rows) => {
        if (err) {
            console.error('Error inserting record:', err);
            res.send("Error");
        } else {
            console.log('Record inserted successfully');
            res.send("OK");
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




