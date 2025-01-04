document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/personnel")
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.querySelector("#personnelTable tbody");
            data.forEach((person) => {
                const row = `
                    <tr>
                        <td>${person.name}</td>
                        <td>${person.rank}</td>
                        <td>${person.unit}</td>
                        <td>${person.specialization}</td>
                        <td>${person.contact}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error("Error fetching personnel data:", error));
});
