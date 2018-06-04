'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [{
        title: "1-10-13",
        story_text: `
        We were only sixty days into the new school year and all of my classmates already thought that I was doing hardcore drugs.

        My appearance wasn't helping. I'd jammed a winter beanie—one of the ones with a puffball on the top—over my messy hair (hadn't washed it in three days), and I felt shaky from two days of hospital food. My makeup was half-assed at best, and the sweatpants and t-shirt combo made me look homeless. I was tired and sore, but others interpreted it as side effects from drug use. I kept my sunglasses on as I walked through the halls to homeroom.

        I sat gingerly in my seat and shrugged off my backpack, letting it fall to the floor in a heap. The movement cost me a few seconds of chest pain, which I tried to keep out of my deadpan facial expression. My classmates looked over at me and didn’t hide their disgust. I suddenly wished I'd brought a cigarette and a lighter so that I could pretend to start smoking in class. That'd be a riot. But that would have been potentially dangerous with the trembling in my hands.

        Instead, I contented myself with lowering my face into my desk in an attempt to rest for a few minutes before class started. Inevitably, I eavesdropped on my classmates (even though they kept a one-desk radius away from me). 

        "She looks even worse than usual," one girl whispered. Mary, I think her name was. This was her first year away from private school. Not that I'd been keeping tabs on her to see how long it took her to turn into a real public school delinquent.

        "That's always how she looks," another girl scoffed. Probably one of Mary's stuck-up friends.

        "Whatever happened to Casey?" a third girl, Angelica, whispered. "She didn't come to class last week." 
        
        This was a separate conversation coming from the cool kids, the ones who smoked pot and partied but still kept great grades. 
        `,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stories', null, {});
  }
};
