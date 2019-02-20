$(document).ready(() => {
    class Planet {
        constructor(name, size, population, distance, development, img) {
            this.name = name;
            this.size = size;
            this.population = population;
            this.distance = distance;
            this.shipsDocked = [];
            if (development > 0 && development < 4) this.development = development;
            this.img = img;
        }
        getMarketPrice(price) {
            return this.development * price - Math.floor(this.population / this.size);
        }
        repair(shipInput) {
            if (shipInput instanceof Ship) {
                if (this.shipsDocked.includes(shipInput)) {
                    if (shipInput.hull === shipInput.hullMax) {
                        console.log("hull is already at max, you can't repair it");
                        return;
                    }
                    if (shipInput.credits >= this.getMarketPrice(info.price.repair)) {
                        console.log(`${shipInput.name} is repaired`);
                        shipInput.credits -= this.getMarketPrice(info.price.repair);
                        shipInput.hull = shipInput.hullMax;
                        shipInput.isDamaged = false;
                        return;
                    }
                    console.log(`${shipInput.name} has not enough credits, you can't repair it`);
                    return;
                }
                console.log(`${shipInput.name} is not docked on this planet, you can't repair it`);
                return;
            }
            console.log(`${shipInput.name} is not a ship, you can't repair it`);
        }
        refuel(shipInput) {
            if (shipInput instanceof Ship) {
                if (this.shipsDocked.includes(shipInput)) {
                    if (shipInput.fuel === shipInput.fuelMax) {
                        console.log(`Fuel is already at max capacity, you can't refuel it`);
                        return;
                    }
                    if (shipInput.credits >= this.getMarketPrice(info.price.fuel)) {
                        console.log(`${shipInput.name} is refueled`);
                        shipInput.fuel = shipInput.fuelMax;
                        shipInput.credits -= this.getMarketPrice(info.price.fuel);
                        return;
                    }
                    console.log(`${shipInput.name} has not enough credits, you can't refuel it`);
                    return;
                }
                console.log(`${shipInput.name} is not docked on this planet, you can't refuel it`);
                return;
            }
            console.log(`${shipInput.name} is not a ship, you can't refuel it`);
        }
        hireCrewMember(shipInput) {
            if (shipInput instanceof Ship) {
                if (this.shipsDocked.includes(shipInput)) {
                    if (shipInput.credits >= this.getMarketPrice(info.price.crew)) {
                        console.log(`${shipInput.name} hires a new crew member`);
                        shipInput.crew += 1;
                        shipInput.credits -= this.getMarketPrice(info.price.crew);
                        return;
                    }
                    console.log(`${shipInput.name} has not enough credits, you can't add a crew member`)
                    return;
                }
                console.log(`${shipInput.name} is not docked on this planet, you can't add a crew member`)
                return;
            }
            console.log(`${shipInput.name} is not a ship, you can't add a crew member`)
        }
    }
    class Ship {
        constructor(name, crew, fuel, hull, speed, img) {
            this.name = name;
            this.crew = crew;
            this.fuel = fuel;
            this.fuelMax = fuel;
            this.hull = hull;
            this.hullMax = hull;
            if (speed >= 0.1 && speed <= 1) this.speed = speed;
            this.credits = 500;
            this.img = img;
            this.isWorking = false;
            this.isDamaged = false;
            this.isDestroyed = false;
            this.dockedPlanet = null;
        }
        start(planet) {
            if (planet instanceof Planet) {
                if (planet.shipsDocked.includes(this)) {
                    console.log(`Can't go to ${planet.name} that a ${this.name} is docked on`);
                    return;
                }
                if (this.isDamaged === true || this.isDestroyed === true || this.crew < 1 || this.fuel <= planet.distance * 20) {
                    console.log("Can't start");
                    this.isWorking = true;
                    return;
                }
                console.log(`${this.name} is heading to ${planet.name}`)
                setTimeout(() => {
                    console.log(`${this.name} should get to ${planet.name}`);
                    if (this.dockedPlanet instanceof Planet) {
                        this.dockedPlanet.shipsDocked.pop();
                    }
                    this.fuel -= (planet.distance * 20);
                    setTimeout(() => {
                        this.dock(planet)
                        this.stats();
                    }, 2000)
                }, planet.distance * 1000 / this.speed)
                return
            }
            throw new Error("Incorrect Planet");
        }
        dock(planet) {
            this.dockedPlanet = null;
            planet.shipsDocked.push(this);
            this.isWorking = false;
            this.dockedPlanet = planet;
            console.log(`${this.name} is docking on a ${planet.name}`)
        }
        stats() {
            console.log("------- SHIP STATS -------");
            console.log(`CREW: ${this.crew}`);
            console.log(`FUEL: ${this.fuel}/${this.fuelMax}`);
            console.log(`HULL: ${this.hull}/${this.hullMax}`);
            console.log(`CREDITS: ${this.credits}`);
        }
    }



    


    let info = {
        price: {
            fuel: 50,
            repair: 60,
            crew: 80
        },
        ships: [
            new Ship("StarFighter", 3, 380, 500, 0.5, "img/StarFighter.png"),
            new Ship("Crushinator", 5, 540, 400, 0.2, "img/Crushinator.png"),
            new Ship("Scouter", 1, 300, 300, 0.9, "img/Scouter.png")
        ],
        planets: [
            new Planet("Rubicon9", 300000, 2000000, 4, 2, "img/Rubicon9.png"),
            new Planet("R7", 120000, 4000000, 7, 3, "img/R7.png"),
            new Planet("Magmus", 500000, 10000000, 6, 1, "img/Magmus.png"),
            new Planet("Dextriaey", 50000, 500000, 9, 3, "img/Dextriaey.png"),
            new Planet("B18-1", 250000, 4000000, 12, 2, "img/B18-1.png")
        ],
    }



    $("#planets").hide()
    let selectedShip;
    let planet;



    let functionsObject = {
        startShip: (ship, planet) => {
            ship.start(planet)
        },
        repairShip: (ship, planet) => {
            planet.repair(ship)
        },
        refuelShip: (ship, planet) => {
            planet.refuel(ship)
        },
        hireCrewMemberShip: (ship, planet) => {
            planet.hireCrewMember(ship)
        },
    }

    $(".btn").on("click", (e) => {
        let buttonsClicked = e.target.getAttribute("value");
        console.log(buttonsClicked)

        switch (buttonsClicked) {
            case "starFighter":
                selectedShip = info.ships[0]
                console.log(selectedShip)
                $("#planets").show()
                $("#ships").hide()
                break;
            case "crushinator":
                selectedShip = info.ships[1]
                console.log(selectedShip)
                $("#planets").show()
                $("#ships").hide()
                break;
            case "scouter":
                selectedShip = info.ships[2]
                console.log(selectedShip)
                $("#planets").show()
                $("#ships").hide()
                break;
            case "startRubicon9":
                planet = info.planets[0];
                functionsObject.startShip(selectedShip, planet)
                break;
            case "repairRubicon9":
                planet = info.planets[0];
                functionsObject.repairShip(selectedShip, planet)
                break;
            case "refuelRubicon9":
                planet = info.planets[0];
                functionsObject.refuelShip(selectedShip, planet)
                break;
            case "crewRubicon9":
                planet = info.planets[0];
                functionsObject.hireCrewMemberShip(selectedShip, planet)
                break;
            case "startR7":
                planet = info.planets[1];
                functionsObject.startShip(selectedShip, planet)
                break;

            case "repairR7":
                planet = info.planets[1];
                functionsObject.repairShip(selectedShip, planet)
                break;
            case "refuelR7":
                planet = info.planets[1];
                functionsObject.refuelShip(selectedShip, planet)
                break;
            case "crewR7":
                planet = info.planets[1];
                functionsObject.hireCrewMemberShip(selectedShip, planet)
                break;
            case "startMagmus":
                planet = info.planets[2];
                functionsObject.startShip(selectedShip, planet)
                break;

            case "repairMagmus":
                planet = info.planets[2];
                functionsObject.repairShip(selectedShip, planet)
                break;
            case "refuelMagmus":
                planet = info.planets[2];
                functionsObject.refuelShip(selectedShip, planet)
                break;
            case "crewMagmus":
                planet = info.planets[2];
                functionsObject.hireCrewMemberShip(selectedShip, planet)
                break;


            case "startDextriaey":
                planet = info.planets[3];
                functionsObject.startShip(selectedShip, planet)
                break;

            case "repairDextriaey":
                planet = info.planets[3];
                functionsObject.repairShip(selectedShip, planet)
                break;
            case "refuelDextriaey":
                planet = info.planets[3];
                functionsObject.refuelShip(selectedShip, planet)
                break;
            case "crewDextriaey":
                planet = info.planets[3];
                functionsObject.hireCrewMemberShip(selectedShip, planet)
                break;



            case "startB18-1":
                planet = info.planets[4];
                functionsObject.startShip(selectedShip, planet)
                break;

            case "repairB18-1":
                planet = info.planets[4];
                functionsObject.repairShip(selectedShip, planet)
                break;
            case "refuelB18-1":
                planet = info.planets[4];
                functionsObject.refuelShip(selectedShip, planet)
                break;
            case "crewB18-1":
                planet = info.planets[4];
                functionsObject.hireCrewMemberShip(selectedShip, planet)
                break;



        }



    })



    // let st = `Crew: ${info.ships[0].crew} Fuel: ${info.ships[0].fuel} Hull: ${info.ships[0].hull} Speed: ${info.ships[0].speed}`

    // document.getElementById("info").innerHTML+= st

    



})