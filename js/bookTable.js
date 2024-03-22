const books = JSON.parse(localStorage.getItem("books"));

// Wait for DOM content to be loaded before rendering
document.addEventListener("DOMContentLoaded", function () {
    renderBooks(books);
});

// Render the books table
function renderBooks(books) {
    const booksTableBody = document.getElementById("booksTableBody");

    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.id = `row-${index}`; 

        // Create cells for each book attribute
        ["name", "publishDate", "price", "authorName", "authorEmail"].forEach(attribute => {
            const cell = document.createElement("td");
            cell.textContent = book[attribute];
            row.appendChild(cell);
        });

        // Create action cell with edit and delete buttons
        const actionCell = document.createElement("td");
        const editButton = createButton("Edit", () => editBook(index));
        const deleteButton = createButton("Delete", () => deleteBook(index));
        deleteButton.classList.add("cancel");
        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        booksTableBody.appendChild(row);
    });
}

// Utility function to create buttons
function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

// Edit function
function editBook(index) {
    const book = books[index];
    const row = document.getElementById(`row-${index}`);

    if (row) {
        row.innerHTML = `
            <td><input type="text" id="editName" value="${book.name}"></td>
            <td><input type="date" id="editPublishDate" value="${book.publishDate}"></td>
            <td><input type="number" id="editPrice" value="${book.price}"></td>
            <td><input type="text" id="editAuthorName" value="${book.authorName}"></td>
            <td><input type="email" id="editAuthorEmail" value="${book.authorEmail}"></td>
            <td>
                <button onclick="saveEdit(${index})">Save</button>
                <button onclick="cancelEdit(${index})" class="cancel">Cancel</button>
            </td>
        `;
    }
}

// Save edited book details
// Save edited book details
function saveEdit(index) {
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books[index];

    const inputData = {
        name: document.getElementById("editName").value.trim(),
        publishDate: document.getElementById("editPublishDate").value.trim(),
        price: document.getElementById("editPrice").value.trim(),
        authorName: document.getElementById("editAuthorName").value.trim(),
        authorEmail: document.getElementById("editAuthorEmail").value.trim()
    };

    const validationRules = {
        name: /^[A-Za-z]{1,32}$/,
        publishDate: /^\d{4}-\d{2}-\d{2}$/,
        price: /^\d+(\.\d{1,2})?$/,
        authorName: /^[A-Za-z\s]{1,32}$/,
        authorEmail: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    };

    const errorMessages = {
        name: "Please enter a valid name (up to 32 characters).",
        publishDate: "Please enter a valid publish date in the format yyyy-mm-dd.",
        price: "Please enter a valid price (e.g., 10 or 10.99).",
        authorName: "Please enter a valid author name (up to 32 characters).",
        authorEmail: "Please enter a valid email address for the author."
    };

    let isValid = true;

    for (const field in inputData) {
        const value = inputData[field];
        const regex = validationRules[field];

        if (!value || !regex.test(value)) {
            alert(errorMessages[field]);
            isValid = false;
            break;
        }
    }

    if (isValid) {
        // Update book details
        for (const field in inputData) {
            book[field] = inputData[field];
        }

        books[index] = book;
        localStorage.setItem("books", JSON.stringify(books));
        renderBookAfterAction(index, books[index]);

    
    }
}



// Cancel editing book details
function cancelEdit(index) {
    renderBookAfterAction(index, books[index]);
}

// Render book details after edit or cancel
function renderBookAfterAction(index, book) {
    const row = document.getElementById(`row-${index}`);
    row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.publishDate}</td>
        <td>${book.price}</td>
        <td>${book.authorName}</td>
        <td>${book.authorEmail}</td>
        <td>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})" class="cancel">Delete</button>
        </td>
    `;
}

// Delete function
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    location.reload();
}