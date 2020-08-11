var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "a8e6750b45msh1789476a19ccd55p10933djsnef1f0bd7f06e"
	}
}
var data = "";
var last_sort_key = "";
$.ajax(settings).done(function (response) {
    data = response;
    console.log(data)
    $('#date').text(data.statistic_taken_at)
    $('#total-cases').text(data.world_total.total_cases)
    $('#active-cases').text(data.world_total.active_cases)
    $('#total-deaths').text(data.world_total.total_deaths)
    $('#total-recovered').text(data.world_total.total_recovered)
    render_to_table(data.countries_stat)
    var chartArr = [...data.countries_stat]
    sort_by_key(chartArr, 'deaths')
    last_sort_key = ''
    var death_data = chartArr.slice(Math.max(chartArr.length - 5, 0))
    sort_by_key(chartArr, 'new_cases')
    last_sort_key = ''
    var new_case_data = chartArr.slice(Math.max(chartArr.length - 5, 0))
    sort_by_key(chartArr, 'new_deaths')
    last_sort_key = ''
    var new_death_data = chartArr.slice(Math.max(chartArr.length - 5, 0))
    load_charts(death_data, new_case_data, new_death_data)
});

function sort_by_key(array, key)
{
    if(key == last_sort_key){
        array.reverse()
    }
    else if(key == 'country_name'){
        array.sort(function(a, b){
            var x = a[key].toString(); 
            var y = b[key].toString();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        last_sort_key = key
    }
    else{
        array.sort(function(a, b){
            var x = a[key].toString().replace(/\,/g,''); 
            var y = b[key].toString().replace(/\,/g,'');
            if(x==='N/A' && y==='N/A'){return 0}
            if(x==='N/A'){return 1}
            if(y==='N/A'){return -1}
            x = parseInt(x)
            y = parseInt(y)
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        last_sort_key = key
    }
}
function render_to_table(array){
    $('tbody').html("")
    for(let i=0; i < array.length; i++){
        let name = '<td>'+array[i].country_name+'</td>';
        let cases = '<td>'+array[i].cases+'</td>';
        let deaths = '<td>'+array[i].deaths+'</td>';
        let recovered = '<td>'+array[i].total_recovered+'</td>';
        let active = '<td>'+array[i].active_cases+'</td>';
        let serious = '<td>'+array[i].serious_critical+'</td>';
        let text = '<tr>'+name+cases+deaths+recovered+active+serious+'</tr>'
        $('tbody').append(text)
    }
}
function sort(key){
    if(key ==='country_name'){}
    var arr = data.countries_stat
    sort_by_key(arr, key)   //inplace sort
    render_to_table(arr)
}
function load_charts(d1, d2, d3){
var ctx = document.getElementById('myChart');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [...d1].map(a => a.country_name) ,
        datasets: [{
            label: '',
            data: [...d1].map(a => a.deaths).map(a => parseInt(a.toString().replace(/\,/g,''))),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [...d2].map(a => a.country_name),
        datasets: [{
            label: '',
            data: [...d2].map(a => a.new_cases).map(a => parseInt(a.toString().replace(/\,/g,''))),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: [...d3].map(a => a.country_name),
        datasets: [{
            label: '',
            data: [...d3].map(a => a.new_deaths).map(a => parseInt(a.toString().replace(/\,/g,''))),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}


