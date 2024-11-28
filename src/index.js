const express = require('express')
const axios = require("axios");
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/', cors(corsOptions), function (req, res, next) {

    const playId = req.body.playId;

    const params = new URLSearchParams();
    params.append('op-nombre', req.body.name);
    params.append('op-email', req.body.mail);
    params.append('op-comentario', req.body.comment);

    axios
        .post('https://www.alternativateatral.com/grabar-opinion.php?id=' + playId, params)
        .then((response) => {
            res.json(response.data);
        });
})

app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 8080')
})