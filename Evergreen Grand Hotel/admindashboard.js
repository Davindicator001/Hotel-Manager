// JavaScript
// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Base URL for your API
//const API_BASE_URL = 'http://localhost:9000';
const API_BASE_URL = 'https://evergreen-backend-80rh.onrender.com';

// Modal Elements
const addGuestModal = document.getElementById('add-guest-modal');
const confirmGuestAddBtn = document.getElementById('save-guest')
const addGuestBtn = document.getElementById('add-guest-btn');
const closeAddGuest = document.getElementById('close-add-guest');
const cancelAddGuest = document.getElementById('cancel-add-guest');
const guestForm = document.getElementById('guest-form');
const modalTitle = document.getElementById('modal-title');

const addRoomModal = document.getElementById('add-room-modal');
const addRoomBtn = document.getElementById('add-room-btn');
const confirmRoomAddBtn = document.getElementById('confirm-room-btn')
const closeAddRoom = document.getElementById('close-add-room');
const cancelAddRoom = document.getElementById('cancel-add-room');
const roomModalTitle = document.getElementById('room-modal-title')

const addReservationModal = document.getElementById('add-reservation-modal');
const addReservationBtn = document.getElementById('add-reservation-btn');
const closeAddReservation = document.getElementById('close-add-reservation');
const cancelAddReservation = document.getElementById('cancel-add-reservation');
const reservationTableBody = document.querySelector('#reservation-list');
const reservationForm = document.getElementById('reservation-form');
const confirmReservationAddBtn = document.getElementById('save-reservation');
const reservationModalTitle = document.getElementById('reservation-modal-title');


// Room Management Elements
const roomGrid = document.querySelector('#all-rooms .room-grid');
const addRoomForm = document.getElementById('add-room-form');

// Toggle Sidebar
if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            // If room management section is activated, fetch rooms
            if (sectionId === 'room-management') {
                fetchAndDisplayRooms();
            }
            // Add other section initializers here if needed
            if (sectionId === 'dashboard') {
                 fetchAndDisplayAdminProfile();
            }
        }
    });
});

// Tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabsParent = tab.parentElement;
        if (!tabsParent) return;
        
        const tabContentsParent = tabsParent.nextElementSibling ? tabsParent.nextElementSibling.parentElement : null;
        if (!tabContentsParent) return;
        
        // Remove active class from all tabs and tab contents in this group
        tabsParent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tabContentsParent.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        const targetTabContent = document.getElementById(tabId);
        if (targetTabContent) {
            targetTabContent.classList.add('active');
        }
    });
});

// Modal Functions
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
    }
}

// Guest Modal
if (addGuestBtn) {
    addGuestBtn.addEventListener('click', () => {
        openModal(addGuestModal)
        modalTitle.textContent = 'Add New Guest';
        guestForm.reset();
    });
}

if (closeAddGuest) {
    closeAddGuest.addEventListener('click', () => closeModal(addGuestModal));
}

if (cancelAddGuest) {
    cancelAddGuest.addEventListener('click', () => closeModal(addGuestModal));
}

// Room Modal
if (addRoomBtn) {
    roomModalTitle.textContent = "Add New Room"
    addRoomBtn.addEventListener('click', () => openModal(addRoomModal));
}

if (closeAddRoom) {
    closeAddRoom.addEventListener('click', () => closeModal(addRoomModal));
}

if (cancelAddRoom) {
    cancelAddRoom.addEventListener('click', () => closeModal(addRoomModal));
}

// Reservation Modal
if (addReservationBtn) {
    addReservationBtn.addEventListener('click', () => openModal(addReservationModal));
}

if (closeAddReservation) {
    closeAddReservation.addEventListener('click', () => closeModal(addReservationModal));
}

if (cancelAddReservation) {
    cancelAddReservation.addEventListener('click', () => closeModal(addReservationModal));
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (addGuestModal && e.target === addGuestModal) {
        closeModal(addGuestModal);
    }
    if (addRoomModal && e.target === addRoomModal) {
        closeModal(addRoomModal);
    }
    if (addReservationModal && e.target === addReservationModal) {
        closeModal(addReservationModal);
    }
});

