(function(HTMLElement){
	if(('dataset' in HTMLElement.prototype)) return;
	Object.defineProperty(HTMLElement.prototype, 'dataset', {
		get: function(){
			var ret = {};
			var attributes = this.attributes;
			for(var i=0,il=attributes.length; i<il; i++){
				var name = attributes[i].name;
				var _name = name.replace(/^data-/, '');
				if(name!==_name){
					_name = _name.replace(/-([\w])/g, function($0, $1){ return $1.toUpperCase(); });
					ret[_name] = attributes[i].value;
				}
			}
			return ret;
		}
	});
})(window.HTMLElement||window.Element);
