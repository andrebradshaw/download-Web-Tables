function changeToFloat(str){
	if(/\D/.test(str.replace(/\./g, '')) === false){
		return parseFloat(str);
	}else{
		return str;
	}
	
}

function convertTable2Array() {
	sel = window.getSelection();
	if (sel.rangeCount && sel.getRangeAt) {
		range = sel.getRangeAt(0);
	}
	var arrayCont = Array.from(range.commonAncestorContainer.previousElementSibling.children)
.map(itm=>{
		return JSON.parse('["'+itm.innerText.replace(/,/g, '').replace(/\n/g, '').replace(/\t/g, '","')+'"]')
	});

	Array.from(range.commonAncestorContainer.children)
	.forEach(itm=>{
		var cleanText = changeToFloat(itm.innerText.replace(/,/g, ''));
		arrayCont.push(JSON.parse('["'+cleanText.replace(/\t/g, '","')+'"]'))
	});

	return arrayCont;
}

function converter(arr){

  var dl_output = arr.map(itm=>{	return itm.toString().replace(/$/, '\r'); }).toString().replace(/\r,/g, '\r');
  function dl(filename, text) {
    var elmi = document.createElement('a');
    elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    elmi.setAttribute('download', filename);
    elmi.style.display = 'none';
    document.body.appendChild(elmi);
    elmi.click();
    document.body.removeChild(elmi);
  }
  dl(window.location.href.replace(/http.+?(?=\w)/, '').replace(/\W+/g, '_')+'.csv', dl_output);

}
var dlData = convertTable2Array();
converter(dlData)
