const db = require("../config/connection");

exports.getAllPharm = (req, res) => {
    db.query("SELECT * FROM pharmacies", (error, result) => {
        if (error) {
            console.log("Error retrieving pharms", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    });
};

exports.createPharm = (req, res) => {
    const { name, address, location, phone, email, region_id, district_id } = req.body;
    db.query(
        "INSERT INTO pharmacies (name, address, location, phone, email, region_id, district_id) VALUES(?,?,?,?,?,?,?)",
        [name, address, location, phone, email, region_id, district_id],
        (error, result) => {
            if (error) {
                console.log("Error creating pharm", error);
                return res.status(500).json({ error: "Internal Server Error" })
            }
            res.json({ message: "pharm created successfully" });
        });
};


exports.getPharmById = (req, res) => {
    const pharmId = req.params;
    db.query("SELECT * FROM pharmacies WHERE id = ?", [ pharmId ], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        if (result.length === 0) {
            console.log("pharm not found");
            return res.status(404).json({ error: "pharm not found" })
        }
        res.json(result[0]);
    })
}

exports.updatePharm = (req, res) => {
    const pharmId = req.params.id;
    const { name, address, location, phone, email, region_id, district_id } = req.body;
    db.query(
        "UPDATE pharmacies SET name=?, address=?, location=?, phone=?, email=?, region_id=?, district_id=? WHERE id=?",
        [name, address, location, phone, email, region_id, district_id, pharmId], (error, result) => {
        if (error){
            console.log("Error updating pharm", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json({ message: "pharm updated successfully" });
    })
}

exports.deletePharm = (req, res) => {
    const pharmId = req.params.id;
    db.query("DELETE FROM pharmacies WHERE id = ?", [pharmId], (error, result) => {
        if (error) {
            console.log("Error deleting pharm", error);
            return res.status(500).json({ error: "Internal Server Error"})   
        }
        res.json({ message: "pharm deleted successfully" });
    })
}
