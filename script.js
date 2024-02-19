document.addEventListener("DOMContentLoaded", function() {
    const workspace = document.getElementById("workspace");
    const blockContainer = document.getElementById("blockContainer");
    const textInput = document.getElementById("textInput"); // Reference to the textarea
    let generatedText = ''; // Variable to store generated text
    let droppedBlocks = []; // Array to store dropped blocks

    // Dynamically generate blocks from the 'blocks' array
    blocks.forEach(block => {
        const blockElement = document.createElement("div");
        blockElement.textContent = block.name; // Use the 'name' property of the block object
        blockElement.classList.add("block");
        blockElement.setAttribute("draggable", "true");
        blockElement.style.backgroundColor = block.color || '#f0f0f0'; // Set background color or default to #f0f0f0
        blockContainer.appendChild(blockElement);
    });

    // Make blocks draggable
    const toolboxBlocks = document.querySelectorAll(".block");
    toolboxBlocks.forEach(block => {
        block.addEventListener("dragstart", function(event) {
            const blockContent = block.textContent; // Get the text content of the block
            const blockColor = block.style.backgroundColor; // Get the background color of the block
            // Create a clone of the dragged block with the text content and color
            const clone = block.cloneNode(true);
            clone.classList.add("dragging");
            clone.style.backgroundColor = blockColor; // Set the background color of the clone
            clone.style.position = "absolute"; // Set position to absolute
            clone.style.pointerEvents = "none"; // Avoid interaction with the clone
            document.body.appendChild(clone); // Append clone to the body
            event.dataTransfer.setDragImage(clone, 0, 0); // Set the drag image to the clone
            event.dataTransfer.setData("text/plain", blockContent); // Set the text data
        });
    });

    workspace.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    workspace.addEventListener("drop", function(event) {
        event.preventDefault();
        const blockContent = event.dataTransfer.getData("text/plain"); // Retrieve text data
        droppedBlocks.push(blockContent); // Store the dropped block content
    
        // Find the corresponding block object from the 'blocks' array
        const block = blocks.find(b => b.name === blockContent);
        const variableIndex = block.display.findIndex(part => part === "VARIABLE"); // Find the index of "VARIABLE" in the display array
        const blockColor = block.color; // Get the color of the block
    
        // Create a new block element and append it to the workspace
        const newBlock = document.createElement("div");
        newBlock.textContent = blockContent; // Set the text content of the new block
        newBlock.classList.add("block");
        newBlock.style.width = "auto"; // Set width to auto to fit the content
        newBlock.style.backgroundColor = blockColor; // Set the background color of the new block
    
        // Create a text input element for the variable
        const variableInput = document.createElement("input");
        variableInput.type = "text";
        variableInput.placeholder = "Enter variable";
        variableInput.style.width = "70px"; // Adjust the width as needed
        variableInput.style.marginLeft = "5px"; // Adjust the margin as needed
    
        // Insert the text input element at the position of "VARIABLE"
        const textNodes = block.display.map(part => {
            if (part === "VARIABLE") {
                return variableInput;
            } else {
                return document.createTextNode(part);
            }
        });
        newBlock.innerHTML = ""; // Clear existing content
        textNodes.forEach(node => {
            newBlock.appendChild(node);
        });
    
        workspace.appendChild(newBlock);

        // Create and append delete icon (trash can)
        const deleteIcon = createDeleteIcon(newBlock);
        workspace.appendChild(deleteIcon);
        deleteIcon.addEventListener("click", handleDeleteClick);
    });

    // Controls
    const generateButton = document.getElementById("generateButton");
    
    generateButton.addEventListener("click", function() {
        generateText(); // Call the function defined in generate.js
    });

    const resetButton = document.getElementById("resetButton");

    resetButton.addEventListener("click", function() {
        generatedText = ''; // Reset generated text
        textInput.value = ""; // Clear textarea
        workspace.innerHTML = ""; // Clear workspace
        droppedBlocks = []; // Clear the array of dropped blocks
    });

    // Function to create delete icon
    function createDeleteIcon(block) {
        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "🗑️";
        deleteIcon.classList.add("delete-icon");
        deleteIcon.style.position = "absolute";
        deleteIcon.style.top = `${block.offsetTop}px`;
        deleteIcon.style.left = `${block.offsetLeft + block.offsetWidth + 20}px`;
        deleteIcon.style.cursor = "pointer";
        return deleteIcon;
    }

    // Function to handle delete icon click
    function handleDeleteClick(event) {
        const deleteIcon = event.target;
        const block = deleteIcon.previousSibling;
        const workspace = block.parentElement;
        const remainingBlocks = Array.from(workspace.querySelectorAll('.block'));
        
        // Remove the block and delete icon
        workspace.removeChild(block);
        workspace.removeChild(deleteIcon);
        
        // Update the positions of remaining trash cans
        remainingBlocks.forEach((remainingBlock, index) => {
            const deleteIcon = remainingBlock.nextElementSibling;
            if (deleteIcon && deleteIcon.classList.contains('delete-icon')) {
                deleteIcon.style.left = `${remainingBlock.offsetLeft + remainingBlock.offsetWidth + 20}px`;
                deleteIcon.style.top = `${remainingBlock.offsetTop}px`;
            }
        });
    }
});
