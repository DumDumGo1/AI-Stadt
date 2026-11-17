

const $ = id => document.getElementById(id);

// Alle Auswahlfelder
const fields = [
    "horse-name",
    "coat-color",
    "mane-color",
    "mane-style",
    "marking",
    "saddle-color",
    "pad-color",
    "bridle-color",
    "show-blanket",
    "rider-name",
    "skin-color",
    "hair-color",
    "top-color",
    "pants-color",
    "helmet-color",
    "show-helmet"
];

// Pferd und Reiterin aktualisieren
function updateDesign() {

    const coat = $("coat-color").value;
    const mane = $("mane-color").value;

    // Pferdefarbe
    document.querySelectorAll(".horse-coat").forEach(part => {
        part.style.fill = coat;
    });

    // Mähne und Schweif
    $("mane").style.fill = mane;
    $("tail").style.fill = mane;
    $("braid").style.stroke = mane;

    // Mähnenstil
    const style = $("mane-style").value;

    $("mane").style.display = style === "braided" ? "none" : "block";
    $("braid").style.display = style === "braided" ? "block" : "none";

    if (style === "short") {
        $("mane").setAttribute("d",
            "M393 111 Q378 74 396 62 Q389 104 416 112 Q399 127 390 143Z"
        );
    } else if (style === "long") {
        $("mane").setAttribute("d",
            "M393 111 Q378 74 396 62 Q389 104 416 112 Q393 140 386 178 Q367 163 378 130Z"
        );
    }

    // Abzeichen
    const marking = $("marking").value;

    $("star-mark").style.display = marking === "star" ? "block" : "none";
    $("blaze-mark").style.display = marking === "blaze" ? "block" : "none";
    $("socks").style.display = marking === "socks" ? "block" : "none";

    // Ausrüstung
    $("saddle").style.fill = $("saddle-color").value;
    $("saddle-pad").style.fill = $("pad-color").value;

    const bridleColor = $("bridle-color").value;
    $("bridle").setAttribute("stroke", bridleColor);

    // Zusätzliche Decke
    $("blanket").style.display =
        $("show-blanket").checked ? "block" : "none";

    $("blanket").style.fill = $("pad-color").value;

    // Reiterin
    const skin = $("skin-color").value;
    $("rider-face").style.fill = skin;
    $("rider-skin").style.fill = skin;
    $("rider-arm").style.fill = skin;
    document.querySelector("#rider-art circle").style.fill = skin;

    const hair = $("hair-color").value;
    $("rider-hair-back").style.fill = hair;
    $("rider-hair-front").style.fill = hair;

    $("rider-top").style.fill = $("top-color").value;
    $("rider-pants").style.fill = $("pants-color").value;

    // Helm
    $("rider-helmet").style.display =
        $("show-helmet").checked ? "block" : "none";

    $("helmet-shape").style.fill = $("helmet-color").value;
    $("helmet-brim").style.fill = $("helmet-color").value;

    // Namen
    const horseName = $("horse-name").value.trim() || "Dein Pferd";
    const riderName = $("rider-name").value.trim() || "Deine Reiterin";

    $("preview-horse-name").textContent = horseName.toUpperCase();
    $("preview-rider-name").textContent = riderName.toUpperCase();

    $("info-horse").textContent = horseName;
    $("info-rider").textContent = riderName;
}

// Bei jeder Änderung sofort aktualisieren
fields.forEach(id => {
    $(id).addEventListener("input", updateDesign);
    $(id).addEventListener("change", updateDesign);
});

// Tabs wechseln
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {

        document.querySelectorAll(".tab").forEach(button => {
            button.classList.remove("active");
        });

        document.querySelectorAll(".tab-content").forEach(content => {
            content.classList.remove("active");
        });

        tab.classList.add("active");
        $(tab.dataset.tab).classList.add("active");
    });
});

// Zufälliges Design
$("randomize").addEventListener("click", () => {

    fields.forEach(id => {
        const element = $(id);

        if (element.tagName === "SELECT") {
            const options = [...element.options];
            element.selectedIndex = Math.floor(Math.random() * options.length);
        }

        if (element.type === "checkbox") {
            element.checked = Math.random() > 0.5;
        }
    });

    updateDesign();
});

// Alles zurücksetzen
const defaults = {
    "horse-name": "Stardust",
    "coat-color": "#8b542f",
    "mane-color": "#211916",
    "mane-style": "long",
    "marking": "none",
    "saddle-color": "#493025",
    "pad-color": "#8bb8a1",
    "bridle-color": "#493025",
    "show-blanket": false,
    "rider-name": "Luna",
    "skin-color": "#f1c6a5",
    "hair-color": "#4a281b",
    "top-color": "#bd638a",
    "pants-color": "#292b35",
    "helmet-color": "#252525",
    "show-helmet": true
};

$("reset").addEventListener("click", () => {

    Object.entries(defaults).forEach(([id, value]) => {
        const element = $(id);

        if (element.type === "checkbox") {
            element.checked = value;
        } else {
            element.value = value;
        }
    });

    updateDesign();

    $("save-message").textContent = "Alles ist wieder auf Anfang gesetzt.";
});

// Fertig-Button
$("save-design").addEventListener("click", () => {

    const horseName = $("horse-name").value.trim() || "Dein Pferd";
    const riderName = $("rider-name").value.trim() || "Deine Reiterin";

    $("save-message").textContent =
        `✦ ${riderName} und ${horseName} sind ein tolles Team!`;
});

// Start
updateDesign();
