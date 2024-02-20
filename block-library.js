function generateBlockLibrary() {
    const blocks = [
        {
            name: "Send Chat to Everyone",
            display: ["Send Chat ", "VARIABLE", " to Everyone"],
            type: 'Function',
            color: "#B5C0D0",
            value: [`{ "type": "sendChatMessage", "message": "`, `VARIABLE`, `" }`]
        },
        {
            name: "Add to Chat Filter",
            display: ["Add ", "VARIABLE", " to Chat Filter"],
            type: 'Function',
            color: "#CCD3CA",
            value: [`{ "type": "addChatFilter", "words": "`, `VARIABLE`, `" }`]
        },
        {
            name: "Report",
            display: ["Report"],
            type: 'Reporter',
            color: "#CCD3CA",
            value: [1234]
        },
    ];

    const category = [
        {
            name: "Functions",
            blocks: ["Send Chat to Everyone", "Add to Chat Filter"],
        },
        {
            name: "Reporters",
            blocks: ["Report"],
        },
    ];

    const blockContainer = document.getElementById("blockContainer");
    let currentCategoryBlocks = []; // Array to store blocks of the current category

    // Clear existing block library content
    blockContainer.innerHTML = '';

    // Iterate over each category in the 'category' array
    category.forEach(cat => {
        // Create a button for the category
        const categoryButton = document.createElement("button");
        categoryButton.textContent = cat.name; // Set button text to category name
        categoryButton.classList.add("block-category");
        blockContainer.appendChild(categoryButton); // Append button to block container

        // Attach click event listener to category button
        categoryButton.addEventListener("click", function() {
            // Hide blocks of previous category
            currentCategoryBlocks.forEach(block => {
                block.style.display = 'none';
            });

            // Clear the array of blocks for the previous category
            currentCategoryBlocks = [];

            // Generate and display blocks for the clicked category
            cat.blocks.forEach(blockName => {
                const blockInfo = blocks.find(b => b.name === blockName);
                if (blockInfo) {
                    const blockElement = document.createElement("div");
                    blockElement.textContent = blockInfo.name;
                    blockElement.classList.add("block");

                    // Add draggable attribute
                    blockElement.setAttribute("draggable", "true");

                    // Set background color based on block color in the 'blocks' array
                    blockElement.style.backgroundColor = blockInfo.color;

                    blockContainer.appendChild(blockElement);
                    currentCategoryBlocks.push(blockElement); // Add block to the array
                }
            });
        });
    });
}