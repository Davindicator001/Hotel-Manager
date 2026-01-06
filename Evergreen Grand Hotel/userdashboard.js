//const API_BASE_URL = "http://localhost:9000";
const API_BASE_URL = "https://evergreen-backend-80rh.onrender.com";
const modal = document.getElementById("booking-modal")
    const closeModal = document.querySelector(".close-modal")
  
    function openModal() {
      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  
        // Set focus to first input in modal for accessibility
        const firstInput = modal.querySelector("input, select, button")
        if (firstInput) {
          firstInput.focus()
        }
      }
    }
  
    function closeModalFunc() {
      if (modal) {
        modal.style.display = "none"
        document.body.style.overflow = "" // Restore scrolling
      }
    }
document.addEventListener("DOMContentLoaded", async () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
    userData = await fetchUserData();
    const bookNowBtns = document.querySelectorAll(".btn")
    
  
    // Open modal when "New Booking" button is clicked
    const newBookingBtn = document.querySelector(".quick-actions .btn");
    if (newBookingBtn) {
        newBookingBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }
  
    if (closeModal) {
      closeModal.addEventListener("click", closeModalFunc)
    }
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModalFunc()
      }
    })
  
    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.style.display === "block") {
        closeModalFunc()
      }
    })

    // Handle Booking Form Submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingFormSubmit);
    }

    // User Dropdown Toggle
    const userProfile = document.querySelector(".user-profile");
    if (userProfile) {
        userProfile.addEventListener("click", (e) => {
            userProfile.classList.toggle("active");
            e.stopPropagation();
        });

        document.addEventListener("click", (e) => {
            if (!userProfile.contains(e.target)) {
                userProfile.classList.remove("active");
            }
        });
    }
    updateDashboard(userData);
    // Dashboard Sidebar Navigation
    const sidebarLinks = document.querySelectorAll(".sidebar-menu li a");
    const dashboardSections = document.querySelectorAll(".dashboard-section");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.parentElement.classList.remove("active"));
            dashboardSections.forEach(section => section.classList.remove("active"));
            
            // Add active class to clicked link
            link.parentElement.classList.add("active");
            
            // Show corresponding section
            const targetId = link.getAttribute("href").substring(1);
            document.getElementById(targetId).classList.add("active");
        });
    });

    // Live Chat Widget
    const chatButton = document.querySelector(".chat-button");
    if (chatButton) {
        chatButton.addEventListener("click", () => {
            window.location.href = "live-chat.html";
        });
    }

    const profileForm = document.querySelector("#profile form");
    if (profileForm) {
        // The submit button is an <a> tag styled as a button, not a type="submit" input.
        // We need to target the "Save Changes" link specifically.
        const saveChangesButton = profileForm.querySelector('a.btn[href="update-profile.html"]');
        if (saveChangesButton) {
            saveChangesButton.addEventListener("click", handleProfileUpdate);
        }
    }
});

