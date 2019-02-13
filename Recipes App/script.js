$(document).ready(function () {

    class Ingredient {
        constructor(name, type, calories, amount) {
            this.name = name;
            this.type = type;
            this.calories = calories;
            this.amount = amount;
            this.isVegeterian;
            this.isVegan;
            if (this._type === "meat") {
                this.isVegeterian = false
            } else {
                this.isVegeterian = true
            }
            if (this._type === "meat" || this._type === "dairy") {
                this.isVegan = false
            } else {
                this.isVegan = true
            }
        }
        fullCaloriesValue() {
            return this.calories * this.amount
        }

        get type() {
            return this._type
        }

        set type(ing) {
            if (ing === "meat" || ing === "dairy" || ing === "dairy" || ing === "fruit" || ing === "vegetable" || ing === "grain") {
                return this._type = ing

            } else {
                throw new Error("Error")
            }
        }




    }

    let arr = []

    let grav = []

    let sarma = []

    let cezarSalata = []

    function arrPushing(arr, a, b, c, d) {
        let result = new Ingredient(a, b, c, d)
        arr.push(result)
        console.log(arr)
    }

    arrPushing(arr, "Morkov", "vegetable", 20, 3)
    arrPushing(arr, "Cveklo", "vegetable", 30, 1)
    arrPushing(arr, "Telesko", "meat", 200, 1)
    arrPushing(arr, "Pilesko", "meat", 100, 1)
    arrPushing(grav, "Grav", "vegetable", 20, 3)
    arrPushing(sarma, "Meso, Oriz, Zelka", "meat", 20, 3)
    arrPushing(cezarSalata, "Zelka", "vegetable", 20,3)



    class Recipe {
        constructor(name, description, timeToCook, img, ingredients) {
            this.name = name;
            this.description = description;
            this.ingredients = ingredients
            this.timeToCook = timeToCook;
            this.img = `<img src="${img}" width="250">`
            this.isVegeterian;
            this.isVegan;
            for (let i = 0; i < this.ingredients.length; i++) {
                if (ingredients[i].type === "meat") {
                    this.isVegeterian = false;
                } else {
                    this.isVegeterian = true;
                }
            }

            for (let i = 0; i < this.ingredients.length; i++) {
                if (ingredients[i].type === "meat" || ingredients[i]._type === "dairy") {
                    this.isVegan = false;
                } else {
                    this.isVegan = true;
                }
            }
        }

        fullCaloriesValue() {
            return this.ingredients.reduce((sum, el) => sum += el.fullCaloriesValue(), 0)
        }

        printIngridients() {
            return this.ingredients.map(el => `${el.amount} x ${el.name} (${this.fullCaloriesValue()})`)

        }

        static printRecipe(recipeObj) {
            let results = `
            ${recipeObj.img}
            <h2>${recipeObj.name}</h2>
            <p>${recipeObj.description}<p>
            <p>${recipeObj.timeToCook}<p>
            <p>${recipeObj.fullCaloriesValue()}<p>
            <p>${recipeObj.printIngridients()}<p>
            <p>${recipeObj.isVegeterian}<p>
            <p>${recipeObj.isVegan}<p>
            `
            $("#recipes").append(results)
        }
    }


    let x = new Recipe("Pilesko Kari", "blabla", 3, "https://hips.hearstapps.com/delish/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg", arr)
    console.log(x.fullCaloriesValue())

    let y = new Recipe("Grav", "Desc", 5, "https://www.thespruceeats.com/thmb/xRxPbgV5L1MvSPDqotFIEwMgthI=/3000x2002/filters:no_upscale():max_bytes(150000):strip_icc()/baked-beans-bacon-102016-57f8f1185f9b586c357602bb.jpg", grav)

    let z = new Recipe("Sarma", "Desc", 3, "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/Sarma-or-Cabbage-Rolls.jpg?itok=sP_b9DX-", sarma)

    let c = new Recipe("Cezar Salata", "Desc" ,3, "https://www.seriouseats.com/recipes/images/2016/04/20131009-caesar-salad-food-lab-11-Edit-1500x1125.jpg", cezarSalata)

    // x.printIngridients()

    // Recipe.printRecipe(x)
    // Recipe.printRecipe(y)

    function printToHtml(input) {

        Recipe.printRecipe(input)
    }

    // printToHtml(x)

    let finalArray = []

    finalArray.push(x)
    finalArray.push(y)
    finalArray.push(z)
    finalArray.push(c)

    console.log(finalArray)

    $("#vegan").on("click", function () {
        $("#recipes").children().remove()
        for (let i = 0; i < finalArray.length; i++) {
            if (finalArray[i].isVegan === true) {
                printToHtml(finalArray[i])
            }
        }
    })

    $("#vegeterien").on("click", function () {
        $("#recipes").children().remove()
        for (let i = 0; i < finalArray.length; i++) {
            if (finalArray[i].isVegeterian === true) {
                printToHtml(finalArray[i])
            }
        }
    })

    $("#allRecipes").on("click", function () {
        $("#recipes").children().remove()
        for (let i = 0; i < finalArray.length; i++) {
            printToHtml(finalArray[i])
        }
    })




    // function checkIf(recipe){
    //     if(recipe.){}
    // }

    // 

})
