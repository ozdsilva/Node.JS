const http = require('http')

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

const server = http.createServer(
    function (req, res) {
        let url = req.url
        if(url ==='/') {

        console.log(req)
        res.statusCode = 200
        res.setHeader ('Content-type', 'text/html; charset=utf-8')
        res.end('<h1>Olá Mundo 2!</h1>')
        }

        if(url === '/sobre'){
            res.statusCode = 200
            res.setHeader('Content-type','text/html; charset=utf-8')
            res.end('<h1>Página Sobre</h1>')
        }
}
)

server.listen(PORT, hostname, function (){
    console.log(`Servidor rodando em http://${hostname}:${PORT}`)
})