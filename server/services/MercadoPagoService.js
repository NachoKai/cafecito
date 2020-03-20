const axios = require("axios");

const { config } = require("../config");

const { URL, ACCESS_KEY_MP } = config;

class MercadoPagoService {
    createPayment = async (title, price, coffeeId) => {
        const result = await axios.post(
            `https://api.mercadopago.com/checkout/preferences?access_token=${ACCESS_KEY_MP}`,
            {
                items: [
                    {
                        title: title,
                        quantity: 1,
                        currency_id: "ARS",
                        unit_price: price,
                    },
                ],
                external_reference: {
                    coffeeId,
                },
                back_urls: {
                    success: `https://${URL}`,
                },
                auto_return: "approved",
                payment_methods: {
                    installments: 1,
                    default_installments: 1,
                },
            }
        );

        return result.data.init_point;
    };

    getPayment = async collectionId => {
        const result = await axios.get(
            `https://api.mercadopago.com/v1/payments/${collectionId}?access_token=${ACCESS_KEY_MP}`
        );

        return result.data;
    };
}

module.exports = MercadoPagoService;
