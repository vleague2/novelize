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
    {
      title: "How to Fire a Gun",
      note_text: `See this article: www.google.com `,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Rewrite",
      note_text: `Need to rewrite the party scene to reflect Aria and Rio’s updated character bios, and incorporate Kyle into it`,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Rio & Camila",
      note_text: `They need to interact more during the story since they are related`,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Healing",
      note_text: `Adjust Aria's ability to center herself is not a result of healing magic (since other people can now use healing magic) but it has to be related to her actual abilities`,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Gov’t collusion",
      note_text: `so, when Rio & co take over HQ the gov't is probably going to come after them... since they aren't receiving reports any longer... or the commanders that join rio will continue to falsify reports`,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Lena",
      note_text: `with the school kids, aria pretends her chaperone is her mom just bc it means she has less to explain`,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "remove",
      note_text: `take out scenes:
      --monsters attack school, both times
      `,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
