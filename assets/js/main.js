$(function() {
	var sala=0;
	var pieza=0;
	var max=0;

	$("#menu").click(function() {
		$("#menusalas").show("fast");
	});	

	$(".sala").click(function() {
		resetVars();
		sala=$(this).data("sala");
		max=$(this).data("piezas");
		pieza=1;
		cargaInfo();
		$("#menusalas").hide("fast");
	});

	$("#siguiente").click(function() {
		pieza=1;
		sala++;
		cargaInfo();
	});

	$("#adelante").click(function() {
		if(pieza<max){
			pieza++;
		}else{
			return false;
		}
		cargaInfo();
		//$( this).trigger( "custom", [ pieza, max ] );
	});

	$("#atras").click(function() {
		if(pieza>1){
			pieza--;
		}else{
			return false;
		}
		cargaInfo();
		$( this).trigger( "custom", [ pieza, max ] );
	});
	/*$( "#atras, #adelante" ).on( "custom", function( event, pieza, max ) {
		navegacionDisponible(pieza,max);
	});*/

	function navegacionDisponible(){
		if(pieza==1){
			$("#atras").fadeTo("fast",.5);
		}else{
			$("#atras").fadeTo("fast",1);
		}
		if(pieza==max){
			$("#adelante").fadeTo("fast",.5);
		}else{
			$("#adelante").fadeTo("fast",1);
		}
		$(".sala").fadeTo(0,1);
		console.log($(".sala").find("[data-sala='" + sala + "']"));
		$("#menusalas").find("[data-sala='" + sala + "']").fadeTo("fast",.5);
	}

	function cargaInfo(){
		resetInfo();
		$("#areacontenidos" ).load( "contenidos/sala_"+sala+"/textos/texto_"+pieza+".html" );
		$("#descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+pieza+".html" );
		$("#imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+pieza+".png");
		navegacionDisponible()
	}
	function resetInfo(){
		$("#areacontenidos" ).html("");
		$("#descripcionimagen" ).html("");
		$("#imagen").attr("src","");
	}
	function resetVars(){
		sala=0;
		pieza=0;
		max=0;
	}

});