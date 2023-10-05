const http = require('http');

const UrlApiAddress = 'http://api-adresse.data.gouv.fr/';

//https://adresse.data.gouv.fr/api-doc/adresse
//https://inspirnathan.com/posts/103-api-calls-in-nodejs

function getAddress(req, res) {
    let urlApi = UrlApiAddress + 'search/?';

    let codePost = req.query.postcode;
    let searchQuery = req.query.q;

    if (!(searchQuery || codePost || searchQuery.length < 3)) {
        res.status(400).json({ code: 400, message: "Impossible d'exécuter cette demande, adresse ou bien code postal manquant" })
        return;
    } else {
        urlApi += 'q=' + searchQuery.replaceAll(' ', '+');
        urlApi += '&postcode=' + codePost;

    }

    let data = '';
    const requestAddress = http.get(urlApi + "&limit=5", response => {

        response.setEncoding('utf-8');

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.json(JSON.parse(data));
            return
        });
    })

    requestAddress.on('error', (error) => {
        res.status(404).json({ code: 404, message: "Impossible d'exécuter cette demande, adresse ou bien code postal invalide" });
        return
    })

    requestAddress.end();
}

function getAddressWithGeolocalisation(req, res) {
    let urlApi = UrlApiAddress + 'search/?q=rue&';

    let lat = req.query.lat;
    let lon = req.query.lon;

    if (!(lat || lon)) {
        res.status(400).json({ code: 400, message: "Impossible d'exécuter cette demande, données de latitude ou bien longitude manquante" });
        return;
    } else {
        urlApi += 'lat=' + lat;
        urlApi += '&lon=' + lon;
    }

    let data = '';
    const requestAddress = http.get(urlApi + "&limit=5", response => {

        response.setEncoding('utf-8');

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.json(JSON.parse(data));
            return;
        });
    })

    requestAddress.on('error', (error) => {
        res.status(404).json({ code: 404, message: "Impossible d'exécuter cette demande, latitude ou bien longitude invalide" });
        return;
    })

    requestAddress.end();
}

module.exports = { getAddress, getAddressWithGeolocalisation }