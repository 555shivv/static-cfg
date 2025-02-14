// HTML element references
const container = document.getElementById("container");
const breadcrumbs = document.getElementById("breadcrumbs");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");

// Define folder structure
const fileStructure = {
    Outputs: {
        fusion_outputs: ["bank.png","Calculator.png","e commerce.png","fitness.png","food delivery.png","grade system.png","hospital.png","job application.png","library.png","Login Authentication.png","restaurant.png","shopping cart.png","temperature.png","traffic.png","travel booking.png"],
        Gemini_outputs: ["bank.png","Calculator.png","e commerce.png","fitness.png","food delivery.png","grade.png","hospital.png","job app.png","library.png","Login Authentication.png","restaurant.png","shopping cart.png","traffic lights.png","temperature.png","Calculator.png","travel booking.png"],
        lamma3_outputs: ["bank.png", "Calculator.png", "e commerce.png", "fitness monitor.png", "food delivery.png", "grade.png", "hospital.png", "job application.png", "library.png", "Login Authentication.png", "restaurant.png", "shopping cart.png", "traffic lights.png", "Temperature.png", "travel booking.png"],
        openai_outputs: ["bank.png", "Calculator.png", "e commerce.png", "fitness track.png", "food delivery.png", "grade.png", "hospital.png", "job application.png", "library.png", "Login Authentication.png", "restaurant.png", "shopping cart.png", "traffic lights.png", "temperature.png", "travel booking.png"],
        original_images:  ["bank.png", "Calculator.png", "e commerce.png", "Fitness.png", "food.png", "Grade.png", "Hospital.png", "Job Application.png", "library.png", "Login authentication.png", "restaurant.png", "shopping cart.png", "traffic.png", "temperature.png", "travel.png"]
    },
    dataset_outputs: {
        fusion: ["Child care.png","defense information management.png","digital library.png","money transaction.png","Weather and road monitoring.png"],
        gemini: ["Child care.png","defense information management.png","digital library.png","money transaction.png","Weather and road monitoring.png"],
        llama3: ["Child care.png","defense information management.png","digital library.png","money transaction.png","Weather and road monitoring.png"],
        openai: ["Child care.png","defense information management.png","digital library.png","money transaction.png","Weather and road monitoring.png"]
    },
    randomly_selected_datasets: [
        "1999 - dii (Defense Information Management).html",
        "2005 - nenios (Healthcare).html",
        "2004 - jse (Money Transaction).doc",
        "2005 - clarus high (Weather and Road condition monitoring).doc",
        "2007 - nlm (Digital Library Repository).doc"
    ]
};

// Initialize current path to root
let currentPath = [];

// Function to render breadcrumbs properly
function updateBreadcrumbs() {
    breadcrumbs.innerHTML = ''; // Clear existing breadcrumbs

    // Add "Home" link
    const homeLink = document.createElement("span");
    homeLink.textContent = "Home";
    homeLink.classList.add("breadcrumb-link");
    homeLink.onclick = () => {
        currentPath = [];
        renderContent(currentPath);
    };
    breadcrumbs.appendChild(homeLink);

    // Add folder structure links
    let pathAccumulator = [];
    currentPath.forEach((folder, index) => {
        pathAccumulator.push(folder);

        const separator = document.createTextNode(" > ");
        breadcrumbs.appendChild(separator);

        const folderLink = document.createElement("span");
        folderLink.textContent = folder;
        folderLink.classList.add("breadcrumb-link");
        folderLink.onclick = () => {
            currentPath = pathAccumulator.slice(0, index + 1);
            renderContent(currentPath);
        };
        breadcrumbs.appendChild(folderLink);
    });
}

// Render folders and files
function renderContent(path) {
    container.innerHTML = ""; // Clear the container
    updateBreadcrumbs(); // Update breadcrumbs

    let currentFolder = fileStructure;

    // Navigate through the nested folder structure
    path.forEach(folder => {
        currentFolder = currentFolder[folder];
    });

    // Render folders and files
    if (typeof currentFolder === "object" && !Array.isArray(currentFolder)) {
        // Render folders
        for (const folder in currentFolder) {
            const folderDiv = document.createElement("div");
            folderDiv.classList.add("folder");
            folderDiv.innerHTML = `
                <img src="folder.jpg" alt="${folder}">
                <p>${folder}</p>`;
            folderDiv.onclick = () => {
                currentPath.push(folder);
                renderContent(currentPath);
            };
            container.appendChild(folderDiv);
        }
    } else if (Array.isArray(currentFolder)) {
        // Render files
        currentFolder.forEach(file => {
            const fileDiv = document.createElement("div");
            fileDiv.classList.add("file");

            let filePath;
            if (file.endsWith(".png")) {
                filePath = `./${path.join("/")}/${file}`;
                fileDiv.innerHTML = `
                    <img src="${filePath}" alt="${file}">
                    <p>${file}</p>`;
                fileDiv.onclick = () => openModal(filePath);
            } else if (file.endsWith(".doc")) {
                filePath = `./${path.join("/")}/${file}`;
                fileDiv.innerHTML = `
                    <img src="word-icon.jpg" alt="${file}">
                    <p>${file}</p>`;
                fileDiv.onclick = () => downloadFile(filePath); // Trigger file download
            } else if (file.endsWith(".html")) {
                filePath = `./${path.join("/")}/${file}`;
                fileDiv.innerHTML = `
                    <img src="html-icon.png" alt="${file}">
                    <p>${file}</p>`;
                fileDiv.onclick = () => openInNewTab(filePath); // Open HTML in a new tab
            }

            container.appendChild(fileDiv);
        });
    }
}

// Function to open modal for image preview
function openModal(imagePath) {
    modal.style.display = "block";
    modalImage.src = imagePath;
}

// Close the modal
modalClose.onclick = () => {
    modal.style.display = "none";
};

// Function to download Word file
function downloadFile(filePath) {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop(); // Extract the filename from path
    link.click();
}

// Function to open HTML file in a new tab
function openInNewTab(filePath) {
    window.open(filePath, "_blank");
}

// Initial render
renderContent(currentPath);
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".file img, .image img");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <span class="modal-close">&times;</span>
        <img class="modal-content">
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector(".modal-content");
    const closeModal = modal.querySelector(".modal-close");

    images.forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImage.src = this.src;
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
    const linkContainer = document.getElementById("link");
    if (linkContainer) {
        linkContainer.style.display = "flex";
        linkContainer.style.justifyContent = "center";
        linkContainer.style.alignItems = "center";
        linkContainer.style.flexDirection = "column";
        linkContainer.style.marginTop = "40px";
    }
});
