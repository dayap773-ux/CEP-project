/* =====================================================
   CIVICMAP - MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   1. DARK MODE
===================================================== */

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        darkModeBtn.textContent = "☀️";

        localStorage.setItem("civicTheme", "dark");

    } else {

        darkModeBtn.textContent = "🌙";

        localStorage.setItem("civicTheme", "light");

    }

});


/* Remember theme */

if (localStorage.getItem("civicTheme") === "dark") {

    document.body.classList.add("dark");

    darkModeBtn.textContent = "☀️";

}


/* =====================================================
   2. INTERACTIVE MAP
===================================================== */


/*
   Default location:
   Mumbai / Vasai-Virar region

   You can change these coordinates later.
*/

const map = L.map("map").setView(
    [19.3919, 72.8397],
    13
);


/* OpenStreetMap */

// Custom CivicMap background
const mapBox = document.getElementById("map");

mapBox.classList.add("custom-map");


/* =====================================================
   MAP MARKERS
===================================================== */


/* Water Supply */

const waterMarker = L.marker(
    [19.3955, 72.8350]
).addTo(map);

waterMarker.bindPopup(`
    <div class="map-popup">

        <h3>🚰 Water Supply</h3>

        <p>
            Municipal water supply facility.
        </p>

        <strong>
            Status: Available
        </strong>

    </div>
`);


/* Street Light */

const lightMarker = L.marker(
    [19.3890, 72.8450]
).addTo(map);

lightMarker.bindPopup(`
    <div class="map-popup">

        <h3>💡 Street Light</h3>

        <p>
            Street lighting facility.
        </p>

        <strong>
            Status: Working
        </strong>

    </div>
`);


/* Waste */

const wasteMarker = L.marker(
    [19.3980, 72.8420]
).addTo(map);

wasteMarker.bindPopup(`
    <div class="map-popup">

        <h3>🗑️ Waste Collection</h3>

        <p>
            Local garbage collection point.
        </p>

        <strong>
            Status: Active
        </strong>

    </div>
`);


/* Public Toilet */

const toiletMarker = L.marker(
    [19.3860, 72.8320]
).addTo(map);

toiletMarker.bindPopup(`
    <div class="map-popup">

        <h3>🚽 Public Toilet</h3>

        <p>
            Public sanitation facility.
        </p>

        <strong>
            Status: Available
        </strong>

    </div>
`);


/* Road Issue */

const roadMarker = L.marker(
    [19.3940, 72.8480]
).addTo(map);

roadMarker.bindPopup(`
    <div class="map-popup">

        <h3>🛣️ Road Issue</h3>

        <p>
            Road maintenance required.
        </p>

        <strong>
            Status: Pending
        </strong>

    </div>
`);


/* Drainage */

const drainageMarker = L.marker(
    [19.3820, 72.8400]
).addTo(map);

drainageMarker.bindPopup(`
    <div class="map-popup">

        <h3>🌧️ Drainage</h3>

        <p>
            Drainage infrastructure.
        </p>

        <strong>
            Status: Needs Attention
        </strong>

    </div>
`);


/* =====================================================
   3. MAP LOCATION BUTTON
===================================================== */


/*
   Adds a small custom control
   to return to the main neighbourhood.
*/

const HomeControl = L.Control.extend({

    options: {
        position: "topright"
    },

    onAdd: function () {

        const button =
            L.DomUtil.create(
                "button",
                "map-home-button"
            );

        button.innerHTML = "🏠";

        button.title =
            "Return to neighbourhood";

        button.style.padding = "8px 12px";

        button.style.cursor = "pointer";

        button.style.border = "none";

        button.style.borderRadius = "8px";

        button.style.background = "white";

        button.style.boxShadow =
            "0 3px 10px rgba(0,0,0,0.2)";


        button.onclick = function () {

            map.setView(
                [19.3919, 72.8397],
                13
            );

        };


        return button;

    }

});


map.addControl(
    new HomeControl()
);


/* =====================================================
   4. INFRASTRUCTURE CHART
===================================================== */

const chartCanvas =
    document.getElementById(
        "infrastructureChart"
    );


if (chartCanvas) {

    const ctx =
        chartCanvas.getContext("2d");


    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Roads",

                "Water",

                "Street Lights",

                "Waste",

                "Drainage",

                "Toilets"

            ],

            datasets: [{

                label:
                    "Infrastructure Condition (%)",

                data: [

                    75,

                    60,

                    85,

                    65,

                    45,

                    70

                ],

                borderWidth: 2,

                borderRadius: 8

            }]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1800,

                easing: "easeOutQuart"

            },


            scales: {

                y: {

                    beginAtZero: true,

                    max: 100,

                    ticks: {

                        callback:
                            function(value) {

                                return value + "%";

                            }

                    }

                }

            },


            plugins: {

                legend: {

                    display: true

                }

            }

        }

    });

}


/* =====================================================
   5. REPORT ISSUE FORM
===================================================== */

const issueForm =
    document.getElementById(
        "issueForm"
    );


if (issueForm) {

    issueForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const issue =
                document.getElementById(
                    "issue"
                ).value;


            const location =
                document.getElementById(
                    "location"
                ).value.trim();


            const description =
                document.getElementById(
                    "description"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                );


            if (
                !name ||
                !issue ||
                !location ||
                !description
            ) {

                message.textContent =
                    "⚠️ Please fill all fields.";

                message.style.color =
                    "#dc2626";

                return;

            }


            message.textContent =
                "✅ Thank you " +
                name +
                "! Your " +
                issue +
                " report has been submitted successfully.";


            message.style.color =
                "#16a34a";


            /* Reset form */

            issueForm.reset();


            /* Scroll to message */

            message.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


/* =====================================================
   6. NUMBER COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(
        ".counter"
    );


const counterObserver =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        const element =
                            entry.target;


                        const target =
                            parseInt(
                                element.textContent
                            );


                        let current = 0;


                        const duration =
                            1200;


                        const increment =
                            target /
                            (duration / 20);


                        const timer =
                            setInterval(
                                function() {

                                    current +=
                                        increment;


                                    if (
                                        current >=
                                        target
                                    ) {

                                        current =
                                            target;

                                        clearInterval(
                                            timer
                                        );

                                    }


                                    element.textContent =
                                        Math.floor(
                                            current
                                        );

                                },
                                20
                            );


                        counterObserver.unobserve(
                            element
                        );

                    }

                }
            );

        },
        {
            threshold: 0.5
        }
    );


counters.forEach(
    function(counter) {

        counterObserver.observe(
            counter
        );

    }
);


/* =====================================================
   7. SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".card, .dashboard-card, .about-card"
    );


const revealObserver =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    function(element) {

        revealObserver.observe(
            element
        );

    }
);


/* =====================================================
   8. 3D MOUSE TILT
===================================================== */

const cards =
    document.querySelectorAll(
        ".card, .dashboard-card, .about-card, .hero-card"
    );


cards.forEach(
    function(card) {

        card.addEventListener(
            "mousemove",
            function(event) {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -5;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    5;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-10px)
                     scale(1.02)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function() {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =====================================================
   9. SMOOTH NAVIGATION
===================================================== */

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(
        function(link) {

            link.addEventListener(
                "click",
                function(event) {

                    const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );


/* =====================================================
   10. CONSOLE MESSAGE
===================================================== */

console.log(
    "CivicMap loaded successfully 🚀"
);