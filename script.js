const form = document.getElementById("formAluno");
const listaAlunos = document.getElementById("listaAlunos");
const inputID = document.getElementById("id");
const inputNome = document.getElementById("nome");
const inputCurso = document.getElementById("curso");
const inputIdade = document.getElementById("idade");


async function listarAlunos() {

    const response = await fetch("/alunos");

    const alunos = await response.json();

    listaAlunos.innerHTML = "";

    alunos.forEach(aluno => {

        listaAlunos.innerHTML += `
        <tr>
            <td> ${aluno.nome}   </td>
            <td> ${aluno.curso}  </td>
            <td> ${aluno.idade}  </td>
            <td> 
                <button class="btn-editar" onclick="editarAluno(${aluno.id}, '${aluno.nome}', '${aluno.curso}', ${aluno.idade})>Editar</button>   
                <button class="btn-excluir" onclick="excluirAluno(${aluno.id})"> Excluir </button>
            
            </td>
        </tr>`;

    });
}

form.addEventListener("submit", async function (event) 
{
    event.preventDefault();


    const aluno =
    {
        nome: inputNome.value,
        curso: inputCurso.value,
        idade: inputIdade.value

    };

    if(inputID.value){
        await fetch(`/aluno/${inputID.value}`,{
            method:"PUT",
            headers:{
                "Content-Type":"aplication/json"
            },
            body: JSON.stringify(aluno)
        });
    } else {await fetch("/alunos", {
        method:"POST", 
        headers:{"Content-Type": "aplication/json"},
        body: JSON.stringify(aluno)
    });
    }
    form.reset();

    inputID.value = ""
    listaAlunos();

});

function editarAluno(id, nome, curso, idade){
    inputID.value = id;
    inputNome.value = nome;
    inputCurso.value = curso;
    inputIdade.value = idade;
}

async function excluirAluno(id){
    await fetch(`/aluno/${id}`, {method:"DELETE"});
    listaAlunos();
}
listaAlunos();