

/*function zmiana (e) {
	var zmiana = prompt("Wprowadz tekst, ktory chcesz tu wstawic", e.textContent);
	if(zmiana == null || zmiana == "") {
		return
	} else {
		e.textContent = zmiana;
	}
}*/
class element {
	constructor (t, n, c, p, mT, mL, mR, mB, pL, pT, pR, pB, w, h) {
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
	}
}

var Elements = [];
var TARGETED_ELEMENT;

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



	if(option == 0) {
		TARGETED_ELEMENT = e;
		console.log(e.style);
		var s = window.getComputedStyle(e);

		textOfElement.value = e.innerHTML;

		nameOfElement.value = e.value;

		colorOfElement.value = s.color;

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


	} else if(option == 1) {
		e = TARGETED_ELEMENT;

		e.innerHTML = textOfElement.value;

		e.value = nameOfElement.value;

		e.style.color = colorOfElement.value;

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

		var el = new element (textOfElement.value, nameOfElement.value, colorOfElement.value, placeHolder.value, marginTop.value, marginBottom.value, marginLeft.value, marginRight.value, paddingTop.value, paddingBottom.value, paddingLeft.value, paddingRight.value, widthOfElement.value, heightOfElement.value);
		Elements.push(el);
	} else if(option == 2) {
		e = TARGETED_ELEMENT;
		var s = window.getComputedStyle(e);

		textOfElement.value = e.innerHTML;

		nameOfElement.value = e.value;

		colorOfElement.value = s.color;

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
	} else if(option == 3) {
	/*	if(e.innerHTML != textOfElement.value || e.value != nameOfElement.value || e.style.color != colorOfElement.value || e.placeHolder != placeHolder.value ||
			 e.style.marginTop != marginTop.value || e.style.marginBottom != marginBottom.value || e.style.marginLeft != marginLeft.value || e.style.marginRight != marginRight.value ||
			 e.style.paddingLeft != paddingLeft.value || e.style.paddingRight != paddingRight.value || e.style.paddingTop != paddingTop.value || e.style.paddingBottom != paddingBottom.value ||
			 e.style.width != widthOfElement.value || e.style.height != heightOfElement.value) {

			 }*/
		temp = Elements.pop();

	}	else {
		console.log("Error in checkMe(); function ... arg != <0;2>");
	}
}



$(window).load(function () {
		function ajaxCall(adress) {
			$.ajax({ url: adress,success: function(data) {
				var page = document.getElementById("toFetchFormFromOtherPage");
				page.innerHTML = data;
				var formGenerator = document.getElementById('formGenerator');
				var outerForm = document.getElementsByTagName("form")[0];
				formGenerator.innerHTML  = outerForm.innerHTML;
				var attachFunctionToChildrens = function(e) {
					for(var i=0; i<e.length; i++) {
				    	if(e[i].children.length == 0) {
					         e[i].onclick = function () { checkMe(this,0); };
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
		$("#goToURL").click(function(){
			adress = $("#pageToModify").val();
			ajaxCall(adress);
		});
});
var addToGenerator = function(e) {
	var generator = document.getElementById("formGenerator");
	if(e == 1) {
		var formElement = document.createElement("input");
		formElement.setAttribute('type','submit');
		formElement.setAttribute('value','nazwa przycisku');
		formElement.onclick = function () { checkMe(this,0); }
		generator.appendChild(formElement);
	} else if(e == 2) {
		var formElement = document.createElement("input");
		formElement.setAttribute('type','text');
		formElement.setAttribute('placeholder','pole zachecajace...');
		formElement.onclick = function () { checkMe(this,0); }
		generator.appendChild(formElement);
	} else if(e == 3) {
		var formElement = document.createElement("br");
		generator.appendChild(formElement);
	} else {
		console.log("Error in addToGenerator(); function ... arg != <1;3>");
	}

}
