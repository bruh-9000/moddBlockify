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
];