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
		multiples=$(this).data("piezasmultiples");
		pieza=1;
		crearSlides(max,multiples);
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
	function crearSlides(num, multiples){
		resetInfo();
		for(i=1; i<=num; i++){
			nuevo= $(".swiper-wrapper").append('<div data-id="'+i+'" id="slide_'+i+'"class="swiper-slide"></div>');
			$("#slide_"+i).load( "contenidos/slide.html", function() {
				$(this).find(".areacontenidos").load( "contenidos/sala_"+sala+"/textos/texto_"+$(this).data("id")+".html" );
				var padre=this;
				if(multiples){
					name="pieza_"+$(padre).data("id");
					max=multiples[name];
					if(max){
						for(ii=1;ii<=max;ii++){
							nuevaimagen= $(this).find(".margenimagenes").append('<div id="imagen_'+ii+'" data-id="'+ii+'"class="contenedorimagen"></div>');
							$(this).find("#imagen_"+ii).load( "contenidos/imagen.html", function() {
								$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+"_"+$(this).data("id")+".png")
								$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+"_"+$(this).data("id")+".html" );
							});

						}
					}else{
						nuevaimagen= $(this).find(".margenimagenes").append('<div id="imagen_1" class="contenedorimagen"></div>');
						$(this).find("#imagen_1").load( "contenidos/imagen.html", function() {
							$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+".png")
							$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+".html" );
						});
					}
				}else{
					nuevaimagen= $(this).find(".margenimagenes").append('<div id="imagen_1" class="contenedorimagen"></div>');
					$(this).find("#imagen_1").load( "contenidos/imagen.html", function() {
						$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+".png")
						$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+".html" );
					});

				}



				/*$(this).find(".margenimagenes").load( "contenidos/imagen.html", function() {
					if(multiples){
						name="pieza_"+$(padre).data("id");
						if(multiples[name]){
							max=multiples[name];
							$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+"_1.png")
							$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+"_1.html" );	
							for(ii=1;ii<=max;ii++){
								
								$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+"_"+ii+".png")
								$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+"_"+ii+".html" );	
							}
						}else{
							$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+".png")
							$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+".html" );	
						}
					}else{
						$(this).find(".imagen").attr("src","contenidos/sala_"+sala+"/imagenes/png/imagen_"+$(padre).data("id")+".png")
						$(this).find(".descripcionimagen" ).load( "contenidos/sala_"+sala+"/imagenes/imagen_"+$(padre).data("id")+".html" );
					}

				});*/

			} );
		}
		swiper.slideTo(0,0);
		swiper.update();
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