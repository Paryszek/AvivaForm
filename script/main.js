

/*function zmiana (e) {
	var zmiana = prompt("Wprowadz tekst, ktory chcesz tu wstawic", e.textContent);
	if(zmiana == null || zmiana == "") {
		return
	} else {
		e.textContent = zmiana;
	}
}*/
function checkMe (e) {
	var s = window.getComputedStyle(e);
	var textOfElement = document.getElementById("textOfElement");
	var colorOfElement = document.getElementById("colorOfElement");
	var marginTop = document.getElementById("marginUp");
	var marginBottom = document.getElementById("marginDown");
	var marginLeft = document.getElementById("marginLeft");
	var marginRight = document.getElementById("marginRight");
	var padding = document.getElementById("padding");
	var widthOfElement = document.getElementById("widthOfElement");
	var heightOfElement = document.getElementById("heightOfElement");
	textOfElement.value = e.innerHTML;
	padding.value = s.padding;
	marginTop.value = s.marginTop;
	colorOfElement.value = s.color;
	marginBottom.value = s.marginBottom;
	marginLeft.value = s.marginLeft;
	marginRight.value = s.marginRight;
	widthOfElement.value = s.width;
	heightOfElement.value = s.height;
}

$(window).load(function () { 
		


		function ajaxCall() { 

		
			$.ajax({ url: 'stronaZFormularzem.html',success: function(data) {
				var page = document.getElementById("toFetchFormFromOtherPage");
				page.innerHTML = data;
				var formGenerator = document.getElementById('formGenerator');
				var outerForm = document.getElementsByTagName("form")[0];
				formGenerator.innerHTML  = outerForm.innerHTML;
				var attachFunctionToChildrens = function(e) {
					for(var i=0; i<e.length; i++) {
				    	if(e[i].children.length == 0) {
					         e[i].onclick = function () { checkMe(this); };
					         //e[i].setAttribute("onclick","checkMe(this);");
							 //console.log(e[i]);
						} else {
							attachFunctionToChildrens(e[i].children);
						}				    	 
					}
				}
				var nodes = formGenerator.childNodes;
				attachFunctionToChildrens(nodes);
				//formGenerator.innerHTML  = document.getElementsByClassName("whole-page")[0].innerHTML; //drobna zmiana pozwalajaca na załaczenie calej strony zamiast jej elemntow do podgladu
				/*var x = document.getElementsByClassName("no-margin-no-padding");
				for (i=0; i < x.length; i++) {
					x[i].onclick = function () {
						checkMe(this);
						zmiana(this);
					}
				}
				var b = document.getElementsByTagName("button");
				for(i=0; i < b.length; i++) {
					b[i].onclick = function () {
						checkMe(this);
						zmiana(this);
					}
				}
					//dodana obsluga elementow ng-binding
					var c = document.getElementsByClassName("ng-binding");
				for(i=0; i < c.length; i++) {
					c[i].onclick = function () {
						checkMe(this);
						zmiana(this);
						}
					}
				}*/
				
				}
				
			});
		}
		
		ajaxCall();
});
var addToGenerator = function(e) {
	var generator = document.getElementById("formGenerator");

	if(e == 1) {
		var formElement = document.createElement("input");
		formElement.setAttribute('type','submit');
		formElement.setAttribute('value','nazwa przycisku');
		generator.appendChild(formElement);
	} else if(e == 2) {
		var formElement = document.createElement("input");
		formElement.setAttribute('type','text');
		formElement.setAttribute('placeholder','pole zachecajace...');
		generator.appendChild(formElement);
	} else if(e == 3) {
		var formElement = document.createElement("br");
		generator.appendChild(formElement);
	} else {
		console.log("Błąd przy dodawaniu elementu do kreatora formularza");
	}

}

