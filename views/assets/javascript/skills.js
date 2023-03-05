const allSkills = {
    "STATS TRACKING": {
        "Aim Lab tracks your performance over time and provides detailed statistics on your accuracy, reaction time, and other important metrics.": 70,
        // CSS: 60,
        // JAVASCRIPT: 30,
    },
    "MEMORY MUSCLES": {
        "As you practice aiming at targets in the aim trainer, your brain and muscles learn to perform the actions needed to hit those targets consistently.": 40,
        // "LIGHTING & COMPOSITION": 70,
        // ANIMATION: 85,
    },
    "DIFFERENT MODES": {
        "Aim trainers typically offer several different modes to help players improve their aim, accuracy and performance in first-person shooter (FPS) games. ": 50,
        // "MOTION GRAPHICS": 85,
        // VFX: 40,
    },
    "FREE TO USE": {
        "Aim Lab is free to use, which means that you can start training right away without having to pay for anything and improve your gameplay.": 60,
        // "GAME DESIGN": 80,
        // DSA: 40,
    },
};
let skillCount = 1;
function AddSkillModule(title, progressObj) {
    function createElement(tag, className, parent) {
        const temp = document.createElement(tag);
        temp.classList.add(className);
        if (parent != undefined) {
            parent.appendChild(temp);
        }
        return temp;
    }

    const moduleObj = createElement("div", "card", skillsContainer);
    moduleObj.classList.add("animate");
    moduleObj.classList.add(`delay-${skillCount++}`);
    moduleObj.classList.add(`shadow`);
    createElement("div", "card-title", moduleObj).innerHTML = title;
    for (const key of Object.keys(progressObj)) {
        const skillBar = createElement("div", "skill-bar", moduleObj);
        createElement("div", "skill-bar-title", skillBar).innerHTML = key;
        const fill = createElement(
            "div",
            "skill-bar-meter-fill"
            // createElement("div", "skill-bar-meter", skillBar)
        );
        fill.classList.add("repeat");
        fill.style.width = `${progressObj[key]}%`;
    }
}

const skillsContainer = document.querySelector("#skills-container");
for (const key of Object.keys(allSkills)) {
    AddSkillModule(key, allSkills[key]);
}
