class element {
	constructor (e, t, n, c, p, mT, mL, mR, mB, pL, pT, pR, pB, w, h, s, a, u, post) {
		this.el = e;
		this.text = t;
		this.name = n;
		this.color = c;
		this.placeHolder = p;
		this.marginTop = mT;
		this.marginLeft = mL;
		this.marginRight = mR;
		this.marginBottom = mB;
		this.paddingTop = pT;
		this.paddingRight = pR;
		this.paddingBottom = pB;
		this.paddingLeft = pL;
		this.width = w;
		this.height = h;
		this.src = s;
		this.alt = a;
		this.url = u;
		this.poster = post;
	}
}

var Elements = [];
var undoCounter = 0;
var TARGETED_ELEMENT;
var Clicked = null;
var headerPos = 0;
var cursorX;
var cursorY;

function editElement() {
	$(".generatorMenu").removeClass("hideSection");
	$(".generatorMenu").addClass("showSection");
	$("#leaveEditMode").css("zIndex", 100000000);
	$("#previews").addClass("hideSection");
	$("#menu").removeClass("showSection");
	$("#menu").addClass("hideSection");
}

function closeMenu() {
	$("#menu").removeClass("showSection");
	$("#menu").addClass("hideSection");
}

function checkMe (e,option) {

	var textOfElement = document.getElementById("textOfElement");
	var colorOfElement = document.getElementById("colorOfElement");
	var placeHolder = document.getElementById("placeHolder");

	var marginTop = document.getElementById("marginTop");
	var marginBottom = document.getElementById("marginBottom");
	var marginLeft = document.getElementById("marginLeft");
	var marginRight = document.getElementById("marginRight");

	var paddingTop = document.getElementById("paddingTop");
	var paddingBottom = document.getElementById("paddingBottom");
	var paddingLeft = document.getElementById("paddingLeft");
	var paddingRight = document.getElementById("paddingRight");

	var widthOfElement = document.getElementById("widthOfElement");
	var heightOfElement = document.getElementById("heightOfElement");
	var urlAdress = document.getElementById("urlOfImage");
	var altOfImage = document.getElementById("altOfImage");

	var textOfElementUrl = document.getElementById("textOfElementUrl");
	var linkUrl = document.getElementById("linkUrl");

	var posterVideo = document.getElementById("posterOfVideo");
	var videoUrl = document.getElementById("urlOfVideo");

	var copyOfE;



	function loadPreview(e){
		//transition mily dla oka
		copyOfE = $(e).clone();
		copyOfE.removeClass("active");
		$(copyOfE).click(function (event) {
			event.preventDefault();
			window.open(this.href);
		});
		$("#Podglad :nth-child(2)").fadeOut(1000,
			function(){
				$("#Podglad :nth-child(2)").replaceWith(copyOfE);
			});
	}

	if(option == 0) { 	//odczyt
		$("#menu").removeClass("hideSection");
		$("#menu").css({top: cursorY+'px', left: cursorX+'px'});
		$("#menu").addClass("showSection");
		$(Clicked).removeClass("active");
		Clicked = e;
		$(e).addClass("active");
		TARGETED_ELEMENT = e;

			if($(e).is("video")) {
				$("#ButtonsText").addClass("hideSection");
				$("#Images").addClass("hideSection");
				$("#Url").addClass("hideSection");
				$("#Videos").removeClass("hideSection");
				$("#Podglad").addClass("hideSection");

				posterVideo.value = e.poster;
				videoUrl.value = e.src;

				var el = new element (e, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, e.src, e.poster);
				Elements.push(el);
				undoCounter = undoCounter + 1;
			} else if($(e).attr('href')) {
			$("#ButtonsText").addClass("hideSection");
			$("#Images").addClass("hideSection");
			$("#Url").removeClass("hideSection");
			$("#Videos").addClass("hideSection");
			$("#Podglad").removeClass("hideSection");
			loadPreview(e);

			textOfElementUrl.value = e.text;
			linkUrl.value = e.href;

			var el = new element (e, e.text, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, e.href);
			Elements.push(el);
			undoCounter = undoCounter + 1;

		} else if($(e).hasClass("image")) {
			$("#ButtonsText").addClass("hideSection");
			$("#Url").addClass("hideSection");
			$("#Images").removeClass("hideSection");
			$("#Videos").addClass("hideSection");
			$("#Podglad").removeClass("hideSection");
			loadPreview(e);

			altOfImage.value = e.alt;
			urlAdress.value = e.src;

			var el = new element (e, null, null, null, null, null, null, null, null, null, null, null, null, null, null, e.src, e.alt, null);
			Elements.push(el);
			undoCounter = undoCounter + 1;

		} else {
			$("#Url").addClass("hideSection");
			$("#ButtonsText").removeClass("hideSection");
			$("#Images").addClass("hideSection");
			$("#Videos").addClass("hideSection");
			$("#Podglad").removeClass("hideSection");
			loadPreview(e);

			var s = window.getComputedStyle(e);
			var colorPicker = document.getElementById('colorPickerButton');
			colorPicker = colorPicker.jscolor;

			textOfElement.value = e.innerHTML;
			nameOfElement.value = e.value;
			colorPicker.fromString(s.color);
			placeHolder.value = e.placeholder;

			marginTop.value = s.marginTop;
			marginBottom.value = s.marginBottom;
			marginLeft.value = s.marginLeft;
			marginRight.value = s.marginRight;

			paddingTop.value = s.paddingTop;
			paddingBottom.value = s.paddingBottom;
			paddingLeft.value = s.paddingLeft;
			paddingRight.value = s.paddingRight;

			widthOfElement.value = s.width;
			heightOfElement.value = s.height;

			var el = new element (e, e.innerHTML, e.value, e.style.color, e.placeHolder, e.style.marginTop, e.style.marginBottom, e.style.marginLeft, e.style.marginRight, e.style.paddingTop, e.style.paddingBottom, e.style.paddingLeft, e.style.paddingRight, e.style.width, e.style.height, null, null, null);
			Elements.push(el);
			undoCounter = undoCounter + 1;
		}

	} else if(option == 1) {	//zapis
		e = TARGETED_ELEMENT;
		var colorPicker = document.getElementById('colorPickerButton');
		colorPicker = colorPicker.jscolor;

		if($(e).is("video")) {
			e.poster = posterVideo.value;
			e.src = videoUrl.value;

			var el = new element (e, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, e.src, e.poster);
			Elements.push(el);
			undoCounter = undoCounter + 1;

		} else if($(e).attr('href')) {

			e.text = textOfElementUrl.value;
			e.href = linkUrl.value;

			var el = new element (e, e.text, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, e.href);
			Elements.push(el);
			undoCounter = undoCounter + 1;

			loadPreview(e);

		} else if($(e).hasClass("image")) {
			e.src = urlAdress.value;
			e.alt = altOfImage.value;

			var el = new element (e, null, null, null, null, null, null, null, null, null, null, null, null, null, null, e.src, e.alt, null);
			Elements.push(el);
			undoCounter = undoCounter + 1;
			loadPreview(e);
		} else {
			e.innerHTML = textOfElement.value;

			e.value = nameOfElement.value;
			e.style.color = "#" + colorPicker.toString();

			e.placeholder = placeHolder.value;

			e.style.marginTop = marginTop.value;
			e.style.marginBottom = marginBottom.value;
			e.style.marginLeft = marginLeft.value;
			e.style.marginRight = marginRight.value;

			e.style.paddingTop = paddingTop.value
			e.style.paddingBottom = paddingBottom.value;
			e.style.paddingLeft = paddingLeft.value;
			e.style.paddingRight = paddingRight.value;

			e.style.width = widthOfElement.value;
			e.style.height = heightOfElement.value;

			var el = new element (e, e.innerHTML, e.value, e.style.color, e.placeHolder, e.style.marginTop, e.style.marginBottom, e.style.marginLeft, e.style.marginRight, e.style.paddingTop, e.style.paddingBottom, e.style.paddingLeft, e.style.paddingRight, e.style.width, e.style.height, null, null, null);
			Elements.push(el);
			undoCounter = undoCounter + 1;
			loadPreview(e);
		}

	} else if(option == 2) {	//reset
		reset(e);
	} else if(option == 3) {	//cofnij

		if(undoCounter > 1)
			undoCounter = undoCounter - 1;
	  tmp = Elements[undoCounter - 1];
		back(tmp);
		loadPreview(tmp.el);

	} else if(option == 4){	// ponów

		if(Elements.length > undoCounter)
				undoCounter = undoCounter + 1;
		tmp = Elements[undoCounter - 1];
		back(tmp);
		loadPreview(tmp.el);
	}
	else if (option == 5) {
		$(".generatorMenu").removeClass("showSection");
		$(".generatorMenu").addClass("hideSection");
		$("#loadPageFromURLScreen").removeClass("hideSection");
		adress = $("#pageToModify").val();
		ajaxCall(adress);

  } else {
		console.log("Error in checkMe(); function ... arg != <0;5>");
	}
}

