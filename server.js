const next = require("next");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require("body-parser");
const routes = require("./routes");

const {
  config: { isDev, PORT, URL },
} = require("./server/config");

const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);

let urlMongo = "";
urlMongo = process.env.DB_USER
  ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-1vs3x.mongodb.net/?authSource=admin&w=1`
  : `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-1vs3x.mongodb.net/`;

mongoose.set("useCreateIndex", true);

mongoose
  .connect(urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const TelegramService = require("./server/services/TelegramService");
const TelegramServiceInstance = new TelegramService();

const MercadoPagoService = require("./server/services/MercadoPagoService");
const MercadoPagoServiceInstance = new MercadoPagoService();

const CoffeeService = require("./server/services/CoffeeService");
const CoffeeServiceInstance = new CoffeeService();

const CoffeeController = require("./server/controllers/CoffeeController");
const CoffeeInstance = new CoffeeController(
  TelegramServiceInstance,
  CoffeeServiceInstance,
  MercadoPagoServiceInstance
);

const QrController = require("./server/controllers/QrController");
const QrControllerInstance = new QrController();

CoffeeInstance.getCoffeesWithoutImages();

const express = require("express");

app.prepare().then(() => {
  const server = express();

  server.use("/static", express.static("public"));
  server.use(compression());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.post("/api/send_coffee", CoffeeInstance.sendCoffee);
  server.post("/api/send_answer", CoffeeInstance.sendAnswer);
  server.post("/api/delete_coffee", CoffeeInstance.deleteCoffee);
  server.get("/api/coffees", CoffeeInstance.getCoffees);
  server.get("/api/get_qr", QrControllerInstance.getCafecitoQr);
  server.post("/api/custom-coffee/get_qr", QrControllerInstance.getCustomCoffeeQr);
  server.get("/api/get_payment_by_coffe/:id", CoffeeInstance.getPaymentByCoffeId);
  server.post("/api/ipn", CoffeeInstance.savePayment);

  server.use(handler);

  server.listen(process.env.PORT || 3000, function() {
    console.log(`Server is running on port ${PORT}`);
  });

  console.log(`Server started on port ${PORT} | Url: ${URL}`);
});
