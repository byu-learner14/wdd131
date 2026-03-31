// Select the BOM elements once
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Load chapters from localStorage or start with empty array
let chaptersArray = getChapterList() || [];

// Display all saved chapters when the page loads
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Button click event listener
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const chapter = input.value.trim();   // Clean input

        displayList(chapter);           // Display on screen
        chaptersArray.push(chapter);    // Add to array
        setChapterList();               // Save to localStorage

        input.value = '';               // Clear input
        input.focus();                  // Focus back on input
    } else {
        input.focus();
    }
});

// Function to display a chapter in the list
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${item}`);
    deleteButton.classList.add('delete');

    li.append(deleteButton);
    list.append(li);

    // Delete button functionality
    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Save the chaptersArray to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Retrieve chapters from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Delete chapter from array and update localStorage
function deleteChapter(chapter) {
    // Remove the ❌ from the end
    chapter = chapter.slice(0, chapter.length - 1);
    
    // Filter out the deleted chapter
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    
    // Update localStorage
    setChapterList();
}