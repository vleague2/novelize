'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Plots', [{
        title: "Opener",
        plot_text: `
        Story starts mid-October. The town is in northwester Oregon along the Cascade mountains. Story opens just after Aria tries to run away and has been punished by Commander Rilke with a biological spell that induces heart attacks.            
        `,
        position: 1,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "First day back in school",
        plot_text: `
        Aria has been doing poorly in school since she’d been assigned to Rilke in March, so she tries to go back earlier than is advisable in order to make up some work. We meet Rio and Kyle for the first time here. Consequently, she re-strains the injury and ends up back in the hospital with the help of Rio and Kyle
        `,
        position: 2,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Hospital visit",
        plot_text: `
        She tries to learn more about biological spells but can’t find any other info. We learn a little about the nurse and what HQ does to human dissenters. Aria is in the hospital for 5 days but we skip over most of it. We get a little mention about Lena's death
        `,
        position: 3,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Back to school",
        plot_text: `
        She returns to school and notices Mary is dating Angelica. At lunch she takes a mission and Rio harasses her a bit in hopes of getting more info about what happened to her. He also invites her to a party, which is rare for Aria. She runs her mission in the mountains, which is the first time we see monsters, and naturally injures herself. On her way back she decides to go to the party
        `,
        position: 4,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Party time - the teenage dream",
        plot_text: `
        The party's at Angelica's, so Mary is there and Aria interacts with her quite a bit on her search for Rio. We learn that Aria drinks quite a bit, and she smokes here for the first time. She learns about Angelica's ulterior motives and talks to Mary about it. Eventually she finds Rio, where they have a nice conversation about HQ and things and then Aria's pretty much dying so he drives her home
        `,
        position: 5,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Plots', null, {});
  }
};
