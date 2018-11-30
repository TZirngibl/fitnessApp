export const ChartData = {
    type: 'line',
    data: {
      labels: [Date.now()-518400000,Date.now()-432000000,Date.now()-345600000,Date.now()-259200000,Date.now()-172800000,Date.now()-86400000,Date.now()],
      datasets: [
        { // one line graph
            label: 'BMI',
            data: [22, 20, 19.5, 18.5, 17.0, 17.5, 20],
            borderWidth: 3
          },
      ]
    },
    options: {
    responsive: false,
      lineTension: 1,
      scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'day'
            }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }],
      }
    }
  }
  
  export default ChartData;