const db = require("../config/connection");

// Hamma dorilarni chiqarib olish
exports.getAllMedicine = (req, res) => {
    db.query("SELECT * FROM medicines", (error, result) => {
        if (error) {
            console.log("Error retrieving medicines", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json(result);
    });
};

exports.createMedicine = (req, res) => {
    const { name, manufacturer, medicine_type_id, price, expiry_date, info } = req.body;
    db.query(
        "INSERT INTO medicines (name, manufacturer, medicine_type_id, price, expiry_date, info) VALUES(?,?,?,?,?,?)",
        [name, manufacturer, medicine_type_id, price, expiry_date, info],
        (error, result) => {
            if (error) {
                console.log("Error creating medicine", error);
                return res.status(500).json({ error: "Internal Server Error" })
            }
            res.json({ message: "Medicine created successfully" });
        });
};


exports.getMedicineByName = (req, res) => {
    const { name } = req.body;
    db.query("select pharmacies.name as pharm_name, pharmacies.address, pharmacies.phone, region.name as region, district.name as district, medicines.name as medicine_name, medicine_type.name as medicine_type, medicines.price, medicines.info, medicines.manufacturer, medicines.expiry_date, stock.quantity from pharmacies join region on region_id=region.id join district on district.region_id=region.id join stock on pharmacies.id=stock.pharmacy_id join medicines on stock.medicine_id=medicines.id join medicine_type on medicines.medicine_type_id=medicine_type.id where quantity>0 and medicines.name=?",
    [ name ], (error, result) => {
    if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        if (result.length === 0) {
            console.log("Medicine not found");
            return res.status(404).json({ error: "Medicine not found" })
        }
        res.json(result);
    })
}

exports.updateMedicine = (req, res) => {
    const medicineId = req.params.id;
    const { name, manufacturer, medicine_type_id, price, expiry_date, info } = req.body;
    db.query(
        "UPDATE medicines SET name=?, manufacturer=?, medicine_type_id=?, price=?, expiry_date=?, info=? WHERE id=?",
        [name, manufacturer, medicine_type_id, price, expiry_date, info, medicineId], (error, result) => {
        if (error){
            console.log("Error updating medicine", error);
            return res.status(500).json({ error: "Internal Server Error"})
        }
        res.json({ message: "Medicine updated successfully" });
    })
}

exports.deleteMedicine = (req, res) => {
    const medicineId = req.params.id;
    db.query("DELETE FROM medicines WHERE id = ?", [medicineId], (error, result) => {
        if (error) {
            console.log("Error deleting medicine", error);
            return res.status(500).json({ error: "Internal Server Error"})   
        }
        res.json({ message: "Medicine deleted successfully" });
    })
}
