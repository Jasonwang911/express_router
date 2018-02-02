var class2type();

'Boolean  Null  String  Function  Array  Date  RegExp  Object Error Undefined'.split(' ').map(function(item, index) {
	class2type['[object' + item + ']'] = item.toLowerCase();
	// ie6 中null和undefined 会被识别成object
});

function type(obj) {
	// null  undefined
	if (obj == null) {
		return obj + '';
	}

	return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
}

// 还需要适配 map  window   

function isFunction(obj) {
	return type(obj) === 'function';
}

function isArray(obj) {
	return type(obj) === 'array';
}


// 以下为封装代码 的起手函数
(function(root, factory) {
	root.$ = root.DN = factory();
})(this, function() {
	var DN = {};
	return DN;
});


// 以下开始封装
(function(root, factory) {
	root.$ = root.DN = factory();

})(this, function() {
	var DN = {};
	return DN;
});