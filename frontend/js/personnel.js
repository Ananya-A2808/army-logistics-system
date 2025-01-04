document.addEventListener("DOMContentLoaded", () => {
  const personnelContainer = document.getElementById("personnelContainer");

  // Fetch personnel data
  fetch("http://127.0.0.1:5000/api/personnel")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((person) => {
        // Create card
        const card = document.createElement("div");
        card.classList.add("card");

        // Add image
        const img = document.createElement("img");
        img.src = person.photo || "/images/placeholder.jpg";
        img.alt = person.name;

        // Add content
        const content = document.createElement("div");
        content.classList.add("card-content");
        content.innerHTML = `
          <h3>${person.name}</h3>
          <p>Rank: ${person.rank}</p>
          <p>Unit: ${person.unit}</p>
        `;

        // Add actions
        const actions = document.createElement("div");
        actions.classList.add("card-actions");

        const viewButton = document.createElement("button");
        viewButton.textContent = "View Details";
        viewButton.addEventListener("click", () => viewDetails(person.id));

        actions.appendChild(viewButton);

        // Append elements to card
        card.appendChild(img);
        card.appendChild(content);
        card.appendChild(actions);

        // Append card to container
        personnelContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching personnel data:", error));

  // Function to view details
  function viewDetails(personId) {
    // Redirect or open modal with detailed information
    alert(`View details for personnel ID: ${personId}`);
  }
});
