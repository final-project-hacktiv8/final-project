let {Board, Proximity, Servo, Led} = require('johnny-five');
// let Raspi = require('raspi-io').RaspiIO;
let board = new Board({ port: '/dev/ttyUSB0' })

const db = require('./firebase')


board.on('ready', function () {
	const proximity = new Proximity({ controller: 'HCSR04', pin: 7 })
	const servo = new Servo({ pin: 3, startAt: 0 })
	const led = new Led(2)
	let centi = proximity.centimeters;
	let lapar = true;

	db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
		if (querySnapshot.data().state == true) {
			if (Math.ceil(proximity.centimeters) < 4) {
				console.log('masih penuh')
      } 
      else { 
				console.log('pintu terbuka')
				lapar = true
				servo.to(90)
			}
    } 
    else if (querySnapshot.data().state == false ) {
			console.log('pintu tertutup')
			servo.to(0)
		}
		if (querySnapshot.data().led == 1) {
			console.log('lampu menyala')
			led.on()
		}
		else if (querySnapshot.data().led == 0) {
			console.log('lampu mati')
			led.off()
		}
		
	})

	

	proximity.within([4,5], 'cm', () => {
		if(lapar){
			servo.to(0)
			lapar = false
			db.collection('machines').doc('machine-1').update({
				state: false
			})
			
		}
		const {centimeters, inches} = proximity;
		console.log('Proximity: ')
		console.log(' cm :', centimeters)
		console.log('--------------')
		
	})
	

	setInterval(() => {
	  const {centimeters, inches} = proximity
	  	if (Math.ceil(centimeters) !== centi) {
	  		console.log("kirim", centi, Math.ceil(centimeters))
	  		centi = Math.ceil(centimeters)
	  		db.collection('machines').doc('machine-1').update({
	  			height: centi
	  		})
	  	}
	  	else {
	  		console.log('masih stabil', Math.ceil(centimeters))
	  	}
    
	  	if (centi > 12) {
	  		db.collection('machines').doc('machine-1').update({
	  			state: true
	  		})
	  		lapar = true;
	  	} 
		
	}, 3000)

})