// Dashboard Counters - Create these at the global scope for easy access
let totalGuestsCount = 124;
let availableRoomsCount = 45;
let todaysCheckinsCount = 12;
let todaysCheckoutsCount = 8;

// Function to update dashboard
function updateDashboard() {
    const totalGuestsEl = document.getElementById('total-guests');
    const availableRoomsEl = document.getElementById('available-rooms');
    const todaysCheckinsEl = document.getElementById('todays-checkins');
    const todaysCheckoutsEl = document.getElementById('todays-checkouts');
    
    if (totalGuestsEl) totalGuestsEl.textContent = totalGuestsCount;
    if (availableRoomsEl) availableRoomsEl.textContent = availableRoomsCount;
    if (todaysCheckinsEl) todaysCheckinsEl.textContent = todaysCheckinsCount;
    if (todaysCheckoutsEl) todaysCheckoutsEl.textContent = todaysCheckoutsCount;
}

// Form Submissions
const addGuestForm = document.getElementById('add-guest-form');

// Utility to get auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Utility to show notifications (ensure you have a <div id="notification-area"></div> in your HTML)
function showNotification(message, type = 'info') {
    const notificationArea = document.getElementById('notification-area');
    if (!notificationArea) {
        console.error('Notification area element not found in admindashboard.html!');
        alert(message); // Fallback
        return;
    }
    const notification = document.createElement('div');
    notificationArea.classList.add('show');
    notification.className = `notification show ${type}`; // e.g., 'info', 'success', 'error'
    notification.textContent = message;
    notificationArea.appendChild(notification)
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.marginLeft = '10px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'transparent';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';
    closeButton.style.fontSize = '1.2em';
    closeButton.onclick = () => notification.remove();
    notification.appendChild(closeButton);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
            notificationArea.classList.remove('show')
        }
    }, 7000); // Auto-remove after 7 seconds
}

// --- Admin Profile ---
const adminNameElement = document.getElementById('admin-name');

