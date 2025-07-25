import express from 'express';
import db from '../../db.js';
const router = express.Router();

router.get('/getEntryStatus', (req, res) => {
  // const sql = `SELECT 
  //               a.firm_code, 
  //               b.name AS firm_name, 
  //               COUNT(*) AS record_count
  //             FROM st_tran AS a
  //             LEFT JOIN st_firm AS b ON a.firm_code = b.id
  //             GROUP BY a.firm_code, b.name
  //             ORDER BY b.id;`;
  const sql = `
                SELECT 
                  a.firm_code, 
                  b.name AS firm_name, 
                  COUNT(*) AS record_count,
                  0 AS sort_order
                FROM st_tran AS a
                LEFT JOIN st_firm AS b ON a.firm_code = b.id
                GROUP BY a.firm_code, b.name

                UNION ALL

                SELECT 
                  NULL AS firm_code, 
                  'Total' AS firm_name, 
                  COUNT(*) AS record_count,
                  1 AS sort_order
                FROM st_tran

                ORDER BY sort_order, firm_name`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  })
});

router.post("/branch-wise-report", (req, res) => {
  const { branch_code, year } = req.body;

  if (!branch_code || !year) {
    return res.status(400).json({ message: 'PLease fill all required fields!' });
  }

  const sql = `
    SELECT 
      a.doc_code,
      a.date,
      a.desc,
      b.name AS firm_name,
      c.name AS branch_name,
      a.year,
      a.cub_code,
      a.s_code,
      a.remark,
      a.firm_code,
      a.branch_code
    FROM st_tran AS a
    LEFT JOIN st_firm AS b ON a.firm_code = b.id
    LEFT JOIN st_branch AS c ON a.branch_code = c.id
    WHERE a.year = ? AND a.branch_code = ?`;

  db.query(sql, [year, branch_code], (err, results) => {
    if (err) {
      console.error("Error fetching branch-wise report:", err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

router.post("/firm-wise-report", (req, res) => {
  const { firm_code, year } = req.body;

  if (!firm_code || !year) {
    return res.status(400).json({ message: 'Please fill all required fields!' });
  }

  const sql = `
    SELECT 
      a.doc_code,
      a.date,
      a.desc,
      b.name AS firm_name,
      c.name AS branch_name,
      a.year,
      a.cub_code,
      a.s_code,
      a.remark,
      a.firm_code,
      a.branch_code
    FROM st_tran AS a
    LEFT JOIN st_firm AS b ON a.firm_code = b.id
    LEFT JOIN st_branch AS c ON a.branch_code = c.id
    WHERE a.year = ? AND a.firm_code = ?`;

  db.query(sql, [year, firm_code], (err, results) => {
    if (err) {
      console.error("Error fetching firm-wise report:", err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

router.post("/year-wise-report", (req, res) => {
  const { year } = req.body;

  if (!year) {
    return res.status(400).json({ message: 'Please fill all required fields!' });
  }

  const sql = `
                SELECT 
                  a.doc_code,
                  a.date,
                  a.desc,
                  b.name AS firm_name,
                  c.name AS branch_name,
                  a.year,
                  a.cub_code,
                  a.s_code,
                  a.remark,
                  a.firm_code,
                  a.branch_code
                FROM st_tran AS a
                LEFT JOIN st_firm AS b ON a.firm_code = b.id
                LEFT JOIN st_branch AS c ON a.branch_code = c.id
                WHERE a.year = ?`;
  db.query(sql, [year], (err, results) => {
    if (err) {
      console.error("Error fetching year-wise report:", err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});


// router.post("/year-wise-report", (req, res) => {
//   const { year } = req.body;

//   if (!year || year.trim() === "") {
//     return res.status(400).json({ message: "Please fill all required fields!" });
//   }

//   const sql = `
//     SELECT 
//       a.doc_code,
//       a.date,
//       a.desc,
//       IFNULL(b.name, 'Unknown Firm') AS firm_name,
//       IFNULL(c.name, 'Unknown Branch') AS branch_name,
//       a.year,
//       a.cub_code,
//       a.s_code,
//       a.remark,
//       a.firm_code,
//       a.branch_code
//     FROM st_tran AS a
//     LEFT JOIN st_firm AS b ON a.firm_code = b.id
//     LEFT JOIN st_branch AS c ON a.branch_code = c.id
//     WHERE a.year LIKE ?
//     ORDER BY firm_name, a.date
//   `;

//   db.query(sql, [`%${year}%`], (err, results) => {
//     if (err) {
//       console.error("Error fetching year-wise report:", err);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }

//     // Group by firm_name
//     const grouped = {};
//     results.forEach((row) => {
//       const firm = row.firm_name || "Unknown Firm";
//       if (!grouped[firm]) grouped[firm] = [];
//       grouped[firm].push(row);
//     });

//     res.json(grouped);
//   });
// });


export default router;