import type { LessonContent } from '../data/types';

/** Foundations fortnight, lessons 8–14. All lesson prose is original; model passages are public domain. */
export const FOUNDATIONS_B: LessonContent[] = [
  {
    id: 'f-08',
    track: 'foundations',
    title: 'Voice: who is speaking? (the angry narrator)',
    masterLens: 'Dostoevsky: the voice that argues with its reader',
    hook: 'Voice is not decoration added to content. It is the evidence of a mind. Today you build one that is furious.',
    body: `Every piece of prose has a speaker, even when that speaker pretends to be invisible. *Voice* is the reader's sense of that speaker: their diction, their rhythm, what they notice, what they refuse to say, how they feel about the person listening.

The fastest way to learn voice is to write in a voice that is not neutral. Anger is ideal. An angry speaker has a clear relationship to the listener (hostile, defensive, needy), strong opinions, a rhythm driven by emotion, and — most usefully — blind spots. Anger reveals character because it shows what a person cannot stand.

Dostoevsky's Underground Man is the great angry voice of literature. He opens by insulting himself, then contradicts himself, then argues with readers he has invented. He anticipates our objections and mocks them before we can make them. He tells us he's spiteful and then, a few lines later, admits even that was a lie. The result is someone so alive on the page that readers have argued with him for over a century and a half.

What makes a voice:

- **Diction.** Word choice signals class, education, region, age, and mood. Does the speaker say *mother* or *mom* or *the old woman*? Does he use long Latinate words to sound superior, or short Anglo-Saxon ones to sound tough?
- **Syntax and rhythm.** Angry speakers interrupt themselves, repeat, escalate. Short punches. Then a long sentence that runs away from them.
- **Address.** Who is being spoken to? A specific person (*you*)? An imagined jury? The speaker's own conscience? The Underground Man's constant *gentlemen* tells us he needs an audience even to despise.
- **Selection.** What the speaker notices and what they skip. An angry person describing a dinner party will notice who was served first.
- **The gap.** The most powerful voices let the reader see past the speaker. The narrator says *I don't care what they think*, and every line shows he cares desperately. That gap — between what the voice claims and what it reveals — is where character lives.

The danger with angry voices is monotony: one note of rage held for a page becomes noise. Real anger shifts. It turns to self-pity, to sarcasm, to sudden honesty, then back. Give your speaker at least one moment where the anger cracks and something else shows through.

A warning about borrowed voice: if you've just read Dostoevsky, you may produce a pastiche of nineteenth-century St. Petersburg. Resist. Your angry narrator lives now, somewhere you know. Their grievances should be specific and contemporary — a landlord, a group chat, a former friend's success. The technique is Dostoevsky's; the material must be yours.`,
    modelPassage: {
      text: 'I am a sick man.... I am a spiteful man. I am an unattractive man. I believe my liver is diseased. However, I know nothing at all about my disease, and do not know for certain what ails me.',
      source: 'Fyodor Dostoevsky, Notes from Underground (1864), trans. Constance Garnett',
    },
    questions: [
      'The first three sentences have the same structure. What happens in the fourth and fifth? How does the shift change your sense of the speaker?',
      'This speaker insults himself before anyone else can. What does that tell you about how he expects to be treated by his listener?',
    ],
    exercise: {
      prompt: 'Write a monologue by an angry first-person narrator addressing someone who has wronged them — or whom they believe has wronged them. Let the reader see something the speaker cannot.',
      constraints: [
        'First person, addressed to a specific "you".',
        'Contemporary setting and specific grievance (no pastiche of 19th-century Russia).',
        'At least one moment where the anger cracks into another emotion.',
        'Include a gap: something the narrator claims that the monologue disproves.',
      ],
      minWords: 300,
      maxWords: 500,
    },
    rubric: ['Distinctness of voice', 'Emotional range', 'Specificity of grievance', 'The gap (dramatic irony)', 'Rhythm'],
    pitfalls: [
      'One note of rage for the whole piece. Anger needs turns.',
      'Borrowing Dostoevsky’s surface (gentlemen, liver, St. Petersburg) instead of his method.',
      'A narrator who is simply right. Give the reader a reason to doubt them.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-09',
    track: 'foundations',
    title: 'Dialogue and subtext',
    masterLens: 'Hemingway and Chekhov: what people say instead of what they mean',
    hook: 'People rarely say what they mean. Good dialogue is the art of letting the reader hear the difference.',
    body: `Real conversation is evasive. People change the subject, answer questions that weren't asked, joke when they're frightened, and argue about the dishes when they're really arguing about the marriage. Dialogue in fiction is a heightened version of this. Its power comes from *subtext*: the meaning beneath the words.

Beginners write dialogue in which characters announce their feelings and explain their situations. *"I'm angry because you forgot my birthday again, and it makes me feel like you don't value me."* No one talks like this outside of therapy, and even there it takes practice. Worse, it leaves the reader nothing to do.

Now consider: *"The cake was nice. Who bought it?"* — *"Does it matter?"* — *"No. I just thought it might have been you."* The birthday, the forgetting, the hurt, the accusation: all present, none stated.

Principles for dialogue:

- **Characters want something in every exchange.** To get information, to avoid giving it, to win, to be forgiven, to end the conversation. Dialogue is action — people doing things to each other with words.
- **Indirection beats directness.** Let characters talk around the important thing. The reader leans in to find it.
- **Cut the pleasantries.** *Hello, how are you, fine, and you* — skip it. Enter late, leave early.
- **No "as you know, Bob."** Characters shouldn't tell each other things both already know just so the reader can hear them. This is the most common form of dialogue as exposition.
- **Tags: use "said."** It's invisible. *Exclaimed, retorted, hissed, opined* draw attention to the writer. Better still, use action beats — a gesture or movement — to show who speaks and how.
- **Let silence and non-answers work.** A character who doesn't respond, or responds to something else, says a great deal.

In "Hills Like White Elephants," the woman's remark about the hills looking like white elephants is a bid for connection; the man's flat response refuses it. Then they argue about whether he would or wouldn't have seen a white elephant — a quarrel about nothing that is really a quarrel about everything. The reader understands the relationship before knowing anything else about it.

Chekhov did the same in his plays: characters talk about the weather, the samovar, the price of things, while their lives collapse. The audience hears both conversations at once.

A practical test: after writing a dialogue scene, write one line beneath each spoken line saying what the character really means. If the two lines are identical, you have no subtext. Revise until there's a gap.`,
    modelPassage: {
      text: '"They look like white elephants," she said.\n"I\'ve never seen one." The man drank his beer.\n"No, you wouldn\'t have."\n"I might have," the man said. "Just because you say I wouldn\'t have doesn\'t prove anything."',
      source: 'Ernest Hemingway, "Hills Like White Elephants" (1927)',
    },
    questions: [
      'What is the woman really saying with "No, you wouldn’t have"? What is the man really defending in his reply?',
      'Why does Hemingway insert "The man drank his beer" between lines? What does the action replace?',
    ],
    exercise: {
      prompt: 'Two people who know each other well are doing a mundane task together — washing dishes, packing a car, waiting for a table. One of them has news the other doesn’t want to hear. Write the scene mostly in dialogue.',
      constraints: [
        'At least 70% dialogue.',
        'The news is never stated outright.',
        'Only "said" (or no tag) — use action beats instead of adverbs.',
        'No exchange of information both characters already know.',
      ],
      minWords: 300,
      maxWords: 500,
    },
    rubric: ['Subtext', 'Distinct voices', 'Dialogue as action', 'Economy', 'Clarity of situation'],
    pitfalls: [
      'Characters explaining their feelings in full sentences.',
      'Subtext so buried that the reader cannot tell anything is wrong.',
      'Fancy tags and adverbs ("she retorted angrily").',
    ],
    microConstraint: null,
  },
  {
    id: 'f-10',
    track: 'foundations',
    title: 'Scene: a want and an obstacle',
    masterLens: 'Dostoevsky: the scene as a collision of wills',
    hook: 'A scene is not a place where things are described. It is a place where someone wants something and can’t easily get it.',
    body: `The scene is the basic unit of narrative. Essays use them, memoirs depend on them, novels are built from them. And the engine of every scene is simple: **a character wants something, and something stands in the way.**

Without a want, there is no scene — only a description of people in a room. Without an obstacle, there is no tension — the character gets what they want and we're bored. With both, the reader leans forward to see what happens.

The want can be small. A man wants to get past his landlady without being seen. A girl wants her father to notice her drawing. A clerk wants to leave work before his boss asks him to stay. Small wants often make better scenes than grand ones, because they're concrete and the reader can measure success.

The obstacle can be another person (who wants something opposed), the environment (a locked door, a storm), or the character's own nature (fear, pride, shame). The best scenes often combine an outer obstacle with an inner one: the man must get past the landlady *and* he is too proud to admit he can't pay.

A complete scene has a shape:

1. **Goal.** What does the point-of-view character want, right now, in this scene?
2. **Conflict.** What stands in the way? How do they try to get past it? Usually more than once, with escalation.
3. **Turn.** Something changes. The character gets what they want, or doesn't, or gets it at a cost, or discovers they wanted something else. A scene in which nothing has changed by the end is not yet a scene.

Crime and Punishment opens with Raskolnikov slipping out of his garret, desperate to avoid his landlady, to whom he owes money. Before we know anything about his crime or his theory, we're in a scene: a want (avoid her), an obstacle (her kitchen door is always open), and stakes we feel (debt, shame, his feverish nerves). Dostoevsky is building the whole novel's pressure into the first page.

Some practical advice:

- **Start late.** Begin the scene as close to the conflict as possible.
- **Make the character try.** Passive characters who wait for things to happen produce flat scenes. Make them act — and fail, and adjust.
- **Raise the cost.** Each attempt should be harder or more revealing than the last.
- **End on the turn.** Once the change happens, get out.

Today you will plan your scene before you write it: one line each for goal, conflict, and turn. That small discipline will save you from the most common failure in beginning fiction — a pleasant scene in which nothing happens.`,
    modelPassage: {
      text: 'He had successfully avoided meeting his landlady on the staircase. His garret was under the roof of a high, five-storied house and was more like a cupboard than a room. The landlady who provided him with garret, dinners, and attendance, lived on the floor below, and every time he went out he was obliged to pass her kitchen, the door of which invariably stood open.',
      source: 'Fyodor Dostoevsky, Crime and Punishment (1866), trans. Constance Garnett',
    },
    questions: [
      'What does Raskolnikov want in this passage, and what is the obstacle? How does the geography of the house create the obstacle?',
      'Why might Dostoevsky open a novel about a murder with something as small as avoiding a landlady?',
    ],
    exercise: {
      prompt: 'Write a complete scene in which a character wants something small and specific — to borrow money, to get a refund, to leave a party unnoticed, to make someone laugh. Something stands in the way. Something changes by the end.',
      constraints: [
        'Before drafting, write goal / conflict / turn as three lines at the top (they don’t count).',
        'The character makes at least two attempts.',
        'The scene begins as close to the conflict as possible.',
        'End on the turn — no aftermath paragraph.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Clarity of want', 'Obstacle and escalation', 'The turn', 'Character through action', 'Concrete detail'],
    pitfalls: [
      'A passive character who waits instead of tries.',
      'A want that is too abstract ("she wanted to be happy").',
      'Ending where nothing has changed.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-11',
    track: 'foundations',
    title: 'Argument in a paragraph (claim, reason, objection)',
    masterLens: 'Mill and Seneca: the argument that meets its opponent',
    hook: 'An opinion is a claim. An argument is a claim that has survived its strongest objection.',
    body: `Essays, op-eds, investment memos, philosophical prose — all depend on the paragraph-length argument. Its anatomy is ancient and simple, and most writers get it wrong anyway.

A working argument paragraph has four movements:

1. **Claim.** One clear, debatable assertion. Not *Social media has pros and cons* (nobody disagrees) but *Social media makes teenagers lonelier, not more connected.*
2. **Reason and evidence.** Why should the reader believe it? A logical reason plus something concrete: a fact, an example, a case. Abstraction alone persuades no one.
3. **Objection.** The strongest counterargument, stated fairly. Not a straw man — the version a smart opponent would actually make.
4. **Reply.** Why the claim survives the objection: the objection is wrong, or right but limited, or right in a way that actually supports your claim.

The objection is the step most writers skip, and it is the step that matters most. Including it does three things. It shows the reader you've thought the question through. It disarms the skeptical reader who was forming that objection anyway. And it forces *you* to test your own claim — sometimes you'll discover it doesn't survive, which is how thinking happens.

John Stuart Mill was a master of this. In *On Liberty* he argues for freedom of speech by imagining the most extreme case — all of humanity against one dissenter — and showing that even then silencing him would be wrong. He then works through the objections: what if the dissenter is wrong? (We lose the chance to see truth more clearly by its collision with error.) What if he's partly right? (We lose the part that's right.) His argument is persuasive precisely because he keeps inviting the reader's resistance and answering it.

Seneca's letters do something similar in a more intimate voice. He'll raise an objection his friend Lucilius might make — *but you'll say...* — and then answer it. The effect is of a conversation, not a lecture.

Some rules:

- **One claim per paragraph.** If you're defending two claims, write two paragraphs.
- **Evidence must be specific.** One real example beats three vague generalizations.
- **State the objection at full strength.** If your opponent would read your version and say *that's not what I think*, you haven't stated it.
- **Concede what's true.** "This is right, but..." is stronger than pretending the objection has no force.
- **Prefer plain language.** Arguments hide in jargon. Plain sentences expose them, which is exactly what you want.

For the finance-minded: this is also the structure of a good investment thesis. Claim (buy), reason (variant perception plus evidence), objection (the bear case, at full strength), reply (why you're still right, and what would prove you wrong).`,
    modelPassage: {
      text: 'If all mankind minus one, were of one opinion, and only one person were of the contrary opinion, mankind would be no more justified in silencing that one person, than he, if he had the power, would be justified in silencing mankind.',
      source: 'John Stuart Mill, On Liberty (1859), chapter 2',
    },
    questions: [
      'Mill chooses the most extreme possible case. Why does arguing from an extreme make the general claim stronger, not weaker?',
      'What is the strongest objection someone could make to this sentence? Write it in one sentence of your own.',
    ],
    exercise: {
      prompt: 'Choose a claim you actually believe that a reasonable person could deny — about money, work, education, technology, or how to live. Write two argument paragraphs that defend it.',
      constraints: [
        'Paragraph 1: claim, reason, concrete evidence.',
        'Paragraph 2: the strongest objection stated fairly, then your reply.',
        'At least one concrete example (a case, a number, an event).',
        'No hedges: "in some ways", "arguably", "it could be said".',
      ],
      minWords: 250,
      maxWords: 450,
    },
    rubric: ['Clarity of claim', 'Evidence', 'Fairness of objection', 'Strength of reply', 'Plain language'],
    pitfalls: [
      'A claim no one would dispute.',
      'A straw-man objection that no thoughtful opponent would recognize.',
      'Hedging so much that there is no claim left to defend.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-12',
    track: 'foundations',
    title: 'The aphorism: compress an idea',
    masterLens: 'Nietzsche and Pascal: the thought in one breath',
    hook: 'An aphorism is an argument with the steps removed. It works only if the reader can rebuild them.',
    body: `Nietzsche boasted that he could say in ten sentences what others say in a book. Pascal left his greatest work as a heap of fragments. Marcus Aurelius wrote his *Meditations* in short entries meant for himself. The aphorism is one of the oldest forms of philosophical prose, and it is a superb training ground for any writer, because it forces radical compression.

An aphorism is a short statement of a general truth, phrased so it sticks. It is not a slogan (slogans are designed to stop thought) and not a cliché (clichés have stopped thinking already). A good aphorism opens a question rather than closing one.

What makes aphorisms work:

- **Surprise.** The best ones overturn an expectation. Pascal calls man the most feeble thing in nature — and then, in the same breath, *a thinking reed*. The second half reverses the first.
- **Antithesis and balance.** Two halves set against each other: weakness and thought; fighting monsters and becoming one. The structure itself carries the idea.
- **Concrete images for abstract ideas.** A reed. An abyss. Monsters. Abstract truths become memorable when attached to something visible.
- **Precision.** Every word does work. Remove one and the aphorism collapses. Add one and it sags.
- **Rhythm.** Aphorisms are built to be said aloud. Notice how often they fall into two parts of similar length.

Nietzsche's line about monsters and the abyss is a compressed argument: those who fight evil are at risk of adopting its methods; long contemplation of darkness changes the contemplator. A whole essay is folded into two sentences, and the image of the abyss *looking back* turns an observation into a shiver.

A way to write aphorisms: start long. Write a paragraph explaining an idea you hold — about work, ambition, love, fear, time. Then compress it. Cut to the claim. Look for the hidden antithesis. Find a concrete image to carry it. Test it aloud. Most attempts will be flat or pompous; that's normal. Write twenty to find one.

Dangers: the aphorism tempts writers toward fake profundity — vague sentences that sound wise and mean nothing. Test every one: *what exactly does this claim? Could someone disagree?* If the answer is "nothing" or "no," it's a greeting card. Another danger: cynicism mistaken for insight. Turning a virtue upside down (*all generosity is vanity*) is easy; seeing truly is harder.

The aphorism will also discipline your other writing. Once you've compressed a thought to a single line, you'll notice how much padding surrounds the thoughts in your essays and stories.`,
    modelPassage: {
      text: 'He who fights with monsters should be careful lest he thereby become a monster. And if thou gaze long into an abyss, the abyss will also gaze into thee.\n\n—\n\nMan is but a reed, the most feeble thing in nature; but he is a thinking reed.',
      source: 'Friedrich Nietzsche, Beyond Good and Evil (1886), §146, trans. Helen Zimmern; Blaise Pascal, Pensées (1670), §347, trans. W. F. Trotter',
    },
    questions: [
      'Restate Nietzsche’s aphorism as a plain argument in two or three sentences. What does the compressed version do that the argument cannot?',
      'Where is the turn in Pascal’s sentence? What would be lost if he had written "Man is weak but intelligent"?',
    ],
    exercise: {
      prompt: 'Write a paragraph explaining something you believe about ambition, time, or being remembered. Then write ten aphorisms that compress it. Mark your best two and write one line under each saying what it claims.',
      constraints: [
        'First a plain explanatory paragraph (80–150 words).',
        'Then ten aphorisms, each under 30 words.',
        'At least three use antithesis; at least three use a concrete image.',
        'Mark your best two and state plainly what each claims.',
      ],
      minWords: 200,
      maxWords: 450,
    },
    rubric: ['Compression', 'Surprise', 'Concrete imagery', 'Precision', 'Genuine claim (not fake profundity)'],
    pitfalls: [
      'Vague sentences that sound wise but claim nothing.',
      'Cynical inversions mistaken for insight.',
      'Imitating archaic phrasing ("thou", "he who") instead of finding your own.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-13',
    track: 'foundations',
    title: 'Point of view and interiority',
    masterLens: 'Woolf: the narrative that slips into the mind',
    hook: 'Point of view is not a technical setting. It decides what the reader can know, feel, and suspect.',
    body: `Every story is told from somewhere. Point of view (POV) determines who perceives the events, whose thoughts we can enter, and how close we sit to them. Choosing it is one of the most consequential decisions you make.

The main options:

- **First person** (*I*). Intimate, voice-driven, limited to what the narrator knows and will admit. Natural for confession and unreliability.
- **Close third** (*she*, filtered through one character). Nearly as intimate as first person, but with the flexibility to pull back. The narrative voice takes on the character's vocabulary and concerns.
- **Distant or omniscient third.** The narrator knows more than any character — can move between minds, comment, summarize history. Tolstoy's home ground.
- **Second person** (*you*). Rare and risky: immersive or accusatory, sometimes both.

*Interiority* means rendering a character's inner life: thoughts, perceptions, memories, feelings. It's the thing prose can do that film can't. There are several ways in:

1. **Direct thought**, often in italics or with a tag: *I can't go back*, she thought.
2. **Reported thought**: She knew she couldn't go back.
3. **Free indirect style**: She couldn't go back. Not now, not after what he'd said. The narration slides into the character's own idiom without quotation marks or tags. This is the most powerful technique of the modern novel, and it's worth mastering.

Free indirect style is what Woolf does in the opening of *Mrs Dalloway*. "Mrs. Dalloway said she would buy the flowers herself" is the narrator. "For Lucy had her work cut out for her" — whose phrase is that? It sounds like Clarissa, justifying herself. By "what a morning — fresh as if issued to children on a beach," we're fully inside her, in her delight and her idiom. The camera has moved into a mind without any visible seam.

Some principles:

- **Pick a POV character for each scene and stay disciplined.** Hopping between heads mid-scene ("head-hopping") disorients readers unless it's controlled omniscience.
- **Filter perception through character.** In close third, describe only what the character would notice, in words they'd use. A surgeon and a child see a hospital differently.
- **Avoid filter words.** *She saw the rain* holds the reader at a distance; *Rain on the window* puts them in her eyes.
- **Let thought and action alternate.** Pages of pure interiority stall; interiority attached to action — what someone thinks as they act — keeps momentum.

Interiority is also where character is most exposed. What a person thinks but doesn't say, what they notice, what they lie to themselves about: that is the material only fiction can reach.`,
    modelPassage: {
      text: "Mrs. Dalloway said she would buy the flowers herself.\n\nFor Lucy had her work cut out for her. The doors would be taken off their hinges; Rumpelmayer's men were coming. And then, thought Clarissa Dalloway, what a morning—fresh as if issued to children on a beach.",
      source: 'Virginia Woolf, Mrs Dalloway (1925), opening',
    },
    questions: [
      'Find the exact point where the narration moves from outside Clarissa to inside her mind. What signals the shift?',
      '"Fresh as if issued to children on a beach" is a strange image. What does it tell you about Clarissa’s mind that a plain "it was a fresh morning" would not?',
    ],
    exercise: {
      prompt: 'Write the same short event — someone receiving a message, an unexpected visitor, a small accident — twice: once in first person, once in close third using free indirect style. Same character, same moment.',
      constraints: [
        'Version A in first person; version B in close third.',
        'Version B must slip into free indirect style at least twice (the character’s idiom, no "she thought").',
        'No filter words in either version: saw, heard, felt, noticed, realized.',
        'Separate the versions with a line containing only "—".',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['POV control', 'Free indirect style', 'Interiority', 'Concrete perception', 'Distinctness of versions'],
    pitfalls: [
      'Head-hopping into a second character’s thoughts.',
      'Interiority that merely explains feelings instead of rendering a mind at work.',
      'Two versions that are identical except for the pronouns.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-14',
    track: 'foundations',
    title: 'Review, revise, and the first Archive milestone',
    masterLens: 'Marcus Aurelius: the daily practice, examined',
    hook: 'Two weeks ago you started. Today you look at the pile of pages and decide what kind of writer is making them.',
    body: `Marcus Aurelius wrote his *Meditations* as a private practice: a few lines most days, reminding himself how to live, correcting himself, beginning again. He never meant them for publication. They have lasted almost two thousand years because they are the record of a mind at work, honest about its failures.

Your Archive is a record of the same kind. Fourteen lessons, a Day 0 freewrite, warm-ups, drafts and revisions. Today you read all of it — not to admire it or to despair, but to learn from it.

**Step 1: Read everything in order.** Don't revise yet. Read as a stranger would. Notice:

- Which pieces still have life? Which feel dead now?
- What do you do repeatedly — good and bad? Look at your Weakness Profile if you have one; check whether it matches what you see.
- Where do your sentences come alive? Is it dialogue, description, argument, voice? That's a clue to where your instincts are strongest.
- What subjects keep surfacing? Writers circle obsessions. You may already be circling yours.

**Step 2: Choose the piece with the most potential**, not the most polish. A rough draft with a real subject beats a smooth exercise with none.

**Step 3: Revise it fully**, using everything from the fortnight: purpose first, structure second, sentences last. Plain, concrete, strong verbs, varied rhythm, cut hard, telling details, a distinct voice, subtext, a scene with a want, a fair argument, compression, controlled point of view.

**Step 4: Write a short note to yourself** about the two weeks. What have you learned? What is still hard? What will you practice next?

A few honest observations about this moment. Many people quit writing practices around week two or three. The novelty wears off, the work gets harder, and the gap between what you can imagine and what you can produce becomes painfully visible. That gap is not evidence you lack talent. It is evidence your taste is ahead of your skill, which is the normal condition of every developing writer. The only way to close it is volume: more pages, revised.

Marcus Aurelius reminded himself, on mornings he didn't want to get up, that he was rising to do the work of a human being. There's nothing grand in it. It's a man talking himself out of bed. That's what the daily practice is. Not inspiration — showing up, and then the next day, showing up again.

After today, the curriculum opens: essays, fiction, philosophy, style, and your long project. The rotation will move you across forms. But this fortnight is the floor you'll stand on, and you'll come back to it whenever your writing goes slack.`,
    modelPassage: {
      text: 'In the morning when thou risest unwillingly, let this thought be present—I am rising to the work of a human being.',
      source: 'Marcus Aurelius, Meditations, Book V, trans. George Long (1862)',
    },
    questions: [
      'This is a note an emperor wrote to himself. What in the sentence shows that he expected to resist his own advice?',
      'Read your Day 0 freewrite. In one paragraph, describe what has changed in how you write since then — be concrete, quote yourself.',
    ],
    exercise: {
      prompt: 'Choose the piece from the past two weeks with the most potential and revise it fully. Then add a short note to yourself (it may be part of this draft) on what you have learned and what you will practice next.',
      constraints: [
        'Revision at all three levels: purpose, structure, sentences.',
        'The revised piece must be meaningfully different, not just polished.',
        'End with a note of 50–100 words: one thing learned, one thing still hard, one thing to practice.',
      ],
      minWords: 300,
      maxWords: 600,
    },
    rubric: ['Choice of piece', 'Depth of revision', 'Application of the fortnight', 'Self-assessment honesty', 'Prose quality'],
    pitfalls: [
      'Picking the most polished piece instead of the most alive one.',
      'A self-assessment that is either all praise or all despair. Be a fair critic.',
      'Revising only the sentences of a piece whose structure is wrong.',
    ],
    microConstraint: null,
  },
];
