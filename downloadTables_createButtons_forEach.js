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

var theads = document.getElementsByTagName('thead');

for(i=0; i<theads.length; i++){
	theads[i].parentElement.setAttribute('id', 'dl_table_'+i);
	var tableDl_btn = document.createElement("button");
	document.getElementById('dl_table_'+i).insertBefore(tableDl_btn, theads[i]);
	tableDl_btn.setAttribute("id", "tableDl_btn_"+i);
	document.getElementById("tableDl_btn_"+i).innerText = "download table";
	tableDl_btn.style.background = "Coral";
	tableDl_btn.style.border = "1px solid DarkOrange";
	tableDl_btn.style.width = "150%";
	tableDl_btn.style.height = "10%";
	tableDl_btn.style.borderRadius = "1em";
	tableDl_btn.style.cursor = "pointer";
	tableDl_btn.style.color = "white";
	tableDl_btn.style.fontFamily = '"Courier New", monospace';
	document.getElementById("tableDl_btn_"+i).addEventListener("click", downloadThisTable);
}

