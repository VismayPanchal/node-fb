const crypto = require('crypto');
const { webhhoksecret, TomorrowAPIKEY, alertsURL, ngrokURL } = require('../config/config.json')
const fetch = require("node-fetch");

// secret that was appended to the webhook
const secret = webhhoksecret;

// signing the secret with the timestamp from the request
function sign(secret, timestamp) {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(timestamp);
    return hmac.digest('hex');
}

module.exports = {
    webhook: async function (req) {
        // tomorrow.io signature header is "t={timestamp},sig={signature}"
        const signatureHeader = req.headers['X-Signature'].split(',');
        // extract timestamp
        const timestamp = signatureHeader[0].split('=')[1];
        // extract signature
        const signature = signatureHeader[1].split('=')[1];
        // getting the expected signature
        const expectedSignature = sign(secret, timestamp);

        if (signature !== expectedSignature) {
            throw new Error();
        }
    },

    createAlert: async function ({ locationName = "Your location", lat, lng, condition = 'temprature', threshold = 35 }) {
        const payload = {
            name: `Alert for ${locationName}`,
            enabled: true,
            insight: "temperature", // 🔥 REQUIRED
            notifications: [
                {
                    endpoint: ngrokURL,
                    type: "webhook",
                }
            ],
            rules: [
                {
                    condition: `${condition} > ${threshold}`,
                    timeframe: {
                        from: "now",
                        to: "nowPlus1h"
                    }
                }
            ],
            metadata: {
                location: locationName
            },
            trigger: {
                location: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                time_window: {
                    start_time: "2024-04-29T00:00:00Z",
                    end_time: "2024-04-30T00:00:00Z"
                }
            }
        };

        try {
            const response = await fetch(alertsURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": TomorrowAPIKEY
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log("Alert created:", data);
            return data;
        } catch (err) {
            console.error("Failed to create alert", err);
        }
    }

}

