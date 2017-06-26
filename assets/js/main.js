(function($) {
    $.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight+0 > this.get(0).clientHeight-0;    }
})(jQuery);
$(function() {
	var sala=0;
	var pieza=0;
	var max=0;
	//var slide = $(".swiper-slide").remove();
	var swiper = new Swiper('#pantalla');

	$("#menu").click(function() {
		$("#menusalas").show(0);
		$("#swiper-wrapper").hide(0);

	});	
	$("#atras").click(function() {
		swiper.slidePrev();
	});	
	$("#adelante").click(function() {
		swiper.slideNext();
	});	
	$("#cerrar").click(function() {
		$("#menusalas").hide(0);
		$("#swiper-wrapper").hide(0);

	});	

	$(".sala").click(function() {
		swiper.removeAllSlides();
		resetVars();
		sala=$(this).data("sala");
		max=$(this).data("piezas");
		multiples=$(this).data("piezasmultiples");
		pieza=1;
		crearSlides(max,multiples);
		$("#menusalas").hide(0);
	});

	/*$("#siguiente").click(function() {
		pieza=1;
		sala++;
		cargaInfo();
	});*/

	function adelante() {
		if(pieza<max){
			pieza++;
		}else{
			return false;
		}
		//cargaInfo();
	};

	function atras() {
		if(pieza>1){
			pieza--;
		}else{
			return false;
		}
		//cargaInfo();
	};
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
	function crearSlides(num, multiples){
		resetInfo();
		for(i=0; i<=num; i++){
			nuevo= $(".swiper-wrapper").append('<div data-id="'+i+'" id="slide_'+i+'"class="swiper-slide"></div>');
			$("#slide_"+i).load( "contenidos/slide.html", function() {
				$(this).find(".areacontenidos").load( "contenidos/sala_"+sala+"/textos/texto_"+$(this).data("id")+".html" );
				var padre=this;
				if(multiples){
					name="pieza_"+$(padre).data("id");
					var max=multiples[name];
					if(max){
						for(ii=1;ii<=max;ii++){
							nuevaimagen= $(this).find(".margenimagenes").append('<div id="imagen_'+ii+'" data-id="'+ii+'"class="contenedorimagen"></div>');
							//console.log("si");

							$(this).find("#imagen_"+ii).load( "contenidos/imagen.html", function() {
								$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+"."+$(this).data("id")+".png")
								$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+"."+$(this).data("id")+".html",degradado($(padre).find(".margenimagenes")) );
								$("#slide_0").find(".degradado").hide(0);
								console.log($(this).data("id")+"/"+max);

								if($(this).data("id")==max){
									console.log("no");
									$(padre).find("#imagen_"+$(this).data("id")).append("<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>");
								}
							});

						}
					}else{
						nuevaimagen= $(this).find(".margenimagenes").append('<div id="imagen_1" class="contenedorimagen"></div>');
						$(this).find("#imagen_1").load( "contenidos/imagen.html", function() {
							$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+".png")
							$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+".html",degradado($(padre).find(".margenimagenes")) );
							$("#slide_0").find(".degradado").hide(0);

						});
					}
				}else{
					nuevaimagen= $(this).find(".margenimagenes").append('<div id="imagen_1" class="contenedorimagen"></div>');
					$(this).find("#imagen_1").load( "contenidos/imagen.html", function() {
						$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+".png")
						$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+".html",degradado($(padre).find(".margenimagenes")) );
						$("#slide_0").find(".degradado").hide(0);

					});

				}
				degradado($(padre).find(".margenimagenes"));
			} );

		}
		swiper.slideTo(0,0);
		swiper.update();
		$("#swiper-wrapper").show(0);
	}
	function degradado(obj){
		//console.log($(obj).hasScrollBar());
		if($(obj).hasScrollBar()){
		}else{
			//$(obj).find(".degradado").hide(0);
		};
	};
	function resetInfo(){
		$(".swiper-slide").remove();
	}
	function resetVars(){
		sala=0;
		pieza=0;
		max=0;
	}

});