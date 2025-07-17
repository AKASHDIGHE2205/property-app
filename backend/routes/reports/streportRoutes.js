import express from 'express';
import db from '../../db.js'
const router = express.Router()

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
})

export default router;