async function fetchAndDisplayAdminProfile() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Please log in again.', 'error');
        if (adminNameElement) adminNameElement.textContent = 'Admin';
        return;
    }

    if (!adminNameElement) {
        console.error('Admin name element (#admin-name) not found in the DOM.');
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data && response.data.firstName) {
            adminNameElement.innerHTML = `${response.data.firstName} <i class="fas fa-chevron-down"></i>`;
        } else {
            adminNameElement.innerHTML = 'Admin <i class="fas fa-chevron-down"></i>';
            showNotification('Could not retrieve admin name.', 'info');
        }
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        if (adminNameElement) adminNameElement.innerHTML = 'Admin <i class="fas fa-chevron-down"></i>';
        let errorMessage = 'Failed to load admin profile.';
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}.`;
            if (error.response.data && error.response.data.message) {
                errorMessage += ` Server: ${error.response.data.message}`;
            }
            if (error.response.status === 401) {
                 errorMessage = 'Session expired or invalid. Please log in again.';
            }
        } else if (error.request) {
            errorMessage = 'Failed to load admin profile. No response from server. Is the server running?';
        } else {
            errorMessage += ` Details: ${error.message}`;
        }
        showNotification(errorMessage, 'error');
    }
}

// --- Dashboard Overview Data ---
const totalGuestsElement = document.getElementById('total-guests');
const availableRoomsElement = document.getElementById('available-rooms');
const todaysCheckInsElement = document.getElementById('todays-checkins'); // Corrected ID
const todaysCheckOutsElement = document.getElementById('todays-checkouts'); // Corrected ID
const recentReservationsTableBody = document.querySelector('#recent-reservations'); // Corrected ID from previous HTML

async function fetchAdminDashboardData() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Cannot fetch dashboard data.', 'error');
        return;
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard-overview`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = response.data;

        if (totalGuestsElement) totalGuestsElement.textContent = data.totalGuests || 0;
        if (availableRoomsElement) availableRoomsElement.textContent = data.availableRooms || 0;
        // Corrected element IDs based on typical HTML structure
        if (todaysCheckInsElement) todaysCheckInsElement.textContent = data.todaysCheckins || 0;
        if (todaysCheckOutsElement) todaysCheckOutsElement.textContent = data.todaysCheckouts || 0;


        if (recentReservationsTableBody) {
            recentReservationsTableBody.innerHTML = ''; // Clear existing rows
            if (data.recentReservations && data.recentReservations.length > 0) {
                data.recentReservations.forEach(reservation => {
                    const row = recentReservationsTableBody.insertRow();
                    // Assuming your HTML table for recent reservations has these columns:
                    // Booking ID, Guest Name, Room, Check-in, Check-out, Status, Actions
                    row.insertCell().textContent = reservation.bookingId || `BK-${reservation.id}`; // Placeholder if not present
                    row.insertCell().textContent = reservation.firstName + ' ' + reservation.lastName || 'N/A';
                    row.insertCell().textContent = reservation.roomType || 'N/A'; // Or room_name
                    row.insertCell().textContent = reservation.checkInDate ? new Date(reservation.checkInDate).toLocaleDateString() : 'N/A';
                    row.insertCell().textContent = reservation.checkOutDate ? new Date(reservation.checkOutDate).toLocaleDateString() : 'N/A';
                    row.insertCell().innerHTML = `<span class="status ${reservation.status ? reservation.status.toLowerCase() : 'pending'}">${reservation.status || 'Pending'}</span>`;
                    row.insertCell().innerHTML = `<button class="action-btn"><i class="fas fa-eye"></i></button>`; // Add more actions if needed
                });
            } else {
                const row = recentReservationsTableBody.insertRow();
                const cell = row.insertCell();
                cell.colSpan = 7; // Adjust if you have different number of columns
                cell.textContent = 'No recent reservations found.';
                cell.style.textAlign = 'center';
            }
        } else {
            console.warn('Recent reservations table body not found. Check selector: #recent-reservations');
        }
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        let errorMessage = 'Failed to load dashboard overview.';
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}.`;
            if (error.response.data && error.response.data.message) {
                errorMessage += ` Server: ${error.response.data.message}`;
            }
        } else if (error.request) {
            errorMessage = 'Failed to load dashboard overview. No response from server.';
        } else {
            errorMessage += ` Details: ${error.message}`;
        }
        showNotification(errorMessage, 'error');
    }
}

// --- Room Management ---
async function fetchAndDisplayRooms() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Cannot fetch rooms.', 'error');
        if (roomGrid) roomGrid.innerHTML = '<p>Authentication required to load rooms.</p>';
        return;
    }

    if (!roomGrid) {
        console.error('Room grid element (#all-rooms .room-grid) not found in the DOM.');
        showNotification('UI element for displaying rooms is missing.', 'error');
        return;
    }

    roomGrid.innerHTML = '<p>Loading rooms...</p>'; // Loading state

    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/rooms`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const rooms = response.data;
        roomGrid.innerHTML = ''; // Clear loading message

        if (rooms && rooms.length > 0) {
            rooms.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'room-card';
                // Adjust fields based on your 'hotel_rooms' table structure
                roomCard.innerHTML = `
                    <div class="m-2 p-4 bg-gray-600/20 rounded room-card-image" style="background-image: url('${room.images && room.images.length > 0 ? room.images[0] : 'https://source.unsplash.com/random/300x200/?hotel,room'}');">
                    <h4 class="p-4 m-2 rounded bg-gray-600/20 font-bold text-md">${room.room_type || 'Room'} (#${room.room_number})</h4>
                    <p class="p-4 m-2 rounded bg-gray-600/20"><strong>Capacity:</strong> Adults: ${room.capacity_adults !== undefined ? room.capacity_adults : 'N/A'}, Children: ${room.capacity_children !== undefined ? room.capacity_children : 'N/A'}</p>
                    <p class="p-4 m-2 rounded bg-gray-600/20"><strong>Price:</strong> $${room.price_per_night || 'N/A'} / night</p>
                    <p class="p-4 m-2 rounded bg-gray-600/20"><strong>Beds:</strong> ${room.bed_type || 'N/A'}</p>
                    <p class="p-4 m-2 rounded bg-gray-600/20"><strong>Status:</strong> <span class="status ${room.current_status ? room.current_status.toLowerCase() : ''}">${room.current_status || 'N/A'}</span></p>
                    <p class="p-4 m-2 rounded bg-gray-600/20"><strong>Amentities:</strong> ${room.amenities || 'N/A'}</p>
                    </div>
                    <div class="room-actions">
                        <button class="mx-4 action-btn edit-room-btn" data-room-id="${room.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="mx-6 action-btn delete delete-room-btn" data-room-id="${room.id}"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                `;
                roomGrid.appendChild(roomCard);
            });
            attachRoomActionListeners();
        } else {
            roomGrid.innerHTML = '<p>No rooms found or available to display.</p>';
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        let errorMessage = 'Failed to load rooms.';
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}.`;
            if (error.response.data && error.response.data.message) {
                errorMessage += ` Server: ${error.response.data.message}`;
            }
        } else if (error.request) {
             errorMessage = 'Failed to load rooms. No response from server.';
        } else {
            errorMessage += ` Details: ${error.message}`;
        }
        if (roomGrid) roomGrid.innerHTML = `<p class="error-message">${errorMessage}</p>`;
        showNotification(errorMessage, 'error');
    }
}

function attachRoomActionListeners() {
    document.querySelectorAll('.edit-room-btn').forEach(button => {
        button.addEventListener('click', handleEditRoomBtnClick);
    });
    document.querySelectorAll('.delete-room-btn').forEach(button => {
        button.addEventListener('click', handleDeleteRoomBtnClick);
    });
}
let roomId;
async function handleEditRoomBtnClick(event) {
    roomId = event.target.closest('.edit-room-btn').dataset.roomId;
    const token = getAuthToken();
    const roomCall = await axios.get(`${API_BASE_URL}/api/admin/rooms/${roomId}`, { headers:{'Authorization': `Bearer ${token}`} });
    const roomData = await roomCall.data;
    console.log(roomData)
    roomModalTitle.textContent = 'Edit Room'
    document.getElementById('roomNumber').value = roomData.room_number;
    document.getElementById('roomType').value = roomData.room_type;
    document.getElementById('price').value = roomData.price_per_night;
    document.getElementById('status').value = roomData.current_status;
    document.getElementById('adults').value = roomData.capacity_adults;
    document.getElementById('description').value = roomData.description;
    document.getElementById('amenities').value = roomData.amenities;
    openModal(addRoomModal);
    
}
function setButtonLoading(button, isLoading, loadText) {
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
        // Store the original text if needed
        button.setAttribute('data-original-text', button.textContent);
        button.textContent = loadText;
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
        // Restore the original text if available
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.textContent = originalText;
        }
    }
}
document.getElementById('roomForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    console.log(token)
    const roomData = {
        room_number: parseInt(document.getElementById('roomNumber').value),
        room_type: document.getElementById('roomType').value,
        price_per_night: document.getElementById('price').value,
        current_status: document.getElementById('status').value,
        capacity_adults: document.getElementById("adults").value,
        description: document.getElementById('description').value,
        amenities: document.getElementById('amenities').value.split(',').map(item => item.trim())
    };
    
    try {
        if(roomModalTitle.textContent == 'Add New Room'){
            setButtonLoading(confirmRoomAddBtn, true,"Adding Room...");
            const response = await axios.post(`${API_BASE_URL}/api/admin/rooms`, roomData, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (response.status == 200) {
                setButtonLoading(confirmRoomAddBtn, false);
                showNotification('Room added successfully!','success');
                fetchAndDisplayRooms();
                document.getElementById('roomForm').reset();
            } else {
                setButtonLoading(confirmRoomAddBtn, false);
                throw 'Failed to add room'
            }
        }else{
            setButtonLoading(confirmRoomAddBtn, true,"Editing Room...");
            const response = await axios.post(`${API_BASE_URL}/api/admin/rooms/${roomId}/update`, roomData, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (response.status == 200) {
                setButtonLoading(confirmRoomAddBtn, false);
                showNotification('Room edited successfully!','success');
                fetchAndDisplayRooms();
                document.getElementById('roomForm').reset();
            } else {
                setButtonLoading(confirmRoomAddBtn, false);
                throw 'Failed to add room'
            }

        }
    }
    catch (error) {
        console.error('Error:', error);
        alert(error.message);
        setButtonLoading(confirmRoomAddBtn, false);
    }
});

async function handleDeleteRoomBtnClick(event) {
    const roomId = event.target.closest('.delete-room-btn').dataset.roomId;
    if (!confirm(`Are you sure you want to delete room ID: ${roomId}? This action cannot be undone.`)) {
        return;
    }
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication required.', 'error');
        return;
    }
    try {
        await axios.delete(`${API_BASE_URL}/api/admin/rooms/${roomId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        showNotification(`Room ${roomId} deleted successfully!`, 'success');
        fetchAndDisplayRooms(); // Refresh the list
    } catch (error) {
        console.error('Error deleting room:', error);
        let errorMessage = 'Failed to delete room.';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage += ` Server: ${error.response.data.message}`;
        } else if (error.request) {
            errorMessage = 'Failed to delete room. No response from server.';
        }
        showNotification(errorMessage, 'error');
    }
}

