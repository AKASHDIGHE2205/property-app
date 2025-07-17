import express from 'express';
import db from '../../db.js';
const router = express.Router();

//API TO FETCH ALL FIRMS/COMPANIES
router.get('/getAllFirms', (req, res) => {
  const sql = "SELECT * FROM st_firm";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
//API TO CREATE NEW FIRM
router.post('/newFirm', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Firm name is required." });
  }

  const sql = `INSERT INTO st_firm (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new firm", error: err });
    }
    res.status(201).json({ message: "New firm created successfully!" });
  });
});
//API TO UPDATE FIRMS
router.put('/editFirm', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const sql = `UPDATE st_firm SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Firm not found or no changes made" });
    }

    res.status(200).json({ message: "Firm updated successfully." });
  });
});



//API TO FETCH AL BRANCHES
router.get('/getAllBranches', (req, res) => {
  const sql = "SELECT * FROM st_branch";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  })
})
//API TO CREATE NEW BRANCH
router.post('/newBranch', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Branch name is required. " })
  }
  const sql = `INSERT INTO st_branch (name,status) VALUES (?,?)`;
  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new branch" })
    }
    res.status(201).json({ message: "New branch created successfully!" });
  });
});
//API TO UPDATE BRANCH
router.put('/editBranch', (req, res) => {
  const { id, name, status } = req.body;
  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields" })
  }
  const sql = `UPDATE st_branch SET name = ? , status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating branch.", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Branch not found." })
    }
    res.status(200).json({ message: "Branch updated successfully." });
  });
});



//API TO FETCH ALL CATEGORY
router.get('/getAllcatgs', (req, res) => {

  const sql = "SELECT * FROM st_catg";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
//API TO UPDATE Catg
router.put('/editCatg', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `UPDATE st_catg SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "category not found or no changes made" });
    }

    res.status(200).json({ message: "category updated successfully." });
  });
});
//API TO CREATE NEW Catg
router.post('/newCatg', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required." });
  }

  const sql = `INSERT INTO st_catg (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new category", error: err });
    }
    res.status(201).json({ message: "New Category created successfully!" });
  });
});



//API TO FETCH ALL LOCATION
router.get('/getAllLocations', (req, res) => {
  const sql = "SELECT * FROM st_location";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
//API TO UPDATE LOCATIONS
router.put('/editLocation', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `UPDATE st_location SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Firm not found or no changes made" });
    }

    res.status(200).json({ message: "Firm updated successfully." });
  });
});
//API TO CREATE NEW LOCATIONS
router.post('/newLocation', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Location name is required." });
  }

  const sql = `INSERT INTO st_location (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new Location", error: err });
    }
    res.status(201).json({ message: "New Location created successfully!" });
  });
});



//API TO FETCH ALL SECTION
router.get('/getAllSections', (req, res) => {
  const sql = "SELECT * FROM st_section";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
//API TO UPDATE SECTIONS
router.put('/editSection', (req, res) => {
  const { id, name, status } = req.body;

  if (!id || !name || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `UPDATE st_section SET name = ?, status = ? WHERE id = ?`;
  db.query(sql, [name, status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating firm", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Section not found or no changes made" });
    }

    res.status(200).json({ message: "Section updated successfully." });
  });
});
//API TO CREATE NEW SECTIONS
router.post('/newSection', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Section name is required." });
  }

  const sql = `INSERT INTO st_section (name, status) VALUES (?, ?)`;

  db.query(sql, [name, 'A'], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating a new firm", error: err });
    }
    res.status(201).json({ message: "New Section created successfully!" });
  });
});


export default router;