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
        character_image: "https://vickileague.files.wordpress.com/2018/06/andrea-tummons-450846-unsplash.jpg",
        StoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      name: "Rio",
      preview_text: "Aria’s main friend. Kind, calm, sarcastic, indecisive",
      character_text: `
      <ul>
        <li>Very tall, sharp cheekbones </li>
        <li>Gay!! </li>
        <li>Sarcastic but not mean </li>
        <li>Naturally a kind person who will help others</li>
        <li>19 at start of story -- failed a year in high school because he was too busy going to basketball practice and fighting monsters and then didn't do any homework, so he would be set to graduate at 19</li>
        <li>Patient but gets irritated easily with Aria</li>
        <li>Rarely ever angry</li>
        <li>Fairly indecisive and gets stressed easily</li>
        <li>Has grown fond of his sister since they’ve been hunters, in a protective older-brother way</li>
        <li>Grew up in a very religious family</li>
        <li>Has an older brother and another baby sister who were not hunters</li>
        <li>He was a sensitive and needy kid, but his parents didn’t give too much individualized attention</li>
        <li>Parents weren't very wealthy so they went through some hard times</li>
        <li>When they were approached about Rio and his sister, he remembers his parents were very torn about it -- they were offered a lot of money in exchange and spent a while debating it, which made him feel like he was being sold</li>
        <li>But when they found out they really had no choice his parents wept and he forgave them, and was glad he could provide them some money</li>
        <li>Excelled in hunter training due to his physical strength, and is pretty good at magic too. </li> 
        <li>Never really questioned the whole HQ/hunter thing, and hopes to start commander training in the next year if he makes it</li>
      </ul>
      `,
      character_image: "https://vickileague.files.wordpress.com/2018/06/kylo-ren-vanity-fair.jpg",
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

    },

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
