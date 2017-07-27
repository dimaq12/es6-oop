// import $ from "jquery";


export class BaseElement{
	constructor(){
		this.element = null; //jQuery object
	}

	appendToElement(el){
		this.createElement();
		el.append(this.element);
		this.enableJs()
	}

	createElement(){
		let s  = this.getElementString();
		this.element = $(s);
	}

	getElementString(){
		throw 'Please overwrite getElementString in BaseElement';
	}

	enableJs(){
		console.log(this.element[0]);
		componentHandler.upgradeElement(this.element[0]);
	}
}