async function fetchUserData() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = './login.html';
      return;
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}/api/userdata`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 401) {
        window.location.href = './session-expired.html';
        return;
      }
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
}

async function updateDashboard(userData){
    const name_menu = document.querySelector('#name-menu');
    const name_greet = document.querySelector('#name-greet');

    if (userData && userData.firstName) {
    name_menu.textContent = userData.firstName;
    name_greet.textContent = userData.firstName + "!";
    } else {
        name_menu.textContent = "Guest";
        name_greet.textContent = "Guest!";
        console.warn("User data or first name is missing.");
    }

    // --- Update "Upcoming Stay" Card ---
    const latestBookingDays = document.getElementById('latest-booking-days');
    const latestBookingRoomType = document.getElementById('latest-booking-time'); // This ID was 'latest-booking-time', assuming it's for room type
    const manageBookingLink = document.querySelector('.dashboard-card .card-link[href^="manage-booking.html"]');

    // --- Update "Check-in Status" Section ---
    const checkinStatusSection = document.querySelector('.checkin-status');

    if (userData && userData.bookings && userData.bookings.length > 0) {
        // Assuming the first booking is the latest/upcoming one for this example
        // You might need more sophisticated logic to find the *actual* upcoming booking
        const latestBooking = userData.bookings.find(b => new Date(b.checkInDate) > new Date() && b.status === "Confirmed") || userData.bookings[0]; // Example: find confirmed future booking or take first

        if (latestBooking) {
            if (latestBookingDays) {
                latestBookingDays.textContent = `${new Date(latestBooking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(latestBooking.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            }
            if (latestBookingRoomType) {
                latestBookingRoomType.textContent = latestBooking.roomType || "N/A";
            }
            if (manageBookingLink) {
                manageBookingLink.href = `manage-booking.html?id=${latestBooking.id || 'N/A'}`;
            }

            // --- Update "Check-in Status" details ---
            if (checkinStatusSection) {
                const roomTypeHeader = checkinStatusSection.querySelector('.status-info h3');
                const reservationIdPara = checkinStatusSection.querySelector('.status-info p');
                const statusBadge = checkinStatusSection.querySelector('.status-badge');
                
                const checkinDateEl = checkinStatusSection.querySelector('.status-dates .date-item:first-child .date');
                const checkinTimeEl = checkinStatusSection.querySelector('.status-dates .date-item:first-child .time');
                const checkoutDateEl = checkinStatusSection.querySelector('.status-dates .date-item:last-child .date');
                const checkoutTimeEl = checkinStatusSection.querySelector('.status-dates .date-item:last-child .time');

                const adultsSpan = checkinStatusSection.querySelector('.status-details .detail-item:nth-child(1) span');
                // Assuming bed type and Wi-Fi might be part of room details or booking, add if available
                // const bedTypeSpan = checkinStatusSection.querySelector('.status-details .detail-item:nth-child(2) span');
                // const wifiSpan = checkinStatusSection.querySelector('.status-details .detail-item:nth-child(3) span');

                const modifyLink = checkinStatusSection.querySelector('.status-actions a[href^="modify-booking.html"]');
                const cancelLink = checkinStatusSection.querySelector('.status-actions a[href^="cancel-booking.html"]');
                const checkinLink = checkinStatusSection.querySelector('.status-actions a[href^="online-checkin.html"]');

                if (roomTypeHeader) roomTypeHeader.textContent = latestBooking.roomType || "N/A";
                if (reservationIdPara) reservationIdPara.textContent = `Reservation #${latestBooking.id || 'N/A'}`;
                if (statusBadge) {
                    statusBadge.textContent = latestBooking.status || "Unknown";
                    statusBadge.className = `status-badge ${latestBooking.status ? latestBooking.status.toLowerCase() : 'unknown'}`;
                }

                if (checkinDateEl) checkinDateEl.textContent = new Date(latestBooking.checkInDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                if (checkinTimeEl) checkinTimeEl.textContent = latestBooking.checkInTime || "From 2:00 PM"; // Default if not provided
                if (checkoutDateEl) checkoutDateEl.textContent = new Date(latestBooking.checkOutDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                if (checkoutTimeEl) checkoutTimeEl.textContent = latestBooking.checkOutTime || "Until 12:00 PM"; // Default if not provided
                
                if (adultsSpan) adultsSpan.textContent = `${latestBooking.adults || 'N/A'} Adults`;
                // if (bedTypeSpan && latestBooking.bedType) bedTypeSpan.textContent = latestBooking.bedType;
                // if (wifiSpan && latestBooking.wifiIncluded) wifiSpan.textContent = "Free Wi-Fi";


                if (modifyLink) modifyLink.href = `modify-booking.html?id=${latestBooking.id || 'N/A'}`;
                if (cancelLink) cancelLink.href = `cancel-booking.html?id=${latestBooking.id || 'N/A'}`;
                if (checkinLink) checkinLink.href = `online-checkin.html?id=${latestBooking.id || 'N/A'}`;
            }
        } else {
            // No upcoming booking found, perhaps hide or show a "No upcoming bookings" message
            if (latestBookingDays) latestBookingDays.textContent = "No Upcoming Stays";
            if (latestBookingRoomType) latestBookingRoomType.textContent = "Book your next adventure!";
            if (checkinStatusSection) checkinStatusSection.innerHTML = "<p>You have no upcoming reservations. <a href='booking.html' class='btn'>Book Now</a></p>";
        }
    } else {
         // Handle case where there's no booking data or user is not fully loaded yet
        if (latestBookingDays) latestBookingDays.textContent = "N/A";
        if (latestBookingRoomType) latestBookingRoomType.textContent = "N/A";
        if (checkinStatusSection && !userData) { // Only clear if userData itself is missing, not just bookings
            checkinStatusSection.innerHTML = "<p>Loading booking details...</p>";
        } else if (checkinStatusSection) {
             checkinStatusSection.innerHTML = "<p>No booking information available. <a href='booking.html' class='btn'>Make a Reservation</a></p>";
        }
    }


    // --- Update Loyalty Points ---
    const loyaltyPointsEl = document.querySelector('.dashboard-card:nth-child(2) .highlight'); // Assuming second card is loyalty
    const memberStatusEl = document.querySelector('.dashboard-card:nth-child(2) p:not(.highlight)');
    if (loyaltyPointsEl && userData && userData.loyalty) {
        loyaltyPointsEl.textContent = `${userData.loyalty_points || 0} Points`;
    }
    if (memberStatusEl && userData && userData.loyalty) {
        memberStatusEl.textContent = `${userData.loyalty.status || 'Member'} Status`;
    }

    // --- Update Special Offers ---
    const specialOffersEl = document.querySelector('.dashboard-card:nth-child(3) .highlight'); // Assuming third card is offers
    if (specialOffersEl && userData && userData.specialOffers) {
        specialOffersEl.textContent = `${userData.specialOffers.length || 0} New Offers`;
    }

    // --- Populate Bookings Table ---
    if (userData && userData.bookings) {
        populateBookingsTable(userData.bookings);
    } else {
        populateBookingsTable([]); // Call with empty array if no bookings data
    }

    // --- Populate Profile Form ---
    if (userData) {
        populateProfileForm(userData);
    }
}

function populateBookingsTable(bookings) {
    const tbody = document.querySelector("#bookings table tbody");
    if (!tbody) {
        console.error("Bookings table body not found!");
        return;
    }

    tbody.innerHTML = ""; // Clear existing rows

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">You have no bookings yet.</td></tr>';
        return;
    }

    bookings.forEach(booking => {
        const row = tbody.insertRow();
        row.style.borderBottom = "1px solid var(--border-color)";

        const cellId = row.insertCell();
        cellId.style.padding = "12px";
        cellId.textContent = booking.id || "N/A";

        const cellRoom = row.insertCell();
        cellRoom.style.padding = "12px";
        cellRoom.textContent = booking.roomType || "N/A";

        const cellCheckIn = row.insertCell();
        cellCheckIn.style.padding = "12px";
        cellCheckIn.textContent = new Date(booking.checkInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) || "N/A";

        const cellCheckOut = row.insertCell();
        cellCheckOut.style.padding = "12px";
        cellCheckOut.textContent = new Date(booking.checkOutDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) || "N/A";

        const cellStatus = row.insertCell();
        cellStatus.style.padding = "12px";
        const statusBadge = document.createElement('span');
        statusBadge.textContent = booking.status || "Unknown";
        statusBadge.className = `status-badge ${booking.status ? booking.status.toLowerCase() : 'unknown'}`;
        // Apply some default styling for the badge, can be refined in CSS
        statusBadge.style.padding = "5px 12px";
        statusBadge.style.borderRadius = "20px";
        statusBadge.style.fontSize = "12px";
        statusBadge.style.fontWeight = "600";
        statusBadge.style.textTransform = "uppercase";
        if (booking.status && booking.status.toLowerCase() === 'confirmed') {
            statusBadge.style.backgroundColor = 'var(--success-light, #e6f7e9)';
            statusBadge.style.color = 'var(--success-dark, #38a169)';
        } else if (booking.status && booking.status.toLowerCase() === 'completed') {
            statusBadge.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            statusBadge.style.color = 'var(--text-light, #555)';
        } else if (booking.status && booking.status.toLowerCase() === 'cancelled') {
            statusBadge.style.backgroundColor = 'var(--danger-light, #fee2e2)';
            statusBadge.style.color = 'var(--danger-dark, #e53e3e)';
        } else {
            statusBadge.style.backgroundColor = 'var(--neutral-light, #e0e0e0)';
            statusBadge.style.color = 'var(--neutral-dark, #333)';
        }
        cellStatus.appendChild(statusBadge);

        const cellActions = row.insertCell();
        cellActions.style.padding = "12px";

        const viewLink = document.createElement('a');
        viewLink.href = `view-booking.html?id=${booking.id || '#'}`;
        viewLink.style.color = "var(--primary-color)";
        viewLink.style.marginRight = "10px";
        viewLink.innerHTML = '<i class="fas fa-eye"></i>';
        cellActions.appendChild(viewLink);

        if (booking.status && (booking.status.toLowerCase() === 'confirmed' || booking.status.toLowerCase() === 'pending')) {
            const modifyLink = document.createElement('a');
            modifyLink.href = `modify-booking.html?id=${booking.id || '#'}`;
            modifyLink.style.color = "var(--primary-color)";
            modifyLink.style.marginRight = "10px";
            modifyLink.innerHTML = '<i class="fas fa-edit"></i>';
            cellActions.appendChild(modifyLink);

            const cancelLinkIcon = document.createElement('a');
            cancelLinkIcon.href = `cancel-booking.html?id=${booking.id || '#'}`;
            cancelLinkIcon.style.color = "var(--danger-color)";
            cancelLinkIcon.innerHTML = '<i class="fas fa-times"></i>';
            // Add a confirmation before cancelling
            cancelLinkIcon.onclick = (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to cancel this booking?")) {
                    // Here you would ideally call an API to cancel the booking
                    // For now, we'll just navigate or you can disable the row
                    // window.location.href = cancelLinkIcon.href; 
                    console.log("Booking cancellation initiated for", booking.id);
                    alert("Cancellation request sent. This is a placeholder - implement actual cancellation API call.");
                }
            };
            cellActions.appendChild(cancelLinkIcon);
        } else if (booking.status && booking.status.toLowerCase() === 'completed') {
            const bookAgainLink = document.createElement('a');
            bookAgainLink.href = `booking.html?roomType=${booking.roomType}&adults=${booking.adults}`; // Example prefill
            bookAgainLink.style.color = "var(--primary-color)";
            bookAgainLink.innerHTML = '<i class="fas fa-redo"></i>';
            cellActions.appendChild(bookAgainLink);
        }
    });
}

