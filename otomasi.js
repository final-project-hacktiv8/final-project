let {Board, Proximity, Servo, Led} = require('johnny-five');
let board = new Board({ port: '/dev/ttyUSB0' })

const db = require('./firebase').db
const firebase = require('./firebase').app

board.on('ready', function () {
	const proximity = new Proximity({ controller: 'HCSR04', pin: 7 })
	const servo = new Servo({ pin: 3, startAt: 0 })
	const lamp = new Led(2)
	let centi = proximity.centimeters;
	let lapar = true;

  db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
    let { state, height, led } = querySnapshot.data()
    if (state) {
      if (height < 4) {
        console.log("makanan masih penuh")
      }
      else {
        lapar = true
        servo.to(90)
        db.collection('machines').doc('machine-1').update({
          log: firebase.firestore.FieldValue.arrayUnion(new Date())
        })
      }
    }
    else {
      lapar = false
      servo.to(0)
    }

    if (led == 1) {
      lamp.on()
    }
    else {
      lamp.off()
    }
  })




	proximity.within([3,4], 'cm', () => {
		if(lapar){
			servo.to(0)
			lapar = false
			db.collection('machines').doc('machine-1').update({
				state: false
			})
		}
		const {centimeters, inches} = proximity;
		console.log(' cm :', centimeters)
	})
	

	setInterval(() => {
	  const {centimeters} = proximity
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
      if (centi > 13) {
        db.collection('machines').doc('machine-1').update({
          state: true
        })
      }
	}, 3000)

})


	// db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
	// 	if (querySnapshot.data().state == true) {
	// 		if (Math.ceil(proximity.centimeters) < 4) {
	// 			console.log('masih penuh')
  //     } 
  //     else { 
	// 			console.log('pintu terbuka')
	// 			lapar = true
	// 			servo.to(90)
	// 		}
  //   } 
  //   else if (querySnapshot.data().state == false ) {
  //     console.log('pintu tertutup')
  //     lapar = false
	// 		servo.to(0)
	// 	}
	// 	if (querySnapshot.data().led == 1) {
	// 		console.log('lampu menyala')
	// 		led.on()
	// 	}
	// 	else if (querySnapshot.data().led == 0) {
	// 		console.log('lampu mati')
	// 		led.off()
  //   }
	// })