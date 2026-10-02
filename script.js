// ================================
// SMART AGRICULTURE - DAILY DATA
// ================================

const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const soilElement = document.getElementById("soil");

const tempStatusElement = document.getElementById("tempStatus");
const humidityStatusElement = document.getElementById("humidityStatus");
const soilStatusElement = document.getElementById("soilStatus");

const rainfallElement = document.getElementById("rainfall");
const irrigationSoilElement =
    document.getElementById("irrigationSoil");
const pumpElement = document.getElementById("pump");

const lastUpdateElement =
    document.getElementById("lastUpdate");


// ================================
// CHART DATA
// ================================

let timeLabels = [];
let temperatureData = [];
let humidityData = [];
let soilData = [];


// ================================
// CREATE CHART
// ================================

const ctx =
    document.getElementById("sensorChart").getContext("2d");

const sensorChart = new Chart(ctx, {

    type: "line",

    data: {
        labels: timeLabels,

        datasets: [

            {
                label: "Temperature (°C)",
                data: temperatureData,
                borderWidth: 3,
                tension: 0.4
            },

            {
                label: "Humidity (%)",
                data: humidityData,
                borderWidth: 3,
                tension: 0.4
            },

            {
                label: "Soil Moisture (%)",
                data: soilData,
                borderWidth: 3,
                tension: 0.4
            }

        ]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});


// ================================
// UPDATE DASHBOARD
// ================================

function updateDashboard() {

    // Simulated sensor values
    const temperature =
        Math.floor(Math.random() * 10) + 25;

    const humidity =
        Math.floor(Math.random() * 20) + 50;

    const soil =
        Math.floor(Math.random() * 30) + 30;


    // Display values
    temperatureElement.innerText =
        temperature + " °C";

    humidityElement.innerText =
        humidity + " %";

    soilElement.innerText =
        soil + " %";


    // Temperature status
    if (temperature > 32) {
        tempStatusElement.innerText = "High";
    } else {
        tempStatusElement.innerText = "Normal";
    }


    // Humidity status
    if (humidity < 40) {
        humidityStatusElement.innerText = "Low";
    } else {
        humidityStatusElement.innerText = "Normal";
    }


    // Soil status and irrigation
    if (soil < 40) {

        soilStatusElement.innerText = "Dry";

        irrigationSoilElement.innerText = "DRY";

        pumpElement.innerText = "ON";

    } else {

        soilStatusElement.innerText = "Moist";

        irrigationSoilElement.innerText = "MOIST";

        pumpElement.innerText = "OFF";
    }


    // Rainfall
    if (Math.random() > 0.7) {
        rainfallElement.innerText = "Rain";
    } else {
        rainfallElement.innerText = "No Rain";
    }


    // Current date and time
    const now = new Date();

    const date =
        now.toLocaleDateString();

    const time =
        now.toLocaleTimeString();


    lastUpdateElement.innerText =
        "Updated: " + date + " " + time;


    // ================================
    // SAVE DAILY READING
    // ================================

    const reading = {

        date: date,
        time: time,

        temperature: temperature,
        humidity: humidity,
        soilMoisture: soil,

        rainfall: rainfallElement.innerText,

        pump: pumpElement.innerText
    };


    // Get previous readings
    let dailyData =
        JSON.parse(
            localStorage.getItem("dailySensorData")
        ) || [];


    // Add new reading
    dailyData.push(reading);


    // Save data
    localStorage.setItem(
        "dailySensorData",
        JSON.stringify(dailyData)
    );


    // ================================
    // UPDATE GRAPH
    // ================================

    timeLabels.push(time);

    temperatureData.push(temperature);

    humidityData.push(humidity);

    soilData.push(soil);


    // Keep last 10 readings on graph
    if (timeLabels.length > 10) {

        timeLabels.shift();
        temperatureData.shift();
        humidityData.shift();
        soilData.shift();
    }


    sensorChart.update();
}


// ================================
// START DASHBOARD
// ================================

updateDashboard();


// Update every 3 seconds
setInterval(updateDashboard, 3000);