$(document).ready(function () {


    class Ship {
        constructor(name, crew, fuel, hull, speed, img) {
            this.name = name;
            this.crew = crew;
            this.fuel = fuel;
            this.fuelMax = fuel;
            this.hull = hull;
            this.hullMax = hull;
            this.speed = speed;
            this.credits = 500
            this.img = `<img src="${img}"`
            this.isWorking = false;
            this.isDamaged = false;
            this.isDestroyed = false;
            this.dockedPlanet = null;
        }

        start(planet) {
            if (planet instanceof Planet) {
                if (planet.shipsDocked.includes(this)) {
                    console.log("Can't go to a planet that a ship is docked on")
                } else {
                    if (this.isDamaged === true || this.isDestroyed === true || this.crew < 1 ||this.fuel <= this.fuel - (planet.distance * 20)) {
                        console.log("Can't start")

                    } else {
                        let that = this
                        window.setTimeout(function () {
                            console.log("The ship should get to the planet")
                            setTimeout(() => that.dock(planet), 2000)
                        }, planet.distance * 1000 / that.speed)
                        that.isWorking = true;
                    }


                }
                return
            }
            throw new Error("Incorrect Planet")



        }
        dock(planet) {
            this.isWorking = false;
            planet.shipsDocked.push(this);

            this.dockedPlanet = planet;
            console.log("Ship is docked")
        }

    }







    class Planet {
        constructor(name, size, population, distance, development) {
            this.name = name;
            this.size = size;
            this.population = population;
            this.distance = distance;
            this.shipsDocked = [];
            if (development > 0 && development < 4) {
                this.development = development;
            }
        }



        getMarketPrice(price) {
            return this.development * price - Math.floor(this.population / this.size)
        }

        repair(ship) {
            if (ship instanceof Ship) {
                for (let i = 0; i < this.shipsDocked.length; i++) {
                    if (ship.name === this.shipsDocked[i].name) {
                        if (ship.credits >= this.getMarketPrice(ship.credits)) {
                            ship.credits -= this.getMarketPrice(ship.credits)
                            ship.hull = ship.hullMax
                            console.log("Repaired")

                        } else {
                            ship.isDamaged = true;
                        }

                    }
                    console.log(`${ship} is not docked on this planet, you can't repair it`)
                }

                if (ship.hull === ship.hullMax) {
                    console.log("Hull is max strength you can't repair it")
                }
            }
            console.log("Can't repair it!")
        }

        refuel(ship) {

        }

        hireCrewMember() {

        }
    }


    let planets = [
        new Planet("Rubicon9", 300000, 2000000, 4, 2, "img/Rubicon9.png"),
        new Planet("R7", 120000, 4000000, 7, 3, "img/R7.png"),
        new Planet("Magmus", 500000, 10000000, 6, 1, "img/Magmus.png"),
        new Planet("Dextriaey", 50000, 500000, 9, 3, "img/Dextriaey.png"),
        new Planet("B18-1", 250000, 4000000, 12, 2, "img/B18-1.png")
    ]

    let ships = [
        new Ship("StarFighter", 3, 380, 500, 0.5, "img/StarFighter.png"),
        new Ship("Crushinator", 5, 540, 400, 0.2, "img/Crushinator.png"),
        new Ship("Scouter", 1, 300, 300, 0.9, "img/Scouter.png")
    ]
    console.log(ships)
    console.log(planets)
    console.log(planets[0])

    ships[0].start(planets[0])

})






$(document).ready(function () {
//     class Planet {
//         constructor(name, size, population, distance, development, img) {
//             this.name = name;
//             this.size = size;
//             this.population = population;
//             this.distance = distance;
//             this.shipsDocked = [];
//             if (development > 0 && development < 4) this.development = development;
//             this.img = img;
//         }
//         getMarketPrice(price) {
//             return this.development * price - Math.floor(this.population / this.size);
//         }
//         repair(shipInput) {
//             if (shipInput instanceof Ship) {
//                 for (let i = 0; i < this.shipsDocked.length; i++) {
//                     if (shipInput.name === this.shipsDocked[i].name) {
//                         if (shipInput.credits >= this.getMarketPrice(shipInput.credits)) {
//                             shipInput.credits -= this.getMarketPrice(shipInput.credits);
//                             shipInput.hull = shipInput.hullMax;
//                             console.log("repaired");
//                         } else {
//                             shipInput.isDamaged = true;
//                         }
//                         console.log("not enought credits");
//                     }
//                     console.log("you can't repair it shipInput is not on the planet");

//                     if (shipInput.hull === shipInput.hullMax) {
//                         console.log("Hull is max");
//                     }
//                 }
//             }
//             console.log("you can't repair it");
//         }
//         refuel() {

//         }
//     }
//     class Ship {
//         constructor(name, crew, fuel, hull, speed, img) {
//             this.name = name;
//             this.crew = crew;
//             this.fuel = fuel;
//             this.fuelMax = fuel;
//             this.hull = hull;
//             this.hullMax = hull;
//             this.speed = speed;
//             this.credits = 500;
//             this.img = img;
//             this.isWorking = false;
//             this.isDamaged = false;
//             this.isDestroyed = false;
//             this.dockedPlanet = null;
//         }
//         start(planet) {
//             if (planet instanceof Planet) {
//                 if (planet.shipsDocked.includes(this)) {
//                     console.log("Can't go to a planet that a ship is docked on");
//                     return;
//                 } else {
//                     if (this.isDamaged === true || this.isDestroyed === true || this.crew < 1 || this.fuel <= this.fuel - (planet.distance * 20)) {
//                         console.log("Can't start");
//                     } else {
//                         setTimeout(() => {
//                             console.log("The ship should get to the planet");
//                             setTimeout(() => {
//                                 this.dock(planet)
//                             }, 2000)
//                         }, planet.distance * 1000 / this.speed)
//                         this.isWorking = true
//                     }
//                 }
//                 return
//             }
//             throw new Error("Incorrect Planet");
//         }
//         dock(input) {
//             input.shipsDocked.push(this);
//             this.isWorking = false;
//             this.dockedPlanet = input;
//             console.log("Ship is docked")
//             console.log(input)
//         }
//     }

//     let info = {
//         price: {
//             fuel: 50,
//             repair: 60,
//             crew: 80
//         },
//         ships: [
//             new Ship("StarFighter", 3, 380, 500, 0.5, "img/StarFighter.png"),
//             new Ship("Crushinator", 5, 540, 400, 0.2, "img/Crushinator.png"),
//             new Ship("Scouter", 1, 300, 300, 0.9, "img/Scouter.png")
//         ],
//         planets: [
//             new Planet("Rubicon9", 300000, 2000000, 4, 2, "img/Rubicon9.png"),
//             new Planet("R7", 120000, 4000000, 7, 3, "img/R7.png"),
//             new Planet("Magmus", 500000, 10000000, 6, 1, "img/Magmus.png"),
//             new Planet("Dextriaey", 50000, 500000, 9, 3, "img/Dextriaey.png"),
//             new Planet("B18-1", 250000, 4000000, 12, 2, "img/B18-1.png")
//         ],
//     }

//     console.log(info.ships[0])
    
//     info.ships[0].start(info.planets[0]);
// })
