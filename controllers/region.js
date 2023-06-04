const db = require("../config/connection");

exports.getAllRegions = (req, res) => {
    db.query("SELECT * FROM region", (error, result) => {
        if (error) {
            console.log("Error retrieving regions", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    })
}

exports.createRegion = (req, res) => {
    const { id, name } = req.body;
    db.query("INSERT INTO region(id, name) VALUES(?, ?)", [id, name], (error, result) => {
        if (error) {
            console.log("Error creating region");
            return res.status(500).json({ error: "Internal Server Error" })
        }
        res.json({ message: "Region created successfully" });
    })
}

exports.getRegionById = (req, res) => {
    const regionId = req.params.id;
    db.query("SELECT * FROM region WHERE id = ?", regionId, (error, result) => {
        if (error) {
            console.log("Error retrieving a region", error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Region not found" });
        } 
        res.json(result[0]);
    })
}

exports.updateRegion = (req, res) => {
    const regionId = req.params.id;
    const { id, name } = req.body;
    db.query("UPDATE region SET id = ?, name = ? WHERE id = ?",[id, name, regionId], (error, result) => {
        if (error){
            console.log("Error updating region", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json({ message: "Region updated successfully" });
    })
}

exports.deleteRegion = (req, res) => {
    const regionId = req.params.id;
    db.query("DELETE FROM region WHERE id = ?", [regionId], (error, result) => {
        if (error) {
            console.log("Error deleting region", error);
            return res.status(500).json({ error: "Internal Server Error"})   
        }
        res.json({ message: "Region deleted successfully" });
    })
}