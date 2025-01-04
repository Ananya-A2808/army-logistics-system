const toggleSwitch = document.getElementById('darkModeSwitch');
toggleSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

/* Optional: Dark Mode Styles */
const darkModeStyles = `
  body.dark-mode {
    background: #1c1f14;
    color: #ffffff;
  }
  body.dark-mode .navbar {
    background: #000000;
  }
  body.dark-mode .option-card {
    background: #333333;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/personnel")
    .then((response) => response.json())
    .then((data) => {
      const personnelList = document.getElementById("personnel-list");
      data.forEach((personnel) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${personnel.name}</h3><p>Rank: ${personnel.rank}</p>`;
        personnelList.appendChild(div);
      });
    })
    .catch((error) => console.error("Error fetching personnel data:", error));
});
document.addEventListener("DOMContentLoaded", () => {
  fetchPersonnel();

  function fetchPersonnel() {
    fetch("/api/personnel")
      .then((res) => res.json())
      .then((data) => {
        const personnelList = document.getElementById("personnel-list");
        personnelList.innerHTML = "";
        data.forEach((person) => {
          const div = document.createElement("div");
          div.innerHTML = `
            <h3>${person.name}</h3>
            <p>Rank: ${person.rank}</p>
            <p>Unit: ${person.unit}</p>
            <p>Specialization: ${person.specialization}</p>
            <p>Contact: ${person.contact}</p>
          `;
          personnelList.appendChild(div);
        });
      })
      .catch((err) => console.error("Error fetching personnel:", err));
  }
});
