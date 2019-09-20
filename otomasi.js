const {Board, Proximity, Servo} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;
const board = new Board({
	port: '/dev/ttyUSB0'
})
const db = require('./firebase')
let centi = 0

board.on('ready', () => {
	const proximity = new Proximity({
		controller: 'HCSR04',
		pin: 7
	})

	centi = proximity.centimeters;

	const servo = new Servo({
		pin: 3,
		startAt: 0
	})

	db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
		if (querySnapshot.data().state == true) {
			console.log('masuk')
			servo.to(90, 500)
		}
	})
	
	proximity.within([2,3], 'cm', () => {
		const {centimeters, inches} = proximity;
		console.log('Proximity: ')
    console.log(' cm :', centimeters)
    console.log('motor tertutup')
    console.log('--------------')
		servo.to(0)
		db.collection('machines').doc('machine-1').update({
			state: false
		})
	})
	
	
	setInterval(() => {
	const {centimeters, inches} = proximity
		if (Math.ceil(centimeters) !== centi) {
			console.log("kirim", centi, Math.ceil(centimeters))
			db.collection('machines').doc('machine-1').update({
				height: centi
			})
			centi = Math.ceil(centimeters)
		}
		else {
			console.log('tinggi masih sama')
		}
		
		if (centi > 10) {
			db.collection('machines').doc('machine-1').update({
				state: true
      })
      console.log('motor terbuka', centi)
		}
		
	}, 4000)

})

