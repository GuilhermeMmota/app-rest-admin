$$(document).on('page:init','.page[data-name="contato"]', function(e){
        var page = e.detail;
        console.log(page.name);

        var uploader = $$('#uploader');
        
        // ouvir o evento change
        $$('#btnSalvar').on('click',function () {

                
                //var formData = app.form.convertToData('#form-user-content')
                var nameInput = $$('#nameInput').val();
                var emailInput = $$('#emailInput').val();
                var telInput = $$('#telInput').val();
                var assuntoInput = $$('#assuntoInput').val();
                var inputBio = $$('#inputBio').val();
                
                var formData = { name: nameInput, email: emailInput, tel: telInput, assunto: assuntoInput, bio: inputBio }
                console.log(formData);
                alert(JSON.stringify(formData))
                firebase.database().ref().child('Comentarios').push(formData)
                // task = spaceRef.put(file);
                .then( function () {
                        app.dialog.alert('Mensagem Enviada');
                        $$('input#nameInput').val('');
                        $$('input#emailInput').val('');
                        $$('input#telInput').val('');
		        $$('input#assuntoInput').val('');
                        $$('input#inputBio').val('');

                        
                }, function(error){
                        app.dialog.alert('Erro, confira no console');
                        console.error(error)
                })  
                //firebase.database().ref().child('usuarios').push(JSON.stringify(formData))

        });      

});      