
const fields = [
    "name", "email", "phone", "location", "linkedin",
    "summary", "degree", "college", "year", "grade",
    "skills", "projects", "certifications", "experience"
];

function getValue(id, fallback) {
    return document.getElementById(id).value.trim() || fallback;
}

function updateResume() {

    document.getElementById("p-name").textContent =
        getValue("name", "Your Name");

    const contact = [
        document.getElementById("email").value,
        document.getElementById("phone").value,
        document.getElementById("location").value
    ].filter(value => value.trim()).join(" | ");

    document.getElementById("p-contact").textContent =
        contact || "Email | Phone | Location";

    document.getElementById("p-link").textContent =
        document.getElementById("linkedin").value;

    document.getElementById("p-summary").textContent =
        getValue("summary", "Your career objective appears here.");

    document.getElementById("p-degree").textContent =
        getValue("degree", "Your Degree");

    document.getElementById("p-college").textContent =
        getValue("college", "College Name");

    document.getElementById("p-year").textContent =
        document.getElementById("year").value;

    document.getElementById("p-grade").textContent =
        document.getElementById("grade").value;

    const skills = document.getElementById("skills")
        .value.split(",")
        .map(skill => skill.trim())
        .filter(skill => skill);

    const skillList = document.getElementById("p-skills");
    skillList.replaceChildren();

    (skills.length ? skills : ["Your skills appear here"]).forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillList.appendChild(li);
    });

    document.getElementById("p-projects").textContent =
        getValue("projects", "Your projects appear here.");

    document.getElementById("p-certifications").textContent =
        document.getElementById("certifications").value;

    document.getElementById("p-experience").textContent =
        document.getElementById("experience").value;
}

// Save form details in browser
function saveDraft() {
    const data = {};

    fields.forEach(id => {
        data[id] = document.getElementById(id).value;
    });

    localStorage.setItem("resumeDraft", JSON.stringify(data));
}

// Load previously saved details
function loadDraft() {
    try {
        const data = JSON.parse(
            localStorage.getItem("resumeDraft") || "{}"
        );

        fields.forEach(id => {
            if (typeof data[id] === "string") {
                document.getElementById(id).value = data[id];
            }
        });
    } catch (error) {
        console.log("Unable to load saved draft.");
    }
}

// Update preview whenever user types
fields.forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        updateResume();
        saveDraft();
    });
});

// Download resume as PDF
document.getElementById("downloadBtn").addEventListener("click", () => {
    updateResume();
    window.print();
});

// Clear all information
document.getElementById("clearBtn").addEventListener("click", () => {

    if (confirm("Are you sure you want to clear all details?")) {

        document.getElementById("resumeForm").reset();

        localStorage.removeItem("resumeDraft");

        updateResume();
    }
});

// Start application
loadDraft();
updateResume();
