
// LIVE CLOCK

function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString();

    document.getElementById("date").textContent =
        now.toDateString();
}

updateClock();
setInterval(updateClock, 1000);


// TYPING ANIMATION

const typingText = "Aspiring Web Developer";
let index = 0;

function typeText() {
    if (index < typingText.length) {
        document.getElementById("typing").textContent +=
            typingText.charAt(index);

        index++;
        setTimeout(typeText, 100);
    }
}

typeText();

// DARK / LIGHT MODE

const themeButton = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeButton.textContent = "🌙 Dark Mode";
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeButton.textContent = "🌙 Dark Mode";
    } else {
        localStorage.setItem("theme", "dark");
        themeButton.textContent = "☀️ Light Mode";
    }
});

// SAVED TO-DO LIST

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const item = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        item.appendChild(text);
        item.appendChild(deleteButton);
        taskList.appendChild(item);
    });
}

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    tasks.push(task);

    localStorage.setItem("myTasks", JSON.stringify(tasks));

    taskInput.value = "";
    showTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

    tasks.splice(index, 1);
    localStorage.setItem("myTasks", JSON.stringify(tasks));

    showTasks();
}

if (taskInput && taskList) {
    const addTaskButton = document.getElementById("addTaskButton");

    if (addTaskButton) {
        addTaskButton.addEventListener("click", addTask);
    }

    showTasks();
}

// BACK TO TOP FUNCTION

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

topButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});

// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// SCROLL REVEAL ANIMATIONS

const revealSections = document.querySelectorAll(
    ".about, .interests, .projects, .contact"
);

revealSections.forEach(function(section) {
    section.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(function(section) {
    revealObserver.observe(section);
});


// GUESTBOOK SHOW / HIDE

function toggleGuestbook() {

    const form = document.getElementById("guestbookForm");
    const button = document.querySelector("#guestbook button");

    if (form.style.display === "none") {
        form.style.display = "block";
        button.textContent = "✕ Close Message Form";
    } else {
        form.style.display = "none";
        button.textContent = "💬 Leave a Message";
    }

}

// GUESTBOOK SUCCESS MESSAGE

const guestForm = document.getElementById("guestbookForm");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

guestForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton = guestForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    try {
        const response = await fetch(guestForm.action, {
            method: "POST",
            body: new FormData(guestForm),
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
    guestForm.style.display = "none";

    successMessage.style.display = "block";
    errorMessage.style.display = "none";

    guestForm.reset();

    document.getElementById("messageCount").textContent = "0 / 1000 characters";

    document.querySelector("#guestbook > button").textContent =
        "💬 Leave a Message";
}
        else {
            errorMessage.style.display = "block";
        }

    } catch (error) {
        errorMessage.style.display = "block";
    }

    submitButton.disabled = false;
    submitButton.textContent = "Send Message →";

});

// LIVE MESSAGE COUNTER

const visitorMessage = document.getElementById("visitorMessage");
const messageCount = document.getElementById("messageCount");

visitorMessage.addEventListener("input", function() {

    const count = visitorMessage.value.length;

    messageCount.textContent = count + " / 1000 characters";

});
// READING PROGRESS BAR
window.addEventListener("scroll", function () {
    const progressBar = document.getElementById("progressBar");

    const scrollTop = window.scrollY;
    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";
});
// ACTIVE NAVIGATION HIGHLIGHT
const sections = document.querySelectorAll(
    "#home, #about, #interests, #projects, #contact, #guestbook"
);

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

// PREMIUM INTERACTIVE PARTICLE BACKGROUND

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 1,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8
        });
    }
}

window.addEventListener("mousemove", function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseout", function() {
    mouse.x = null;
    mouse.y = null;
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function(p) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Mouse interaction
        if (mouse.x !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130 && distance > 0) {
                p.x += (dx / distance) * 1.5;
                p.y += (dy / distance) * 1.5;
            }
        }

        // Glowing particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.strokeStyle =
                    `rgba(56, 189, 248, ${1 - distance / 130})`;

                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();

window.addEventListener("resize", resizeCanvas);

// PORTFOLIO CHATBOT

const chatbotToggle = document.getElementById("chatbotToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

// OPEN CHAT
chatbotToggle.addEventListener("click", function() {
    chatWindow.style.display = "block";
});

// CLOSE CHAT
closeChat.addEventListener("click", function() {
    chatWindow.style.display = "none";
});

// ADD MESSAGE
function addMessage(message, className) {
    const messageDiv = document.createElement("div");

    messageDiv.className = className;
    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// CHATBOT ANSWERS
function getBotAnswer(question) {
    const q = question.toLowerCase();

    if (q.includes("who") || q.includes("about")) {
        return "Adhnan Mohammed is an aspiring web developer who enjoys learning and creating websites!";
    }

    if (q.includes("skill") || q.includes("language")) {
        return "Adhnan is learning HTML, CSS and JavaScript.";
    }

    if (q.includes("project")) {
        return "Adhnan has created a personal portfolio website. Explore the Projects section to learn more!";
    }

    if (q.includes("contact") || q.includes("email")) {
        return "You can contact Adhnan through the Contact section of this website.";
    }

    if (q.includes("interest") || q.includes("hobby")) {
        return "Adhnan enjoys web development, coding and learning new technologies.";
    }

    if (q.includes("hello") || q.includes("hi")) {
        return "Hello! 👋 Welcome to Adhnan's portfolio!";
    }

    return "Interesting question! Please explore Adhnan's portfolio to learn more. 😊";
}

// SEND MESSAGE
function sendChatMessage() {
    const question = chatInput.value.trim();

    if (question === "") return;

    addMessage(question, "user-message");

    chatInput.value = "";

    const answer = getBotAnswer(question);

    setTimeout(function() {
        addMessage(answer, "bot-message");
    }, 400);
}

sendMessage.addEventListener("click", sendChatMessage);

chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendChatMessage();
    }
});

