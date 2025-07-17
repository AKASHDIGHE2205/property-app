import express from 'express';
import db from '../../../db.js';
const router = express.Router();

router.get('/getAllConsignor', (req, res) => {
  const sql = `SELECT * FROM st_consignor`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.post('/newConsigner', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Consigner name is required." });
  }

  const sql = `INSERT INTO st_consignor (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new firm", error: err });
    }
    res.status(201).json({ message: "New Consignor created successfully!" });
  });
});
router.put('/editConsigner', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields (id, name, status)" });
  }

  const sql = `UPDATE st_consignor SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Consignor not found or no changes made" });
    }
    res.status(200).json({ message: "Consignor updated successfully." });
  });
});






router.get('/getAllConsignee', (req, res) => {
  const sql = `SELECT * FROM st_consignee`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.post('/newConsignee', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Consignee name is required." });
  }

  const sql = `INSERT INTO st_consignee (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new firm", error: err });
    }
    res.status(201).json({ message: "New Consignee created successfully!" });
  });
});
router.put('/editConsignee', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields (id, name, status)" });
  }

  const sql = `UPDATE st_consignee SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Consignee not found or no changes made" });
    }
    res.status(200).json({ message: "Consignee updated successfully." });
  });
});




router.get('/getAllDocument', (req, res) => {
  const sql = `SELECT * FROM st_doc`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.post('/newDocument', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Document name is required." });
  }

  const sql = `INSERT INTO st_doc (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new firm", error: err });
    }
    res.status(201).json({ message: "New Document created successfully!" });
  });
});
router.put('/editDocument', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields (id, name, status)" });
  }

  const sql = `UPDATE st_doc SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Document not found or no changes made" });
    }
    res.status(200).json({ message: "Document updated successfully." });
  });
});






router.get('/getAllPLocation', (req, res) => {
  const sql = `SELECT * FROM st_ploc`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.post('/newPLocation', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Location name is required." });
  }

  const sql = `INSERT INTO st_ploc (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new firm", error: err });
    }
    res.status(201).json({ message: "New Location created successfully!" });
  });
});
router.put('/editPLocation', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields (id, name, status)" });
  }

  const sql = `UPDATE st_ploc SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Location not found or no changes made" });
    }
    res.status(200).json({ message: "Location updated successfully." });
  });
});

export default router;
