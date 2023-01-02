const  http = require('http'), //HTTP Server
       path = require('path'),
       expr = require('express'), //Handling HTTP requests and routing
       fs = require('fs'),  //File System functionalities
       xmlParse = require('xslt-processor').xmlParse, //XML handling
       xsltProcess = require('xslt-processor').xsltProcess, //XSLT handling
       router = expr(), //Init the router
       serv = http.createServer(router); // Init the server

router.use(expr.static(path.resolve(__dirname, 'views')));
router.use(expr.urlencoded({extended: true}));
router.use(expr.json());

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

    xml = xmlParse(xml);
    xsl = xmlParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});

serv.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
    const addr = serv.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});