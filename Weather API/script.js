$(document).ready(function () {

    $("#btn").hide();
    $("#btn2").hide();
    $("#table").hide();
    $("#stats").hide();

    $("#btn_search").on("click", () => {
        $("#btn").show();
        $("#btn2").show();
        $("#stats").show();
        let inputValue = $("#input").val()
        ajaxCall(`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&APPID=6255eff7c9384d3e1f313281a0107010`, processResponse, printTable)
    })

    $("#btn").on("click", () => {
        $("#stats").show();
        $("#table").hide();
    })

    $("#btn2").on("click", () => {
        $("#table").show();
        $("#stats").hide();
    })

    function processResponse(res) {
        tempInfo(res)
        humInfo(res)
        printResults(tempInfo(res), humInfo(res), timeWarmCold(res))

    }

    function printTable(weather) {
        $("#table").hide();

        $("#tbody").children().remove();

        weather.list.forEach(e => {
            let tr = $("<tr></tr>")

            tr.append(`<td><img src="http://openweathermap.org/img/w/${e.weather[0].icon}.png"></td>`)
            tr.append(`<td>${e.weather[0].description}</td>`)
            tr.append(`<td>${e.dt_txt}</td>`)
            tr.append(`<td>${e.main.temp}</td>`)
            tr.append(`<td>${e.main.humidity}</td>`)
            tr.append(`<td>${e.wind.speed}</td>`)

            $("#tbody").append(tr)
        });

    }

    function ajaxCall(url, callback, callback2) {
        $.ajax({
            url: url,
            success: function (response) {
                callback(response)
                callback2(response)
            },
            error: function (response) {
                alert(response.status)
            },
        })
    }

    function printResults(param1, param2, param3) {
        let stats = $("#stats")
        stats.children().remove();
        stats.append(`<div class="temp"><p>Minimal Temperature:${param1.minimalTemperature}</p>  <p>Maximal Temperature:${param1.maximalTemperature}</p>  <p>Average Temperature:${param1.averageTemperature}</p> </div> <div class="hum"> <p>Minimal Humudity:${param2.minimalHumudity}</p> <p>Maximal Humudity:${param2.maximalHumudity}</p> <p>Average Humudity:${param2.averageHumudity}</p></div> <div class="coldest_warmest"><p>Coldest Time:${param3.coldestTime}</p> <p>Warmest Time:${param3.warmestTime}</p></div>`)


    }

    function tempInfo(weather) {
        let minTemp = weather.list.map(element => element.main.temp_min).sort((a, b) => a - b)
        console.log(minTemp[0])
        let maxTemp = weather.list.map(element => element.main.temp_max).sort((a, b) => b - a)
        console.log(maxTemp[0])
        let avgTemp = Math.round(weather.list.map(element => element.main.temp_max).reduce(function (sum, el) {
            return sum += el / weather.list.length
        }, 0))
        

        let tempObj = {
            minimalTemperature: minTemp[0],
            maximalTemperature: maxTemp[0],
            averageTemperature: avgTemp
        }
        
        return tempObj;

    }

    function humInfo(weather) {
        let minHum = weather.list.map(element => element.main.humidity).sort((a, b) => a - b)
        console.log(minHum[0])
        let maxHum = weather.list.map(element => element.main.humidity).sort((a, b) => b - a)
        console.log(maxHum[0])
        let avgHum = Math.round(weather.list.map(element => element.main.humidity).reduce(function (sum, el) {
            return sum += el / weather.list.length
        }, 0))
        console.log(avgHum)

        let humObj = {
            minimalHumudity: minHum[0],
            maximalHumudity: maxHum[0],
            averageHumudity: avgHum

        }
        console.log(humObj)
        return humObj

    }

    function timeWarmCold(time) {

        let coldestTime = [...time.list].sort((a, b) => a.main.temp_min - b.main.temp_min)
        console.log(coldestTime[0].dt_txt)
        let coldestTime1 = coldestTime[0].dt_txt
        let warmestTime = [...time.list].sort((a, b) => b.main.temp_max - a.main.temp_max)
        console.log(warmestTime[0].dt_txt)
        let warmestTime1 = warmestTime[0].dt_txt

        let objWarmCold = {
            coldestTime: coldestTime1,
            warmestTime: warmestTime1
        }
        
        return objWarmCold

    }




})
