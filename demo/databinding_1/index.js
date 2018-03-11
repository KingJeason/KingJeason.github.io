function Observer(data) {
	this.data = data;
	this.walk(data)
}
var data = {
	user: {
		name: "KingJeason",
		age: "21"
	},
	address: {
		city: "ZhengZhou"
	}
};
Observer.prototype = {
	constructor: Observer,
	walk: function(Obj) {
		var val;
		for (var key in Obj) {
			val = Obj[key];
			if (typeof val == "object") {
				new Observer(val);
			}
			this.convert(key, val);
		}
	},
	convert: function(key, val) {
		var that = this;
		Object.defineProperty(this.data, key, {
			enumerable: true,
			configurable: true,
			get: function() {
				console.log('你访问了' + key);
				return val
			},
			set: function(newVal) {
				/*if (typeof newVal == "object") {
					// console.log(key);
					// console.log(that.data[key])
					Object.assign(that.data[key], newVal);
					console.log(that.data, 'fffs');
					that.walk(that.data);
					return;
				}*/
				console.log('你设置了' + key);
				console.log('新的' + key + ' = ' + newVal)
				if (newVal === val) return;
				val = newVal
			}
		})
	}
}
var app = new Observer(data);
console.log(app);