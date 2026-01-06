
document.addEventListener("DOMContentLoaded", () => {
   
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
    
   
    const guestBtn = document.getElementById("guest-btn");
    const adminBtn = document.getElementById("admin-btn");
    const userTypeInput = document.getElementById("user-type");
    
    
    guestBtn.addEventListener("click", () => {
        guestBtn.classList.add("active");
        adminBtn.classList.remove("active");
        userTypeInput.value = "guest";
        dismissAlert();
    });
    
    adminBtn.addEventListener("click", () => {
        adminBtn.classList.add("active");
        guestBtn.classList.remove("active");
        userTypeInput.value = "admin";
        dismissAlert();
    });
    
   
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const remember = document.querySelector("#remember");
    const loginButton = document.getElementById('login-button');
    
   
    let remembering = false;
    if (remember) {
        remember.addEventListener('change', () => {
            remembering = remember.checked;
        });
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
       
        setButtonLoading(loginButton, true);
        
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
            remember: remembering,
        };

        try {
            if (userTypeInput.value == "admin") {
                const response = await axios.post('https://evergreen-backend-80rh.onrender.com/api/login/admin', formData);
                const token = response.data.token
                localStorage.setItem('authToken', token);
                showNotification("Successfully Logged In, Welcome!");
                window.location.href = "admindashboard.html";
            } else {
                const response = await axios.post('https://evergreen-backend-80rh.onrender.com/api/login/guest', formData);
                const token = response.data.token
                localStorage.setItem('authToken', token);
                showNotification("Successfully Logged In, Welcome!");
                console.log('Account logged in successfully:', response.data);
                window.location.href = "userdashboard.html";
            }
        } catch (error) {
            showNotification("Invalid credentials", "error");
            console.error('Error logging in:', error);
           
            setButtonLoading(loginButton, false);
        }
    });
});


function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
       
        button.setAttribute('data-original-text', button.textContent);
        button.textContent = 'Logging in...';
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
       
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.textContent = originalText;
        }
    }
}

function dismissAlert() {
    const notification = document.getElementById("notification");
    if (notification) {
        notification.classList.remove("active");
    }
}

function showNotification(message = "", type = "success") {
    const notification = document.getElementById("notification");
    if (!notification) return;
    
    if (type == "success") {
        notification.classList.remove("error");
        notification.classList.add("bg-green-100", "text-green-800", "border", "border-green-200");
    } else {
        notification.classList.add("error");
    }
    notification.textContent = message;
    notification.classList.add("active");
}