function back (tmp) {
	if($(tmp).is("video")) {
		tmp.el.src = tmp.url;
		tmp.el.poster = tmp.post;
	} else if($(tmp).attr('href')) {
		tmp.el.text = tmp.text;
		tmp.el.href = tmp.url;
	} else if($(tmp.el).hasClass("image")) {
		tmp.el.src = tmp.src;
		tmp.el.alt = tmp.alt;
	} else {
		var colorPicker = document.getElementById('colorPickerButton');
		colorPicker = colorPicker.jscolor;
		colorPicker.fromString(tmp.color);

		tmp.el.innerHTML = tmp.text;

		tmp.el.value = tmp.name;

		tmp.el.style.color = tmp.color;

		tmp.el.placeholder = tmp.placeHolder;

		tmp.el.style.marginTop = tmp.marginTop;
		tmp.el.style.marginBottom = tmp.marginBottom;
		tmp.el.style.marginLeft = tmp.marginLeft;
		tmp.el.style.marginRight = tmp.marginRight;

		tmp.el.style.paddingTop = tmp.paddingTop;
		tmp.el.style.paddingBottom = tmp.paddingBottom;
		tmp.el.style.paddingLeft = tmp.paddingLeft;
		tmp.el.style.paddingRight = tmp.paddingRight;

		tmp.el.style.width = tmp.widthOfElement;
		tmp.el.style.height = tmp.heightOfElement;
	}
	reset(tmp);
}
$(document).ready(function() {$("#menu").addClass("hideSection");});
$(window).load(function () {
		function ajaxCall(adress) {
			$.ajax({ url: adress,success: function(data) {
				$('#loadPageFromURLScreen').addClass('hideSection');
				$('.generatorMenu').addClass('hideSection');
				$('#sliderOfElementsToEdit').addClass('hideSection');
				$("#previews").removeClass("hideSection");

				var formGenerator = document.getElementById("formGenerator");
				isMenuActive = false;
				var c = document.createElement('div');
				c.innerHTML = "<div></div>";
				var x = document.createElement('data');
				x.innerHTML = data;
				c.appendChild(x);

				formGenerator.innerHTML = c.innerHTML;

				tmp = document.getElementsByTagName("img");
				tmp2 = document.getElementsByTagName("video");
				tmp3 = document.getElementsByTagName("p");

				var fetchElementsToSlider = function(e) {
					var slider = document.getElementById("sliderOfElementsToEdit");
					for(var i=0; i<e.length; i++) {
				    	if(e[i].children.length == 0) {
							var box = document.createElement("div");
							box.setAttribute("class", "boxInSlider");
							if(e[i].tagName != "META" && e[i].tagName != "TITLE" && e[i].tagName != "IFRAME" && e[i].tagName != "SCRIPT" && e[i].tagName != "STYLE" && e[i].tagName != "NOSCRIPT") {
								//console.log(e[i]);
								box.innerHTML = e[i].innerHTML;
								if(box.innerHTML != "") {
									slider.appendChild(box);
								}
							}
						} else {
							fetchElementsToSlider(e[i].children);
						}

					}
				}



				var attachFunctionToImages = function(e) {
					for(var i=0; i < e.length; i++) {
						//	alert(e[i]);
							e[i].parentElement.onclick = function (event) {
						 	};
					}
				}

				var attachFunctionToVideos = function(e) {
					for(var i=0; i < e.length; i++) {
							e[i].onclick = function (event) {
									event.preventDefault();
									checkMe(this, 0);
							};
					}
				}


				var attachFunctionToChildrens = function(e) {
					for(var i=0; i<e.length; i++) {
							if($(e[i]).is("li")) {
								e[i].onclick = function (event) {
									event.preventDefault();
									checkMe(this,0);
								 };
							}
							if($(e[i]).is('strong')) {
								console.log(e[i]);
								e[i].parentElement.onclick = function (event) {
									event.preventDefault();
									checkMe(this,0);
							 };
						 }
							if(e[i].children.length == 0) {
									var x = $(e[i]);
									if($(x).is("img")) {
										$(x).addClass("image");
									}
									if($(e[i]).is('span')) {
										console.log($(e[i]));
 									 	x = e[i].parentElement;
										x = x.childNodes;
 									 	for(var z=0; z < x.length; z++) {
												t = x.item(z);
												if($(t).is("text")) {
													alert("cos");
												}
		 			 						  t.onclick = function (event) {
		 			 							 event.preventDefault();
		 			 							 checkMe(this,0);
		 			 						 };
										 }
									} else if($(e[i]).is('b')) {
									 console.log($(e[i]));
									 x = e[i].parentElement;
									 console.log(x);
			 						 x.onclick = function (event) {
			 							 event.preventDefault();
			 							 checkMe(this,0);
			 						 };
								 }
				         e[i].onclick = function (event) {
									 event.preventDefault();
									 checkMe(this,0);
									};
						} else {
							attachFunctionToChildrens(e[i].children);
						}
					}
				}
					$('cookie-consent').addClass('hideSection');
					var nodes = formGenerator.childNodes;
					attachFunctionToChildrens(nodes);
			//		attachFunctionToImages(tmp);
					attachFunctionToVideos(tmp2);
					attachFunctionToVideos(tmp3);
					fetchElementsToSlider(nodes);
					$(".showhide").prepend('<button class="button"  onclick="showHidden(this);">Rozwiń</button>');
				}
			});
		}
		$("#goToURL").click(function(){
			adress = $("#pageToModify").val();
			ajaxCall(adress);
		});
		$("#leaveEditMode").click(function(){
			$(".generatorMenu").removeClass("showSection");
			$(".generatorMenu").addClass("hideSection");
			$("#previews").removeClass("hideSection");
		});

		document.onmousemove = function(e) {
		    cursorX = e.pageX;
		    cursorY = e.pageY;
		}

		$("#slideDown").on("click", function(e) {
	        e.preventDefault();
	        var div = $('#sliderOfElementsToEdit');
	        if((-1 * headerPos) < (div.height() - window.innerHeight)) {
	        	headerPos -= 200;
	        }
	        div.animate({
	            top: headerPos +'px',
	        });
    	});
    	$("#slideUp").on("click", function(e) {
	        e.preventDefault();
	        var div = $('#sliderOfElementsToEdit');
	        if(headerPos < 0) {
	        	headerPos += 200;
	        }
	        div.animate({
	            top: headerPos+'px',
	        });
    	});


});



