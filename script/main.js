class element {
	constructor (e, t, n, c, p, mT, mL, mR, mB, pL, pT, pR, pB, w, h) {
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
	}
}

var Elements = [];
var undoCounter = 0;
var TARGETED_ELEMENT;
var Clicked = null;

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

	console.log(e);
	

	if(option == 0) { 	//odczyt
		$(Clicked).removeClass("active");
		Clicked = e;
		$(e).addClass("active");
		
		TARGETED_ELEMENT = e;
		console.log(e.style);
		var s = window.getComputedStyle(e);

		textOfElement.value = e.innerHTML;

		nameOfElement.value = e.value;

		colorOfElement.innerHTML = s.color;

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

		if(e !== Elements[undoCounter - 1]){
			var el = new element (e, e.innerHTML, e.value, e.style.color, e.placeHolder, e.style.marginTop, e.style.marginBottom, e.style.marginLeft, e.style.marginRight, e.style.paddingTop, e.style.paddingBottom, e.style.paddingLeft, e.style.paddingRight, e.style.width, e.style.height);
			Elements.push(el);
			undoCounter = undoCounter + 1;
		}

	} else if(option == 1) {	//zapis
		e = TARGETED_ELEMENT;
		j = document.getElementById("colorOfElement");

		e.innerHTML = textOfElement.value;

		e.value = nameOfElement.value;
		e.style.color = "#" + j.innerHTML;

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

		var el = new element (e, e.innerHTML, e.value, e.style.color, e.placeHolder, e.style.marginTop, e.style.marginBottom, e.style.marginLeft, e.style.marginRight, e.style.paddingTop, e.style.paddingBottom, e.style.paddingLeft, e.style.paddingRight, e.style.width, e.style.height);
		Elements.push(el);
		undoCounter = undoCounter + 1;

	} else if(option == 2) {	//reset
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
	} else if(option == 3) {	//cofnij
		if(undoCounter > 1)
			undoCounter = undoCounter - 1;
	  	tmp = Elements[undoCounter - 1];
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
		else if(option == 4){	// ponów
			if(Elements.length > undoCounter)
				undoCounter = undoCounter + 1;
		tmp = Elements[undoCounter - 1];
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
	else {
		console.log("Error in checkMe(); function ... arg != <0;4>");
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
				}

			});
		}
		$("#goToURL").click(function(){
			$('#loadPageFromURLScreen').addClass('hideSection');
			adress = $("#pageToModify").val();
			ajaxCall(adress);
		});
});
/*var addToGenerator = function(e) {
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

}*/
