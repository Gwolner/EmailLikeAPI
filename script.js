
//================== Funções criadas ==================

function msgCadastro(flagMsg){ // Notificação de cadastro
	if(flagMsg){		
		mySnackbar("snackbarSuccess","Usuário cadastrado com sucesso!");
	}else{
		mySnackbar("snackbarWarning","Erro ao cadastrar! Por favor tente novamente.");
	}
};
	
function msgLogin(flagMsg){ // Notificação de login
	if(flagMsg){
		mySnackbar("snackbarSuccess","Bem vindo ao Projeto Email Like API!");
	}else{
		mySnackbar("snackbarWarning","Erro de autenticação. Confira os dados fornecidos");
	}
};	
	
function vaiProLogin(){ //Encaminha usuário para a tela de login após cadastro
	formCadastro.style.display="none";
	formLogin.style.display="block";
	
}

function limpaTudo(){ // Oculta tudo que está visível no Grid
	formCadastro.style.display="none";
	formLogin.style.display="none";
}

function mySnackbar(tipo, mensagem) {
	
	// var snackbar = document.getElementById("snackbarSuccess");
	var snackbar = document.getElementById(tipo);
	snackbar.className = "show";
	setTimeout(function(){ 
		snackbar.className = snackbar.className.replace("show", ""); 
	}, 3000);
	snackbar.innerHTML = "";
	snackbar.innerHTML = mensagem;
}













//================== Exibir & ocultar formulários ==================

var exibir1=document.getElementById("revelar1"); // Obtendo id do link de cadastro
var exibir2=document.getElementById("revelar2"); // Obtendo id do link de login
var rlink=document.getElementById("redirLink");	//Obtendo o id do link que redirecioaj pro cadastro (ver se pode raproveitar o anteriror)
var modalSobre=document.getElementById("modalSobre"); // Obtendo id do link sobre o projeto

exibir1.addEventListener("click", function(){ // Exibe apenas formulário de cadastro
	limpaTudo();
	formCadastro.style.display="block";
	// formLogin.style.display="none";
 });	
	
exibir2.addEventListener("click", function(){ // Exibe apenas formulário de login
	// formCadastro.style.display="none";
	limpaTudo();
	formLogin.style.display="block"; 
 });	
	
	
 rlink.addEventListener("click", function(){ // Ocultar login e exibir cadastro
	limpaTudo();
	formCadastro.style.display="block";
	// formLogin.style.display="none";
 });

 modalSobre.addEventListener("click", function(){ // Exibir modal Sobre
	$('#modalSobreConteudo').modal(); //Entender do que se trata esta solução!!!!!!!!!!
 });	

 
 
 
 
 
 
 
//================== Mecanismo de cadastro ==================

var formCadastro = document.getElementById("cadastro"); // Obtendo id do formulário de cadastro

formCadastro.addEventListener("submit",function(e){ // Adicionando evento ao submeter cadastro
	e.preventDefault(); // Previne ação padrão de submissão

	if(document.getElementById("senha").value == document.getElementById("confirmarSenha").value){
		// Criação do objeto a ser tratado e enviado para o servidor
		var obj1 ={
			login: document.getElementById("username").value,
			nome: document.getElementById("nome").value,
			sobrenome: document.getElementById("sobrenome").value,
			cpf: document.getElementById("cpf").value,
			email_secundario: document.getElementById("emailSecundario").value,
			foto: "",
			senha: document.getElementById("senha").value,
		}

		var json = JSON.stringify(obj1); // Transforma o obj1 em sintaxe JSON
		var xhr1 = new XMLHttpRequest(); // Criando um objeto XMLHttpRequest
		
		
		// Especifica o tipo de conexão com o servidor (tipo, url e assincrona)
		xhr1.open("POST", "http://www.henriquesantos.pro.br:8080/api/email/usuarios/new", true);
		
		//Adiciona cabeçalho HTTP a requisição (nome do cabeçalho e valor do cabeçalho)
		xhr1.setRequestHeader("Content-type", "application/json"); 
		
		
		xhr1.onreadystatechange = function(){ // Função executada toda vez que o status do objeto XMLHttpRequest for alterado
			//Cadastro realizado
			if(xhr1.readyState == XMLHttpRequest.DONE && xhr1.status == 200){ //if (this.readyState == 4 && this.status == 200)
				msgCadastro(true);
				vaiProLogin();
			}
			// Erro no cadastro
			if(xhr1.readyState == XMLHttpRequest.DONE && xhr1.status != 200){
				msgCadastro(false);
			}
			
		}
		
		xhr1.send(json); //Envia a sintaxe JSON para o servidor
	}else{
		mySnackbar("snackbarWarning","As senhas são incompatíveis");
	}
});


//================== Mecanismo de login ==================

var formLogin = document.getElementById("login"); // Obtendo id do formulário de login
	
formLogin.addEventListener("submit",function(e){ // Adicionando evento ao submeter cadastro
	e.preventDefault(); // Previne ação padrão de submissão

	// Criação do objeto a ser tratado e enviado para o servidor
	var obj2 ={
		login: document.getElementById("username2").value,
		senha: document.getElementById("senha2").value,
	}
	
	var json = JSON.stringify(obj2); // Transforma o obj2 em sintaxe JSON
	var xhr2 = new XMLHttpRequest(); //Criando um objeto XMLHttpRequest
	
	
	// Especifica o tipo de conexão com o servidor (tupo, url e assincrona)
	xhr2.open("POST", " http://www.henriquesantos.pro.br:8080/api/email/usuarios/login", true);
	
	//Adiciona cabeçalho HTTP a requisição (nome do cabeçalho e valor do cabeçalho
	xhr2.setRequestHeader("Content-type", "application/json");
	
	
	xhr2.onreadystatechange = function(){ // Função executada toda vez que o status do objeto XMLHttpRequest for alterado
		// Autenticação OK
		if(xhr2.readyState == XMLHttpRequest.DONE && xhr2.status == 200){
			
			var retornoToken = JSON.parse(xhr2.responseText)
            sessionStorage.setItem("token", retornoToken.token); // Salva o token recebido o servidor no sessionStorage
			msgLogin(true);
			window.location = "welcome.html";//Objetos do navegador, não do JS !!!!!!!!!!!!!!!!
			
		}
		// Erro na autenticação
		if(xhr2.readyState == XMLHttpRequest.DONE && xhr2.status != 200){
			msgLogin(false);
		}

	}
	
	xhr2.send(json); //Envia a sintaxe JSON para o servidor
	
});