// --- Staff Management ---
const staffTableBody = document.querySelector('#all-staff table tbody'); // Adjusted selector for staff table

async function fetchAndDisplayStaff() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Cannot fetch staff.', 'error');
        return;
    }
    if (!staffTableBody) {
        console.warn('Staff table body element not found in DOM. Check selector for staff table: #all-staff table tbody');
        return;
    }

    staffTableBody.innerHTML = '<tr><td colspan="6">Loading staff...</td></tr>'; // Colspan based on your table

    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/staff`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const staffMembers = response.data;
        staffTableBody.innerHTML = ''; // Clear loading

        if (staffMembers && staffMembers.length > 0) {
            staffMembers.forEach(staff => {
                const row = staffTableBody.insertRow();
                // Based on admindashboard.html: ID, Name, Position, Department, Contact, Status, Actions
                row.insertCell().textContent = staff.id || 'N/A';
                row.insertCell().textContent = `${staff.firstName || ''} ${staff.lastName || ''}`.trim() || 'N/A';
                row.insertCell().textContent = staff.role || 'N/A'; // 'Position' field
                row.insertCell().textContent = staff.department || 'N/A'; // You might need to add a 'department' field to your 'admins' table or derive it
                row.insertCell().textContent = staff.email || staff.number || 'N/A'; // 'Contact'
                row.insertCell().innerHTML = `<span class="status active">Active</span>`; // Add a 'status' field to admins if needed
                row.insertCell().innerHTML = `
                    <button class="action-btn"><i class="fas fa-eye"></i></button>
                    <button class="action-btn"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                `;
            });
        } else {
            const row = staffTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 7; // Adjust if your staff table has different number of columns
            cell.textContent = 'No staff members found.';
            cell.style.textAlign = 'center';
        }
    } catch (error) {
        console.error('Error fetching staff:', error);
        let errorMessage = 'Failed to load staff data.';
         if (error.response) {
            errorMessage += ` Status: ${error.response.status}.`;
            if (error.response.data && error.response.data.message) {
                errorMessage += ` Server: ${error.response.data.message}`;
            }
        } else if (error.request) {
             errorMessage = 'Failed to load staff. No response from server.';
        } else {
            errorMessage += ` Details: ${error.message}`;
        }
        if (staffTableBody) staffTableBody.innerHTML = `<tr><td colspan="7" class="error-message">${errorMessage}</td></tr>`;
        showNotification(errorMessage, 'error');
    }
}

// --- Event Listeners for Navigation and Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-menu .nav-link');
    const sections = document.querySelectorAll('.main-content .section');
    const adminLogoutButton = document.getElementById('admin-logout'); // From your HTML
    const mainContent = document.getElementById('main-content');


    function showSection(sectionIdToShow) {
        sections.forEach(section => {
            if (section.id === sectionIdToShow) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        mainContent.setAttribute('data-active-section', sectionIdToShow);


        // Fetch data for the activated section
        if (sectionIdToShow === 'dashboard') {
             fetchAndDisplayAdminProfile(); // Also update profile if dashboard is shown
             fetchAdminDashboardData();
        } else if (sectionIdToShow === 'room-management') {
            fetchAndDisplayRooms();
        } else if (sectionIdToShow === 'staff') { // Your staff section ID is 'staff'
            fetchAndDisplayStaff();
        } else if (sectionIdToShow === 'guest-management') {
            fetchAndDisplayGuests();
        } else if (sectionIdToShow === 'reservations') {
            fetchAndDisplayReservations();
        }
        // Add other 'else if' blocks for other sections that need data loading
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute('data-section');

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');

            showSection(sectionId);
        });
    });

    // Initial load:
    // Attempt to load admin profile first regardless of section
    fetchAndDisplayAdminProfile();

    let activeSectionFoundOnLoad = false;
    navLinks.forEach(link => {
        if (link.classList.contains('active')) {
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
            activeSectionFoundOnLoad = true;
        }
    });

    if (!activeSectionFoundOnLoad && navLinks.length > 0) {
        // Default to the first link if no section is marked active (usually dashboard)
        const defaultLink = document.querySelector('.nav-link[data-section="dashboard"]') || navLinks[0];
        defaultLink.classList.add('active');
        showSection(defaultLink.getAttribute('data-section'));
    }


    if (adminLogoutButton) {
        adminLogoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            showNotification('Logged out successfully.', 'success');
            // Wait for notification to be seen briefly
            setTimeout(() => {
                 window.location.href = 'index.html'; // Or your main admin login page
            }, 1500);
        });
    }

    // Add refresh button listener for dashboard if it exists
    const refreshDashboardBtn = document.getElementById('refresh-dashboard');
    if(refreshDashboardBtn){
        refreshDashboardBtn.addEventListener('click', () => {
            showNotification('Refreshing dashboard data...', 'info');
            fetchAdminDashboardData();
        });
    }
});

guestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Cannot add guest', 'error');
        return;
    }
    const guestData = {
        name: document.getElementById('guest-name').value,
        email: document.getElementById('guest-email').value,
        phone: document.getElementById('guest-phone').value,
        lastStay: formatDateToYMD(document.getElementById('guest-last-stay').value),
        totalStays: document.getElementById('guest-total-stays').value,
        status: document.getElementById('guest-status').value
    };
    
    console.log('Guest data:', guestData);
    try {
        if(modalTitle.textContent == 'Add New Guest'){
            setButtonLoading(confirmGuestAddBtn,true,"Adding Guest...");
            const response = await axios.post(`${API_BASE_URL}/api/admin/guests`,guestData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(response.status == 200){
                setButtonLoading(confirmGuestAddBtn,false);
                showNotification("guest Added successfully","success")
                await fetchAndDisplayGuests();
            }else{
                throw "bad";
            }
    }else{
        setButtonLoading(confirmGuestAddBtn,true,"Editing Guest...");
        const response = await axios.post(`${API_BASE_URL}/api/admin/guests/${id}/update`,guestData,{
            headers: { 'Authorization': `Bearer ${token}` }
        });
            if(response.status == 200){
                setButtonLoading(confirmGuestAddBtn,false);
                showNotification("guest Edited successfully","success")
            await fetchAndDisplayGuests();
        }else{
            throw "bad";
        }
    }
}
    catch(error){
        setButtonLoading(confirmGuestAddBtn,false);
        showNotification("Error adding/editing guest","error");
        return;
    }
    closeModal(addGuestModal);
});
function formatDateToYMD(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function updateGuestTable(guestData) {
    const tableBody = document.querySelector('#guest-list');
    const newRow = document.createElement('tr');
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    newRow.innerHTML = `
        <td>G-${guestData.id}</td>
        <td>${guestData.name}</td>
        <td>${guestData.email}</td>
        <td>${guestData.phone}</td>
        <td>${formatDate(guestData.lastStay)}</td>
        <td>${guestData.totalStays || '0'}</td>
        <td><span class="status ${guestData.status}">${guestData.status}</span></td>
        <td>
            <button class="action-btn view-guest"><i class="fas fa-eye"></i></button>
            <button class="action-btn edit-guest"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete delete-guest"><i class="fas fa-trash"></i></button>
        </td>
    `;
    tableBody.appendChild(newRow);
}
let id = 0;
async function handleEditGuestBtnClick(e){
    if (e.target.closest('.edit-guest')) {
        const row = e.target.closest('tr');
        const cells = row.cells;
        id = parseInt(cells[0].textContent.replace('G-', ''));
        modalTitle.textContent = 'Edit Guest';
        document.getElementById('guest-name').value = cells[1].textContent;
        document.getElementById('guest-email').value = cells[2].textContent;
        document.getElementById('guest-phone').value = cells[3].textContent;
        document.getElementById('guest-last-stay').value = cells[4].textContent;
        document.getElementById('guest-total-stays').value = cells[5].textContent;
        document.getElementById('guest-status').value = cells[6].querySelector('.status').className.replace('status ', '');
        
        openModal(addGuestModal);
        
        // Store the row to update
        guestForm.dataset.row = row;
    }
}
function attachGuestActionListeners() {
    document.querySelectorAll('.edit-guest').forEach(button => {
        button.addEventListener('click', (e) => {handleEditGuestBtnClick(e)});
    });
    document.querySelectorAll('.delete-room-btn').forEach(button => {
        button.addEventListener('click', handleDeleteRoomBtnClick);
    });
}
async function fetchAndDisplayGuests() {
    const token = getAuthToken();
    const tableBody = document.querySelector('#guest-list');
    if (!token) {
        showNotification('Authentication token not found. Cannot fetch guests.', 'error');
    }

    if (!tableBody) {
        showNotification('UI element for displaying guests is missing.', 'error');
        return;
    }

    tableBody.innerHTML = '<tr><td colspan="6">Loading guests...</td></tr>'; // Loading state

    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/guests`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        tableBody.innerHTML = ''
        const guests = response.data;
        guests.forEach(guest =>{
            updateGuestTable(guest)
            attachGuestActionListeners();
        });
        if(guests == []){
            tableBody.innerHTML = '<tr><td colspan="6">No guests found or available to display.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching guests:', error);
        let errorMessage = 'Failed to load guests.';
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}.`;
            if (error.response.data && error.response.data.message) {
                errorMessage += ` Server: ${error.response.data.message}`;
            }
        } else if (error.request) {
             errorMessage = 'Failed to load guests. No response from server.';
        } else {
            errorMessage += ` Details: ${error.message}`;
        }
        if (roomGrid) roomGrid.innerHTML = `<p class="error-message">${errorMessage}</p>`;
        showNotification(errorMessage, 'error');
    }
}
async function fetchAndDisplayReservations() {
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Cannot fetch reservations.', 'error');
        return;
    }

    if (!reservationTableBody) {
        console.error('Reservation table body not found in DOM');
        return;
    }

    reservationTableBody.innerHTML = '<tr><td colspan="9">Loading reservations...</td></tr>';

    try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/reservations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        reservationTableBody.innerHTML = '';

        if (response.data && response.data.length > 0) {
            response.data.forEach(reservation => {
                const row = reservationTableBody.insertRow();
                row.innerHTML = `
                    <td>BK-${reservation.id}</td>
                    <td>${reservation.firstName + ' ' + reservation.lastName || 'N/A'}</td>
                    <td>${reservation.room_number || 'N/A'}</td>
                    <td>${reservation.roomType || 'N/A'}</td>
                    <td>${formatDateToYMD(reservation.checkInDate)}</td>
                    <td>${formatDateToYMD(reservation.checkOutDate)}</td>
                    <td><span class="status ${reservation.status.toLowerCase()}">${reservation.status}</span></td>
                    <td><span class="status ${reservation.payment_status.toLowerCase()}">${reservation.payment_status}</span></td>
                    <td>
                        <button class="action-btn edit-reservation"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete delete-reservation"><i class="fas fa-trash"></i></button>
                    </td>
                `;
            });
            attachReservationActionListeners();
        } else {
            reservationTableBody.innerHTML = '<tr><td colspan="8">No reservations found.</td></tr>';
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
        showNotification('Failed to load reservations', 'error');
        reservationTableBody.innerHTML = '<tr><td colspan="8">Error loading reservations.</td></tr>';
    }
}

function attachReservationActionListeners() {
    document.querySelectorAll('.edit-reservation').forEach(btn => {
        btn.addEventListener('click', handleEditReservationClick);
    });
    document.querySelectorAll('.delete-reservation').forEach(btn => {
        btn.addEventListener('click', handleDeleteReservationClick);
    });
}

let currentReservationId = 0;

async function handleEditReservationClick(e) {
    const row = e.target.closest('tr');
    const cells = row.cells;
    currentReservationId = parseInt(cells[0].textContent.replace('BK-', ''));
    
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_BASE_URL}/api/admin/reservations/${currentReservationId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const reservation = response.data;
        
        reservationModalTitle.textContent = 'Edit Reservation';
        
        document.getElementById('reservation-room-number').value = reservation.room_number;
        document.getElementById('reservation-room-type').value = reservation.roomType;
        document.getElementById('reservation-checkin').value = formatDateToYMD(reservation.checkInDate);
        document.getElementById('reservation-checkout').value = formatDateToYMD(reservation.checkOutDate);
        document.getElementById('reservation-status').value = reservation.status;
        document.getElementById('reservation-payment-status').value = reservation.payment_status;
        
        openModal(addReservationModal);
    } catch (error) {
        console.error('Error fetching reservation:', error);
        showNotification('Failed to load reservation details', 'error');
    }
}

async function handleDeleteReservationClick(e) {
    const row = e.target.closest('tr');
    const reservationId = row.cells[0].textContent.replace('BK-', '');
    
    if (!confirm(`Are you sure you want to delete reservation BK-${reservationId}?`)) {
        return;
    }

    try {
        const token = getAuthToken();
        await axios.delete(`${API_BASE_URL}/api/admin/reservations/${reservationId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        showNotification('Reservation deleted successfully', 'success');
        fetchAndDisplayReservations();
    } catch (error) {
        console.error('Error deleting reservation:', error);
        showNotification('Failed to delete reservation', 'error');
    }
}

