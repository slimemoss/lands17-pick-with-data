import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { awaitElement, log, addLocationChangeCallback } from "./utils";
import { DraftSection } from "./app/DraftSection.tsx";

log("React script has successfully started");

// Do required initial work. Gets called every time the URL changes,
// so that elements can be re-inserted as a user navigates a page with
// different routes.
async function main() {
    // Find <body/>. This can be any element. We wait until
    // the page has loaded enough for that element to exist.
    const body = await awaitElement("div.draft_section");
    const container = document.createElement("div");
    body.appendChild(container);
    const root = createRoot(container);
    root.render(<DraftSection/>);
}

// Call `main()` every time the page URL changes, including on first load.
addLocationChangeCallback(() => {
    // Greasemonkey doesn't bubble errors up to the main console,
    // so we have to catch them manually and log them
    main().catch((e) => {
        log(e);
    });
});
