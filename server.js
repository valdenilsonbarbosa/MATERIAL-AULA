const express = require("express");
const alunos = require("./dados");

const app = express();

const PORT = 5800;

app.use(express.json());

app.use(express.static("projetoNode"));


app.get("/alunos", (req, res)=>{
    res.json(alunos)
});

app.post("/alunos",(req,res)=>{
    const alunos = {
        id: Date.now(),
        nome: req.body.nome,
        curso: req.body.curso,
        idade: req.body.idade
    }

    alunos.push(alunos);
})


app.put(("alunos/:id", (req,res)=>{
    const id = Number(req.params.id);

    const aluno = alunos.find(a =>a.id===id);

    if(!aluno){
        return res.status(404).json({menagem: "Aluno não encontrado"});
    }

    aluno.nome = req.body.nome;
    aluno.curso = req.body.curso;
    aluno.idade = req.body.idade;

    res.json(aluno);
}));

app.delete("/aluno/:id", (req,res)=>{
    const id = Number(req.params.id);

    const indice = alunos.findIndex(a=> a.id===id);

    if(indice===-1){
        return res.status(404).json({ menagem: "Aluno não encontrado" });
    }

    alunos.splice(indice,1);
   
})



app.listen(PORT, ()=>{
    console.log(`Servidor rodando em  http://localhost:${PORT}`)
});