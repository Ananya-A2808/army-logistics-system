const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

class DataService {
  constructor() {
    this.data = null;
    this.initializeData();
  }

  async initializeData() {
    try {
      await this.loadData();
    } catch (error) {
      // If file doesn't exist, create it with initial data
      this.data = {
        users: [],
        personnel: [
          {
            id: 1,
            name: "John Smith",
            rank: "Captain",
            unit: "Alpha Unit",
            specialization: "Infantry",
            contact: "555-0101",
            status: "Active"
          },
          {
            id: 2,
            name: "Sarah Johnson",
            rank: "Lieutenant",
            unit: "Bravo Unit",
            specialization: "Communications",
            contact: "555-0102",
            status: "Active"
          },
          {
            id: 3,
            name: "Michael Chen",
            rank: "Major",
            unit: "Delta Force",
            specialization: "Special Operations",
            contact: "555-0103",
            status: "Deployed"
          },
          {
            id: 4,
            name: "Emily Rodriguez",
            rank: "Sergeant",
            unit: "Medical Corps",
            specialization: "Combat Medic",
            contact: "555-0104",
            status: "Active"
          },
          {
            id: 5,
            name: "James Wilson",
            rank: "Colonel",
            unit: "Strategic Command",
            specialization: "Strategic Planning",
            contact: "555-0105",
            status: "Active"
          }
        ],
        missions: [],
        inventory: [
          {
            id: 1,
            item_name: "M4 Rifle",
            category: "Weapons",
            quantity: 100,
            maintenance_due: "2024-06-15",
            status: "Available"
          },
          {
            id: 2,
            item_name: "Combat Helmet",
            category: "Protection",
            quantity: 150,
            maintenance_due: "2024-07-20",
            status: "Available"
          },
          {
            id: 3,
            item_name: "First Aid Kit",
            category: "Medical",
            quantity: 75,
            maintenance_due: "2024-05-30",
            status: "In Use"
          },
          {
            id: 4,
            item_name: "Night Vision Goggles",
            category: "Equipment",
            quantity: 50,
            maintenance_due: "2024-06-10",
            status: "Available"
          },
          {
            id: 5,
            item_name: "Tactical Radio",
            category: "Communications",
            quantity: 80,
            maintenance_due: "2024-05-25",
            status: "Under Maintenance"
          },
          {
            id: 6,
            item_name: "Combat Vehicle",
            category: "Vehicles",
            quantity: 10,
            maintenance_due: "2024-06-01",
            status: "Available"
          }
        ],
        logistics: [
          {
            id: 1,
            transport_resource: "Truck Convoy Alpha",
            origin: "Main Base",
            destination: "Forward Base 1",
            fuel_usage: 250.5,
            schedule_date: "2024-05-01",
            status: "Scheduled",
            created_at: "2024-04-20T10:00:00Z"
          },
          {
            id: 2,
            transport_resource: "Helicopter Transport",
            origin: "Forward Base 1",
            destination: "Outpost Delta",
            fuel_usage: 500.0,
            schedule_date: "2024-05-02",
            status: "In-Transit",
            created_at: "2024-04-20T10:00:00Z"
          },
          {
            id: 3,
            transport_resource: "Supply Train Bravo",
            origin: "Supply Depot",
            destination: "Main Base",
            fuel_usage: 1000.0,
            schedule_date: "2024-05-03",
            status: "Completed",
            created_at: "2024-04-20T10:00:00Z"
          }
        ]
      };
      await this.saveData();
    }
  }

  async loadData() {
    try {
      const rawData = await fs.readFile(DB_PATH, 'utf8');
      this.data = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  async saveData() {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }

  async getMissions() {
    if (!this.data) await this.loadData();
    return this.data.missions || [];
  }

  async getPersonnel() {
    if (!this.data) await this.loadData();
    return this.data.personnel || [];
  }

  async getInventory() {
    if (!this.data) await this.loadData();
    return this.data.inventory || [];
  }

  async getLogistics() {
    if (!this.data) await this.loadData();
    return this.data.logistics || [];
  }

  async addMission(mission) {
    if (!this.data) await this.loadData();
    if (!mission.mission_name) throw new Error('Mission name is required');
    
    mission.id = (this.data.missions.length > 0 ? 
      Math.max(...this.data.missions.map(m => m.id)) + 1 : 1);
    mission.created_at = new Date().toISOString();
    this.data.missions.push(mission);
    await this.saveData();
    return mission;
  }

  async updateMission(id, missionData) {
    if (!this.data) await this.loadData();
    
    const index = this.data.missions.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    this.data.missions[index] = {
        ...this.data.missions[index],
        ...missionData,
        id, // Preserve the original ID
        updated_at: new Date().toISOString()
    };
    
    await this.saveData();
    return this.data.missions[index];
  }

  async deleteMission(id) {
    if (!this.data) await this.loadData();
    
    const index = this.data.missions.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    this.data.missions.splice(index, 1);
    await this.saveData();
    return true;
  }

  async addLogistics(logisticsData) {
    if (!this.data) await this.loadData();
    
    const newLogistics = {
        id: this.data.logistics.length > 0 
            ? Math.max(...this.data.logistics.map(l => l.id)) + 1 
            : 1,
        ...logisticsData,
        created_at: new Date().toISOString()
    };
    
    this.data.logistics.push(newLogistics);
    await this.saveData();
    return newLogistics;
  }

  async updateLogistics(id, logisticsData) {
    if (!this.data) await this.loadData();
    
    const index = this.data.logistics.findIndex(l => l.id === id);
    if (index === -1) return null;
    
    this.data.logistics[index] = {
        ...this.data.logistics[index],
        ...logisticsData,
        id,
        updated_at: new Date().toISOString()
    };
    
    await this.saveData();
    return this.data.logistics[index];
  }

  async deleteLogistics(id) {
    if (!this.data) await this.loadData();
    
    const index = this.data.logistics.findIndex(l => l.id === id);
    if (index === -1) return false;
    
    this.data.logistics.splice(index, 1);
    await this.saveData();
    return true;
  }

  // Add similar methods for other entities...
}

module.exports = new DataService(); 