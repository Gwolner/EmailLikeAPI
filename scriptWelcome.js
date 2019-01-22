
//############################## FUNÇÕES CRIADAS ##############################

function exibeCaixas(contaId,enderecoConta){
//================== Função/Mecanismo de Caixas (Lista de Caixas de uma Conta) ================== FUNCIONANDO!!
	contaOrigem = contaId;
	
	var contaAtual = document.getElementById("contaAtual");
	contaAtual.innerHTML="Conta atual: "+enderecoConta;
	
	var xhttp = new XMLHttpRequest();
	var url = "http://www.henriquesantos.pro.br:8080/api/email/caixas/"+tokenNumber+"/conta/"+contaId+"";
	xhttp.open("GET", url, false);
	xhttp.send();
	var retornoCaixasUsuarioLogado = xhttp.responseText;

	retornoCaixasUsuarioLogado = JSON.parse(retornoCaixasUsuarioLogado);
	
	var divDimensaoCaixas = document.getElementById("dimensaoCaixa"); // Obtem referencia da div já criada
	divDimensaoCaixas.innerHTML=""; // Limpa as caixas atuais antes de gerar as proximas.

	for(var i = 0; i < retornoCaixasUsuarioLogado.length;i++){
		
		var blocoCaixa = document.createElement("button");
		blocoCaixa.setAttribute("type","button");
		blocoCaixa.setAttribute("class","list-group-item list-group-item-action");
		blocoCaixa.setAttribute("onclick","exibeMensagens('"+retornoCaixasUsuarioLogado[i].id+"','"+contaId+"','"+retornoCaixasUsuarioLogado[i].nome+"')");
		
		var textoContato = document.createTextNode(retornoCaixasUsuarioLogado[i].nome); // Exibe nome da Conta

		blocoCaixa.appendChild(textoContato);
		divDimensaoCaixas.appendChild(blocoCaixa);

	}
	
	if(retornoCaixasUsuarioLogado.length > 0){
		globalCaixaId = retornoCaixasUsuarioLogado[0].id;
	}else{
		globalCaixaId = 0;
	}
	
}

function exibeMensagens(caixaId,contaId,caixaNome){
/*================== Função/Mecanismo mensagens de email 
(Listar todos as mensagens de uma caixa de mensagens de uma conta de usuário) ============= FUNCIONANDO!!*/
	
	tituloMensagem.innerHTML="Mensagens - "+caixaNome;
	
	var xhttp = new XMLHttpRequest();
	var url = "http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/"+tokenNumber+"/conta/"+contaId+"/caixa/"+caixaId+"";
	// var url = "http://www.henriquesantos.pro.br:8080/api/email/mensagens_email";

	xhttp.open("GET", url, false);
	xhttp.send();
	var retornoMensagemUsuarioLogado = xhttp.responseText;
	
	retornoMensagemUsuarioLogado = JSON.parse(retornoMensagemUsuarioLogado);
	var divDimensaoCaixas = document.getElementById("dimensaoMensagem"); // Obtem referencia da div já criada
	divDimensaoCaixas.innerHTML=""; // Limpa as caixas atuais antes de gerar as proximas.

	for(var i = 0; i < retornoMensagemUsuarioLogado.length;i++){
		
		var blocoCaixa = document.createElement("button");
		blocoCaixa.setAttribute("type","button");
		blocoCaixa.setAttribute("class","list-group-item list-group-item-action");
		blocoCaixa.setAttribute("onclick","exibeMensagenIndividual('"+retornoMensagemUsuarioLogado[i].id+"','"+caixaNome+"','"+contaId+"','"+caixaId+"')");
		divDimensaoCaixas.appendChild(blocoCaixa);
		
		blocoCaixa.innerHTML="<b>Assunto: </b>"+retornoMensagemUsuarioLogado[i].assunto;
		
	}
	
	if(retornoMensagemUsuarioLogado.length > 0){
		globalMensagemIndividual = retornoMensagemUsuarioLogado[0].id;
	}else{
		globalMensagemIndividual = 0;
	}
}

