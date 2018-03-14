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



$(document).ready(function(){


	$("#btn-iniciar").click(function() {
		iniciar();
	});

	$("#btn-actualizar").click(function() {
		actualizar();
	});

});

function iniciar() {
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
			$("#play").show();
			$("#title-jugar").html(contribuyente.nombres +", tienes " + contribuyente.intentos + " intentos para Jugar!");

		} else {
			alert("No tienes oportunidades de jugar! :(");
		}
	} else {
		alert("Falta actualizar!");
	}
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

function reclamar() {
	if (contribuyente.win) {
		$("#play").hide();
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
