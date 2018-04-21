// ruleta.js

var contribuyentes=[];
var contribuyente=null;
contribuyentes.push({
	dni:"12345678",
	nombres:"Pedro",
	apellidos: "Perez G",
	email:"pedro.perez@mail.com",
	win:false,
	premio:"",
	intentos:3
});
contribuyentes.push({
	dni:"12345679",
	nombres:"Maria",
	apellidos: "Perez G",
	email:"maria.perez@mail.com",
	win:false,
	premio:"",
	intentos:3
});
contribuyentes.push({
	dni:"123456",
	nombres:"Pablo",
	apellidos: "",
	email:"",
	win:false,
	premio:"",
	intentos:0
});
var miRuleta = new Winwheel({
           'numSegments': 6, // Número de segmentos
           'outerRadius'    : 170, // Radio externo
            'segments':[ // Datos de los segmentos
            { 'fillStyle': '#ff0000', 'text': '/S 25000' },
            
            
            { 'fillStyle': '#a8a8a8', 'text': '/S 100' },
            
            { 'fillStyle': '#ff0000', 'text': '/S  5000' },
            
            
            { 'fillStyle': '#a8a8a8', 'text': '/S 50' },
            
            { 'fillStyle': '#ff0000', 'text': '/S    1000' },
            
            
            { 'fillStyle': '#a8a8a8', 'text': '/S 10' }
            ],
            'animation': { 
                'type': 'spinToStop', // Giro y alto
                'duration': 5, // Duración de giro
                'callbackFinished': 'Mensaje()', // Función para mostrar mensaje
                'callbackAfter': 'dibujarIndicador()' // Funciona de pintar indicador
            }
        });

var images = ['<img src="img/seven.png">','<img src="img/banana.png">','<img src="img/cherries.png">','<img src="img/lemon.png">','<img src="img/orange.png">','<img src="img/plum.png">','<img src="img/watermelon.png">'];

var images2 = [
'<img src="img/slot1.png">',
'<img src="img/slot2.png">',
'<img src="img/slot3.png">',
'<img src="img/slot4.png">',
'<img src="img/slot5.png">',
'<img src="img/slot6.png">'];

//var ezslot = new EZSlots("ezslots",{"reelCount":4,"winningSet":[0,0,0,0],"symbols":images,"height":126,"width":126});

var ezslot = new EZSlots("ezslots",{"reelCount":3,"winningSet":[3,3,3,3],"symbols":images2,"height":126,"width":126,"callback":winslot});

var isHuman=false;

$(document).ready(function(){


	$("#btn-iniciar").click(function() {
		iniciar();
	});

	$("#btn-actualizar").click(function() {
		actualizar();
	});

	$("#btn-admin").click(function() {
		admin();
	});

	$("#btn-act-tipojuego").click(function() {
		$("#admin").toggle();
		$("#tipo-juego").toggle();
	});

	$("#btn-act-premios").click(function() {
		$("#admin").toggle();
		$("#premios").toggle();
	});

	$("#btn-act-vigencia").click(function() {
		$("#admin").toggle();
		$("#vigencia").toggle();
	});

	$("#btn-act-condiciones").click(function() {
		$("#admin").toggle();
		$("#condiciones").toggle();
	});

});


var correctCaptcha = function(response) {
	isHuman=(response.length!=0);
	//if (response.length)
    //    alert(response);
    };


function iniciar() {
	if (!isHuman) {
		alert("Error Verificacion Captcha!");
		return false;
	}
	var dni=$("#dni").val();
	contribuyente= contribuyentes.find(item => {
		return item.dni == dni
	});
	if (contribuyente!=null) {
		$("#inicio").hide();
		$("#actualizar").show();
		$("#title-contribuyente").html("DNI: "+dni);
		$("#nombres").val(contribuyente.nombres);
		$("#apellidos").val(contribuyente.apellidos);
		$("#email").val(contribuyente.email);
	} else {
		alert("No registrado! :(");
	}
}

