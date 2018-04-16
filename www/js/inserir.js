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