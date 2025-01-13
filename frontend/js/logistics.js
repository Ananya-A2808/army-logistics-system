document.addEventListener("DOMContentLoaded", async () => {
  const logisticsTable = document.getElementById("logisticsTable").getElementsByTagName('tbody')[0];
  
  const getStatusClass = (status) => {
    const statusMap = {
      'Scheduled': 'scheduled',
      'In-Transit': 'in-transit',
      'Completed': 'completed',
      'Cancelled': 'cancelled'
    };
    return statusMap[status] || '';
  };

  const fetchLogistics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logistics", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const logistics = await response.json();
      
      logisticsTable.innerHTML = logistics.map(item => `
        <tr>
          <td>${item.transport_resource}</td>
          <td>${item.origin}</td>
          <td>${item.destination}</td>
          <td>${item.fuel_usage} L</td>
          <td>${new Date(item.schedule_date).toLocaleDateString()}</td>
          <td>
            <span class="status-badge status-${getStatusClass(item.status)}">
              ${item.status}
            </span>
          </td>
          <td class="action-buttons">
            <button onclick="editLogistics(${item.id})">Edit</button>
            <button onclick="deleteLogistics(${item.id})">Delete</button>
          </td>
        </tr>
      `).join('');
    } catch (error) {
      console.error("Error fetching logistics:", error);
      logisticsTable.innerHTML = `
        <tr>
          <td colspan="7">Error loading logistics data: ${error.message}</td>
        </tr>
      `;
    }
  };

  // Initial load
  await fetchLogistics();

  // Add Logistics button handler
  document.getElementById('addLogisticsBtn')?.addEventListener('click', () => {
    // Implement add logistics functionality
    alert('Add Logistics functionality to be implemented');
  });
});
