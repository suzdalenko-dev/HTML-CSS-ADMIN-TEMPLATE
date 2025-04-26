let YearSaved = parseInt(window.localStorage.getItem('year_saved')) || new Date().getFullYear() - 22;
if(YearSaved > 2099) YearSaved = 2099;
if(YearSaved < 1900) YearSaved = 1900;
let chartLine2 = null; // 🚀 Variable global para guardar el gráfico

function MinusYear(){
    YearSaved = YearSaved - 1;
    window.localStorage.setItem('year_saved', YearSaved);
    dashboardInit();
}
function PlusYear(){
    YearSaved = YearSaved + 1;
    window.localStorage.setItem('year_saved', YearSaved);
    dashboardInit();
}

async function FetchDataFromGPDGraf(){
    return fetch('/world-bank.api/pib.json').then(r => r.json()).then(r => {
        return r;
    }).catch(e => {
        alert(e);
    });
}

async function dashboardInit(){
    document.getElementById('yearSpan').innerHTML = YearSaved;
    let GPD = await FetchDataFromGPDGraf();
    let Years      = []
    let DataChart  = []
    let Colors = [ 'blue', 'green', 'orange', 'red', 'cyan',      'pink',       'purple',        'lime',        'magenta',     'teal',        'indigo',      'violet',      'gold',        'silver',      'brown',       'coral',       'turquoise',   'crimson',     'navy',        'chartreuse',  'deeppink'     ];
    let i = 0;
    GPD.map(country => {
        let countryData = country.data.reverse();
        let valueChart  = []

        countryData.map(itemObj => {
            let currentYear = itemObj.date;
            if(currentYear >= YearSaved) {
                let coinValue = itemObj.value;
                if(coinValue) coinValue = coinValue / 1000000000000;
                else coinValue = null;
                valueChart.push(coinValue)
                if(!Years.includes(currentYear))
                    Years.push(currentYear)
            }
            
        });
        let chartItem = {
            label: country.name,
            data: valueChart,
            fill: false,
            borderColor: Colors[i],
            backgroundColor: Colors[i],
            tension: 0.4  
        }
        DataChart.push(chartItem);
        i++;
    });

    // 🔥 Destruir el gráfico anterior si existe
    if (chartLine2 !== null) {
        chartLine2.destroy();
    }
    
    chartLine2 = new Chart(document.getElementById('lineChart2'), {
        type: 'line',
        data: {
            labels: Years,
            datasets: DataChart
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });    
}

new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Sales',
            data: [150, 340, 230, 280, 180],
            backgroundColor: '#6366f1'
        }]
    },
    options: { responsive: true }
});

new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Revenue',
            data: [120, 200, 180, 240, 210],
            fill: true,
            backgroundColor: 'rgba(99,102,241,0.1)',
            borderColor: '#6366f1'
        }]
    },
    options: { responsive: true }
});