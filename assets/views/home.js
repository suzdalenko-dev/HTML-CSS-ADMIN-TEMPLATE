function homeInit(){
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
}