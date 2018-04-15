var input = document.getElementById('item');
var inputFeedbackInvalid = document.getElementById('inputFeebackInv');
var inputFeedbackValid = document.getElementById('inputFeebackVal');
var addButton = document.getElementById('addButton');
var table = document.getElementById('shoppingListTbl');
var captionTable = document.getElementById('captionTbl');

function inputLength(){
	return input.value.length;
}

function itemExist(itemText){
	var flagExist = 0;
	for (var i = 0, row; row = table.rows[i]; i++) {
		var auxText = row.firstChild.innerHTML.toString().toUpperCase();
		if (  itemText ==  auxText ){
			flagExist++;
		}
   	}  
   	return flagExist;
}


function setInputInvalid(){
	input.classList.add('is-invalid');
}

function setInputValid(){
	input.classList.add('is-valid');
}

function unsetInputInvalid(){
	if ( input.classList.contains('is-invalid') == true ){
		input.classList.remove('is-invalid');
	}
}

function unsetInputValid(){
	if ( input.classList.contains('is-valid') == true ){
		input.classList.remove('is-valid');
	}
}

function setInputFeedBack(element,feedback){
	element.innerHTML = feedback;
}

function createListElementTbl(){
	var itemText = input.value.toString().toUpperCase();
	if ( itemExist(itemText) > 0 ){
		setInputInvalid();
		setInputFeedBack(inputFeedbackInvalid,itemText +' is allready registered, try with another one :)');
	}else {
		unsetInputInvalid();
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var deleteButton = document.createElement('button');
		deleteButton.appendChild(document.createTextNode('Delete'));
		deleteButton.classList.add('btn','btn-outline-danger');
		cell1.appendChild(document.createTextNode(itemText));
		cell1.classList.add('item')
		row.classList.add('on');
		cell2.classList.add('text-right');
		cell2.appendChild(deleteButton);
		input.value = '';
		updateCaptionTbl();
   	}
}

function updateCaptionTbl(){
	var rows = table.getElementsByTagName("tr");
	var itemsDone = document.querySelectorAll('#shoppingListTbl .done').length;
	if ( rows.length > 1 ){
		unsetInputValid();
		captionTable.innerHTML = 'Done '+ itemsDone +' of ' + rows.length +' items';
	}else if ( rows.length == 1 ){
		unsetInputValid()
		captionTable.innerHTML = 'Done '+ itemsDone +' of ' + rows.length +' item';
	}else {
		unsetInputValid()
		captionTable.innerHTML = '';
	}
	if ( rows.length == itemsDone && rows.length > 0 ){
		setInputValid();
		setInputFeedBack(inputFeedbackValid,'Congrats!!! you finished ;)');
	}
}

function addListAfterClick(){
	if ( inputLength() > 0 ){
		unsetInputInvalid();
		createListElementTbl();
	}else {
		setInputInvalid();
		setInputFeedBack(inputFeedbackInvalid,'Enter one item that you want :)');
	}
}

function addListAfterKeypress(event){
	if ( inputLength() > 0 && event.keyCode == 13 ){
		unsetInputInvalid();
		createListElementTbl();
	}else if ( event.keyCode == 13 ) {
		setInputInvalid();
		setInputFeedBack(inputFeedbackInvalid,'Enter aleast one item that you want :)');
	}
}

function hasAnySibiling(node){
	return node.target.nextSibling;
}

function updateListAfterClickTbl(event){
	if ( event.target.parentNode.matches('tr.on') ){
		if ( hasAnySibiling(event) == null ){
			var btn = event.target.querySelector('button');
		}else {
			var btn = event.target.nextSibling.querySelector('button');
		}
		event.target.parentNode.classList.remove('on');
		event.target.parentNode.classList.add('done');
		btn.classList.remove('enabled');
		btn.classList.add('disabled');
		btn.setAttribute('disabled','disabled');
	}else if ( event.target.parentNode.matches('tr.done') ){
		if ( hasAnySibiling(event) == null ){
			var btn = event.target.querySelector('button');
		}else {
			var btn = event.target.nextSibling.querySelector('button');
		}
		event.target.parentNode.classList.remove('done');
		event.target.parentNode.classList.add('on');
		btn.classList.remove('disabled');
		btn.classList.add('enabled');
		btn.removeAttribute('disabled');
	}else if ( event.target.matches('button') ){
		event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
	}
	updateCaptionTbl();
}

addButton.addEventListener('click', addListAfterClick);
input.addEventListener('keypress', addListAfterKeypress);
table.addEventListener('click', updateListAfterClickTbl);
