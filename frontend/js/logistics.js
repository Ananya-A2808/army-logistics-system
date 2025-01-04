document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/logistics")
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.querySelector("#logisticsTable tbody");
            data.forEach((logistics) => {
                const row = `
                    <tr>
                        <td>${logistics.transport_resource}</td>
                        <td>${logistics.fuel_usage}</td>
                        <td>${logistics.schedule_date}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error("Error fetching logistics data:", error));
});
