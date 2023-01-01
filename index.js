const  http = require('http'), //HTTP Server
       path = require('path'),
       express = require('express'), //Handling HTTP requests and routing
       fs = require('fs'),  //File System functionalities
       xmlParse = require('xslt-processor').xmlParse, //XML handling
       xsltProcess = require('xslt-processor').xsltProcess, //XSLT handling
       router = express(), //Init our router
       server = http.createServer(router); // Init our server

router.use(express.static(path.resolve(__dirname, 'viewsi')));

router.get('/', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('menu.xml', 'utf8'),
        xsl = fs.readFileSync('menu.xsl', 'utf8');

    xml = xmlParse(xml);
    xsl = xmlParse(xsl);

    let html = xsltProcess(xml, xsl);

    res.end(html.toString());
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function()
{
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});