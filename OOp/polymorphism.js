class Animal {
    speak() {
        console.log("Animal is speaking");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog is barking");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Cat is meowing");
    }
}

let myDog = new Dog();
let myCat = new Cat();

myDog.speak(); // Output: Dog is barking
myCat.speak(); // Output: Cat is meowing