function exibeMensagenIndividual(id_mensagem,caixaNome,contaId,caixaId){
/*================== Função/Mecanismo mensagens de email (Recuperar uma Mensagem específica) ============= FUNCIONANDO!!*/
	var xhttp = new XMLHttpRequest();
	var url = "http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/"+tokenNumber+"/mensagem/"+id_mensagem+"";
	
	xhttp.open("GET", url, false);
	xhttp.send();
	var retornoMensagemUnica = xhttp.responseText;
	retornoMensagemUnica = JSON.parse(retornoMensagemUnica);
	
	if(retornoMensagemUnica.length > 0){
		var tituloMensagemUnica = document.getElementById("tituloMensagemUnica"); // Obtem referencia da div já criada
		tituloMensagemUnica.innerHTML=""; // Limpa as caixas atuais antes de gerar as proximas.
		tituloMensagemUnica.innerHTML="<b>"+retornoMensagemUnica[0].assunto+"</b>";
		
		
		var corpoMensagemUnica = document.getElementById("corpoMensagemUnica"); // Obtem referencia da div já criada
		corpoMensagemUnica.innerHTML=""; // Limpa as caixas atuais antes de gerar as proximas.
		corpoMensagemUnica.innerHTML=retornoMensagemUnica[0].corpo;
		
		
		var criarBtnLixeira = document.getElementById("divBotaoMensagemUnica"); 
		
		if(caixaNome != "Excluídos"){
			criarBtnLixeira.innerHTML="";
			var btnLixeira = document.createElement("a");
			btnLixeira.setAttribute("id","botaoMensagemUnica");
			btnLixeira.setAttribute("href","#");
			btnLixeira.setAttribute("class","btn btn-outline-warning");
			btnLixeira.setAttribute("onclick","enviarParaLixeira('"+id_mensagem+"','"+contaId+"','"+caixaId+"')");
			criarBtnLixeira.appendChild(btnLixeira);
			
			btnLixeira.innerHTML="Enviar para lixeira";
		}else{
			criarBtnLixeira.innerHTML="";
		}
	}
}


