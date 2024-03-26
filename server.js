/*CÓDIGO FUNCIONANDO FEITO EM AULA

const http = require("http");
const host = "http://localhost";
const port = 3000;
const stats = require("./pcRamUsage.js");

http
  .createServer((req, res) => {
    let url = req.url;
   
    if (url === "/stats") {
      res.end(JSON.stringify(stats, null, 2));
    } else {
      res.end("<h1>Seja bem-vindo</h1>")
    }

  })
  .listen(port, () => console.log(`Server is running in ${host}:${port}`));
  */

// CÓDIGO SUGERIDO PELO CHATGPT PARA MELHORAR A VISUALIZAÇÃO NO NAVEGADOR:

const http = require("http");
const { getStats } = require("./pcRamUsage.js");
const host = "http://localhost";
const port = 3000;

http
  .createServer((req, res) => {
    let url = req.url;

    if (url === "/stats") {
      // Obtém os dados das estatísticas
      const stats = getStats();

      // Cria a tabela HTML com os dados de estatísticas
      let htmlResponse = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Estatísticas de RAM do PC</title>
                <style>
                    table {
                        border-collapse: collapse;
                        width: 50%;
                    }
                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Estatísticas de RAM do PC</h1>
                <table>
                    <tr>
                        <th>OS</th>
                        <th>Arquitetura</th>
                        <th>Total de RAM</th>
                        <th>RAM Livre</th>
                        <th>Uso</th>
                    </tr>
                    <tr>
                        <td>${stats.OS}</td>
                        <td>${stats.Arch}</td>
                        <td>${stats.TotalRAM}</td>
                        <td>${stats.FreeRAM}</td>
                        <td>${stats.Usage}</td>
                    </tr>
                </table>
            </body>
            </html>
        `;

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(htmlResponse);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Seja bem-vindo</h1>");
    }
  })
  .listen(port, () => console.log(`Server is running in ${host}:${port}`));
