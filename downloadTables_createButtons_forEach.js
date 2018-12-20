
function changeToFloat(str){
	if(/\D/.test(str.replace(/\./g, '')) === false){
		return parseFloat(str);
	}else{
		return str;
	}
	
}
function jsonReadyHeader(str){
	return str.replace(/\t/g,'T4BC0D3ReplacerStrin8')
			.replace(/,/g, '')
			.replace(/\n/g, '')
			.replace(/\W+/g,'_')
			.replace(/^_|_$/g, '')
			.replace(/T4BC0D3ReplacerStrin8/g, '","');
}

function getTableTop(arr){
	return Array.from(arr).map(itm=>{		return JSON.parse('["'+jsonReadyHeader(itm.innerText)+'"]')	});	
}

function hover(){
	this.style.background = 'cadetblue';
	this.style.fontSize = '1.2em';
	this.style.transition = "all 366ms";
}
function out(){
	this.style.background = 'darkcyan';
	this.style.fontSize = '1em';
	this.style.transition = "all 366ms";
}


function downloadThisTable(){
	var namedCsv = this.getAttribute('id').replace(/\D+/g, '')+'_'+ window.location.href.replace(/http.+?(?=\w)/, '').replace(/\W+/g, '_')+'.csv';
	var thead = this.parentElement.getElementsByTagName('thead')[0];
	var tbod = thead.nextElementSibling;
	var arrayCont = getTableTop(thead.children);
	Array.from(tbod.children)
		.forEach(itm=>{
			var cleanText = changeToFloat(itm.innerText.replace(/,/g, '').replace(/"/g, ''));
			arrayCont.push(JSON.parse('["'+cleanText.replace(/\t/g, '","')+'"]'))
		});

 	var dl_output = arrayCont.map(itm=>{	return itm.toString().replace(/$/, '\r'); }).toString().replace(/\r,/g, '\r');

	var elmi = document.createElement('a');
    	elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dl_output));
    	elmi.setAttribute('download', namedCsv);
    	elmi.style.display = 'none';
    	document.body.appendChild(elmi);
    	elmi.click();
    	document.body.removeChild(elmi);
}

function downloadThisTbod(){
	var namedCsv = this.getAttribute('id').replace(/\D+/g, '')+'_'+ window.location.href.replace(/http.+?(?=\w)/, '').replace(/\W+/g, '_')+'.csv';

	var tbod = this.parentElement.getElementsByTagName('tbody')[0];
	var arrayCont = [];
	Array.from(tbod.children)
		.forEach(itm=>{
			var cleanText = changeToFloat(itm.innerText.replace(/,/g, '').replace(/"/g, ''));
			arrayCont.push(JSON.parse('["'+cleanText.replace(/\t/g, '","')+'"]'))
		});

 	var dl_output = arrayCont.map(itm=>{	return itm.toString().replace(/$/, '\r'); }).toString().replace(/\r,/g, '\r');

	var elmi = document.createElement('a');
    	elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dl_output));
    	elmi.setAttribute('download', namedCsv);
    	elmi.style.display = 'none';
    	document.body.appendChild(elmi);
    	elmi.click();
    	document.body.removeChild(elmi);
}

var theads = document.getElementsByTagName('thead');

for(i=0; i<theads.length; i++){
	theads[i].parentElement.setAttribute('id', 'dl_table_'+i);
	var tableDl_btn = document.createElement("button");
	document.getElementById('dl_table_'+i).insertBefore(tableDl_btn, theads[i]);
	tableDl_btn.setAttribute("id", "tableDl_btn_"+i);
	document.getElementById("tableDl_btn_"+i).innerText = "Download This Table";
	tableDl_btn.style.background = "darkcyan";
	tableDl_btn.style.border = "1px solid darkblue";
	tableDl_btn.style.width = "100%";
	tableDl_btn.style.height = "10%";
	tableDl_btn.style.borderRadius = "1em";
	tableDl_btn.style.fontSize = '1em';
	tableDl_btn.style.cursor = "pointer";
	tableDl_btn.style.color = "white";
	tableDl_btn.style.fontFamily = '"Courier New", monospace';
	document.getElementById("tableDl_btn_"+i).addEventListener("click", downloadThisTable);
	document.getElementById("tableDl_btn_"+i).addEventListener("mouseover", hover);
	document.getElementById("tableDl_btn_"+i).addEventListener("mouseout", out);
}

var tables = document.getElementsByTagName('table');

for(t=0; t<tables.length; t++){
	if(tables[t].getElementsByTagName('thead')[0] == undefined && tables[t].getElementsByTagName('tbody')[0] != undefined && tables[t].getElementsByTagName('tbody')[0].children.length >4){

		tables[t].getElementsByTagName('tbody')[0].setAttribute('id', 'dl_tbod_'+t);
		var tbodDl_btn = document.createElement("button");
		document.getElementById('dl_tbod_'+t).parentElement.insertBefore(tbodDl_btn, tables[t].firstElementChild);
		tbodDl_btn.setAttribute("id", "tbodDl_btn_"+t);
		document.getElementById("tbodDl_btn_"+t).innerText = "Download This Table";
		tbodDl_btn.style.background = "darkcyan";
		tbodDl_btn.style.border = "1px solid darkblue";
		tbodDl_btn.style.width = "100%";
		tbodDl_btn.style.height = "10%";
		tbodDl_btn.style.borderRadius = "1em";
		tbodDl_btn.style.fontSize = '1em';
		tbodDl_btn.style.cursor = "pointer";
		tbodDl_btn.style.color = "white";
		tbodDl_btn.style.fontFamily = '"Courier New", monospace';

		document.getElementById("tbodDl_btn_"+t).addEventListener("click", downloadThisTbod);
		document.getElementById("tbodDl_btn_"+t).addEventListener("mouseover", hover);
		document.getElementById("tbodDl_btn_"+t).addEventListener("mouseout", out);	
	}
}

