$(document).ready(() => {

    // interactions
    $('.nav-link').on('mouseenter', (event) => {
        $(event.currentTarget).siblings().animate({width: "100%"},200)
    })
    $('.nav-link').on('mouseleave', (event) => {
        $(event.currentTarget).siblings().animate({ width: 0}, 200)
    })


    $('.btn').on('mouseenter', (event) => {
        $(event.currentTarget).animate({
            paddingTop: "+=0.1em",
            paddingBottom: "-=0.1em"
        }, 200)
    })
    $('.btn').on('mouseleave', (event) => {
        $(event.currentTarget).animate({
            paddingTop: "-=0.1em",
            paddingBottom: "+=0.1em"
        }, 200)
    })


    $('.card').on('mouseenter', (event) => {
        $(event.currentTarget).animate({ padding: "0.5em" }, 200)
    })
    $('.card').on('mouseleave', (event) => {
        $(event.currentTarget).animate({padding: 0}, 200)
    })


    $('.reveal-panel').on('mouseenter', (event) => {
        $(event.currentTarget).find('.image-front').fadeOut(400)
        $(event.currentTarget).find('.image-back').fadeIn(400)
    })
    $('.reveal-panel').on('mouseleave', (event) => {
        $(event.currentTarget).find('.image-front').fadeIn(400)
        $(event.currentTarget).find('.image-back').fadeOut(400)
    })



    //order form

    const originalCalories = Number($('#calorie-amount').html())
    const originalPrice = Number($('#price-amount').html())

    const calorieUpdate = () => {
        const drinkSize = $('#drink-size').html()
        const milkType = $('#milk-type').html()
        const sugarAmount = $('#sugar-amount').html()
        
        let sizeFactor = 1
        switch (drinkSize) {
            case "Small":
                sizeFactor = 1
                break;
            case "Medium":
                sizeFactor = 1.5
                break;
            case "Large":
                sizeFactor = 2
                break;
            default:
                sizeFactor = 1
                break;
        }

        let milkCalories = 0
        switch (milkType) {
            case "No Milk":
                milkCalories = 0
                break;
            case "Skim Milk":
                milkCalories = 30
                break;
            case "Whole Milk":
                milkCalories = 50
                break;
            case "Oat Milk":
                milkCalories = 35
                break;
            case "Almond Milk":
                milkCalories = 40
                break;
            default:
                milkCalories = 0
                break;
        }

        let sugarCalories = 0
        switch (sugarAmount) {
            case "None":
                sugarCalories = 0
                break;
            case "1":
                sugarCalories = 40
                break;
            case "2":
                sugarCalories = 80
                break;
            case "3":
                sugarCalories = 120
                break;
            case "4":
                sugarCalories = 160
                break;
            default:
                sugarCalories = 0
                break;
        }

        document.getElementById("calorie-amount").innerHTML = sizeFactor * (originalCalories + milkCalories + sugarCalories) 

    }

    const priceUpdate = () => {

        const drinkSize = $('#drink-size').html()

        let sizeChange = 0
        switch (drinkSize) {
            case "Small":
                sizeChange = -1
                break;
            case "Medium":
                sizeChange = 0
                break;
            case "Large":
                sizeChange = 1
                break;
            default:
                sizeChange = 0
                break;
        }

        document.getElementById("price-amount").innerHTML = originalPrice + sizeChange

    }

    const addToOrder =  () => {
        let order = sessionStorage.getItem("order")
        const orderString = `${$('#item-name').html()},${$('#drink-size').html()},${$('#milk-type').html()},${$('#sugar-amount').html()},${$('#warm-amount').html()}`
        console.log(orderString)
        if (sessionStorage === null) {
            order = orderString
        } else {
            order = order + ";" + orderStringe
        }
        console.log(order)
        sessionStorage.setItem("order", order)
    }
    $('#checkout-button').on('click', addToOrder)
    $('#size-dropdown').on('change', () => {
        document.getElementById("drink-size").innerHTML = document.getElementById("size-dropdown").value
    })
        .on('change', calorieUpdate)
        .on('change', priceUpdate)

    $('#milk-dropdown').on('change', () => {
        document.getElementById("milk-type").innerHTML = document.getElementById("milk-dropdown").value
    })
        .on('change', calorieUpdate)

    $('#sugar-dropdown').on('change', () => {
        document.getElementById("sugar-amount").innerHTML = document.getElementById("sugar-dropdown").value
    })
        .on('change', calorieUpdate)

    $('#warm-dropdown').on('change', () => {
        document.getElementById("warm-amount").innerHTML = document.getElementById("warm-dropdown").value
    })

    //menu ajax


})