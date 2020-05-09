export default {
    openModalForced: function(itemType) {
        document.getElementById(`add-${itemType}-modal`).setAttribute("data-backdrop","static");

        // DISABLE HIT ESCAPE KEY TO CLOSE
        document.getElementById(`add-${itemType}-modal`).setAttribute("data-keyboard","false");

        // SIMULATE A CLICK ON THE BUTTON THAT OPENS THE MODAL
        document.getElementById(`add-${itemType}-prompt`).click();

        // CHANGE THE MODAL TITLE SO IT MAKES MORE SENSE FOR A FIRST-TIME USER
        document.getElementById("modal-title").innerHTML = `Add a new ${itemType}!`;

        // REMOVE THE X BUTTON
        document.getElementById("x-button").style.display = "none";

        // REMOVE THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "none";
    },

    removeModalForcedAttributes: function(itemType) {
        // LET THE USER CLICK AWAY TO CLOSE THE MODAL
        document.getElementById(`add-${itemType}-modal`).setAttribute("data-backdrop","true");

        // LET THEM USE THE ESCAPE KEY TO CLOSE THE MODAL
        document.getElementById(`add-${itemType}-modal`).setAttribute("data-keyboard","true");

        // RESET THE TITLE TEXT
        document.getElementById("modal-title").innerHTML = `Add a ${itemType}!`;

        // SHOW THE X BUTTON
        document.getElementById("x-button").style.display = "inline";

        // SHOW THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "inline";
    },

    emptyModalContent: function() {
        document.getElementById("add-name-input").value = "";
        document.getElementById("add-preview-input").value = "";
        document.getElementById("add-image-input").value = "";
    },

    changeClass: function(id, active) {
        // @TODO this could probably be an actual component that takes in the active class instead of this awful garbage
        document.getElementById(id).setAttribute("class", `card rounded-0 ${active ? active : ''}`);
    },

    setEditorText: function(text) {
        window.frames['text-editor_ifr'].contentDocument.getElementById('tinymce').innerHTML = text;
    },

    decode: function(array) {
        return array.forEach(item => {
            Object.keys(item).forEach((key) => {
                if (item[key] !== null) {
                    item[key] = decodeURIComponent(item[key])
                }
                else {
                    item[key] = "";
                }
            })

            // item.name = decodeURIComponent(item.name)

            // if (item.character_text !== null) {
            //     item.character_text = decodeURIComponent(item.character_text);
            // }

            // else {
            //     // if we don't do anything, it just says "null" which is ugly
            //     item.character_text = "";
            // }

            // item.preview_text = decodeURIComponent(item.preview_text);
            // item.character_image = decodeURIComponent(item.character_image);
        })
    },
}