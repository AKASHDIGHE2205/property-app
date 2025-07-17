import express from "express";
import db from "../../db.js";
const router = express.Router();

//API TO FETCH Active FIRMS/COMPANIES
router.post('/getAllTranEntries', (req, res) => {
  const { from_Date, to_Date } = req.body;
  const sql = `SELECT a.doc_code,a.entry_code,a.date,a.year,a.cub_code,a.s_code,a.su_code,a.desc,a.remark,b.name AS type_name,
                      c.name AS firm_name,d.name as loc_name,e.name as sec_name,a.type_code,a.firm_code,a.loc_code,a.sec_code,
                      a.branch_code,f.name As branch_name
              FROM st_tran AS a
              LEFT JOIN st_catg AS b ON a.type_code = b.id
              LEFT JOIN st_firm AS c ON a.firm_code = c.id
              LEFT JOIN st_location AS d ON a.loc_code = d.id
              LEFT JOIN st_section AS e ON a.sec_code = e.id
              LEFT JOIN st_branch As f ON a.branch_code = f.id  
              WHERE a.date BETWEEN ? AND ?
              ORDER BY a.doc_code ASC`;

  db.query(sql, [from_Date, to_Date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});

router.post('/get-desposed-files', (req, res) => {
  const { year, firm_code } = req.body
  const sql = `SELECT a.doc_code,a.entry_code,a.date,a.year,a.cub_code,a.s_code,a.su_code,a.desc,a.remark,b.name AS type_name,c.name AS firm_name,
                d.name as loc_name,e.name as sec_name,a.type_code,a.firm_code,a.loc_code,a.sec_code,a.branch_code,f.name As branch_name
              FROM st_tran AS a
              LEFT JOIN st_catg AS b ON a.type_code = b.id
              LEFT JOIN st_firm AS c ON a.firm_code = c.id
              LEFT JOIN st_location AS d ON a.loc_code = d.id
              LEFT JOIN st_section AS e ON a.sec_code = e.id
              LEFT JOIN st_branch As f ON a.branch_code = f.id  
              WHERE a.remark IS NOT NULL AND a.remark != '' AND firm_code=? AND year LIKE ?
              ORDER BY a.date DESC`;

  db.query(sql, [firm_code, `%${year}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});

//API TO CREATE NEW TRAN ENTRY
router.post('/newTranEntry', (req, res) => {
  const { date, entry_code, type_code, firm_code, branch_code, loc_code, sec_code, year, cub_code, s_code, su_code, desc, remark, status } = req.body;

  if (!date || !type_code || !firm_code || !loc_code || !sec_code || !year || !desc || !cub_code || !s_code || !su_code) {
    return res.status(400).json({ message: "Please, fill all required fields." });
  }

  const sql = `INSERT INTO st_tran 
               (\`date\`, entry_code,type_code, firm_code, branch_code ,loc_code, sec_code, year, cub_code, s_code, su_code, \`desc\`, remark,status) 
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(sql, [date, entry_code, type_code, firm_code, branch_code, loc_code, sec_code, year, cub_code, s_code, su_code, desc, remark, status], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error occurred while creating new entry", error: err.message });
    }

    return res.status(201).json({ message: "Entry created successfully", entryId: results.insertId });
  });
});

//API TO GET TRAN ENTRY BY ID
router.get('/getTranEntry/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT a.doc_code,a.date,a.year,a.cub_code,a.type_code,a.firm_code,a.loc_code,a.sec_code,a.s_code,
                   a.su_code,a.desc,a.remark,b.name AS type_name,c.name AS firm_nam,
                   d.name as loc_name,e.name as sec_name
               FROM st_tran AS a
               LEFT JOIN st_catg AS b ON a.type_code = b.id
               LEFT JOIN st_firm AS c ON a.firm_code = c.id
               LEFT JOIN st_location AS d ON a.loc_code = d.id
               LEFT JOIN st_section AS e ON a.sec_code = e.id WHERE a.doc_code = ?`;
  db.query(sql, id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  })
});

//API TO UPDATE TRAN ENTRY
router.put('/updateTranEntry', (req, res) => {
  const { doc_code, date, type_code, firm_code, branch_code, loc_code, sec_code, year, cub_code, s_code, su_code, desc, remark } = req.body;

  const sql = `UPDATE st_tran SET date = ?, type_code = ?, firm_code = ?, branch_code = ?, loc_code = ?, sec_code = ?, year = ?, 
                                  cub_code = ?, s_code = ?, su_code = ?, \`desc\` = ?, remark = ?
              WHERE doc_code = ? AND date = ?`;
  db.query(sql, [date, type_code, firm_code, branch_code, loc_code, sec_code, year, cub_code, s_code, su_code, desc, remark, doc_code, date], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error occurred while updating entry", error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Entry updated successfully" });
  });
});



//API TO FETCH Active FIRMS/COMPANIES
router.get('/getActiveFirms', (req, res) => {
  const sql = "SELECT * FROM st_firm WHERE status = 'A' ";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});

//API TO FETCH Active FIRMS/COMPANIES
router.get('/getActiveBranches', (req, res) => {
  const sql = "SELECT * FROM st_branch WHERE status = 'A' ";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});


//API TO FETCH Active CATEGORY
router.get('/getActivecatgs', (req, res) => {

  const sql = "SELECT * FROM st_catg WHERE status = 'A' ";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});

//API TO FETCH Active LOCATION
router.get('/getActiveLocations', (req, res) => {
  const sql = "SELECT * FROM st_location WHERE status = 'A' ";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});

//API TO FETCH Active SECTION
router.get('/getActiveSections', (req, res) => {
  const sql = "SELECT * FROM st_section WHERE status = 'A' ";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});

export default router;