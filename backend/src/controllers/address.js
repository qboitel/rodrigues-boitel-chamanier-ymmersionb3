const http = require('http');

const UrlApiAddress = 'http://api-adresse.data.gouv.fr/'

//https://adresse.data.gouv.fr/api-doc/adresse
//https://inspirnathan.com/posts/103-api-calls-in-nodejs

function getAddress(req, res) {
    let urlApi = UrlApiAddress + 'search/?'

    let codePost = req.query.postcode
    let searchQuery = req.query.q

    if (!(searchQuery || codePost)) {
        console.log('ici erreur !!');
        res.status(404).json({ code: 404, message: "Impossible d'excuter cette demande, manque de données adresse ou bien code postale" })
    } else {
        urlApi += 'q=' + searchQuery.replaceAll(' ', '+')
        urlApi += '&postcode=' + codePost
        console.log(urlApi);
    }

    let data = ''

    const requestAddress = http.get(urlApi + "&limit=5", response => {

        response.setEncoding('utf-8')

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log('requete effectuer bb !');
            res.json(JSON.parse(data));
        });
    })

    requestAddress.on('error', (error) => {
        console.log('oupss une erreur call api address');
        res.status(404).json({ code: 404, message: "Impossible d'excuter cette demande, probleme API adresse" })
    })

    requestAddress.end();
}

function getAddressWithGeolocalisation(req, res) {
    let urlApi = UrlApiAddress + 'search/?q=rue&'

    let lat = req.query.lat
    let lon = req.query.lon

    if (!(lat || lon)) {
        res.status(404).json({ code: 404, message: "Impossible d'excuter cette demande, manque de données latitude ou bien longitude" })
    } else {
        urlApi += 'lat=' + lat
        urlApi += '&lon=' + lon
        console.log(urlApi);
    }

    let data = ''

    const requestAddress = http.get(urlApi + "&limit=5", response => {

        response.setEncoding('utf-8')

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log('requete effectuer bb !');
            res.json(JSON.parse(data));
        });
    })

    requestAddress.on('error', (error) => {
        console.log('oupss une erreur call api address');
        res.status(404).json({ code: 404, message: "Impossible d'excuter cette demande, probleme API adresse" })
    })

    requestAddress.end();
}

module.exports = { getAddress, getAddressWithGeolocalisation }