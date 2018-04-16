var $$ = Dom7;

var hoje=new Date();
var dia= hoje.getDay();
var semana=new Array(6);

semana[0]='Domingo';
semana[1]='Segunda-Feira';
semana[2]='Terça-Feira';
semana[3]='Quarta-Feira';
semana[4]='Quinta-Feira';
semana[5]='Sexta-Feira';
semana[6]='Sábado'; 
//alert(semana[dia])

$$(document).on('page:init', '.page[data-name="listar_cardapio"]', function (e) {
    firebase.database().ref('cardapio').on('value', function (snapshot){
        //usersList.innerHTML = '';
        $$("#usersList").empty();
    
        snapshot.forEach(function(item){
              var listHtml = '<div class="row block block-strong">';
                //listHtml += '<td class="label-cell">'+item.key+'</td>';

                listHtml += '<div class="col-20">'+ item.val().dia +'</div>';
                listHtml += '<div class="col-20">'+ item.val().pratododia +'</div>';
                listHtml += '<div class="col-20">'+ item.val().descricao +'</div>';
                listHtml += '<div class="col-20">'+ item.val().preco +'</div>';
                listHtml += '<div class="col-100"><img src="'+ item.val().imagem +'" width="320" height="200"/></div>';
                listHtml += '</div>';
                //e.append(listHtml).innerHTML;
                if (semana[dia] == item.val().dia){
                    $$("#usersList").append(listHtml);
                }    
            
        })
    })
    
});