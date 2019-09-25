let {Board, Proximity, Servo, Leds, Thermometer} = require('johnny-five');
let board = new Board({ port: '/dev/ttyUSB0' })

const db = require('./firebase').db
const firebase = require('./firebase').app

board.on('ready', function () {
	const proximity = new Proximity({ controller: 'HCSR04', pin: 7 })
	const servo = new Servo({ pin: 3, startAt: 0 })
  const lamp = new Leds([2,8])
  const thermometer = new Thermometer({
    controller: "LM35",
    pin: "A5"
  })
  let centi = proximity.centimeters;
  let suhu = thermometer.celsius
  let lapar = true;
  let logging = false;

  db.collection('machines').doc('machine-1').onSnapshot(querySnapshot => {
    let { state, height, led } = querySnapshot.data()
    if (state) {
      if (height < 4) {
        console.log("makanan masih penuh")
      }
      else {
        lapar = true
        servo.to(40)
        if(logging !== lapar){
          logging = !logging
          db.collection('machines').doc('machine-1').update({
            logs: firebase.firestore.FieldValue.arrayUnion(new Date())
          })
        }
      }
    }
    else {
      lapar = false
      logging = false
      servo.to(0)
    }

    if (led == 1) {
      lamp.on()
    }
    else {
      lamp.off()
    }
  })


	proximity.within([3,6], 'cm', () => {
		if(lapar){
      lapar = false
      console.log("masuk")
			db.collection('machines').doc('machine-1').update({
				state: false
			})
		}
		const {centimeters, inches} = proximity;
		console.log(' cm :', centimeters)
	})
	

	setInterval(() => {
    const {centimeters} = proximity
    const {celsius} = thermometer
    console.log("celcius", celsius)
	  	if (Math.ceil(centimeters) !== centi) {
	  		console.log("kirim", centi, Math.ceil(centimeters), "ini")
        centi = Math.ceil(centimeters)
	  		db.collection('machines').doc('machine-1').update({
          height: centi
	  		})
	  	}
	  	else {
	  		console.log('masih stabil', Math.ceil(centimeters))
      }
      if (celsius !== suhu) {
        console.log("kirim", suhu, celsius, "suhu")
        suhu = celsius
        db.collection('machines').doc('machine-1').update({
          temperature: celsius
	  		})
      }
      else {
        console.log("suhu stabil", celsius)
      }
      if (centi > 25) {
        db.collection('machines').doc('machine-1').update({
          state: true
        })
      }
	}, 3000)

})