
// Blueprint for a object (car)

//Parent class
class Car {

    constructor() {
        this.brand = "";
        this.model = "";
        this.year = 0;
    }


    // set method for setting properties of the car
    setCar(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // getting properties
    getCar() {
        return `Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`;
    }
}


// child class
class ElectricCar extends Car {
    constructor() {
        super();
        this.batteryCapacity = 0;
    }

    setElectricCar(brand, model, year, batteryCapacity) {
        super.setCar(brand, model, year);
        this.batteryCapacity = batteryCapacity;
    }

    getElectricCar() {
        return `${super.getCar()}, Battery Capacity: ${this.batteryCapacity} kWh`;
    }
}

//car 1
let myCar = new Car();

myCar.setCar("Toyota", "Corolla", 2020);

//car 2
let yourCar = new Car();

yourCar.setCar("Honda", "Civic", 2021);

console.log(myCar.getCar());
console.log(yourCar.getCar());

let electricCar = new ElectricCar();
electricCar.setElectricCar("BYD", "Dolphin", 2024, "60000kwh")

console.log(electricCar.getElectricCar())