// Add this form handler for reservation form submissions
reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
        showNotification('Authentication token not found. Cannot process reservation.', 'error');
        return;
    }

    const reservationData = {
        room_number: document.getElementById('reservation-room-number').value,
        roomType: document.getElementById('reservation-room-type').value,
        checkInDate: document.getElementById('reservation-checkin').value,
        checkOutDate: document.getElementById('reservation-checkout').value,
        status: document.getElementById('reservation-status').value,
        payment_status: document.getElementById('reservation-payment-status').value,
    };

    try {
        setButtonLoading(confirmReservationAddBtn, true, "Processing...");
        
        if (reservationModalTitle.textContent === 'Add New Reservation') {
            const response = await axios.post(`${API_BASE_URL}/api/admin/reservations`, reservationData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            showNotification('Reservation added successfully', 'success');
        } else {
            const response = await axios.post(`${API_BASE_URL}/api/admin/reservations/${currentReservationId}/update`, reservationData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            showNotification('Reservation updated successfully', 'success');
        }
        
        fetchAndDisplayReservations();
        closeModal(addReservationModal);
    } catch (error) {
        console.error('Error saving reservation:', error);
        showNotification('Failed to save reservation', 'error');
    } finally {
        setButtonLoading(confirmReservationAddBtn, false);
    }
});