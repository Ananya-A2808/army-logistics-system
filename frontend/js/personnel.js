document.addEventListener("DOMContentLoaded", async () => {
    const personnelGrid = document.querySelector('.personnel-grid');
    
    const fetchPersonnelWithMissions = async () => {
        try {
            personnelGrid.innerHTML = '<p>Loading personnel data...</p>';
            
            // Fetch personnel and missions in parallel
            const [personnelResponse, missionsResponse] = await Promise.all([
                fetch("http://localhost:5000/api/personnel", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                }),
                fetch("http://localhost:5000/api/missions", {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                })
            ]);

            if (!personnelResponse.ok || !missionsResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const personnel = await personnelResponse.json();
            const missions = await missionsResponse.json();

            if (personnel.length === 0) {
                personnelGrid.innerHTML = '<p>No personnel data available</p>';
                return;
            }

            // Create HTML for each personnel card with their missions
            personnelGrid.innerHTML = personnel.map(person => {
                const personMissions = missions.filter(mission => 
                    mission.assigned_personnel && 
                    mission.assigned_personnel.includes(person.id)
                );

                const statusClass = person.status.toLowerCase().replace(' ', '-');

                return `
                    <div class="personnel-card">
                        <h3>${person.rank} ${person.name}</h3>
                        <p><strong>Unit:</strong> ${person.unit}</p>
                        <p><strong>Specialization:</strong> ${person.specialization}</p>
                        <p><strong>Contact:</strong> ${person.contact}</p>
                        <span class="status ${statusClass}">${person.status}</span>
                        
                        <div class="missions-list">
                            <h4>Assigned Missions</h4>
                            ${personMissions.length > 0 ? `
                                <ul>
                                    ${personMissions.map(mission => `
                                        <li>${mission.mission_name} - ${mission.status}</li>
                                    `).join('')}
                                </ul>
                            ` : '<p>No missions assigned</p>'}
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            console.error("Error fetching data:", error);
            personnelGrid.innerHTML = `
                <p class="error">Error loading data: ${error.message}</p>
                <button onclick="location.reload()">Try Again</button>
            `;
        }
    };

    // Initial load
    await fetchPersonnelWithMissions();

    // Add Personnel button handler
    document.getElementById('addPersonnelBtn')?.addEventListener('click', () => {
        // Implement add personnel functionality
        alert('Add Personnel functionality to be implemented');
    });
});
