 const totalSales = 15000;
 const activeUsers = 150;
 const productsSold = 320;
 document.getElementById('totalSales').textContent = `$${totalSales.toLocaleString()}`;
 document.getElementById('activeUsers').textContent = activeUsers.toLocaleString();
 document.getElementById('productsSold').textContent = productsSold.toLocaleString();
 const salesData = [12, 19, 3, 5, 2, 18, 10]; 
 const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                datasets: [{
                    label: 'Ventas (en USD)',
                    data: salesData,
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });