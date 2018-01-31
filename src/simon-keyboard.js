
const levels = 15;
let keys = generateKeys(levels);

function nextLevel(currentLevel){
	if (currentLevel == levels){
		return swal({
			title: 'You won!',
			type: 'success'
		});
	}

	swal({
		title: `Level ${currentLevel + 1}`,
		timer: 2000,
		showConfirmButton: false
	});

	for (let i = 0; i <= currentLevel; i++){
		setTimeout(() => activate(keys[i]), 
			1000 * (i + 1) + 2000);
	}

	let i = 0;
	let currentKey = keys[i];
	window.addEventListener('keydown', onkeydown);

	function onkeydown(ev){
		if (ev.keyCode == currentKey){
			activate(currentKey, {success: true});
			i++;
			if(i > currentLevel){
				window.removeEventListener('keydown', onkeydown);
				setTimeout(()=> nextLevel(i), 1500);
			}
			currentKey = keys[i];
		} else {
			activate(ev.keyCode, {fail: true});
			window.removeEventListener('keydown', onkeydown);
			setTimeout(()=>{
				swal({
					title: 'You lose',
					text: 'Do you want to play again?',
					showCancelButton: true,
					confimButtontext: 'Yes',
					cancelButtonText: 'No',
					closeOnConfirm: true
				}, (ok)=>{
					if (ok){
						keys = generateKeys(levels);
						nextLevel(0);
					}
				} 
			)}, 1500);
		}
	}
}

nextLevel(0);

function generateKeys(levels){
	return new Array(levels).fill(0).map(generateRandomKey);
}

function generateRandomKey(){
	const min = 65;
	const max = 90;
	return Math.round(Math.random() * (max - min) + min);
}


function getElementByKeyCode(keyCode){
	return document.querySelector(`[data-key="${keyCode}"]`);		
}

function activate(keyCode, opts = {}){
	const el = getElementByKeyCode(keyCode);
	el.classList.add('active');
	if (opts.success){
		el.classList.add('success');
	} else if (opts.fail){
		el.classList.add('fail');
	}
	setTimeout(() => deactivate(el), 500);
}

function deactivate(el){
	el.className = 'key';
}