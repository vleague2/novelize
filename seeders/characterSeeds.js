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

    {
      name: "Kyle",
      preview_text: "Rio’s boyfriend. Sporty, strong, sweet",
      character_text: `
      <ul>
        <li>extremely strong physically. weaker in magic so he just relies on brute force</li>
        <li>Basketball and sports nerd (aka jock)</li>
        <li>Gay!!</li>
        <li>Is 18 at start of story (one year younger than Rio), set to graduate the same year</li>
        <li>Normally a very sweet guy</li>
        <li>Has a fiery temper when he’s pushed past his limit, though</li>
      </ul>
      `,
      character_image: "https://vickileague.files.wordpress.com/2018/06/cbx-263152-unsplash.jpg",
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Mary",
      preview_text: "Aria’s only female friend. Modest, earnest, plain",
      character_text: `
      <ul>
        <li>Bisexual</li>
        <li>Raised in a very normal nuclear family - parents together, two kids (has a younger brother), very supportive family</li>
        <li>Went to a religious private school up until high school</li>
        <li>She’s mildly religious still, but retains all of the modesty and manners (modest clothing, no swearing, very polite)</li>
        <li>She’s gullible and open, and has a hard time understanding people who would do bad things</li>
        <li>Earnest</li>
        <li>Likes to bake</li>
        <li>Develops a fierce confidence in herself from spending time with Aria</li>
        <li>Calm personality balances Aria</li>
        <li>She’s a pretty plain person as far as style and makeup, but it suits her</li>
        <li>Parents are doctors and she plans to become a vet</li>
      </ul>
      `,
      character_image: "https://vickileague.files.wordpress.com/2018/06/henri-pham-348664-unsplash.jpg",
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      name: "Lena",
      preview_text: "Aria’s chaperone. Deceased",
      character_text: `
      <ul>
        <li>Took in Aria when she was 20 years old</li>
        <li>Never wanted kids, never wanted to chaperone. She was just the only commander available for Aria’s cohort</li>
        <li>Is a serious woman who takes her job seriously</li>
        <li>Feels empathetic to Aria but mostly hides it</li>
        <li>Has been dating her boyfriend for a few years</li>
      </ul>
      `,
      character_image: "https://vickileague.files.wordpress.com/2018/06/diana-simumpande-236151-unsplash.jpg",
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    ], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
