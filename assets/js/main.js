$(function() {
	var sala=0;
	var pieza=0;
	var max=0;
	var slide = $(".swiper-slide").remove();
	var swiper = new Swiper('#pantalla');

	$("#menu").click(function() {
		$("#menusalas").show("fast");
		$("#swiper-wrapper").hide(0);

	});	

	$(".sala").click(function() {
		resetVars();
		sala=$(this).data("sala");
		max=$(this).data("piezas");
		pieza=1;
		crearSlides(max);
		//cargaInfo();
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
		$("#menusalas").find("[data-sala='" + sala + "']").fadeTo("fast",.5);
	}
	function crearSlides(num){
		resetInfo();
		for(i=1; i<num; i++){
			nuevo= $(".swiper-wrapper").append('<div data-id="'+i+'" id="slide_'+i+'"class="swiper-slide"></div>');
			$("#slide_"+i).load( "contenidos/slide.html", function() {
				$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(this).data("id")+".png")
				$(this).find(".areacontenidos").load( "contenidos/sala_"+sala+"/textos/texto_"+$(this).data("id")+".html" );
				$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(this).data("id")+".html" );
			} );
		}
		//if(swiper){
		//	swiper.destroy();
		//}
		
		$("#swiper-wrapper").show(0);
	}
	function resetInfo(){
		$(".swiper-slide").remove();
	}
	function resetVars(){
		sala=0;
		pieza=0;
		max=0;
	}

});