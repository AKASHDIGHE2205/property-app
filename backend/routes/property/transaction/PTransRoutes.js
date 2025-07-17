import express from 'express';
import db from '../../../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, '../../../uploads');


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const upload = multer({ storage });

router.get('/getActiveConsignor', (req, res) => {
  const sql = `SELECT * FROM st_consignor WHERE status = 'A'`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.get('/getActiveConsignee', (req, res) => {
  const sql = `SELECT * FROM st_consignee WHERE status = 'A'`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.get('/getActivePLocation', (req, res) => {
  const sql = `SELECT * FROM st_ploc WHERE status = 'A'`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});
router.get('/getActiveDocument', (req, res) => {
  const sql = `SELECT * FROM st_doc WHERE status = 'A'`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data", error: err });
    }
    res.status(200).json(results);
  });
});


//-------------- Api to get transaction data  ---------------//
router.post('/getTransactionData', (req, res) => {
  const { from_date, to_date } = req.body;

  if (!from_date || !to_date) {
    return res.status(400).json({ message: "from_date and to_date are required" });
  }

  const transactionSql = `
            SELECT 
              a.doc_no, a.doc_date, a.file_name, a.location, a.consignor, a.consignee, a.sur_no,
              a.category, a.type, a.area, a.sq_mtr1, a.sale_area, a.sq_mtr2, a.cst_no, a.pur_date,
              a.pur_val, a.reg_fee, a.fra_fee, a.remark,
              b.name AS loc_name,
              c.name AS consignor_name,
              d.name AS consignee_name
            FROM st_ptran AS a
            LEFT JOIN st_ploc AS b ON a.location = b.id
            LEFT JOIN st_consignor AS c ON a.consignor = c.id
            LEFT JOIN st_consignee AS d ON a.consignee = d.id
            WHERE DATE(a.doc_date) BETWEEN ? AND ? AND a.status = 'A'`;

  db.query(transactionSql, [from_date, to_date], (err, transactions) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ message: "Error fetching transactions" });
    }

    if (transactions.length === 0) {
      return res.status(200).json([]); // No transactions
    }

    const docNos = transactions.map(t => t.doc_no);
    const placeholders = docNos.map(() => '?').join(',');
    const filesSql = `SELECT doc_no, sr_no, doc_type, description, path FROM st_pfiles WHERE doc_no IN (${placeholders})`;

    db.query(filesSql, docNos, (err, files) => {
      if (err) {
        console.error("Error fetching files:", err);
        return res.status(500).json({ message: "Error fetching files" });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`; // e.g. http://192.168.179.23:3000

      // Group files by doc_no and prepend baseUrl
      const filesByDoc = {};
      files.forEach(file => {
        const fileWithUrl = {
          ...file,
          path: file.path ? `${baseUrl}/${file.path.replace(/^\/+/, '')}` : null
        };

        if (!filesByDoc[file.doc_no]) filesByDoc[file.doc_no] = [];
        filesByDoc[file.doc_no].push(fileWithUrl);
      });

      // Merge files into transactions
      const combinedData = transactions.map(tran => ({
        ...tran,
        files: filesByDoc[tran.doc_no] || []
      }));

      res.status(200).json(combinedData);
    });
  });
});
router.post('/getEditPTran', (req, res) => {
  const { doc_no } = req.body;

  const sql = `SELECT 
                  a.doc_no, a.doc_date, a.file_name, a.location, a.consignor, a.consignee, a.sur_no,
                  a.category, a.type, a.area, a.sq_mtr1, a.sale_area, a.sq_mtr2, a.cst_no, a.pur_date, 
                  a.pur_val, a.reg_fee, a.fra_fee, a.remark,
                  b.name AS loc_name,
                  c.name AS consignor_name,
                  d.name AS consignee_name
               FROM st_ptran AS a
                LEFT JOIN st_ploc AS b ON a.location = b.id
                LEFT JOIN st_consignor AS c ON a.consignor = c.id
                LEFT JOIN st_consignee AS d ON a.consignee = d.id
               WHERE a.doc_no = ? AND a.status = 'A'`;

  db.query(sql, [doc_no], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error occurred while fetching data" });
    }
    res.status(200).json(results);
  });
});
router.post('/new-ptran', upload.any(), (req, res) => {
  const { docDate, fileName, locId, consigneeId, consignorId, surveyNo, category, type, area, sqmtr1, salesArea, sqmtr2, cstNo, purDate, purVal, regFees, fraFees, remark } = req.body;

  let rows = [];
  try {
    rows = JSON.parse(req.body.rows);
  } catch (e) {
    return res.status(400).json({ message: "Invalid rows data" });
  }

  const sql1 = `SELECT MAX(doc_no) AS maxDocNo FROM st_ptran`;
  db.query(sql1, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching doc_no" });

    const docNo = (results[0].maxDocNo || 0) + 1;

    const insertPtran = `INSERT INTO st_ptran(doc_no, doc_date, file_name, location, consignor, consignee, sur_no,
      category, type, area, sq_mtr1, sale_area, sq_mtr2, cst_no, pur_date, pur_val, reg_fee, fra_fee, remark, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const ptranValues = [docNo, docDate, fileName, locId, consignorId, consigneeId, surveyNo, category, type,
      area, sqmtr1, salesArea, sqmtr2, cstNo, purDate, purVal, regFees, fraFees, remark, 'A'];

    db.query(insertPtran, ptranValues, (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({ message: "Error inserting ptran" })
      }

      const insertPfiles = `INSERT INTO st_pfiles(doc_no, sr_no, doc_type, description, path) VALUES ?`;

      const fileData = rows.map((row, index) => {
        const file = req.files.find(f => f.fieldname === `file_${index}`);
        const filePath = file ? `/uploads/${file.filename}` : "";
        return [
          docNo,
          index + 1,
          row.docName,
          row.docDes,
          filePath
        ];
      });

      if (fileData.length > 0) {
        db.query(insertPfiles, [fileData], (err) => {
          console.log(err);
          if (err) return res.status(500).json({ message: "Error inserting files" });
          res.status(200).json({ message: "Entry successful" });
        });
      } else {
        res.status(200).json({ message: "Entry successful (no files)" });
      }
    });
  });
});
router.put('/editPTransaction', (req, res) => {
  const { doc_no, doc_date, file_name, loc_id, consignor_id, consignee_id, sur_no, category, type, area,
    sq_mtr1, sale_area, sq_mtr2, cst_no, pur_date, pur_val, reg_fee, fra_fee, remark } = req.body;

  const sql = `
    UPDATE st_ptran
    SET
      doc_date = ?,
      file_name = ?,
      location = ?,
      consignor = ?,
      consignee = ?,
      sur_no = ?,
      category = ?,
      type = ?,
      area = ?,
      sq_mtr1 = ?,
      sale_area = ?,
      sq_mtr2 = ?,
      cst_no = ?,
      pur_date = ?,
      pur_val = ?,
      reg_fee = ?,
      fra_fee = ?,
      remark = ?
    WHERE doc_no = ? AND status = 'A'
  `;

  const values = [doc_date, file_name, loc_id, consignor_id, consignee_id, sur_no, category, type, area,
    sq_mtr1, sale_area, sq_mtr2, cst_no, pur_date, pur_val, reg_fee, fra_fee, remark, doc_no];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "An error occurred while updating the transaction." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found. No update performed." });
    }

    res.status(200).json({ message: "Transaction updated successfully." });
  });
});
router.put('/deletePTransaction', (req, res) => {
  const { doc_no } = req.body;

  if (!doc_no) {
    return res.status(400).json({ message: "Missing required field: Doc No." });
  }

  const sql = `
    UPDATE st_ptran
    SET status = ?
    WHERE doc_no = ?`;

  db.query(sql, ['I', doc_no], (err, result) => {
    if (err) {
      console.error("Database error during delete:", err);
      return res.status(500).json({ message: "An error occurred while deleting the transaction." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found. No deletion performed." });
    }

    res.status(200).json({ message: "Transaction deleted successfully." });
  });
});

export default router;