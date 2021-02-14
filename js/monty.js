let door_list = [];
let door_num;
let doors;

let door_specified_player = -1;
let door_specified_dealer = -1;
let win_door = -1;
let do_open_all = false;

let DOOR_KIND = {
    'CLOSE'  : 0,
	'LOSE'   : 1,
	'WIN'    : 2,
};

onload = function() {
    Object.freeze(DOOR_KIND);

	door_list = [
	    document.getElementById('close'),
	    document.getElementById('lose'),
	    document.getElementById('win'),
	];
};

let create_doors = function(num) {
	doors = Array(num);
	doors.fill(DOOR_KIND.LOSE);
	win_door = Math.floor(Math.random() * num);
	doors[win_door] = DOOR_KIND.WIN;
	//console.log(doors);
};

let display_and_open_door = function(door_num) {

	let b = document.getElementById("doors");

	while (b.firstChild) {
        b.removeChild(b.firstChild);
	}
	
	for (let i = 0; i < door_num; i++) {
		let d;

		if (door_specified_player == -1) {
			d = door_list[DOOR_KIND.CLOSE].cloneNode(true);	
		} else {
			if (do_open_all) {
				d = door_list[doors[i]].cloneNode(true);
			} else {
				if ((door_specified_player == i) || (door_specified_dealer == i)) {
					d = door_list[DOOR_KIND.CLOSE].cloneNode(true);	
				} else {
					d = door_list[doors[i]].cloneNode(true);
				}
			}
		}

		d.removeAttribute('id');
		d.style.width = d.naturalWidth * 0.5;
		d.style.height = d.naturalHeight * 0.5;

		b.appendChild(d);

		if ((door_specified_player == -1) || 
			(door_specified_player == i) ||
			(door_specified_dealer == i)) {

			(function() {
				var _number = i;
				var _door_num = door_num;
				d.onclick = function() {
					open_doors(_number, _door_num);
					display_and_open_door(door_num);
					do_open_all = true;
				};
			})(); 
		}
	}

	show_instruction_message();
};

let open_doors = function(number, door_num) {
	
	if (!do_open_all) {
		door_specified_player = number;
		if (door_specified_player == win_door) {
			door_specified_dealer = (win_door + 1) % door_num;
		} else {
			door_specified_dealer = win_door;
		}
	}
};

let show_instruction_message = function() {
    let b = document.getElementById("message");

	b.innerHTML = "<p>ドアを選んでクリックしてください</p>"
};

let initialize_game = function() {
	door_specified_player = -1;
	door_specified_dealer = -1;
	do_open_all = false;
};

let OnClickButton = function() {

	door_num = document.form1.choices.value;
	door_num = Number(door_num);

	initialize_game();

	create_doors(door_num);

	display_and_open_door(door_num);
};

