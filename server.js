import express from 'express';
import router from './api/routes/routes.js';
import { engine } from "express-handlebars";
import path from "path";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
process.loadEnvFile(); // Comentar esta línea al hacer deploy en Render

// Server
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port http://localhost:${PORT}`); });
const __dirname = path.resolve();

// Configuración de middlewares
app.use(express.json()); 
app.use(cookieParser());
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: false }));

// Configuración de fileUpload
app.use(fileUpload());

// Configuración de handlebars
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);

// Rutas de la API REST
app.use('/', router);


