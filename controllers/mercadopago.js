const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
    sandbox: true
})

class MercadopagoController{

    preferences;
    urlFrontend;
    urlBackend;

    constructor(){
        
        this.urlBackend = "https://luisedo97-mp-commerce-nodejs.herokuapp.com"
        this.urlFrontend = "https://luisedo97-mp-commerce-nodejs.herokuapp.com"

        this.preferences = {
            collector_id: 469485398,
            //URLS
            back_urls: {
                success: this.urlFrontend+"/payment/success",
                pending: this.urlFrontend+"/payment/pending",
                failure: this.urlFrontend+"/payment/failure"
            },
            notification_url: this.urlBackend+"/mp/notification",
            payment_methods:{
                excluded_payment_methods: [
                    {
                        id: 'amex'
                    }
                ],
                excluded_payment_types: [
                    {
                        id: 'atm'
                    }
                ],
                installments: 6
            },
            auto_return: 'all',
            payer:{
                name: 'Lalo',
                surname: 'Landa',
                email: 'test_user_63274575@testuser.com',
                address:{
                    zip_code: '1111',
                    street_name: 'False',
                    street_number: 123
                }
            },
            external_reference: 'luisaraujo@metodity.com',
            items: []
        }
    }

    async getNotification(req,res){
        console.log(req.body);
    }

    async createPayment(req,res){
        try {
            
            const preferences = {...this.preferences};

            preferences.items.push({
                id: 1234,
                title: req.body.title,
                description: "Dispositivo móvil de Tienda e-commerce",
                picture_url: this.urlFrontend + req.body.img,
                quantity: 1,
                unit_price: parseInt(req.body.price)
            });

            const resMP = await mercadopago.preferences.create(this.preferences);
            
            //console.log(resMP);
            res.status(200).send({init_point: resMP.body.init_point});

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new MercadopagoController();
