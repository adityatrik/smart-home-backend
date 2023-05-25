const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = url.searchParams;

    // Ambil nilai parameter
    // Req : ?id=1&t=260&h=35&pir=0&sw=0&g=200&as=200&al=1
    const id = queryParams.get('id');
    // console.log(id);
    const t = queryParams.get('t');
    // console.log(t);
    const h = queryParams.get('h');
    // console.log(h);
    const pir = queryParams.get('pir');
    // console.log(pir);
    const sw = queryParams.get('sw');
    // console.log(sw);
    const g = queryParams.get('g');
    // console.log(g);
    const as = queryParams.get('as');
    // console.log(as);
    const al = queryParams.get('al');
    // console.log(al);

    // Berikan respon
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    if (id !== null) {
      console.log(`{"id":"${id}","t":"${t}","h":"${h}","pir":"${pir}","sw":"${sw}","g":"${g}","as":"${as}","as":"${al}"}`);
    }
    res.end(`{"id":"1","l1":"100","l2":"100","l3":"100","l4":"100","l5":"0"}`);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = 3002;
server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
