{/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<canvas id="dailyCalorieChart" width="400" height="200"></canvas> */}
// Example for creating a bar chart for daily calorie goals

const dailyCalorieChart = new Chart(document.getElementById('dailyCalorieChart'), {
    type: 'bar',
    data: {
      labels: ['Maintain Weight', 'Mild Weight Loss', 'Weight Loss', 'Extreme Weight Loss', 'Mild Weight Gain', 'Weight Gain', 'Extreme Weight Gain'],
      datasets: [{
        label: 'Daily Calorie Goals',
        data: [2046, 1796, 1546, 1046, 2296, 2546, 3046],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Similar code can be written for burned calorie data and other types of charts
  