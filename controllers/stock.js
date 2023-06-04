const db = require("../config/connection");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM stock", (error, result) => {
        if (error) {
            console.log("Error retrieving stocks", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    })
}

exports.createStock = (req, res) => {
    const { medicine_id, quantity, pharmacy_id } = req.body;
    db.query(
        "INSERT INTO stock(medicine_id, pharmacy_id, quantity) VALUES(?, ?, ?)", 
        [medicine_id, pharmacy_id, quantity], 
        (error, result) => {
        if (error) {
            console.log("Error creating stock", error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        res.json({ message: "stock created successfully" });
    })
}

exports.getStockById = (req, res) => {
    const stockId = req.params.id;
    db.query("SELECT * FROM stock WHERE id = ?", stockId, (error, result) => {
        if (error) {
            console.log("Error retrieving a stock", error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "stock not found" });
        } 
        res.json(result[0]);
    })
}

exports.updateStock = (req, res) => {
    const stockId = req.params.id;
    const { medicine_id, pharmacy_id, quantity } = req.body;
    db.query("UPDATE stock SET medicine_id = ?, pharmacy_id = ?, quantity = ? WHERE id = ?",
    [medicine_id, pharmacy_id, quantity, stockId], 
    (error, result) => {
        if (error){
            console.log("Error updating stock", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json({ message: "stock updated successfully" });
    })
}

exports.deleteStock = (req, res) => {
    const stockId = req.params.id;
    db.query("DELETE FROM stock WHERE id = ?", [stockId], (error, result) => {
        if (error) {
            console.log("Error deleting stock", error);
            return res.status(500).json({ error: "Internal Server Error"})   
        }
        res.json({ message: "stock deleted successfully" });
    })
}