document.addEventListener("DOMContentLoaded", async () => {
  const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
  
  const getStatusClass = (status) => {
    const statusMap = {
      'Available': 'available',
      'In Use': 'in-use',
      'Under Maintenance': 'maintenance',
      'Retired': 'retired'
    };
    return statusMap[status] || '';
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/inventory", {
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

      const inventory = await response.json();
      
      inventoryTable.innerHTML = inventory.map(item => `
        <tr>
          <td>${item.item_name}</td>
          <td>${item.category}</td>
          <td>${item.quantity}</td>
          <td>
            <span class="status-badge status-${getStatusClass(item.status)}">
              ${item.status}
            </span>
          </td>
          <td>${new Date(item.maintenance_due).toLocaleDateString()}</td>
          <td class="action-buttons">
            <button onclick="editItem(${item.id})">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button>
          </td>
        </tr>
      `).join('');
    } catch (error) {
      console.error("Error fetching inventory:", error);
      inventoryTable.innerHTML = `
        <tr>
          <td colspan="6">Error loading inventory data: ${error.message}</td>
        </tr>
      `;
    }
  };

  // Initial load
  await fetchInventory();

  // Add Inventory button handler
  document.getElementById('addInventoryBtn')?.addEventListener('click', () => {
    // Implement add inventory functionality
    alert('Add Inventory functionality to be implemented');
  });
});
