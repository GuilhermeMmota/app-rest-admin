// Dom7
var $$ = Dom7;
$$('.logoff').hide();
$$('.login-screen-open').show();

$$('#contato').hide();
$$('#listadoscontatos').hide();

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Rest', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

//// Login Screen Demo
//$$('#my-login-screen .login-button').on('click', function () {
//  var username = $$('#my-login-screen [name="username"]').val();
//  var password = $$('#my-login-screen [name="password"]').val();
//
// 
//
//  // Alert username and password
//  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
//});
//// -------------------SignUp------------------
$$('#my-login-screen .SignUp').on('click', function () {
 var username = $$('#my-login-screen [name="email"]').val();
 var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');
  //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
  firebase
    .auth()
    .createUserWithEmailAndPassword(username,password)
    .then( function(){
      app.dialog.alert('Cadastrado com sucesso ' + username);
      this.$$('.logado').text('Welcome ' + username);         
    })
    .catch(function(error){
      console.error(error.code)
      console.error(error.message)

      if (error.code =='auth/ivalid-email'){
        app.dialog.alert('Email invalido no seu formato!!!');
      }$$('#btnSalvar').on('click', function () {
        var formData = app.form.convertToData('#form-user-content')
        var name = $$('#name [name="email"]').val();
        var name = $$('#password [name="password"]').val();

    alert(JSON.stringify(formData))
    firebase.database().ref().child('usuarios').push(JSON.stringify(formData))
    
});
      app.dialog.alert('Falha ao cadastrar, verifique o erro no console');
    })

});

  // ------------------------------SingIn----------------------------------

  $$('#my-login-screen .SignIn').on('click', function () {
    var username = $$('#my-login-screen [name="email"]').val();
    var password = $$('#my-login-screen [name="password"]').val();
    
    // // Close login screen
    app.loginScreen.close('#my-login-screen');

    app.dialog.alert('Username: ' + username + '<br>Password:' + password);
    
    firebase
      .auth()
      .signInWithEmailAndPassword(username,password)
      .then( function(){
        app.dialog.alert('Welcome: ' + username);
        this.$$('.logado').text( username + '  Online');

        if(username == "guilherme@gmail.com"){
        $$('.logoff').show();
        $$('#contato').show();
        $$('#listadoscontatos').show();
        $$('.login-screen-open').hide();
        $$('#email').val('');
        $$('#password').val('');
        }
        
      })
      .cath( function(error){
        console.error(error.code)
        console.error(error.message)
        if (error.code =='auth/invalid-email'){
          app.dialog.alert('Email invalido.');
        }
        app.dialog.alert('Falha ao cadastrar, verifique o erro no console');
      })

     });

    // --------------------SignOut-----------------
$$('#my-login-screen .SignOut').on('click', function () {
  app.loginScreen.close('#my-login-screen');
  $$('#email').val('');
  $$('#password').val('');
  firebase
    .auth()
    .signOut()
    .then( function () {
      this.$$('.logado').text('Usuário não autenticado');
      app.dialog.alert('Usuário Deslogado');
      app.loginScreen.close('#my-login-screen');
      $$('.logoff').hide();
      $$('.login-screen-open').show();      
    }, function(error){
      console.error(error)
    })
});
$$('#my-login-screen .login-screen-close').on('click', function () {
  $$('#email').val('');
  $$('#password').val('');
})
$$('.logoff').on('click', function () {
  firebase
    .auth()
    .signOut()
    .then( function () {
      this.$$('.logado').text('Usuário não autenticado');
      app.dialog.alert('Usuário Deslogado');
      $$('#email').val('');
      $$('#password').val('');
      $$('.logoff').hide();
      $$('#contato').hide();
      $$('#listadoscontatos').hide();
      $$('.login-screen-open').show();
    }, function(error){
      console.error(error)
    })  
})
// ======================cardapio================
firebase.database().ref('cardapio').on('value', function (snapshot){
  //usersList.innerHTML = '';
  $$("#usersList").empty();

  snapshot.forEach(function(item){
        var listHtml = '<div class="row block block-strong">';
          //listHtml += '<td class="label-cell">'+item.key+'</td>';

          listHtml += '<div class="col-20">'+ item.val().dia +'</div>';
          listHtml += '<div class="col-20">'+ item.val().pratododia +'</div>';
          listHtml += '<div class="col-20">'+ item.val().preco +'</div>';
          listHtml += '<div class="col-100"><img src="'+ item.val().imagem +'" width="320" height="200"/></div>';
          listHtml += '</div>';
          listHtml += '<div class="col-20">'+ item.val().descricao +'</div>';
          
          //e.append(listHtml).innerHTML;
          if (semana[dia] == item.val().dia){
              $$("#usersList").append(listHtml);
          }    
  })
  
})


// =====================Lista dos Contatos======================

firebase.database().ref('Comentarios').on('value', function (snapshot){
  //usersList.innerHTML = '';
  $$("#listacontato").empty();

  snapshot.forEach(function(item){
        var listHtml = '<div class="row block block-strong">';
          //listHtml += '<td class="label-cell">'+item.key+'</td>';

          listHtml += '<div class="col-20">'+ item.val().name +'</div>';
          listHtml += '<div class="col-20">'+ item.val().email +'</div>';
          listHtml += '<div class="col-20">'+ item.val().tel +'</div>';
          listHtml += '<div class="col-20">'+ item.val().assunto +'</div>';
          listHtml += '<div class="col-20">'+ item.val().bio +'</div>';
          listHtml += '</div>';
          //e.append(listHtml).innerHTML;
          
              $$("#listacontato").append(listHtml);    
      
  })
})
