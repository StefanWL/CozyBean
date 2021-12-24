﻿$(document).ready(() => {
    let order = sessionStorage.getItem("order") 

    if (order != null && (document.title === "Menu - CozyBean" || document.title === "Order - CozyBean")) {
        orderArray = order.split(";")
        var dot = document.createElement("SPAN")
        dot.innerHTML = `<h3>${orderArray.length-1}</h3>`
        dot.classList.add('shopping-dot')
        dot.classList.add('text-center')
        dot.classList.add('shopping-dropper')
        document.body.appendChild(dot)
    }

    // checkout

    if (document.title === "Checkout - CozyBean") {
        const orderArray = order.split(";")

        const orderContainer = document.getElementById("order-container")

        const priceSummary = document.getElementById("price-summary")

        let orderHTML = ""
        let priceHTML = ""
        let total = 0
        let orderQuery = ""

        for (i = 1; i < orderArray.length; i++) {
            const itemString = orderArray[i]
            const itemArray = itemString.split(",")

            let sizeString = ""
            let milkString = ""
            let sugarString = ""
            let warmString = ""


            if (itemArray[1] != "undefined") {
                sizeString = "<p>Size: " + itemArray[1] + "</p>"
            }
            if (itemArray[2] != "undefined") {
                milkString = "<p>Milk: " + itemArray[2] + "</p>"
            }
            if (itemArray[3] != "undefined") {
                sugarString = "<p>Sugar: " + itemArray[3] + "</p>"
            }
            if (itemArray[4] != "undefined") {
                warmString = "<p>Warm: " + itemArray[4] + "</p>"
            }

            orderHTML = orderHTML +
                `<div class="row pt-5 pb-5">` +
                '<div class="col-5 col-sm-2">' +
                `${itemArray[7]}` +
                '</div>' +
                '<div class="col-7 col-sm-4">' +
                `<h3>${itemArray[0]}</h3>` +
                sizeString + milkString + sugarString + warmString +
                '</div>' +
                '<div class="col-0 col-sm-6">' +
                `<input class="item-quantity float-right" min="0" step="1" type="number" name="quantity-${i}" value="1">` +
                `<label class="quantity-label float-right mr-5" for="quantity-${i}">Quantity: </label>` +
                '</div>' +
                '</div>'


            priceHTML = priceHTML +
                '<tr>' +
                `<td>${itemArray[0]}</td>` +
                `<td id="quantity-${i}" title="${itemArray[6]}">$${itemArray[6]}</td>` +
                '</tr>'

            orderQuery = orderQuery + itemArray[0] + ";"

            total += Number(itemArray[6])
        }

        priceHTML = priceHTML +
            '<tr class="total-row">' +
            '<td>Total</td>' +
            `<td id="total-value">$${total}</td>` +
            '</tr>'


        orderContainer.innerHTML = orderHTML
        priceSummary.innerHTML = priceHTML

        const orderButton = document.getElementById("finalize-order")
        orderButton.addEventListener("click", (event) => { event.preventDefault() })

        const finalizeOrder = () => {

            const quantityElements = document.getElementsByClassName('item-quantity')
            let quantities = ""

            for (i = 0; i < quantityElements.length; i++) {
                quantities = quantities + quantityElements[i].value + ";"
            }




            sessionStorage.clear()
            window.location.href = `/OrderConfirmed/${orderQuery}/${quantities}`
        }

        orderButton.onclick = finalizeOrder
    }

    if (document.title === "Order Confirmation - CozyBean") {
        var today = new Date();
        var readyTime = new Date(today.getTime() + 600000)
        var doneTime = new Date(today.getTime() + 1800000)

        if (readyTime.getMinutes() > 9) {
            readyMinutes = readyTime.getMinutes()
        }
        else {
            readyMinutes = "0" + readyTime.getMinutes()
        }

        if (doneTime.getMinutes() > 9) {
            doneMinutes = doneTime.getMinutes()
        }
        else {
            doneMinutes = "0" + doneTime.getMinutes()
        }

        document.getElementById('ready-time').innerHTML = (((readyTime.getHours() - 1) % 12) + 1) + ":" + readyMinutes
        document.getElementById('off-time').innerHTML = (((doneTime.getHours() - 1) % 12) + 1) + ":" + doneMinutes
    }

    $('.item-quantity').on('change', (event) => {
        const itemNum = $(event.currentTarget).attr('name')
        let itemQuant = Number($(event.currentTarget).val())

        const tableRow = document.getElementById(itemNum)
        const price = Number($(`#${itemNum}`).attr('title'))
        const subTotal = Number(tableRow.innerHTML.substring(1))

        const grandTotal = document.getElementById("total-value")
        const priorTotal = Number(grandTotal.innerHTML.substring(1))
        grandTotal.innerHTML = "$" + (priorTotal - subTotal + price * itemQuant).toFixed(2)
        tableRow.innerHTML = "$" + (price * itemQuant).toFixed(2)

    })

    // interactions
    $('.nav-link').on('mouseenter', (event) => {
        $(event.currentTarget).parent().find('.nav-underline-hidden').animate({ width: "100%" }, 200)
    })
    $('.nav-link').on('mouseleave', (event) => {
        $(event.currentTarget).parent().find('.nav-underline-hidden').animate({ width: 0}, 200)
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

    $('.btn').on('mousedown', (event) => {
        $(event.currentTarget).css("background-color", "#F1CA26")
    })


    $('.card').on('mouseenter', (event) => {
        $(event.currentTarget).css("background-color", "#755151")
    })
    $('.card').on('mouseleave', (event) => {
        $(event.currentTarget).css("background-color", "#242424")
    })
    $('.card').on('mousedown', (event) => {
        $(event.currentTarget).css("background-color", "#727B6D")
    })


    $('.reveal-panel').on('mouseenter', (event) => {
        $(event.currentTarget).find('.image-front').fadeOut(400)
        $(event.currentTarget).find('.image-back').fadeIn(400)
    })
    $('.reveal-panel').on('mouseleave', (event) => {
        $(event.currentTarget).find('.image-front').fadeIn(400)
        $(event.currentTarget).find('.image-back').fadeOut(400)
    })
    $('.reveal-panel').on('mousedown', (event) => {
        $(event.currentTarget).find('.panel-arrow').animate({
            marginLeft: "+=1.5em",
        }, 150)
    })

    $('.dark-button').on('mousedown', (event) => {
        $(event.currentTarget).css("background-color", "#F1CA26")
    })

    $('.unused-menu-option').on('mouseenter', (event) => {
        $(event.currentTarget).css("color", "#F1D55F")
    })
    $('.unused-menu-option').on('mouseleave', (event) => {
        $(event.currentTarget).css("color", "white")
    })

    //order form

    const originalCalories = Number($('#calorie-amount').html())
    let originalPrice
    if (document.title == "Order - CozyBean") {
        originalPrice = Number($('#price-amount').html().substring(1))
    }

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

        document.getElementById("price-amount").innerHTML = `$${(originalPrice + sizeChange).toFixed(2)}`

    }

    const addToOrder =  () => {
        const orderString = `${$('#item-name').html()},${$('#drink-size').html()},${$('#milk-type').html()},${$('#sugar-amount').html()},${$('#warm-amount').html()},${$('#calories-amount').html()},${$('#price-amount').html().substring(1)},${ $('#image-container').html()}`
        console.log(orderString)
        if (sessionStorage === null) {
            order = orderString
        } else {
            order = order + ";" + orderString
        }

        sessionStorage.setItem("order", order)

        window.location.href = "../../menu/Drinks/Popular"
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


    $('.shopping-dropper').on('click', () => {
        let orderArray = []

        if (order != null) {
            orderArray = order.split(";")
        }


        const orderContainer = document.getElementById("order")

        const priceSummary = document.getElementById("price-summary")

        let orderHTML = ""
        for (i = 1; i < orderArray.length; i++) {
            const itemString = orderArray[i]
            const itemArray = itemString.split(",")

            let sizeString = ""
            let milkString = ""
            let sugarString = ""
            let warmString = ""


            if (itemArray[1] != "undefined") {
                sizeString = "Size: " + itemArray[1] + "<br>"
            }
            if (itemArray[2] != "undefined") {
                milkString = "Milk: " + itemArray[2] + "<br>"
            }
            if (itemArray[3] != "undefined") {
                sugarString = "Sugar: " + itemArray[3] + "<br>"
            }
            if (itemArray[4] != "undefined") {
                warmString = "Warm: " + itemArray[4] + "<br>"
            }

            orderHTML = orderHTML +
                `<div class="row pt-3 pb-3">` +
                    '<div class="col-4">' +
                        `${itemArray[7]}` +
                    '</div>' +
                    '<div class="col-8">' +
                        `<h4>${itemArray[0]}</h4>` +
                        '<p>' + sizeString + milkString + sugarString + warmString + '</p>' +
                    '</div>' +
                '</div>'
        }
        orderContainer.innerHTML = orderHTML
    })

    $('.shopping-dropper').on('click', () => {
        $('#order-popout').slideToggle(300)
    })

    $('#cart-button').on('click', () => {
        window.location.href = '/checkout'
    })
    $('.menu-dropdown').on('change', (event) => {
        window.location.href = $(event.currentTarget).find(":selected").val()
    })
})