document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
    const signupForm = document.getElementById('signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const warning = document.getElementById('confirm');
    const guestBtn = document.getElementById("guest-btn");
    const adminBtn = document.getElementById("admin-btn");
    const adminCodeSection = document.getElementById("admin-code-section");
    const userTypeInput = document.getElementById("user-type");
    const notification = document.getElementById("notification");
    const adminCode = document.getElementById("admin-code");
    const signupbtn = document.getElementById("signup-btn");
    
    guestBtn.addEventListener("click", () => {
        guestBtn.classList.add("active");
        adminBtn.classList.remove("active");
        adminCodeSection.classList.remove("active");
        userTypeInput.value = "guest";
        notification.classList.remove("active");
    });
    
    adminBtn.addEventListener("click", () => {
        adminBtn.classList.add("active");
        guestBtn.classList.remove("active");
        adminCodeSection.classList.add("active");
        userTypeInput.value = "admin";
    });
    function dismissAlert(){
        var alert = document.getElementById("alert");
        alert.classList.remove("visible");
        alert.classList.add("invisible");
    };
    function showNotification(message = "", type = "success"){
        if(type == "success"){
          notification.classList.add("bg-green-100","text-green-800");
          notification.classList.remove("error")
          notification.classList.add("success")
        }else{
            notification.classList.remove("success")
            notification.classList.add("error")
          notification.classList.add("bg-red-100", "text-red-800");
        };
        notification.textContent = message;
        notification.classList.add("active");
      }

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        setButtonLoading(signupbtn,true);
        if (password.value !== confirmPassword.value) {
            warning.classList.remove('invisible');
            warning.classList.add('visible');
            return;
        } else {
            warning.classList.remove('visible');
            warning.classList.add('invisible');
        }

        
        if (userTypeInput.value === "admin") {
            const validAdminCode = "EGH-ADMIN-2023"; // This would normally be verified on the server
            
            if (adminCode.value !== validAdminCode) {
                showNotification("Invalid Admin Code contact support to get a valid one");
                setButtonLoading(signupbtn,false);
                return;
            }
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                number: document.getElementById('phone').value,
                adminCode: adminCode.value,
                password: password.value,
            };
            await axios.post('https://evergreen-backend-80rh.onrender.com/api/register/admin', formData)
            .then(response => {
                showNotification(response.data.message) 
                console.log('Account created successfully:', response.data);
                setButtonLoading(signupbtn,false);
                window.location.href = "login.html";
            })
            .catch(error => {
                showNotification("User already Registered, Login", "error")
                notification.classList.add("active");
                setButtonLoading(signupbtn,false);
                console.error('Error creating account:', error);
            });
        } else {
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                number: document.getElementById('phone').value,
                password: password.value,
            };
            await axios.post('https://evergreen-backend-80rh.onrender.com/api/register/user', formData)
                .then(response => {
                    showNotification(response.data.message) 
                    console.log('Account created successfully:', response.data);
                    setButtonLoading(signupbtn,false);
                    window.location.href = "login.html";
                })
                .catch(error => {
                    showNotification("User already Registered, Login", "error")
                    console.error('Error creating account:', error);
                    setButtonLoading(signupbtn,false);
                });    
        }
    });
        
        confirmPassword.addEventListener('input', () => {
            if (confirmPassword.value !== password.value) {
                warning.classList.remove('invisible');
                warning.classList.add('visible');
            } else {
                warning.classList.remove('visible');
            warning.classList.add('invisible');
        }
    });
});

function setButtonLoading(button, isLoading, loadText) {
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
        // Store the original text if needed
        button.setAttribute('data-original-text', button.textContent);
        button.textContent = 'Signing up...';
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

// document.addEventListener("DOMContentLoaded", () => {
//     // Mobile Menu Toggle
    
    
//     // User Type Selection
//     const guestBtn = document.getElementById("guest-btn");
//     const adminBtn = document.getElementById("admin-btn");
//     const adminCodeSection = document.getElementById("admin-code-section");
//     const userTypeInput = document.getElementById("user-type");
//     const notification = document.getElementById("notification");
    
    
    
//     // Form Submission
//     const signupForm = document.getElementById("signup-form");
//     const adminCode = document.getElementById("admin-code");
//     const password = document.getElementById("password");
//     const confirmPassword = document.getElementById("confirm-password");
    
//     signupForm.addEventListener("submit", (e) => {
//         e.preventDefault();
        
//         // Password matching validation
//         if (password.value !== confirmPassword.value) {
//             alert("Passwords do not match!");
//             return;
//         }
        
//         // Admin code validation
        
        
//         // If everything is valid, redirect to appropriate dashboard
//         if (userTypeInput.value === "admin") {
//             window.location.href = "admin-dashboard.html";
//         } else {
//             window.location.href = "user-dashboard.html";
//         }
//     });
// });