function enviarParaLixeira(id_mensagem,contaId,caixaId){
	
	if(id_mensagem > -1 && contaId > -1 && caixaId > -1 ){
		
		console.log(id_mensagem+" "+contaId+" "+caixaId)
		var xhttp = new XMLHttpRequest();
		var url = "http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/"+tokenNumber+"/conta/"+contaId+"/caixa/"+caixaId+"/mensagem/"+id_mensagem+"";
		
		xhttp.open("DELETE", url, false);
		xhttp.send();
		var retornoMensagemUnica = xhttp.responseText;
		retornoMensagemUnica = JSON.parse(retornoMensagemUnica);
		window.location.reload();

	}else{
		console.log(id_mensagem+" "+contaId+" "+caixaId)
		console.log("Selecione uma mensagem para excluir")
	}
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




function loadDestinatarios(){
//================== Função/Mecanismo mensagens de email (Carregar os destinatarios) ============= FUNCIONANDO!!
	
	var xhttp = new XMLHttpRequest();
	var url = "http://www.henriquesantos.pro.br:8080/api/email/contas";
	xhttp.open("GET", url, false);
	xhttp.send();
	var retornoUsuarioCadastrados = xhttp.responseText;
	retornoUsuarioCadastrados = JSON.parse(retornoUsuarioCadastrados);

	//Destinatrio
	var selectDestinatario = document.getElementById("selectDestinatario"); // Referencia da div já criada

	for(var i = 0; i < retornoUsuarioCadastrados.length;i++){
		
		var blocoContato = document.createElement("option");
		blocoContato.setAttribute("value",retornoUsuarioCadastrados[i].id);
		
		var textoContato = document.createTextNode(retornoUsuarioCadastrados[i].endereco); // Exibe endereco do destinatario

		blocoContato.appendChild(textoContato);
		selectDestinatario.appendChild(blocoContato);
	}

	//CC
	var selectCC = document.getElementById("selectCC"); // Referencia da div já criada

	for(var i = 0; i < retornoUsuarioCadastrados.length;i++){
		
		var blocoContato = document.createElement("option");
		blocoContato.setAttribute("value",retornoUsuarioCadastrados[i].id);
		
		var textoContato = document.createTextNode(retornoUsuarioCadastrados[i].endereco); // Exibe endereco do destinatario

		blocoContato.appendChild(textoContato);
		selectCC.appendChild(blocoContato);
	}

	//CCo
	var selectCCo = document.getElementById("selectCCo"); // Referencia da div já criada

	for(var i = 0; i < retornoUsuarioCadastrados.length;i++){
		
		var blocoContato = document.createElement("option");
		blocoContato.setAttribute("value",retornoUsuarioCadastrados[i].id);
		
		var textoContato = document.createTextNode(retornoUsuarioCadastrados[i].endereco); // Exibe nome do destinatario

		blocoContato.appendChild(textoContato);
		selectCCo.appendChild(blocoContato);
	}

}
















//############################## EXIBIR E OCULTAR COMPONENTES ##############################
var linkCriarEmail=document.getElementById("linkCriarEmail");
var flagCriarEmail = 1;
linkCriarEmail.addEventListener("click", function(){ // Exibe apenas formulário de criar email
	if(flagCriarEmail == 1){
		cadastrarEmail.style.display="block";
		tituloMensagem.style.display="none";
		scroolMensagem.style.display="none";
		linkCriarEmail.innerHTML="Ver mensagens"
		flagCriarEmail = 0;
	}else{
		cadastrarEmail.style.display="none";
		tituloMensagem.style.display="block";
		scroolMensagem.style.display="block";
		linkCriarEmail.innerHTML="Criar e-mail"
		flagCriarEmail = 1;
	}
}); 


var escreverEmail=document.getElementById("escreverEmail");

escreverEmail.addEventListener("click", function(){ // Exibe modal para envio de email
	$('#modalWriteEmail').modal();
	loadDestinatarios();
});


 
 
 
 
 
 
 
 
 
 



 
//############################## ESPECÍFICOS WELCOME ##############################


//================== Recuperar Token ================ FUNCIONANDO!!

var tokenNumber = sessionStorage.getItem("token");
console.log(tokenNumber);



//================== Visualziar perfil do usuário ============= 

var linkPerfil=document.getElementById("linkPerfil");

linkPerfil.addEventListener("click", function(){ // Exibe modal com dados do usuário logado
	$('#modalPerfil').modal();
});



//================== Mecanismo de Contas (Cadastrar Contas do email)================== FUNCIONANDO!!

var cadastrarEmail = document.getElementById("cadastrarEmail"); // Definir o ID a ser capturado!!

cadastrarEmail.addEventListener("submit",function(e){ // Adicionando evento ao submeter cadastro da Conta
	e.preventDefault(); // Previne ação padrão de submissão

	//verifica se os e-mails informados são iguais!
	if(document.getElementById("contaEmail").value == document.getElementById("confirmarEmail").value){
	
		// Criação do objeto a ser tratado e enviado para o servidor
		var objCriarContaEmail ={
			endereco: document.getElementById("contaEmail").value,
			tipo: document.getElementById("tipoEmail").value,
			foto: "",
			token: tokenNumber
		}

		var jsonCriarContaEmail = JSON.stringify(objCriarContaEmail); // Transforma o objCriarContaEmail em sintaxe JSON
		var xhrCriarContaEmail = new XMLHttpRequest(); // Criando um objeto XMLHttpRequest
		
		// Especifica o tipo de conexão com o servidor (tipo, url e assincrona)
		xhrCriarContaEmail.open("POST", "http://www.henriquesantos.pro.br:8080/api/email/contas/new", true);
		
		//Adiciona cabeçalho HTTP a requisição (nome do cabeçalho e valor do cabeçalho)
		xhrCriarContaEmail.setRequestHeader("Content-type", "application/json"); 
		
		
		xhrCriarContaEmail.onreadystatechange = function(){ // Função executada toda vez que o status do objeto XMLHttpRequest for alterado
			//Cadastro realizado
			if(xhrCriarContaEmail.readyState == XMLHttpRequest.DONE && xhrCriarContaEmail.status == 200){ //if (this.readyState == 4 && this.status == 200)
				window.location.reload();			
				mySnackbar("snackbarSuccess","Conta de e-mail criada!")
			}
			// Erro no cadastro
			if(xhrCriarContaEmail.readyState == XMLHttpRequest.DONE && xhrCriarContaEmail.status != 200){
				mySnackbar("snackbarWarning","Erro ao criar conta de e-mail!!!")
			}
			
		}
		
		xhrCriarContaEmail.send(jsonCriarContaEmail); //Envia a sintaxe JSON para o servidor
	}else{
		mySnackbar("snackbarWarning","Os e-mails informados são incompatíveis");
	}
	
});



//================== Mecanismo de Contas (Listar Contas de email)================== FUNCIONANDO!!

var xhttp = new XMLHttpRequest();
var url = "http://www.henriquesantos.pro.br:8080/api/email/contas/"+tokenNumber+"";
xhttp.open("GET", url, false);
xhttp.send();
var retornoContasUsuarioLogado = xhttp.responseText;
retornoContasUsuarioLogado = JSON.parse(retornoContasUsuarioLogado);

var divDimensaoConta = document.getElementById("dimensaoConta"); // Obtem referencia da div já criada

for(var i = 0; i < retornoContasUsuarioLogado.length;i++){

	var blocoContato = document.createElement("button");
	blocoContato.setAttribute("type","button");
	blocoContato.setAttribute("class","list-group-item list-group-item-action");
	blocoContato.setAttribute("onclick","exibeCaixas('"+retornoContasUsuarioLogado[i].id+"','"+retornoContasUsuarioLogado[i].endereco+"')"); // Passando nome da conta como parametro!
	
	var textoContato = document.createTextNode(retornoContasUsuarioLogado[i].endereco); // Exibe nome da Conta

	blocoContato.appendChild(textoContato);
	divDimensaoConta.appendChild(blocoContato);

	
}


//================== Mecanismo de recuperar usuário ================== FUNCIONANDO!!

var xhttp = new XMLHttpRequest();
var url = "http://www.henriquesantos.pro.br:8080/api/email/usuarios/"+tokenNumber+"";
xhttp.open("GET", url, false);
xhttp.send();
var retornoUsuarioLogado = xhttp.responseText;
retornoUsuarioLogado = JSON.parse(retornoUsuarioLogado);


nomePerfil.innerHTML="<b>Nome do usuário: </b>"+retornoUsuarioLogado.nome+" "+retornoUsuarioLogado.sobrenome;
loginPerfil.innerHTML="<b>O login utilizado: </b>"+retornoUsuarioLogado.login;
cpfPerfil.innerHTML="<b>Numero do CPF: </b>"+retornoUsuarioLogado.cpf;
emailSecundarioPerfil.innerHTML="<b>E-mail secundário: </b>"+retornoUsuarioLogado.email_secundario;
totalContasPerfil.innerHTML="<b>Total de contas no sistema: </b>"+retornoContasUsuarioLogado.length;


var contaOrigem = 0;


//================== Função/Mecanismo mensagens de email (Enviar uma mensagem de email) ============= FUNCIONANDO!!

var formEnvioEmail = document.getElementById("formEnvioEmail"); // Definir o ID a ser capturado!!

formEnvioEmail.addEventListener("submit",function(e){ // Adicionando evento ao submeter cadastro da Conta
	e.preventDefault(); // Previne ação padrão de submissão
	
	// Criação do objeto a ser tratado e enviado para o servidor
	var objEnviarEmail ={
		
		token: tokenNumber,
		conta_id: contaOrigem,
		assunto: document.getElementById("assunto").value,
		corpo: document.getElementById("corpoMensagem").value,
		destinatarios_para: document.getElementById("selectDestinatario").value,
		destinatarios_cc: document.getElementById("selectCC").value,
		destinatarios_cco: document.getElementById("selectCCo").value
	}

	var jsonEnviarEmail = JSON.stringify(objEnviarEmail); // Transforma o objEnviarEmail em sintaxe JSON
	var xhrEnviarEmail = new XMLHttpRequest(); // Criando um objeto XMLHttpRequest
	// Especifica o tipo de conexão com o servidor (tipo, url e assincrona)
	xhrEnviarEmail.open("POST", "http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/enviar", true);
	//Adiciona cabeçalho HTTP a requisição (nome do cabeçalho e valor do cabeçalho)
	xhrEnviarEmail.setRequestHeader("Content-type", "application/json"); 
	
	
	xhrEnviarEmail.onreadystatechange = function(){ // Função executada toda vez que o status do objeto XMLHttpRequest for alterado
		//Enviado
		if(xhrEnviarEmail.readyState == XMLHttpRequest.DONE && xhrEnviarEmail.status == 200){ //if (this.readyState == 4 && this.status == 200)
			//window.location.reload();
			mySnackbar("snackbarSuccess","Mensagem enviada")
		}
		//Erro
		if(xhrEnviarEmail.readyState == XMLHttpRequest.DONE && xhrEnviarEmail.status != 200){
			mySnackbar("snackbarWarning","Erro ao enviar e-mail!")
		}
		
	}
	
	xhrEnviarEmail.send(jsonEnviarEmail); //Envia a sintaxe JSON para o servidor
	
});


//================== Realizar logout no sistema ============= 
sair.addEventListener("click",function(e){
	sessionStorage.removeItem("token");
	window.location = "index.html";
});







//############################## TRATATIVA DE USUARIO C/ E S/ CONTA ##############################

if(retornoContasUsuarioLogado.length > 0){
	globalUserId = retornoContasUsuarioLogado[0].id;
	globalUserAddress = retornoContasUsuarioLogado[0].endereco;
	exibeCaixas(globalUserId,globalUserAddress);
	exibeMensagens(globalCaixaId,globalUserId,"Entrada");
	exibeMensagenIndividual(globalMensagemIndividual,null);

}else{
	mySnackbar("snackbarNotice","Seja bem vindo(a) ao projeto Email Like API!!")
	tituloConta.style.display="none";
	tituloCaixa.style.display="none";
	tituloMensagem.style.display="none";
	scroolMensagemUnica.style.display="none";
	escreverEmail.style.display="none";
	linkCriarEmail.style.display="none";
	cadastrarEmail.style.display="block";
}
