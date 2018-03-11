var Event = (function() {
	var clientList = {

		},
		listen,
		trigger,
		remove;
	listen = function(key, fn) {
		if (!clientList[key]) {
			clientList[key] = [];
		}
		clientList[key].push(fn);
	};
	trigger = function() {
		var key = Array.prototype.shift.call(arguments),
			fns = clientList[key];
		if (!fns || fns.length === 0) {
			return false;
		}
		for (var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	};
	remove = function(key, fn) {
		var fns = clientList[key];
		if (!fns) {
			return false;
		}
		if (!fn) {
			fns && (fns.length = 0);
		} else {
			for (var l = fns.length - 1; l >= 0; l--) {
				var _fn = fns[l];
				if (_fn === fn) {
					fns.splice(l, 1);
				}
			}
		}
	};
	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	}
})();
Event.listen('age', function(age) {
	console.log("我的年纪变了，现在已经是" + age + "岁了");
})

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
		//console.log("key==",key,"val==",val);
		var that = this;
		//console.log(this.data);
		Object.defineProperty(this.data, key, {
			enumerable: true,
			configurable: true,
			get: function() {
				console.log('你访问了' + key);
				return val
			},
			set: function(newVal) {
				if (typeof newVal == "object") {
					new Observer(newVal);
				}
				if(key == "age"){
					Event.trigger("age",newVal);
				}
				console.log('你设置了' + key);
				console.log('新的' + key + ' = ' + newVal)
				if (newVal === val) return;
				val = newVal
			}
		})
	}
}
var app = new Observer(data);
//console.log(app.data.user);