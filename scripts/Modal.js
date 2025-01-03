function Modal(e_content, options = {}){

	let {offset_close, btn_close, no_container} = options;

	let e_btn_close = new _$('label', 'x', {class: 'modal-close'});

	let html = `<div class="modal"><div class="modal-container">$0 ${btn_close? '$1': ''}</div></div>`;

	if(no_container)
		html = `<div class="modal">$0 ${btn_close? '$1': ''}</div>`

	let target = rawHtml(html, e_content, e_btn_close)[0];

	function show(){
		target.style.display = '';
	}

	function hide(){
		target.style.display = 'none';
	}

	e_btn_close.onclick = hide;

	if(offset_close)
		target.onclick = function(e){
			if(e.target == target)
				hide();
		}

	return {target, show, hide};

}

document.write(`
<style type="text/css">
	.modal{
		background: #00000014;
		position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    z-index: 999;
	}
	.modal-container{
		background: #fff;
		position: relative;
		border: solid black;
	    border-color: black;
	    border-width: 3px 3px 5px 5px;
	    border-radius: 4% 95% 6% 95% / 95% 4% 92% 5%;
	    transform: rotate(-2deg);
	}
	.group-control{
			display: flex;
		    flex-direction: column;
		    margin-bottom: 8px;
		}
	.btn, input{
		outline: none;
		display: inline-block;
		padding: 4px 8px;
	    border: 1px solid;
	    border-radius: 4px;
	    cursor: pointer;
	    transition: background .3s;
	    background: #fff;
	    color: var(--tn-primary) !important;
	}
	.popup{
		position: absolute;
	    top: 50%;
	    left: 50%;
	    width: auto;
	    height: auto;
	    transform: translate(-50%, -50%);
	    height: auto;
	}
	.popup-head{
		border-bottom: 1px solid;
	}
	.popup_login{
		padding: 8px;
		margin: 0;
	}
	.tooltip{
		height: auto;
		top: 10px;
		background: unset;
	}
	.tooltip .error{
		background: #ffdee3;
		color: red;
	    padding: 6px 16px;
	    border: 1px solid;
	    font-weight: bold;
	    border-radius: 4px;
	}
	.tracnghiem-app{
		min-height: 300px;
		height: 100%;
		padding: 10px;
		position: relative;
		display: flex;
	}
	.popup-container{
		background: #fff;
	    padding: 8px;
	    text-align: center;
	}
	.popup-container .popup-foot{
		display: flex;
	    justify-content: space-between;
	}
	.modal-close{
		position: absolute;
	    right: 0;
	    top: 0;
	    color: #fff;
	    background: red;
	    padding: 1px 10px;
	    cursor: pointer;
	    font-size: 1.2em;
	    font-weight: bold;
	}
	.loader {
	  display: inline-block;
	  color: #80DEEA;
	  font-size: 10px;
	  width: 1em;
	  height: 1em;
	  border-radius: 50%;
	  position: relative;
	  text-indent: -9999em;
	  animation: mulShdSpin 1.3s infinite linear;
	  transform: translateZ(0);
	}

	@keyframes mulShdSpin {
	  0%,
	  100% {
	    box-shadow: 0 -3em 0 0.2em, 
	    2em -2em 0 0em, 3em 0 0 -1em, 
	    2em 2em 0 -1em, 0 3em 0 -1em, 
	    -2em 2em 0 -1em, -3em 0 0 -1em, 
	    -2em -2em 0 0;
	  }
	  12.5% {
	    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 
	    3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, 
	    -2em 2em 0 -1em, -3em 0 0 -1em, 
	    -2em -2em 0 -1em;
	  }
	  25% {
	    box-shadow: 0 -3em 0 -0.5em, 
	    2em -2em 0 0, 3em 0 0 0.2em, 
	    2em 2em 0 0, 0 3em 0 -1em, 
	    -2em 2em 0 -1em, -3em 0 0 -1em, 
	    -2em -2em 0 -1em;
	  }
	  37.5% {
	    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
	     3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, 
	     -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
	  }
	  50% {
	    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
	     3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, 
	     -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
	  }
	  62.5% {
	    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
	     3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, 
	     -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
	  }
	  75% {
	    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 
	    3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
	    -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
	  }
	  87.5% {
	    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 
	    3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, 
	    -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
	  }
	}
  
</style>

`);