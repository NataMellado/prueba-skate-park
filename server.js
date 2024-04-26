import express from 'express';
import routes from './src/routes/routes.js';
import { engine } from "express-handlebars";
import path from "path";
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser';
process.loadEnvFile(); 
const __dirname = path.resolve();

// Server
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port http://localhost:${PORT}`); });

// Configuración de middlewares
app.use(express.json()); 
app.use(cookieParser());
app.use(express.static('public')); 
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.urlencoded({ extended: false })); // Para que pueda recibir datos de formularios en req.body 
app.use(
  fileUpload({
    limits: 5000000,
    abortOnLimit: true,
    responseOnLimit: "El tamaño de la imagen supera el límite permitido",
  })
);


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
app.use('/api', routes);
