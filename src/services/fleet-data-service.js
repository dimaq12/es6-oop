import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-error.js';

export class FleetDataService{

	constructor(){
		this.cars = [];
		this.drones = [];
		this.errors = [];
	}
	
	loadData(fleet){
		for (let data of fleet) {
			switch(data.type){
				case 'car':
					if(this.validateCarData(data)){
						let car = this.loadCar(data);
						if(car)
							this.cars.push(car);
					} else {
						let e = new DataError('Invalid Car Data', data);
						this.errors.push(e);
					}
					break;
				case 'drone':
					if(this.validateDroneData(data)){
						let drone = this.loadDrone(data);
						if(drone)
							this.drones.push(drone);
					} else {
						let e = new DataError('Invalid Car Data', data);
						this.errors.push(e);
					}
					break;
				default: 
					let e  = new DataError('Invalid Vehicle Type', data);
					this.errors.push(e);
					break;
			}
		}
	}

	getCarByLicense(license){
		return this.cars.find(function(car){
			return car.license === license;
		})
	}

	getCarsSortByLicense(){
		return this.cars.sort(function(car1, car2){
			if(car1.license < car2.license){
				return -1;
			} else if(car1.license > car2.license){
				return 1;
			} else {
				return 0;
			}
		})
	}

	filterCarsByMake(filter){
		// its work but in some cases can be couse of errors
		//return this.cars.filter(car => !car.make.indexOf(filter));
		return this.cars.filter(car => !car.make.indexOf(filter) >= 0);
	}

	loadCar(car){
		try {
			let c  = new Car(car.license, car.model, car.latLong)
			c.miles = car.miles;
			c.make = car.make;
			return c;
		} catch(e) {
			this.errors.push(new DataError('Error Loading Car', car));
		}
		return null;
	}

	loadDrone(drone){
		try {
			let d  = new Drone(drone.license, drone.model, drone.latLong)
			d.airTimeHours = drone.airTimeHours;
			d.base = drone.base;
			return d;
		} catch(e){
			this.errors.push(new DataError('Error Loading Drone', drone));
		}
		return null;
	}

	validateCarData(car){
		let requiredProps = 'license model latLong miles make'.split(' ');
		let hasError = false;
		for (let field of requiredProps) {
			if(!car[field]){
				this.errors.push(new DataError(`Invalid Field ${field}`, car));
				hasError = true;
			}
		}
		if (Number.isNaN(Number.parseFloat(car.miles))){
			this.errors.push(new DataError('Invalid mileage', car));
			hasError = true;
		}
		return !hasError;
	}

	validateDroneData(drone){
		let requiredProps = 'license model latLong airTimeHours base'.split(' ');
		let hasError = false;
		for (let field of requiredProps) {
			if(!drone[field]){
				this.errors.push(new DataError(`Invalid Field ${field}`, drone));
				hasError = true;
			}
		}
		if (Number.isNaN(Number.parseFloat(drone.airTimeHours))){
			this.errors.push(new DataError('Invalid mileage', drone));
			hasError = true;
		}
		return !hasError;
	}
}