function actualizar() {
	if (contribuyente!=null) {
		contribuyentes = contribuyentes.filter(function(item) { 
			return item.dni !== contribuyente.dni
		})
		contribuyente.nombres=$("#nombres").val();
		contribuyente.apellidos=$("#apellidos").val();
		contribuyente.email=$("#email").val();
		contribuyentes.push(contribuyente);


		if (contribuyente.intentos>0) {
			$("#actualizar").hide();
			if (contribuyente.dni=="12345678") {
				$("#play").show();	
			} else {
				$("#slotmachine").show();	
			}
			
			
			$("#title-jugar").html(contribuyente.nombres +", tienes " + contribuyente.intentos + " intentos para Jugar!");

		} else {
			alert("No tienes oportunidades de jugar! :(");
		}
	} else {
		alert("Falta actualizar!");
	}
}

function admin() {

	var usuario = $("#usuario").val();
	var clave = $("#password").val();

	if (usuario=="admin" && clave=="admin") {
		$("#acceso").hide();
		$("#admin").show();
	} else {
		alert("Usuario o Clave incorrecta");
	}


}

function salir() {
	window.location="index.html";
}

function tipoJuego() {
	$("#admin").hide();
	$("#tipo-juego").show();
}

function premios() {
	$("#admin").hide();
	$("#premios").show();
}

function vigencia() {
	$("#admin").hide();
	$("#vigencia").show();
}

function condiciones() {
	$("#admin").hide();
	$("#condiciones").show();
}

function jugar() {
	
	if (contribuyente.intentos>0 && !contribuyente.win) {
		$("#jugada").html("");
		miRuleta.rotationAngle = 0;
		miRuleta.draw();
		dibujarIndicador();
		miRuleta.startAnimation();
		

	} else {
		if (contribuyente.win) {
			alert("Felicitaciones has ganado " + contribuyente.premio + " !!! ");
		} else {
			alert("Lo sentimos ya no tiene oportunidades de jugar! :(");
		}
	}

}


function jugar2() {
	
	if (contribuyente.intentos>0 && !contribuyente.win) {
		ezslot.win()

	} else {
		if (contribuyente.win) {
			alert("Felicitaciones has ganado " + contribuyente.premio + " !!! ");
		} else {
			alert("Lo sentimos ya no tiene oportunidades de jugar! :(");
		}
	}

}

function winslot(results) {
	contribuyente.intentos -= 1;
	if (contribuyente.intentos==0) {
		$("#btn-jugar").prop("disabled",true);
	}
	if (results[0]==results[1] && results[0]==results[1]) {
		contribuyente.premio="/s 5000";
		contribuyente.win=true;
		$("#btn-reclamar2").val("Reclamar "+contribuyente.premio+ " !");
		$("#winner2").show();
		$("#btn-jugar2").prop("disabled",true);
	}

}


function reclamar() {
	if (contribuyente.win) {
		$("#play").hide();
		$("#reclamar-premio").show();
		$("#ganador-premio").html(contribuyente.nombres +" has sido ganador de " + contribuyente.premio +" !, Gracias por participar.");
	}
}

function reclamar2() {
	if (contribuyente.win) {
		$("#slotmachine").hide();
		$("#reclamar-premio").show();
		$("#ganador-premio").html(contribuyente.nombres +" has sido ganador de " + contribuyente.premio +" !, Gracias por participar.");
	}
}

function continuar() {
	location.reload();
}

function dibujarIndicador() {
	var ctx = miRuleta.ctx;
	ctx.strokeStyle = 'navy';     
	ctx.fillStyle = 'black';     
	ctx.lineWidth = 2;
	ctx.beginPath();             
	ctx.moveTo(170, 0);          
	ctx.lineTo(230, 0);          
	ctx.lineTo(200, 40);
	ctx.lineTo(171, 0);
	ctx.stroke();                
	ctx.fill();                  
}

function Mensaje() {
	contribuyente.intentos -= 1;
	$("#title-jugar").html(contribuyente.nombres +" ,tienes " + contribuyente.intentos + " intentos para Jugar!");
	var SegmentoSeleccionado = miRuleta.getIndicatedSegment();
	//alert("Elemento seleccionado:" + SegmentoSeleccionado.text + "!");
	if (contribuyente.intentos==0) {
		$("#btn-jugar").prop("disabled",true);
	}
	$("#jugada").html(SegmentoSeleccionado.text);
	if (SegmentoSeleccionado.text.startsWith("/S")) {
		contribuyente.premio=SegmentoSeleccionado.text;
		contribuyente.win=true;
		$("#btn-reclamar").val("Reclamar "+contribuyente.premio+ " !");
		$("#winner").show();
		$("#btn-jugar").prop("disabled",true);
	}
	miRuleta.stopAnimation(false);
	
}
