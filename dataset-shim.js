/* *
 * https://github.com/sfger/html5-dataset | Copyright sfger, water | http://kit.mit-license.org
 * */
(function(HTMLElement){
	if('dataset' in HTMLElement.prototype) return;
	var camelize = function(s){
		return s.replace(/-([a-zA-Z])/g, function($0, $1){
			return $1.toUpperCase();
		});
	};
	var ie8 = /MSIE 8/.test(navigator.userAgent);
	Object.defineProperty(HTMLElement.prototype, 'dataset', {
		get: function(){
			var ret = ie8 ? document.createElement('DOMStringMap') : {};
			var attributes = this.attributes;
			for(var i=0,il=attributes.length; i<il; i++){
				var name  = attributes[i].name;
				var _name = name.replace(/^data-/, '');
				if(name===_name) continue;
				Object.defineProperty(ret, camelize(_name), (function(dom, attr_name, attr_val){
					return {
						get: function(){
							return attr_val;
						},
						set: function(value){
							return dom.setAttribute(attr_name, value);
						}
					};
				})(this, name, attributes[i].value));
			}
			return ret;
		}
	});
})(window.HTMLElement||window.Element);
