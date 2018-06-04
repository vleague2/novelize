'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [{
        name: "Aria",
        preview_text: "Main character. Stubborn, sarcastic, quick to anger",
        character_text: `
        <ul>
            <li> Appearance
            <ul>
                <li> 16 at start of story. Birthday in July </li>
                <li> 5’8” and lanky, but she has lean muscles </li>
                <li> She is weaker than other hunters but still stronger than normal humans, which might take her a bit to realize </li>
                <li> Dark, long hair that she usually wears in a messy bun or a braid, and when it’s down it’s usually uncombed </li>
                <li> Minimal makeup </li>
                <li> White </li>
                <li> She is hyperaware of any appearance indicators of tiredness - eye bags, sickly skin hue; and of injury - bruises, discoloration, temporary scars, boniness </li>
                <li> Penny-sized zigzag mark at the back of her neck </li>
            </ul>
            </li>
        </ul>
        `,
        character_image: "https://drive.google.com/open?id=1tm-v3TuBjIEgXg_87LdyUWzosKdG5XPF",
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
