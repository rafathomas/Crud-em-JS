window.onload = function() {
    listar();
    document.getElementById('frmCadastro').addEventListener('submit', adicionarOuAlterar);
    document.getElementById('frmCadastro').addEventListener('submit', listar);
}


var idAlterar = null;


function adicionarOuAlterar(e) {
    var nom = document.getElementById('txtNome').value;
    var emai = document.getElementById('txtEmail').value;
    var cpf = document.getElementById('txtCpf').value;
    var tel = document.getElementById('txtTel').value;
    var cep = document.getElementById('txtCep').value;
    var lgd = document.getElementById('txtLgd').value;
    var num = document.getElementById('txtNum').value;
    var bair = document.getElementById('txtBairro').value;
    var cid = document.getElementById('txtCidade').value;
    var est = document.getElementById('txtEstado').value;
    var p = {
        nome: !nom ? "sem nome" : nom,
        email: !emai ? "sem nome" : emai,
        cpf: !cpf ? "sem nome" : cpf,
        telefone: !tel ? "sem nome" : tel,
        cep: !cep ? "sem nome" : cep,
        logradouro: !lgd ? "sem nome" : lgd,
        numero: !num ? "sem nome" : num,
        bairro: !bair ? "sem nome" : bair,
        cidade: !cid ? "sem nome" : cid,
        estado: !est ? "sem nome" : est,


    }

    if (idAlterar == null)
        adicionar(p);
    else if (idAlterar > 0)
        alterar(p);
    else
        alert("Ação desconhecida");


    e.preventDefault();
}

function adicionar(p) {
    var pessoas = [];
    var idValido = 1;

    if (localStorage.getItem('value') !== null) {
        pessoas = JSON.parse(localStorage.getItem('value'));

        if (pessoas.length > 0)
            idValido = (function obterIdValido() {

                for (var i = 0; i < pessoas.length; i++)
                    if (pessoas[i].Id != i + 1)
                        return i + 1;

                return pessoas[pessoas.length - 1].Id + 1;
            })();
    }

    var pessoa = {
        Id: idValido,
        Nome: p.nome,
        Email: p.email,
        Cpf: p.cpf,
        Telefone: p.telefone,
        Cep: p.cep,
        Logradouro: p.logradouro,
        Numero: p.numero,
        Bairro: p.bairro,
        Cidade: p.cidade,
        Estado: p.estado
    };


    pessoas.push(pessoa);

    pessoas.sort(function(a, b) {
        return a.Id - b.Id;
    });

    localStorage.setItem('value', JSON.stringify(pessoas));

    document.getElementById('frmCadastro').reset();
}



function excluir(cod) {
    var pessoas = JSON.parse(localStorage.getItem('value'));

    for (var i = 0; i < pessoas.length; i++)
        if (pessoas[i].Id == cod)
            pessoas.splice(i, 1);


    localStorage.setItem('value', JSON.stringify(pessoas));
    listar();


    if (pessoas.length == 0)
        window.localStorage.removeItem("value");
}

function listar() {

    if (localStorage.getItem('value') === null)
        return;


    var pessoas = JSON.parse(localStorage.getItem('value'));
    var tbody = document.getElementById("tbodyResultados");


    tbody.innerHTML = '';

    for (var i = 0; i < pessoas.length; i++) {
        var id = pessoas[i].Id,
            nome = pessoas[i].Nome,
            email = pessoas[i].Email,
            cpf = pessoas[i].Cpf,
            telefone = pessoas[i].Telefone,
            cep = pessoas[i].Cep,
            logradouro = pessoas[i].Logradouro,
            numero = pessoas[i].Numero,
            bairro = pessoas[i].Bairro,
            cidade = pessoas[i].Cidade,
            estado = pessoas[i].Estado


        tbody.innerHTML += '<tr id="rowTable' + i + '">' +
            '<td>' + id + '</td>' +
            '<td>' + nome + '</td>' +
            '<td>' + email + '</td>' +
            '<td>' + cpf + '</td>' +
            '<td>' + telefone + '</td>' +
            '<td>' + cep + '</td>' +
            '<td>' + logradouro + '</td>' +
            '<td>' + numero + '</td>' +
            '<td>' + bairro + '</td>' +
            '<td>' + cidade + '</td>' +
            '<td>' + estado + '</td>' +

            '<td><button onclick="excluir(\'' + id + '\')">Excluir</button></td>' +

            '</tr>';
    }
}