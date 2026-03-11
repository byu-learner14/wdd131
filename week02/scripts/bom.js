// Select the DOM elements once (good practice)
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add click event listener to the "Add Chapter" button
button.addEventListener('click', function () {
    // Only proceed if the input has actual content (after removing extra spaces)
    if (input.value.trim() !== '') {
        // Create the list item
        const li = document.createElement('li');
        li.textContent = input.value;  // Set the chapter name as text

        // Create and configure the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
        deleteButton.classList.add('delete');  // Applies your .delete CSS styles

        // Attach the delete button to the list item
        li.append(deleteButton);

        // Add the new list item to the unordered list
        list.append(li);

        // Add click listener to the delete button (removes this specific item)
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();  // Return focus to input after delete
        });

        // Clean up the input field and put focus back for the next entry
        input.value = '';
        input.focus();
    } else {
        // If input is empty or just spaces, just refocus (no alert needed yet)
        input.focus();
    }
});
