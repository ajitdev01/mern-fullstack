const http = require("http")

const server = http.createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "text/plain" })

    if (req.url === "/") {
        res.end("Pure Node Server Created..")

    } else if (req.url === "/api") {
        res.end("Pure Node Second Condition")

    } else if (req.url === "/api/data") {
        res.end("Pure Node Third Condition..")

    } else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("404 Error Buddy")
    }

})

server.listen(2010, () => {
    console.log("Server running on http://localhost:2010")
})