function populateProfileForm(userData) {
    const profileForm = document.querySelector("#profile form");
    if (!profileForm) {
        console.error("Profile form not found!");
        return;
    }
    // Assuming your userData object has these fields directly, or nested under a profile object e.g. userData.profile.firstName
    // Adjust selectors if your HTML form structure for profile is different
    const firstNameInput = profileForm.querySelector('input[value="Chinedu"]'); // A bit brittle; relying on current value
    const lastNameInput = profileForm.querySelector('input[value="Okonkwo"]');
    const emailInput = profileForm.querySelector('input[value="joseph@example.com"]');
    const phoneInput = profileForm.querySelector('input[value="+234 903 424 4576"]');
    const addressInput = profileForm.querySelector('input[value="15 Adeola Odeku Street"]');
    const cityInput = profileForm.querySelector('input[placeholder="City"]'); // Using placeholder as current value is not unique
    const stateInput = profileForm.querySelector('input[placeholder="State"]'); 
    const countryInput = profileForm.querySelector('input[placeholder="Country"]');

    // It's better to add IDs to your form inputs for more robust selection
    // e.g., <input type="text" id="profile-first-name">
    // For now, we are using less robust selectors based on current HTML.
    // Consider adding IDs like: #profile-first-name, #profile-last-name, #profile-email, etc.

    if (firstNameInput && userData.firstName) firstNameInput.value = userData.firstName;
    if (lastNameInput && userData.lastName) lastNameInput.value = userData.lastName;
    if (emailInput && userData.email) emailInput.value = userData.email;
    if (phoneInput && userData.phone) phoneInput.value = userData.phone;
    if (addressInput && userData.address && userData.address.street) addressInput.value = userData.address.street;
    if (cityInput && userData.address && userData.address.city) cityInput.value = userData.address.city;
    if (stateInput && userData.address && userData.address.state) stateInput.value = userData.address.state;
    if (countryInput && userData.address && userData.address.country) countryInput.value = userData.address.country;

}

