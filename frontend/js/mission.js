document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/missions")
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.querySelector("#missionsTable tbody");
            data.forEach((mission) => {
                const row = `
                    <tr>
                        <td>${mission.mission_name}</td>
                        <td>${mission.status}</td>
                        <td>${mission.assigned_personnel}</td>
                        <td>${mission.assigned_inventory}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error("Error fetching mission data:", error));
});
