const db = require("../config/connection");

exports.getAllDistricts = (req, res) => {
    db.query("SELECT * FROM district", (error, result) => {
        if (error) {
            console.log("Error retrieving districts", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    })
}

exports.createDistrict = (req, res) => {
    const { name, region_id } = req.body;
    db.query("INSERT INTO district(name, region_id) VALUES(?, ?)", [name, region_id], (error, result) => {
        if (error) {
            console.log("Error creating district");
            return res.status(500).json({ error: "Internal Server Error" })
        }
        res.json({ message: "District created successfully" });
    })
}

exports.getDistrictById = (req, res) => {
    const districtId = req.params.id;
    db.query("SELECT * FROM district WHERE id = ?", districtId, (error, result) => {
        if (error) {
            console.log("Error retrieving a district", error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "District not found" });
        } 
        res.json(result[0]);
    })
}

exports.updateDistrict = (req, res) => {
    const districtId = req.params.id;
    const { name, region_id } = req.body;
    db.query("UPDATE district SET  name = ?, region_id = ? WHERE id = ?",[name, region_id,districtId], (error, result) => {
        if (error){
            console.log("Error updating district", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json({ message: "District updated successfully" });
    })
}

exports.deleteDistrict = (req, res) => {
    const districtId = req.params.id;
    db.query("DELETE FROM district WHERE id = ?", [districtId], (error, result) => {
        if (error) {
            console.log("Error deleting district", error);
            return res.status(500).json({ error: "Internal Server Error"})   
        }
        res.json({ message: "district deleted successfully" });
    })
}