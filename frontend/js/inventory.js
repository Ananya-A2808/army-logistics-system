document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/inventory")
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.querySelector("#inventoryTable tbody");
            data.forEach((item) => {
                const row = `
                    <tr>
                        <td>${item.item_name}</td>
                        <td>${item.category}</td>
                        <td>${item.quantity}</td>
                        <td>${item.maintenance_due || "N/A"}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error("Error fetching inventory data:", error));
});
