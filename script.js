document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded');

    // Function to load content dynamically
    function loadContent(page) {
        const content = document.getElementById('content');
        content.innerHTML = '';

        switch (page) {
            case 'home':
                content.innerHTML = `
                    <h1>Welcome to My Portfolio</h1>
                    <p>Explore my work and projects.</p>
                `;
                break;
            case 'about':
                content.innerHTML = `
                    <h1>About Me</h1>
                    <div class="about">
                        <img src="base.jpg" alt="Profile Picture">
                        <p>Hi, I am a passionate graphic designer with years of experience in the industry. I specialize in creating visually compelling designs that effectively communicate your message. My goal is to help brands stand out through creative and strategic design solutions.</p>
                        <p>Skills:</p>
                        <ul>
                            <li>Graphic Design</li>
                            <li>Web Design</li>
                            <li>Illustration</li>
                            
                        </ul>
                    </div>
                `;
                break;
            case 'projects':
                content.innerHTML = `
                    <h1>Projects</h1>
                    <div class="gallery">
                        <div class="gallery-item">
                            <img src="388 copy.jpg" alt="Project 1">
                            <button class="view-btn" data-project="1">View Project</button>
                        </div>
                        <div class="gallery-item">
                            <img src="209.png" alt="Project 2">
                            <button class="view-btn" data-project="2">View Project</button>
                        </div>
                        <div class="gallery-item">
                            <img src="Screenshot.png" alt="Project 3">
                            <button class="view-btn" data-project="3">View Project</button>
                        </div>
                    </div>
                `;
                setupGallery();
                break;
            case 'contact':
                content.innerHTML = `
                    <h1>Contact Me</h1>
                    <form id="contact-form">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                `;
                setupForm();
                break;
            default:
                content.innerHTML = '<h1>Page Not Found</h1>';
        }
    }

    // Initialize EmailJS
    (function() {
        emailjs.init("3gY7Udjcarl6NuYl7"); // Replace "YOUR_USER_ID" with your actual EmailJS user ID
    })();

    // Smooth scrolling for navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.id.split('-')[0];
            loadContent(page);
        });
    });

    // Modal image gallery setup
    function setupGallery() {
        const modal = document.getElementById('project-modal');
        const closeModal = document.querySelector('.close');

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                loadProjectDetails(projectId);
                modal.style.display = 'block';
            });
        });

        closeModal.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Load project details into modal
    function loadProjectDetails(projectId) {
        const modalContent = document.getElementById('project-modal-content');
        // Fetch project details from a data source or hardcode for now
        const projects = {
            1: {
                title: 'Base Resturant',
                description: '',
                image: '388 copy.jpg'
            },
            2: {
                title: 'Bacup',
                description: '',
                image: '209.png'
            },
            3: {
                title: 'Laundry',
                description: ' ',
                image: 'Screenshot.png'
            }
        };

        const project = projects[projectId];
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}">
            <p>${project.description}</p>
        `;
    }

    // Setup contact form
    function setupForm() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = form.name.value;
            const email = form.email.value;
            const message = form.message.value;

            emailjs.send('service_9mdcfrn', 'template_z00ekes', {
                from_name: name,
                from_email: email,
                message: message
            }).then(response => {
                alert('Message sent successfully!');
                form.reset();
            }).catch(error => {
                alert('Failed to send message, please try again later.');
                console.error('EmailJS error:', error);
            });
        });
    }

    // Load home content initially
    loadContent('home');
});