function reset (e) {
	var textOfElement = document.getElementById("textOfElement");
	var colorOfElement = document.getElementById("colorOfElement");
	var placeHolder = document.getElementById("placeHolder");

	var marginTop = document.getElementById("marginTop");
	var marginBottom = document.getElementById("marginBottom");
	var marginLeft = document.getElementById("marginLeft");
	var marginRight = document.getElementById("marginRight");

	var paddingTop = document.getElementById("paddingTop");
	var paddingBottom = document.getElementById("paddingBottom");
	var paddingLeft = document.getElementById("paddingLeft");
	var paddingRight = document.getElementById("paddingRight");

	var widthOfElement = document.getElementById("widthOfElement");
	var heightOfElement = document.getElementById("heightOfElement");
	var urlAdress = document.getElementById("urlOfImage");
	var altOfImage = document.getElementById("altOfImage");


	var colorOfElementUrl = document.getElementById("colorOfElementUrl");
	var linkUrl = document.getElementById("linkUrl");
	var textOfElementUrl = document.getElementById("textOfElementUrl");

	var posterVideo = document.getElementById("posterOfVideo");
	var videoUrl = document.getElementById("urlOfVideo");

	e = TARGETED_ELEMENT;


	if($(e).is("video")) {
		posterVideo.value = e.poster;
		videoUrl.value = e.src;
	} else if($(e).attr('href')) {

		textOfElementUrl.value = e.text;
		linkUrl.value = e.href;

	} else if($(e).hasClass("image")) {
		altOfImage.value = e.alt;
		urlAdress.value = e.src;
	} else {
		var s = window.getComputedStyle(e);
		var colorPicker = document.getElementById('colorPickerButton');
		colorPicker = colorPicker.jscolor;

		textOfElement.value = e.innerHTML;

		nameOfElement.value = e.value;

		colorPicker.fromString(s.color);

		placeHolder.value = e.placeholder

		marginTop.value = s.marginTop;
		marginBottom.value = s.marginBottom;
		marginLeft.value = s.marginLeft;
		marginRight.value = s.marginRight;

		paddingTop.value = s.paddingTop;
		paddingBottom.value = s.paddingBottom;
		paddingLeft.value = s.paddingLeft;
		paddingRight.value = s.paddingRight;

		widthOfElement.value = s.width;
		heightOfElement.value = s.height;
	}
}

function showHidden(e) {
		$("div[style='display: none;']").show();
		$(e).addClass("disabled");
		$(e).hide();
}


var isVisible = false;
function toggleElementsMenu() {
	if(!isVisible) {
		$('#sliderOfElementsToEdit').removeClass('hideSection');
		$('#sliderOfElementsToEdit').addClass('showSection');
		isVisible = true;
	} else {
		$('#sliderOfElementsToEdit').removeClass('showSection');
		$('#sliderOfElementsToEdit').addClass('hideSection');
		isVisible = false;
	}
}
