import type { LessonContent } from '../data/types';

/** Level-1 lessons, Fiction and Novel Craft. Original prose; public-domain passages or labelled original demonstrations. */
export const LEVEL1_FICTION_NOVEL: LessonContent[] = [
  {
    id: 'fi-01',
    track: 'fiction',
    title: 'The scene, revisited',
    masterLens: 'Chekhov: the scene that turns quietly',
    hook: 'In lesson 10 a scene turned on whether a character got what they wanted. Now try the subtler turn: they get it, and discover they wanted something else.',
    body: `You already know the basic engine: a character wants something, something stands in the way, and by the end something has changed. Chekhov's stories run on that engine too, but the change he cares about is often internal and quiet. Nobody wins or loses in a dramatic sense. Instead, a character's understanding shifts — about another person, about their own life — and the world looks slightly different afterwards.

"The Lady with the Dog" opens with gossip: a new person has appeared on the sea-front, a lady with a little dog. Gurov, a practiced seducer bored with his marriage, takes an interest. His want is clear and small: another holiday affair. He gets it easily. The story's real turn comes later, when he discovers — to his own surprise — that he cannot forget her. He wanted an affair; he found love, which is much less convenient. The external goal was achieved; the internal one was revealed.

This is a powerful structure for literary fiction: the **false want** and the **real discovery**. A character pursues what they think they want. The scene's turn comes when they realize — or when the reader realizes before them — that the pursuit was about something else.

How to write a quiet turn:

- **Start with a clear, ordinary want.** Get through a job interview. Win an argument. Leave a party early. The reader must understand what the character is after.
- **Let the obstacle be partly internal.** The interviewer is easy; the problem is that the applicant keeps noticing how much she hates the office.
- **Plant the real want early but lightly.** A detail, a hesitation, an image the character returns to. Readers should feel it before the character names it.
- **Make the turn visible in behavior.** The character does something that shows the shift — leaves the job offer unsigned, stops arguing mid-sentence, stays at the party after all. Don't explain it in a paragraph of realization.
- **End close to the turn.** Chekhov rarely explains what his characters have learned. He ends with an image or a gesture and trusts us.

The quiet turn needs exactness. Because nothing loud happens, every detail carries weight. The reader is watching for the moment of change, and if the details are generic the moment passes unnoticed.

Notice the economy of the opening below: a rumor, a person, a dog, and a man with time on his hands. In two sentences Chekhov has a setting, a desire and the first hint of character — Gurov is "fairly at home" in Yalta, which means he's bored and looking.

Your exercise today uses the classic setup of the job interview, but the turn is internal: the applicant realizes they don't want the job. The challenge is making that realization visible without announcing it.`,
    modelPassage: {
      text: 'It was said that a new person had appeared on the sea-front: a lady with a little dog. Dmitri Dmitritch Gurov, who had by then been a fortnight at Yalta, and so was fairly at home there, had begun to take an interest in new arrivals.',
      source: 'Anton Chekhov, "The Lady with the Dog" (1899), trans. Constance Garnett, opening',
    },
    questions: [
      'What does "fairly at home there" tell you about Gurov’s state of mind? What does he want, before the story says so?',
      'The story opens with gossip ("It was said"). How does that choice establish the social world Gurov lives in?',
    ],
    exercise: {
      prompt: 'Write a job interview scene in which the applicant slowly realizes they do not want the job. Show the realization through what they notice and do, not through a paragraph of thought.',
      constraints: [
        'The applicant’s stated want (to get the job) is clear in the first paragraph.',
        'Plant at least two small details that point to the real want before the turn.',
        'The turn is shown through an action or a line of dialogue.',
        'End within three sentences of the turn. No explanation.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Clarity of stated want', 'Planting of the real want', 'Visible turn', 'Concrete detail', 'Restraint at the end'],
    pitfalls: [
      'Announcing the realization ("She suddenly understood that...").',
      'A turn with no planting, so it feels arbitrary.',
      'An aftermath paragraph that explains what the turn meant.',
    ],
    microConstraint: null,
  },
  {
    id: 'fi-02',
    track: 'fiction',
    title: 'Dialogue and subtext, deeper',
    masterLens: 'Hemingway: the quarrel about nothing',
    hook: 'In a long conversation, power changes hands. Subtext is not only what people mean; it is who is winning.',
    body: `In lesson 9 you wrote dialogue in which the important thing went unsaid. Now push further: sustain subtext across a longer exchange and track a second invisible current — **power**. In every real conversation, someone has more of it. They control the topic, the pace, what is acknowledged and what is ignored. And in good dialogue, power shifts.

The opening of *Pride and Prejudice* is a masterclass. Mrs. Bennet has news and wants to deliver it. Mr. Bennet knows this and refuses to ask. Every line is a small battle: she offers the topic, he declines it, she pushes, he declines more elaborately, until finally he gives in with a line so dry it is itself a victory — "You want to tell me, and I have no objection to hearing it." The scene is ostensibly about a house being let. It is really about a marriage, and who holds the advantage in it.

Hemingway's quarrels work the same way. In "Hills Like White Elephants," the man has more power — he wants the operation, he has the money, he controls the logic. But the woman's evasions, sarcasm and refusals gradually take power back, until the final lines leave us unsure who has won.

Techniques for power in dialogue:

- **Withholding.** The character who refuses to give what's wanted — an answer, an acknowledgment, attention — holds power.
- **Topic control.** Who changes the subject? Who refuses to follow?
- **Answering a different question.** A character who responds to what they wish had been asked is resisting.
- **Silence and short replies.** Mr. Bennet "made no answer." Brevity can dominate a talker.
- **The reversal.** The weaker party suddenly finds leverage — a secret, a threat, an unexpected calm. These shifts are the beats of the scene.

Dividing a dead parent's belongings, as in today's exercise, is perfect ground for this. The objects are trivial — a watch, a set of plates, a chair — and they stand for everything: who was loved more, who did the caretaking, who left. Siblings will fight over a salad bowl when they are really fighting over their childhood.

A method for drafting: first, write a private note for yourself listing what each character really wants and what each refuses to say. Then write the scene without ever stating those things. Afterwards, mark each line where power shifts. If you can't find at least three shifts, the conversation is static.

Keep tags minimal. Let action beats carry tone: a hand that stops wrapping a plate, someone who keeps their coat on. Physical objects in a scene like this are gifts — use them as weapons, peace offerings, and evidence.`,
    modelPassage: {
      text: '"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"\nMr. Bennet replied that he had not.\n"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."\nMr. Bennet made no answer.\n"Do you not want to know who has taken it?" cried his wife impatiently.\n"You want to tell me, and I have no objection to hearing it."',
      source: 'Jane Austen, Pride and Prejudice (1813), chapter 1',
    },
    questions: [
      'Track the power in this exchange line by line. Who has it at the start, and how does Mr. Bennet keep it?',
      'Mr. Bennet finally agrees to listen. Why is his last line still a victory rather than a surrender?',
    ],
    exercise: {
      prompt: 'Two adult siblings divide a dead parent’s belongings in the parent’s house. They argue about objects; they are really arguing about something else. Power must change hands.',
      constraints: [
        'Before drafting, note privately what each sibling really wants and will not say (the note does not count).',
        'At least 60% dialogue; the real subject is never stated outright.',
        'At least three shifts of power, each marked by a specific line or action.',
        'Use at least two objects as weapons or offerings.',
      ],
      minWords: 400,
      maxWords: 600,
    },
    rubric: ['Subtext', 'Shifts of power', 'Distinct voices', 'Use of objects', 'Economy'],
    pitfalls: [
      'A static argument where the same person wins every exchange.',
      'Characters stating the real grievance in a climactic speech.',
      'Objects as decoration rather than as stakes.',
    ],
    microConstraint: null,
  },
  {
    id: 'fi-03',
    track: 'fiction',
    title: 'Character through action',
    masterLens: 'Tolstoy: character as conduct',
    hook: 'Readers don’t believe what you tell them about a character. They believe what the character does when it costs something.',
    body: `*She was generous. He was a coward. They were good people.* Statements like these are among the weakest sentences in fiction, because readers don't take characterization on trust. They watch behaviour. A character is what they do — especially what they do under pressure, when the right choice and the easy choice come apart.

Tolstoy understood this better than almost anyone. His narrators know everything about their characters, yet they rarely sum them up. Instead they show conduct: how a man behaves at a funeral when he would rather be playing cards, how a woman arranges her face when she hears bad news, what a husband does on the morning after his wife has discovered his affair. The judgment is the reader's.

The key is **choice under pressure**. Small choices with nothing at stake reveal little. Choices that cost something — money, comfort, pride, safety, a relationship — reveal who a person is. The pressure doesn't have to be dramatic. A man who finds a wallet with three hundred dollars in it, on a day he is short on rent, is under real pressure. What he does next tells us more than a page of description.

How to reveal character through action:

- **Create a dilemma.** Put the character in a situation where two things they care about conflict.
- **Make the choice specific and physical.** Not *he decided to be honest* but the exact sequence: he counts the money, puts two bills in his pocket, takes them out again, walks to the bus stop.
- **Let contradictions show.** Real people behave inconsistently. A man who returns the wallet but takes the gift card inside is more interesting than a saint or a thief.
- **Notice the small gestures around the big choice.** How someone hesitates, rationalizes, glances around to see if they're watched. These details carry interiority without explanation.
- **Withhold the verdict.** Don't tell the reader what the action means. If you've chosen well, they will feel it.

The passage for today is an original demonstration, written for this lesson, of the principle at work. Notice that it never uses an adjective for the man's character. Everything is conduct — what he counts, where he looks, what he does with his hands — and yet by the end you have a strong sense of who he is, including the contradiction at his center.

Your exercise uses the found-wallet setup, deliberately a cliché, because the challenge is in the execution. Make the choice cost something. Make it specific. Let the character surprise you.`,
    modelPassage: {
      text: 'He counted it twice on the bench, the second time slower, as if the number might change. Three hundred and forty. He looked at the driver’s license, a woman his mother’s age, then at the bus shelter across the road where nobody was watching. He put the cash in his jacket, zipped it, and sat for a while. When the bus came he got on, paid with exact change, and spent the ride writing the woman’s address on the back of his hand so he wouldn’t lose it.',
      source: 'Original demonstration (technique after Tolstoy), written for this lesson',
    },
    questions: [
      'The passage never says whether the man is honest. What do you think he will do, and which specific actions make you think so?',
      'Find the contradiction in his behavior. Why does a contradiction make a character more convincing than consistency would?',
    ],
    exercise: {
      prompt: 'A character finds a wallet with a significant amount of cash on a day they badly need money. Show who they are by what they do in the next hour.',
      constraints: [
        'No adjectives describing the character’s personality or morals.',
        'Make the cost explicit early: show exactly why they need the money today.',
        'Render the decision as a sequence of physical actions, including at least one hesitation.',
        'Include one contradiction in their behavior.',
      ],
      minWords: 300,
      maxWords: 500,
    },
    rubric: ['Pressure and cost', 'Specificity of action', 'Contradiction', 'Restraint (no verdict)', 'Concrete detail'],
    pitfalls: [
      'Telling us the character’s nature ("she was always honest").',
      'A choice that costs nothing, so it reveals nothing.',
      'A simple saint or villain with no contradiction.',
    ],
    microConstraint: null,
  },
  {
    id: 'fi-04',
    track: 'fiction',
    title: 'Choosing point of view',
    masterLens: 'Woolf: the angle of entry',
    hook: 'The same events told from a different chair become a different story. Choosing who sees is choosing what the story means.',
    body: `In lesson 13 you learned the mechanics of point of view: first person, close third, omniscience, free indirect style. Now the larger question — **whose** point of view? This is one of the most consequential decisions in fiction, and beginners usually make it by default: they tell the story from the perspective of the person at the center of the action. Often that's the wrong choice.

The perspective character determines:

- **What the reader knows.** A POV character can only report what they perceive and understand. Choosing someone who misunderstands creates irony; choosing someone who knows too much kills suspense.
- **What the reader feels.** We tend to sympathize with whoever's head we're in. Put us inside the person who does something terrible and the story becomes about understanding them.
- **What the story is about.** A divorce told by the husband, the wife, their child, or the marriage counsellor is four different stories.

The most interesting choice is often **not the protagonist** but someone beside them: a witness, a minor participant, the person affected rather than the person acting. *The Great Gatsby* is narrated by Nick, not Gatsby, and the novel's whole meaning — its mix of fascination and judgment — depends on that distance.

Jane Austen shows another subtlety in the opening of *Emma*. The narrator seems to report Emma's situation objectively — handsome, clever, rich, happy. But the word "seemed" quietly signals that this is partly Emma's own view of herself, and that the narrator knows more. From the first sentence we stand slightly apart from our heroine, able to see what she can't. That irony is the engine of the whole novel.

Questions to ask when choosing:

1. Who has the most at stake? (Often the obvious choice.)
2. Who will be most changed by the events? (Often a better choice.)
3. Who knows the least and must discover the most? (Good for suspense.)
4. Whose misunderstanding would be most revealing? (Good for irony.)
5. Who is the least obvious witness? (Good for originality.)

A practical test: write the first paragraph of your story from three different characters' perspectives. Usually one of them suddenly makes the story more alive — more tension, more strangeness, more feeling. That's your POV.

Today you will take a single event and tell it from the perspective of the least obvious person present. The goal is to discover how much a story changes when you move the camera.`,
    modelPassage: {
      text: 'Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.',
      source: 'Jane Austen, Emma (1815), opening',
    },
    questions: [
      'Which single word tells you the narrator does not fully share Emma’s view of her own life? What does it suggest about the story ahead?',
      '"Very little to distress or vex her" sounds like praise. Why might it also be a warning?',
    ],
    exercise: {
      prompt: 'Choose an event with several people present — a wedding toast that goes wrong, a car accident, a family dinner where news is announced, a firing at work. Tell it from the point of view of the least obvious person there.',
      constraints: [
        'Before drafting, list everyone present and note in one line why you chose this POV (the list does not count).',
        'Stay strictly inside that character’s perception: no knowledge they could not have.',
        'The POV character must misunderstand or notice something that others miss.',
        'Close third person or first person.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Originality of POV choice', 'POV discipline', 'What the angle reveals', 'Concrete perception', 'Prose rhythm'],
    pitfalls: [
      'Choosing the obvious protagonist out of habit.',
      'Slipping into knowledge the POV character could not have.',
      'A witness who merely observes, with no stake or perspective of their own.',
    ],
    microConstraint: null,
  },
  {
    id: 'n-01',
    track: 'novel',
    title: 'Premise',
    masterLens: 'Tolstoy: Ivan Ilych’s life as a single ironic premise',
    hook: 'A premise is not a plot summary. It is a situation with an irony built in, compact enough to carry four hundred pages.',
    body: `Every novel begins as a premise: a compressed statement of the story's central situation. A weak premise is a topic (*a novel about fame*). A slightly better one is a plot (*a man becomes famous and then dies*). A strong premise contains a character, a desire, an obstacle and — most importantly — an **irony**: a gap between what the character pursues and what the pursuit will cost or reveal.

Tolstoy's *The Death of Ivan Ilych* has one of the great premises: a man who lived his whole life correctly, pleasantly, by the rules of his society, discovers on his deathbed that he has not lived at all. The irony is total. Everything he valued — propriety, status, a well-decorated apartment — becomes, in the face of death, the evidence against him. The premise is short enough to say in one breath, and it generates every scene in the book.

Shelley's "Ozymandias," below, is a premise compressed into fourteen lines. A king commands the mighty to look on his works and despair; nothing remains of the works but sand. The inscription meant to guarantee remembrance now testifies to oblivion. The irony is built into the image itself.

Your own premise — a man stakes everything on being remembered and dies having wasted his life — belongs to this family. That's a strength: the theme has a lineage, from Ecclesiastes to Herostratus to Tolstoy. It's also a danger, because the irony is visible from the start. Readers will see the ending coming. So the premise must find its freshness somewhere else: in the specific man, the specific way he pursues remembrance, the specific form the waste takes.

The elements of a working premise:

- **A specific protagonist.** Not "a man" but a man of a particular class, place, era, temperament. What kind of remembrance does *he* want — fame, a building with his name, a child who reveres him, an enemy who never forgets?
- **A concrete desire.** What, precisely, does he do in pursuit of it? Write a book? Build a company? Commit a spectacular act?
- **An obstacle.** What stands in the way — other people, his own limits, the indifference of the world?
- **The irony.** Where does the pursuit turn on itself? What does it destroy that he didn't know he valued?
- **The question.** What does the premise leave genuinely open? (More on this next lesson.)

The best way to find your premise is to write many versions of it. Each version moves the emphasis — toward the character, the desire, the irony, the setting. Most will be flat. One or two will surprise you, and those are the ones to follow.`,
    modelPassage: {
      text: 'I met a traveller from an antique land,\nWho said—"Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal, these words appear:\nMy name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away."',
      source: 'Percy Bysshe Shelley, "Ozymandias" (1818)',
    },
    questions: [
      'State the irony of "Ozymandias" in one sentence. Where exactly in the poem does it land?',
      'The story reaches us secondhand, through a traveller. What does that distance add to the poem’s point about remembrance?',
    ],
    exercise: {
      prompt: 'Write five different versions of your novel’s premise in one or two sentences each. Then choose the strongest and expand it into a page explaining the protagonist, his desire, the obstacle and the irony.',
      constraints: [
        'Five numbered versions, each shifting the emphasis (character, desire, setting, irony, ending).',
        'Each version names a specific kind of remembrance he wants.',
        'Expansion: name the protagonist, his concrete pursuit, the main obstacle, and where the irony bites.',
        'The expansion may not reuse the phrase "the cost of living for the verdict of strangers" — find new words.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Specificity', 'Strength of irony', 'Range across versions', 'Dramatic potential', 'Fresh language'],
    pitfalls: [
      'Writing a topic ("a novel about fame") instead of a situation.',
      'Five versions that are the same sentence reworded.',
      'A generic protagonist ("a man") with no specific kind of hunger.',
    ],
    microConstraint: null,
  },
  {
    id: 'n-02',
    track: 'novel',
    title: 'Theme as a question',
    masterLens: 'Dostoevsky: the question argued through characters',
    hook: 'A novel with a message is a sermon. A novel with a question is an argument the reader can’t stop having.',
    body: `Beginning novelists often think of theme as a message: *living for others' approval is empty.* The danger is that the novel then becomes a demonstration, and every scene exists to prove a point the reader accepted on page one. Characters turn into examples. Opposition is weak because the author has already decided it's wrong. The book is dead before it starts.

The alternative is to treat theme as a **question** — a real one, which the novel tests rather than answers. Not *living for fame is empty* but *can a life be justified by how it is remembered?* or *is the hunger to be remembered vanity, or the last form of hope?* A question can be argued from several sides. It can be dramatized through characters who answer it differently. It can stay open even after the plot closes.

Dostoevsky is the master of the theme-as-question. *The Brothers Karamazov* asks whether, if God does not exist, everything is permitted, and whether a world containing the suffering of children can be accepted at all. Crucially, he gives the arguments against his own beliefs to Ivan Karamazov — and makes them so powerful that readers have debated them ever since. In the chapter called "Rebellion," Ivan collects stories of children's suffering and tells his devout brother Alyosha that no future harmony can justify them. He doesn't deny God; he refuses the bargain. The line below is his conclusion. Dostoevsky, a believer, wrote the most famous case against acceptance in literature, because he understood that a question is only worth asking if the other side can win.

How to work with theme as a question:

- **Phrase it as a genuine question.** If you can answer it confidently in a sentence, it's a message. Keep rephrasing until it makes you uncomfortable.
- **Give the question to characters.** Different characters embody different answers. Their conflicts are the theme argued in action.
- **Make the opposing side strong.** The character who represents the answer you disagree with should be intelligent, sympathetic and, sometimes, right.
- **Test it in scenes.** Each major scene should put pressure on the question from a different angle.
- **Let the ending ask.** Your spec says it well: the ending should ask rather than answer. Plot can resolve while the question deepens.

For your novel, this is critical. The premise — a man who wastes his life seeking remembrance — risks becoming a sermon against ambition. To keep it alive, someone in the book must make the case *for* his hunger, and make it well. Perhaps remembrance is the only answer to death that most people have. Perhaps the alternative, a quiet unremembered life, is its own kind of waste.`,
    modelPassage: {
      text: 'It’s not God that I don’t accept, Alyosha, only I most respectfully return Him the ticket.',
      source: 'Fyodor Dostoevsky, The Brothers Karamazov (1880), Book V, "Rebellion", trans. Constance Garnett',
    },
    questions: [
      'Ivan distinguishes between not accepting God and returning the ticket. What exactly is he refusing, if not belief?',
      'Why does "most respectfully" make the line more devastating than an angry rejection would be?',
    ],
    exercise: {
      prompt: 'State your novel’s question in three different phrasings. Choose one. Then write a scene in which a character argues the side of the question you are least inclined to believe, and argues it well.',
      constraints: [
        'Three phrasings of the question at the top, each genuinely open (they count toward the piece).',
        'The scene: two characters, one of whom makes the strongest case for the side you disagree with.',
        'That character must win at least one exchange.',
        'No narrator commentary on who is right.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Openness of the question', 'Strength of the opposing case', 'Dramatization', 'Character depth', 'Prose clarity'],
    pitfalls: [
      'A question that is really a message ("Isn’t fame empty?").',
      'An opposing character who exists to be refuted.',
      'Arguments delivered as essays rather than as people speaking.',
    ],
    microConstraint: null,
  },
  {
    id: 'n-03',
    track: 'novel',
    title: 'Want versus need',
    masterLens: 'Tolstoy: Ivan’s propriety versus his need for truth',
    hook: 'What a character chases drives the plot. What a character actually needs drives the meaning. The gap between them is the story.',
    body: `Novelists distinguish between a protagonist's **want** — the conscious goal they pursue — and their **need** — what would actually make their life whole, which they usually don't recognize. The want is external and visible: money, love, revenge, fame. The need is internal and hidden: honesty, connection, forgiveness, peace. Plot follows the want. Character arcs follow the need.

The most powerful stories put want and need in conflict. Pursuing the want moves the character further from the need. And the climax forces a choice — or a recognition — that reveals which one matters.

Ivan Ilych wants a correct, comfortable, respectable life: promotion, a well-furnished apartment, card games with the right people. He gets it. What he needs, it turns out, is truth — about his life, his marriage, his death. Everyone around him lies about his illness, and the lie torments him more than the pain. Only the peasant servant Gerasim, who doesn't pretend, comforts him. At the end, the question below breaks through: *what if my whole life has really been wrong?* That question is the need, finally surfacing. It costs him everything he wanted, and it's the only thing that frees him.

How to build want and need:

- **The want must be concrete and active.** The character does things to get it. "He wants to be remembered" is a start; "he wants his name on the new library wing" is a want you can dramatize.
- **The need must be hidden from the character.** If they know their need, there's no arc. The reader may sense it long before they do.
- **The want should actively damage the need.** Every step toward the library wing should cost him something real — his daughter's trust, his honesty, his health.
- **Plant the need early.** Small scenes, images, or relationships where the need flickers: the friend he keeps putting off, the hobby he abandoned, the person who sees through him.
- **The climax tests both.** Does he choose the want or the need? Does he recognize the need too late? Tragedy often lies in recognizing the need after the want has consumed the life — which is exactly your premise.

For your novel: the want is remembrance, but that's still abstract. What specific form does it take? And what is the need it's destroying? Perhaps intimacy — being known by a few people rather than noticed by many. Perhaps presence — living in his days instead of in his imagined future reputation. The answer you choose will shape every scene.

Today's exercise asks you to dramatize the moment the want is achieved and proves insufficient. It's the scene in which the reader, and maybe the character, first glimpses the need.`,
    modelPassage: {
      text: '"What if my whole life has really been wrong?"\n\nIt occurred to him that what had appeared perfectly impossible before, namely that he had not spent his life as he should have done, might after all be true.',
      source: 'Leo Tolstoy, The Death of Ivan Ilych (1886), chapter 11, trans. Louise and Aylmer Maude',
    },
    questions: [
      'What did Ivan want all his life, and what does this passage reveal he needed? Name each in a few words.',
      'Why does Tolstoy phrase the realization as a question, and then as something that "might after all be true", instead of a certainty?',
    ],
    exercise: {
      prompt: 'Write a scene in which your novel’s protagonist gets something he wanted — a concrete step toward being remembered — and it is not enough. Let the reader glimpse his real need.',
      constraints: [
        'Before drafting, write one line each: his want, his need (they do not count).',
        'The want is achieved on the page, concretely (an article published, a name engraved, an award given).',
        'Include one person or object that embodies the need.',
        'He may not name or understand his need in this scene. The reader should sense it.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Concreteness of want', 'Subtlety of need', 'Tension between them', 'Character depth', 'Scene craft'],
    pitfalls: [
      'A vague want ("to be remembered") with no concrete form.',
      'The character announcing his need ("I realized what I really wanted was love").',
      'Want and need that don’t conflict, so there is no story.',
    ],
    microConstraint: null,
  },
];
