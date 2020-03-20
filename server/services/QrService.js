const qrcode = require("qrcode");

const {
    config: { URL },
} = require("../config");

class QRService {
    getCustomCoffeeQr = ({ title, description, message }) => {
        return qrcode.toDataURL(
            `${URL}/custom-coffee?title=${title}&description=${description}&message=${message}`
        );
    };

    getCafecitoQr = () => {
        return qrcode.toDataURL(URL);
    };
}

module.exports = QRService;
