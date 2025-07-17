import express from 'express';
import db from '../../../db.js';

const router = express.Router();

//1. Property Register with filters
router.post('/property-register', (req, res) => {
  const { from_date, to_date, location, consignee, category, type } = req.body;

  let sql = `
    SELECT 
      a.doc_no, a.doc_date, a.file_name, a.location, a.consignor, a.consignee, 
      a.sur_no, a.area, a.sq_mtr1, a.sale_area, a.sq_mtr2, a.pur_date, 
      a.pur_val, a.reg_fee, a.fra_fee, a.remark,
      b.name AS loc_name,
      c.name AS consignee_name,
      d.name AS consignor_name
    FROM st_ptran AS a
    LEFT JOIN st_ploc AS b ON a.location = b.id
    LEFT JOIN st_consignee AS c ON a.consignee = c.id
    LEFT JOIN st_consignor AS d ON a.consignor = d.id
    WHERE a.doc_date BETWEEN ? AND ? 
      AND a.location = ? 
      AND a.consignee = ? 
      AND a.status = 'A'
  `;

  const params = [from_date, to_date, location, consignee];

  if (category && category !== 'all') {
    sql += ` AND a.category = ?`;
    params.push(category);
  }

  if (type && type !== 'all') {
    sql += ` AND a.type = ?`;
    params.push(type);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
    res.status(200).json(results);
  });
});

//2. Location-wise Register
router.post('/locationwise-register', (req, res) => {
  const { from_date, to_date, location, category, type } = req.body;

  let sql = `
    SELECT 
      a.doc_no, a.doc_date, a.file_name, a.location, a.consignor, a.consignee, 
      a.sur_no, a.area, a.sq_mtr1, a.sale_area, a.sq_mtr2, a.pur_date, 
      a.pur_val, a.reg_fee, a.fra_fee, a.remark,
      b.name AS loc_name,
      c.name AS consignee_name,
      d.name AS consignor_name
    FROM st_ptran AS a
    LEFT JOIN st_ploc AS b ON a.location = b.id
    LEFT JOIN st_consignee AS c ON a.consignee = c.id
    LEFT JOIN st_consignor AS d ON a.consignor = d.id
    WHERE a.doc_date BETWEEN ? AND ? 
      AND a.location = ? 
      AND a.status = 'A'
  `;

  const params = [from_date, to_date, location];

  if (category && category !== 'all') {
    sql += ` AND a.category = ?`;
    params.push(category);
  }

  if (type && type !== 'all') {
    sql += ` AND a.type = ?`;
    params.push(type);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
    res.status(200).json(results);
  });
});

//3. Location & Survey Register
router.get('/location-servey-register', (req, res) => {
  const sql = `
    SELECT 
      a.doc_no, a.consignee, 
      b.name AS consignee_name, 
      a.location, 
      c.name AS location_name, 
      a.sur_no, a.area, a.sq_mtr1
    FROM st_ptran AS a
    LEFT JOIN st_consignee AS b ON a.consignee = b.id
    LEFT JOIN st_ploc AS c ON a.location = c.id
    WHERE a.status = 'A'`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
    res.status(200).json(results);
  });
});

export default router;
