// generate.js

function generateText() {
    let generatedText = ''; // Initialize generated text variable

    // Iterate through all blocks in the workspace
    const blocksArray = Array.from(workspace.querySelectorAll(".block"));
    blocksArray.forEach((block, index) => {
        const variableInput = block.querySelector("input[type='text']"); // Find the input element within the block
        if (variableInput) {
            const newValue = variableInput.value; // Get the value entered in the input
            
            // Remove spaces from the text content of the block
            const blockTextContent = block.textContent.trim().replace(/\s+/g, '');

            const blockInfo = blocks.find(b => {
                // Remove spaces from the name property of each block in the blocks array
                const blockName = b.name.trim().replace(/\s+/g, '');
                return blockName === blockTextContent;
            }); // Find the corresponding block object

            if (blockInfo) {
                // Replace "VARIABLE" placeholders with the actual variable value
                const replacedValue = blockInfo.value.map(part => {
                    if (part === 'VARIABLE') {
                        return newValue;
                    } else {
                        return part;
                    }
                }).join('');
                
                generatedText += replacedValue; // Append the replaced value to the generated text

                // If it's not the last block and the last character of the generated text is not a comma, append a comma
                if (index !== blocksArray.length - 1 && generatedText.charAt(generatedText.length - 1) !== ',') {
                    generatedText += ',';
                }

                generatedText += '\n'; // Add newline after each block
            } else {
                console.log('Block info not found for:', block.textContent.trim()); // Log if blockInfo is not found
            }
        }
    });

    // Update the textarea with the generated text
    textInput.value = generatedText.trim(); // Trim whitespace from the generated text
}