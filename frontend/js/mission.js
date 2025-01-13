// Handle Mission Dashboard Interactions
const missionCards = document.getElementById("missionCards");
const missionDetailsModal = document.getElementById("missionDetailsModal");
const missionFormModal = document.getElementById("missionFormModal");
const closeMissionDetails = document.getElementById("closeMissionDetails");
const closeMissionForm = document.getElementById("closeMissionForm");
const addMissionBtn = document.getElementById("addMissionBtn");

const fetchMissions = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/missions");
    const missions = await response.json();

    missionCards.innerHTML = missions
      .map(
        (mission) => `
      <div class="mission-card" onclick="viewMissionDetails(${mission.id})">
        <h3>${mission.mission_name}</h3>
        <p>Status: ${mission.status}</p>
        <p>Priority: ${mission.priority}</p>
        <p>Location: ${mission.location}</p>
        <p>Deadline: ${new Date(mission.deadline).toLocaleDateString()}</p>
      </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching missions:", error);
    alert("Failed to load missions");
  }
};

const viewMissionDetails = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/missions/${id}`);
    const mission = await response.json();
    
    // Get personnel details for assigned personnel
    const personnelResponse = await fetch("http://localhost:5000/api/personnel");
    const allPersonnel = await personnelResponse.json();
    const assignedPersonnel = allPersonnel.filter(p => 
      mission.assigned_personnel.includes(p.id)
    );

    document.getElementById("missionDetails").innerHTML = `
      <h2>${mission.mission_name}</h2>
      <p>Objective: ${mission.objective}</p>
      <p>Location: ${mission.location}</p>
      <p>Status: ${mission.status}</p>
      <p>Priority: ${mission.priority}</p>
      <h3>Assigned Personnel:</h3>
      <ul>
        ${assignedPersonnel.map(p => `
          <li>${p.rank} ${p.name} - ${p.specialization}</li>
        `).join('')}
      </ul>
      <p>Start Date: ${new Date(mission.start_date).toLocaleDateString()}</p>
      <p>Deadline: ${new Date(mission.deadline).toLocaleDateString()}</p>
    `;
    missionDetailsModal.style.display = "block";
  } catch (error) {
    console.error("Error fetching mission details:", error);
    alert("Failed to load mission details");
  }
};

addMissionBtn.addEventListener("click", () => {
  missionFormModal.style.display = "block";
});

closeMissionDetails.onclick = () => (missionDetailsModal.style.display = "none");
closeMissionForm.onclick = () => (missionFormModal.style.display = "none");

// Fetch missions on load
fetchMissions();

// Add form submission handling
document.getElementById("missionForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = {
    missionName: document.getElementById("missionName").value,
    objective: document.getElementById("objective").value,
    location: document.getElementById("location").value,
    status: document.getElementById("status").value,
    assignedPersonnel: document.getElementById("assignedPersonnel").value,
    assignedInventory: document.getElementById("assignedInventory").value,
    deadline: document.getElementById("deadline").value
  };

  try {
    const response = await fetch("http://localhost:5000/api/missions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Mission created successfully!");
      missionFormModal.style.display = "none";
      fetchMissions(); // Refresh the missions list
    } else {
      throw new Error("Failed to create mission");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create mission");
  }
});

// Add status filtering functionality
document.getElementById("statusFilter").addEventListener("change", async (e) => {
  const status = e.target.value;
  const response = await fetch("http://localhost:5000/api/missions");
  const missions = await response.json();
  
  const filteredMissions = status === "all" 
    ? missions 
    : missions.filter(mission => mission.status.toLowerCase() === status);
    
  missionCards.innerHTML = filteredMissions
    .map(
      (mission) => `
    <div class="mission-card" onclick="viewMissionDetails(${mission.mission_id})">
      <h3>${mission.mission_name}</h3>
      <p>Status: ${mission.status}</p>
      <p>Location: ${mission.location}</p>
    </div>`
    )
    .join("");
});
