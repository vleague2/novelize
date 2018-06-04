'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [{
        title: "Names",
        note_text: `
        I want Mary and Aria to have a conversation about names -- Mary is discussing how her name just seems to really fit her because she is a modest and fairly bland person, unmemorable. She says this in good humor, mostly focusing on how weird it is that people don't even choose their names yet usually fit them so well. Aria's never thought about it so she is contemplating the idea when Mary asks what the story behind her name is. Aria shrugs because she doesn't know and again has never thought about it. Mary looks it up and sees that an aria is a song and also a mythological flower. Aria thinks this is hilarious because the two things seem so gentle and incongruous with her actual personality and wonders aloud why her mother had even picked such a name      
        `,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
