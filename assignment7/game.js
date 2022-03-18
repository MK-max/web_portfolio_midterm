window.onload = pageLoad;

function pageLoad(){
	var startbutton = document.getElementById("start");
	startbutton.onmousedown = startGame;

	var gameLayer = document.getElementById("game-layer");
	gameLayer.id = "squares-layer";

	var gameContainer = document.getElementById("game-container");
	gameContainer.id = "squares-container";
}

function startGame(){
	alert("Ready");
	addBox();
	timeStart();
}

function timeStart(){
	var TIMER_TICK = 1000;	//ทุกๆครั้งที่มีการนับเวลา(มิลิเซคคัล)
	var timer = null;	//เริ่มต้นเวลา
	var min = 0.2; // 0.5 minute
	var second = min*60; 

	var x = document.getElementById('clock');
	
	//setting timer using setInterval function
	timer = setInterval(timeCount,TIMER_TICK)
	x.innerHTML = second;
	
	function timeCount(){
		var allbox = document.querySelectorAll("#squares-layer div");
		second -= 1;
		x.innerHTML = second;
		if(second <= 0)
		{
			clearInterval(timer);	//รีเซ็ตเวลา
			clearScreen();	//
			alert("You Die")
		}
		if(second >= 0 && allbox.length === 0)
		{
			clearInterval(timer);
			alert("Heir of box destroyed")
		}
		// จัดการเกี่ยวกับเวลา เช่น ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ 
		// ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
		// ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
	}
}

function addBox(){
	// สร้างกล่องตาม input ที่เราใส่ 
	var numbox = document.getElementById("numbox").value;
	var gameLayer = document.getElementById("squares-layer");
	var colorDrop = document.getElementById("color").value;
	
	for (var i =0; i<numbox;i++){
		var tempbox = document.createElement("div"); //รับข้อมูลว่าคนใช้จะใช้กล่องเท่าไหร่ โดยผู้ใช้กรอกลง div เพื่อส่งให้ตัวแปร tempbox รับค่าจำนวนกล่องมา
		tempbox.className = "square" ;	//ชื่อกล่อง
		tempbox.id = "box"+i;
		tempbox.style.left = Math.random() * (500 - 25) + "px";
		tempbox.style.top = Math.random() * (500 - 25) + "px";
		//add element to HTML node
		tempbox.style.backgroundColor = colorDrop;
		gameLayer.appendChild(tempbox);
		bindBox(tempbox);
	}
}

function bindBox(box){
	//เมื่อกดแล้ว กล่องจะหายไป
	box.onclick = function(){
		box.parentNode.removeChild(box);
	}
}

function clearScreen(){
	// ทำการลบ node ของกล่องทั้งหมด ออกจาก หน้าจอ
	var allbox = document.querySelectorAll("#squares-layer div");

	//delete all  div
	for (var i=0;i<allbox.length;i++){
		allbox[i].parentNode.removeChild(allbox[i]);
	}
}