async function handleProfileUpdate(event) {
    event.preventDefault(); // Prevent default form submission
    const profileForm = event.target.closest('form');
    if (!profileForm) return;

    const formData = {
        // Again, relying on current values or placeholders. Add IDs for robustness.
        firstName: profileForm.querySelector('input[value^="Chinedu"], input#profile-first-name')?.value, // Example with fallback ID
        lastName: profileForm.querySelector('input[value^="Okonkwo"], input#profile-last-name')?.value,
        email: profileForm.querySelector('input[value^="joseph@example.com"], input#profile-email')?.value,
        phone: profileForm.querySelector('input[value^="+234"], input#profile-phone')?.value,
        address: {
            street: profileForm.querySelector('input[value^="15 Adeola"], input#profile-address-street')?.value,
            city: profileForm.querySelector('input[placeholder="City"], input#profile-address-city')?.value,
            state: profileForm.querySelector('input[placeholder="State"], input#profile-address-state')?.value,
            country: profileForm.querySelector('input[placeholder="Country"], input#profile-address-country')?.value,
        }
        // Add any other fields from your profile form
    };

    console.log("Profile data to update:", formData);
    alert("Profile update initiated! (Placeholder - Implement actual API call)");

    // TODO: Implement actual API call to update profile
     const token = localStorage.getItem('authToken');
     if (!token) {
         alert("You are not logged in!");
         window.location.href = './login.html';
         return;
     }
     try {
         const response = await axios.post(`${API_BASE_URL}/api/user/profile`, formData, {
             headers: { 'Authorization': `Bearer ${token}` }
         });
         if (response.data && response.data.message) {
             alert(response.data.message); // Or a more subtle notification
             // Optionally, re-fetch user data to show updated info
             userData = await fetchUserData();
             updateDashboard(userData);
         } else {
             alert("Profile updated successfully!");
         }
     } catch (error) {
         console.error("Error updating profile:", error);
         alert("Failed to update profile. " + (error.response?.data?.message || error.message));
     }
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
async function handleBookingFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const bookingBtn = document.getElementById("booking-btn");

    const bookingData = {
        checkInDate: form.querySelector('#check-in').value,
        checkOutDate: form.querySelector('#check-out').value,
        adults: form.querySelector('#adults').value,
        children: form.querySelector('#children').value,
        roomType: form.querySelector('#room-type').value,
    };

    // Validate the form data
    if (!bookingData.checkInDate || !bookingData.checkOutDate || !bookingData.roomType) {
        alert("Please fill in the required fields: Check-in Date, Check-out Date, Room Type.");
        return;
    }

    if (new Date(bookingData.checkOutDate) <= new Date(bookingData.checkInDate)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    // First check room availability
    try {
        setButtonLoading(bookingBtn, true, "Checking...");

        const availabilityRes = await axios.post(`${API_BASE_URL}/api/rooms/check-availability`, bookingData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        const isAvailable = availabilityRes.data.available;

        if (!isAvailable) {
            alert("Room is not available for the selected dates or capacity.");
            setButtonLoading(bookingBtn, false);
            return;
        }else{
            alert("Room Is available proceed with booking?")
        }

        // If available, proceed to create the booking
        const bookingRes = await axios.post(`${API_BASE_URL}/api/book`, bookingData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        const wasSuccessful = bookingRes.data?.success ?? false;

        if (!wasSuccessful) {
            alert("Failed to create booking.");
            setButtonLoading(bookingBtn, false);
            return;
        }

        // Show success alert if booking was created
        const alertBox = document.getElementById("booking-alert");
        alertBox.style.display = "block";
        setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000);

        // Close modal and fetch updated user data
        closeModalFunc();
        userData = await fetchUserData();
        updateDashboard(userData); // Refresh dashboard view
    } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Failed to book room.");
    } finally {
        setButtonLoading(bookingBtn, false);
    }
}