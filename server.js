const express = require('express');

const server = express();

server.use(express.json()); // faz com que o express entenda JSON

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rszup152',
  database: 'pdz'
});

//Select base 
server.get("/ListaProdutos", (request, response) => {
connection.query('SELECT * FROM produto ', (err,rows) => {
  if(err) throw err;
    response.json({data:rows})

  });
});

server.get("/get-produto-nome", (request, response) => {
  const req=request.query;
  connection.query('SELECT * FROM produto where nome LIKE CONCAT ("%",?, "%")',[req.nome], (err,rows) => {
    if(err) throw err;
  
      response.json({data:rows})
  
    });
  
  });

server.get("/get-produto-id", (request, response) => {
  const req=request.query;
  connection.query('SELECT * FROM produto where id = ?',[req.id], (err,rows) => {
    if(err) throw err;
  
      response.json({data:rows})
  
    });
  
  });  

  


server.post("/AdicionarProduto", (request, response) => {
  const req=request.body
  const query="Insert Into produto set ?";
  const params={
   
    nome:req.nome,
    valor_unitario:req.valor_unitario,
    unidade_medida:req.unidade_medida,
    peso:req.peso,
    quantidade:req.quantidade,
    quantidade_estoque:req.quantidade_estoque
  };

  connection.query(query,params,(err,result,fields) => {
    if(err) throw err;
  
      response.json({saved:result.affectedRows,inserted_id:result.insertId})
  
    });
  })

server.listen(3000);