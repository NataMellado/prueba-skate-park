import express from 'express';
import routes from './src/routes/routes.js';
import cookieParser from 'cookie-parser';

// Server
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port http://localhost:${PORT}`); });

// Configuración de middlewares
app.use(express.static('public')); 
app.use(express.json()); 
app.use(cookieParser());

// Configuración de motor de plantillas
const exphbs = require("express-handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "/src/views");
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayaout: "main",
    layoutsDir: __dirname + "/src/views/layouts",
    partialsDir: __dirname + "/src/views/partials",
    extname: "hbs",
  })
);


// Rutas de la API REST
app.use('/api', routes);
