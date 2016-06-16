(function(HTMLElement){
	if('dataset' in HTMLElement.prototype) return;
	var camelize = function(s){
		return s.replace(/-([a-zA-Z])/g, function($0, $1){
			return $1.toUpperCase();
		});
	};
	var ie8 = /MSIE 8/.test(navigator.userAgent);
	var descriptor = {
		get: function(){
			var ret = ie8 ? document.createElement('DOMStringMap') : {};
			var attributes = this.attributes;
			for(var i=0,il=attributes.length; i<il; i++){
				var name = attributes[i].name;
				var _name = name.replace(/^data-/, '');
				if(name===_name) continue;
				var dataset_item_descriptor = (function(dom, dom_attr_name, dataset_item_val){
					return {
						get: function(){
							return dataset_item_val;
						},
						set: function(value){
							return dom.setAttribute(dom_attr_name, value);
						}
					};
				})(this, name, attributes[i].value);
				Object.defineProperty(ret, camelize(_name), dataset_item_descriptor);
			}
			return ret;
		}
	};
	Object.defineProperty(HTMLElement.prototype, 'dataset', descriptor);
})(window.HTMLElement||window.Element);
