var data= [],
	text = document.getElementById("text"),
	insert = document.getElementById("insert"),
	patter = /[a-zA-Z0-9\u4e00-\u9fa5]/,
	ul = document.getElementById("ul"),
	find = document.getElementById("find"),
	find_value = document.getElementById("find_value"),
	str = "";

	
window.onload = function(){
	insert.addEventListener("click",function(){
		var value = text.value,
			t = "";
			str = "";
		for(var i = 0; i < value.length; i++){
			if(patter.test(value[i]) === true){
				t += value[i];
				if(i == value.length - 1){
					data.push(t);
					t =""
				}
			}else if(t.length !== 0){
				data.push(t);
				t = "";
			}
		}
		for(i = 0; i < data.length; i++){
			str += "<li>" + data[i] + "</li>";
		}
		ul.innerHTML = str;
	})
	find.addEventListener("click",function(){
		str = "";
		var query = [];
		//console.log(find_value.value);
		data.forEach(function(item, index, array){
			var pos = [];
			var x = item.indexOf(find_value.value);
			while(x > -1){
				pos.push(x);
				query.push(x);
				x = item.indexOf(find_value.value, x + 1);
			}
			console.log(pos);
			str += "<li>" + item.slice(0,pos[0]);
			for(var i = 0; i < pos.length; i++){

				str += "<span>"+find_value.value+"</span>";
				if(i < pos.length - 1)
				str +=item.slice((pos[i]+find_value.value.length), pos[i+1])
				if(i == pos.length -1)
				str += item.slice(pos[i]+find_value.value.length);
			}
			str += "</li>"
			/*if(pos.length == 0){
				str += "<li>" + item + "</li>";
			}else{
				str += "<li>" + item.slice(0,x) + "<span>" + item.substr(x,find_value.value.length) + "</span>" +item.substr(x+find_value.value.length)+"</li>";
			}*//*else if(x == 0){
				str += "<li><span>" +item.substr(0,find_value.value.length) + "</span>"+item.substr(x+find_value.value.length) + "</li>";
			}*/
		});
		if(query.length === 0){
			alert("未找到!");
			return;
		}
		ul.innerHTML = str;
	})

}	
