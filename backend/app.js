import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import MasterRoutes from './routes/master/MasterRoutes.js';
import TransactionRoutes from './routes/transaction/TransactionRoutes.js';
import authRoutes from './routes/auth/authRoutes.js';
import streportRoutes from './routes/reports/streportRoutes.js'

import PMasterRoutes from './routes/property/master/PMasterRoutes.js'
import PTranRoutes from './routes/property/transaction/PTransRoutes.js';
import PReportRoutes from './routes/property/report/PReportRoutes.js';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// DEFINE ALL ROUTES HERE
app.use(authRoutes);

app.use(MasterRoutes);
app.use(TransactionRoutes);
app.use(streportRoutes);

app.use(PMasterRoutes);
app.use(PTranRoutes);
app.use(PReportRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});