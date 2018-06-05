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
    {
      title: "The Ancient Language",
      world_text: `
      <ul>
        <li>
          Way back in the day, basically mythological times, there was extensive use of the ancient magic language by the residents of the same town. No one else could use the words but them, and at that point they primarily used healing words. (it was an actual language but when spoken by these people & imbued with intent and direction, magic happened.) the hunters also evolved from this town’s population so they knew the language as well. Aria’s lineage did weave its way into the hunter population so that is why she was genetically predisposed to be a hunter
        </li>
      </ul>
      `,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "The Hunters (as a group, organization)",
      world_text: `
      <ul>
      <li> History
        <ul>
          <li> The hunters have existed for as long as anyone can remember, and originated from the same town that had the Aria Flower (although no one can possibly know that). </li>
          <li>There have always been monsters, but for the most part they kept to themselves and hid in remote locations (high in mountains, deep in caves, far underwater). They are the source of many myths and rumors in humans </li>
          <li>So for as long as there have been monsters, there have been “humans” capable of fighting against them as a sort of equilibrium. Monsters are quite strong, physically, and if necessary can wreak havoc on humans. The hunter abilities are genetic but often skip many generations, so most families have no idea what’s going on when their children are forcibly removed</li>
          <li>Commanders have extensive records on hunter lineage and check up on families likely to give rise to a hunter. Once they have identified the individual, they have a couple of tactics: 1) find enough dirt on the family to have a legit reason to remove a child from the household with gov’t support; 2) find enough dirt to blackmail them with gov’t support; 3) pay off the family with gov’t support; or if the family already knows about the hunters, just take the kid (what happened to Aria)</li>
          <li>Monsters have an innate intelligence almost on par with humans, which is why they are so good at hiding usually and why they try to avoid conflict</li>
          <li>The problem with the hunters is that they don’t stop “aging,” as in they keep getting stronger and stronger as they get older (unlike humans, who cap out pretty early in terms of physical strength)</li>
          <li>Over time it became clear that the hunters were dangerous to humans, because they were strong enough to get away with whatever they wanted. The checks and balances from the monsters weren’t helping bc the monsters were so isolated. Some other related mythology/history -- demigods (hunters); witches (hunters) </li>
          <li>There were multiple crackdowns on hunters as people rose up against them, so they started to go into hiding to avoid persecution. Some hunters realized that they needed to ensure their survival by controlling their kin, and founded the group that runs HQ. They established hierarchy, order… and set up a system to kill hunters before they got too strong. They negotiated with the monsters to give them permission to kill hunters on sight, and to allow hunters to roam their lands to exterminate monsters (since they needed a reason to be sending hunters out there). It was an agreement that the monsters weren’t particularly happy about but they did it so that the hunters wouldn’t out them to the human world, and because they saw the wisdom in maintaining a balance of power between the monsters and the hunters. Some HQs became more demanding and then figured out ways to control the monsters themselves either thru magic or technology, which is what Aria’s HQ is doing.</li>
          <li>So anyway -- after the establishment of the HQ mothership (whatever it’s called), branches were created in Europe to cover the area that hunters occupied. As travel became easier and people married into different bloodlines, the hunter genetics spread globally and so did HQs. As far as the US, I think there are probably like 8 HQs in the country spread out fairly evenly
            <ul>
              <li> Ashlyn lives within a few hours of the HQ that Aria ends up at, because she knew it was going to happen</li>
              <li>Other children are relocated as necessary</li>
            </ul>
          </li>
          <li>The HQs are in league with global governments, who are aware of the situation and support the mission to keep control of the hunters and kill them off when they are still young. No one in power wants to deal with the unpredictability of superhumans. They also have a lot of wealth carried down from the days when the hunters were powerful enough to bully people around. That’s how they have money</li>
        </ul>
      </li>
      </ul>
      `,
      StoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Commander Pipeline",
      world_text: `
        <ul>
          <li>Most hunters don't live past high school, but the ones who do survive to 20 take commander exams, which initiate them into the HQ hierarchy (if they "pass."if not, mysterious death...). here they are introduced to the truth of HQ, the truth of the hunters, etc. and sworn to keep it secret and enforce the rules. most commanders are aged 20-40</li>
          <li>commanders also get specialized training, of course, to learn more spells and skills. they have access to the full library in HQ, which includes a restricted section that the regular hunters aren't allowed to access. this contains advanced spells and magic, like mind-altering magic, spatial magic, energy magic, biological magic....</li>
          <li> since hunters become more powerful as they age, the commanders are pretty invincible, especially armed with the spells they have in addition to their increasing physical strength. however, to keep the balance, monsters will actively target commanders over age 40 because they start to become too strong and thus too dangerous. it can be brutal, so often commanders will sacrifice themselves around that age because they also believe in maintaining the balance of power (part of their sworn mission)</li>
          <li>there are of course commanders who don't believe whole-heartedly in HQ's approach to raising and killing hunters, but join anyway in order to stay alive. there are other methods at other HQs , idk waht they are but the one Aria ends up at in the west coast is different</li>
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
