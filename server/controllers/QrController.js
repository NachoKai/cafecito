const QrService = require("../services/QrService");

const qrService = new QrService();

class QRController {
    getCustomCoffeeQr = async (req, res) => {
        const { title, description, message } = req.body;

        const qrUrl = await qrService.getCustomCoffeeQr({
            title,
            description,
            message,
        });

        return res.json({ qr: qrUrl });
    };

    getCafecitoQr = async (req, res) => {
        const qrUrl = await qrService.getCafecitoQr();

        return res.json({ qr: qrUrl });
    };
}

module.exports = QRController;
