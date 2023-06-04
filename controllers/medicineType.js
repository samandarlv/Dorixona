const db = require("../config/connection");

exports.getAll = (req, res) => {
    db.query("SELECT * FROM medicine_type", (error, result) => {
        if (error) {
            console.log("Error retrieving medicine type", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    });
};

exports.create = (req, res) => {
    const { name } = req.body;
    db.query("INSERT INTO medicine_type(name) VALUES(?)", [name], (error, result) => {
        if (error) {
            console.log("Error creating medicine type", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    });
};

exports.getById = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM medicine_type WHERE id = ?", id, (error, result) => {
        if (error) {
            console.log("Error retrieving a medicine type", error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Medicine type not found" });
        } 
        res.json(result[0]);
    })
}

exports.update = (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    db.query("UPDATE medicine_type SET name = ? WHERE id = ?",[ name, id], (error, result) => {
        if (error){
            console.log("Error updating medicine type", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json({ message: "Medicine type updated successfully" });
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM medicine_type WHERE id = ?", [id], (error, result) => {
        if (error) {
            console.log("Error deleting medicine type", error);
            return res.status(500).json({ error: "Internal Server Error"})   
        }
        res.json({ message: "Medicine type deleted successfully" });
    })
}