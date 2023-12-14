document.title = "Dashboard";

var page_header_text = app_container.querySelector('.page-header-text');
page_header_text.innerHTML = "Client Management Dashboard";


var page_chart = app_container.querySelector('.page-chart');

var chart_canvas = document.createElement('canvas');

page_chart.append(chart_canvas);

new Chart(chart_canvas, {
    type: 'pie',
    data: {
        labels: [
            'New Request',
            'Pending Compliance',
            'Pending Instance',
            'Pending Training',
            'Pending Test',
            'Active'
        ],
        datasets: [{
            data: [2, 5, 3, 8, 3, 25],
            backgroundColor: [
                'rgb(255,179,186)',
                'rgb(255,223,186)',
                'rgb(255,255,186)',
                'rgb(186,255,201)',
                'rgb(186,225,255)',
                'rgb(224, 187, 228)'
            ],
        hoverOffset: 4
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Mobiloan Client Statuses',
                color: 'rgb(255, 255, 255)',
                font: {
                    size: 25
                },
                padding: {
                    top: 30
                }
            },
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 255, 255)'
                },
                position: 'right'
            }
        }
    }
});