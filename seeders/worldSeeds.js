'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Worlds', [{
        title: "The Aria Flower",
        world_text: `
        <ul>
            <li>The flower existed way long ago, when humans were still primarily hunter-gatherers</li>
            <li>Primarily located in northeastern Europe, concentrated in one town</li>
            <li>It was said to have 4 petals: 3 caused instant death, but 1 could heal almost anything. Unfortunately the petals were indistinguishable</li> 
            <li>Went extinct as the supply was used up during illness outbreaks</li>
            <li>Mother comes from a long line of doctors & is a doctor herself. Aria's grandmothers all the way up the lineage all occupied some sort of healing-focused role, which she never really thought too hard about considering she was like 6</li>
            <li>The original starter of the healing lineage story: she was dying, and found the Aria flower nearby (perhaps she'd been attacked and left to die in a forest or s/t). The flower was thought to be deadly poisonous bc no one had ever eaten the healing petal (odds are low, and after the first few people tried it no one ate it again). So she was like "quick death!" but then ended up eating the healing petal and survived. She was then chosen to help others choose the right petal, which was like damn near impossible at first since her experience was dumb luck but over time she gathered some intel. The lineage used to specialize in administering the Aria Flower and helping patients choose a petal. Because it was so difficult (an art, really), each woman kept extensive records that she then passed to her daughter</li>  
        </ul>      
        `,
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Worlds', null, {});
  }
};
