var pratoInput = document.getElementById('pratoInput');
var descInput = document.getElementById('descricaodopratoInput');
var precoInput = document.getElementById('precoInput');
var diaInput = document.getElementById('diaInput');

var addButton = document.getElementById('addbutton')

addButton.addEventListener('click', function(e) { //addEventlistener = escutando um evento
    e.preventDefault();
    inserir(pratoInput.value, descInput.value, precoInput.value, diaInput.value);
})

function inserir(prato, desc, preco, dia){
    var data = { prato: prato, desc: descricaodoprato, preco: preco, dia: dia}
    return firebase.database().ref().child('cardapio').push(data)
}
// =====================================================================================================
function atualizar(){
    
    var prato = document.getElementById('pratododiaInput').value;
    var descricao = document.getElementById('descricaoInput').value;
    var preco = document.getElementById('precoInput').value;
    var dia = document.getElementById('diaInput').value;
    var img = document.getElementById('imagemInput').value;

    // window.alert(email + "," + nome + "," + nascimento);

    atualizadb(prato, descricao, preco, dia);
}

function gravadb(prato, descricao, preco, dia, img){ 

    var db = firebase.database().ref();

    db.child(id).set({

        Prato: prato,
        Descricao: descricao,
        Preco: preco,
        Dia: dia,
        img: img
    })
}

function atualizadb(prato, descricao, preco, dia, imgf){ 

    // var db = firebase.database().ref();

    var novo = {
        Prato: prato,
        Descricao: descricao,
        Preco: preco,
        Dia: dia,
        img: img
    };

    var indice = firebase.database().ref().child(id).key;   
    var dados = {}
    dados[indice] = novo;

    return firebase.database().ref().update(dados);
}
