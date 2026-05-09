// =========================

    return team.imgURL || "GHL.png";

}

// =========================
// SORTABLE TABLES
// =========================

function makeSortable(tableId) {

    const table = document.getElementById(tableId);

    const headers = table.querySelectorAll("th");

    headers.forEach((header, index) => {

        header.addEventListener("click", () => {

            const tbody = table.querySelector("tbody");

            const rows = [
                ...tbody.querySelectorAll("tr")
            ];

            const ascending = !header.classList.contains("asc");

            headers.forEach(h => {

                h.classList.remove("asc");
                h.classList.remove("desc");

            });

            header.classList.add(
                ascending ? "asc" : "desc"
            );

            rows.sort((a, b) => {

                const aText = a.children[index]
                    .innerText
                    .trim();

                const bText = b.children[index]
                    .innerText
                    .trim();

                const aNum = parseFloat(aText);
                const bNum = parseFloat(bText);

                const numeric =
                    !isNaN(aNum) &&
                    !isNaN(bNum);

                if (numeric) {

                    return ascending
                        ? aNum - bNum
                        : bNum - aNum;

                }

                return ascending
                    ? aText.localeCompare(bText)
                    : bText.localeCompare(aText);

            });

            tbody.innerHTML = "";

            rows.forEach(row => {

                tbody.appendChild(row);

            });

        });

    });

}