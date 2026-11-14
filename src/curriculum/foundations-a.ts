import type { LessonContent } from '../data/types';

/** Foundations fortnight, lessons 1–7. All lesson prose is original; model passages are public domain. */
export const FOUNDATIONS_A: LessonContent[] = [
  {
    id: 'f-01',
    track: 'foundations',
    title: 'The plain sentence',
    masterLens: 'Hemingway: the declarative sentence that trusts the noun',
    hook: 'Before you can write a beautiful sentence you have to be able to write a true one. Most beginners skip this step and spend years paying for it.',
    body: `A plain sentence names a thing and says what it does. *The dog crossed the road.* There is nothing to admire in it, and that is the point: nothing stands between the reader and the dog.

Most early writing is not plain. It is padded. The writer is afraid the reader will think the thing too small, so they inflate it: *It was a moment that would change everything, a moment of profound realization.* Notice that this sentence contains no moment. It contains only the writer's anxiety about the moment. The reader is told how to feel and given nothing to feel it about.

The plain style is not the simple style. Hemingway's early prose looks easy and was brutally hard to make. He wrote sentences in which every word carried weight, and when a word carried none he cut it. What remained was often a string of clauses joined by *and*, each one a fact. The facts did the emotional work because he chose them well and put them in the right order.

Here is the discipline for today. A plain sentence:

- **Has a concrete subject.** A person, an object, a place. Not *the situation*, not *things*, not *it* standing for nothing.
- **Has a verb that does something.** *Crossed, spilled, refused, waited.* Be careful with *was* and *had*; they are not forbidden, but they are often a place where the sentence stops moving.
- **Makes one claim.** If you need a second claim, write a second sentence.
- **Contains no word you would be embarrassed to defend.** *Very, really, quite, somehow, incredibly, literally* — each one should earn its place or go.

Plainness is a form of respect. It assumes the reader is intelligent and the world is interesting. When you write *The kitchen smelled of burnt milk and her mother was not in it,* you have trusted the reader to feel the absence. When you write *I felt an overwhelming sense of loss,* you have not.

A warning: plain does not mean flat. A sequence of plain sentences can build enormous pressure, the way a list of facts in a police report can be more terrible than any poem. The rhythm comes later. Today you are learning to lay bricks that are square.

You will feel exposed writing this way. Every sentence will look too small. Keep going. The smallness is honesty, and honesty is the foundation of every style worth having, including the ornate ones. Dostoevsky could rave because underneath the raving he knew exactly what was in the room.`,
    modelPassage: {
      text: 'In the late summer of that year we lived in a house in a village that looked across the river and the plain to the mountains. In the bed of the river there were pebbles and boulders, dry and white in the sun, and the water was clear and swiftly moving and blue in the channels.',
      source: 'Ernest Hemingway, A Farewell to Arms (1929), opening',
    },
    questions: [
      'Count the adjectives in the second sentence. What is each one doing that a reader could not supply alone?',
      'The passage never says the place is beautiful or peaceful. How does it make you feel that anyway?',
    ],
    exercise: {
      prompt: 'Describe a room you know well at a specific hour, in plain sentences only. Somebody has just left it. Do not say who, or why, or how anyone feels.',
      constraints: [
        'Every sentence has a concrete noun as its subject.',
        'No sentence longer than 20 words.',
        'Banned: very, really, somehow, suddenly, incredibly, a sense of, felt.',
        'No statement of emotion. Let objects carry it.',
      ],
      minWords: 200,
      maxWords: 350,
    },
    rubric: ['Concreteness', 'Plainness (no padding)', 'Verb strength', 'Selection of detail', 'Implied feeling'],
    pitfalls: [
      'Replacing abstraction with a list of adjectives. "The old, dusty, forgotten chair" is still padding.',
      'Writing flat because "plain" sounded like "boring". Choose facts that matter.',
      'Sneaking emotion back in through the last sentence. End on an object, not a verdict.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-02',
    track: 'foundations',
    title: 'Concrete over abstract',
    masterLens: 'Dickens and Tolstoy: the abstraction made visible',
    hook: 'Abstractions are conclusions. Readers do not want your conclusions; they want the evidence, so they can reach the conclusion themselves.',
    body: `*Poverty. Grief. Ambition. Injustice.* These words are summaries. They are useful in an essay's thesis and nearly useless everywhere else, because they ask the reader to supply all the pictures. Most readers will not. They will nod and move on, untouched.

A concrete word points to something you could photograph, touch, smell, or hear. *A coat with cardboard in the elbows. A child's shoe on the dashboard of a car that is not moving. A man practicing his signature on a napkin.* Each of these carries an abstraction inside it. The coat is poverty; the shoe might be grief; the signature is ambition. But the reader discovers this. The discovery is the pleasure, and the pleasure is what makes them believe you.

There is a ladder of abstraction. At the top: *emotion*. One step down: *sadness*. Down again: *he cried*. Down again: *he cried in the car so his daughter would not see, and then fixed his face in the mirror before going back inside.* The bottom rungs are where fiction and most good essays live. You can climb up briefly — a single sentence that names the idea — but you must come down quickly, or the reader floats away.

Concreteness has three levels of skill:

1. **Specific nouns.** Not *tree* but *the plane tree*; not *car* but *a dented Corolla*. Specificity tells the reader you were there.
2. **Particular instances.** Not *he always argued with his father* but one argument, on one evening, about one thing — the thermostat, say. The particular contains the general; the general never contains the particular.
3. **Telling selection.** Of the thousand concrete things you could name, choose the one that only this situation would produce. Anyone's kitchen has a table. Only this kitchen has a calendar still turned to March in July.

Tolstoy is the great master of this. When he wants us to understand a man's spiritual emptiness, he shows us the man fussing over the upholstery of his drawing room. He doesn't tell us the life was hollow; he lets us watch a grown man fall off a stepladder while hanging curtains, and we understand that this is what the life has been spent on.

A test you can use on every draft: underline every abstract noun. For each one, ask: what would I see if I walked into this sentence? Write that instead. Keep the abstract noun only if the sentence is a deliberate summary that the concrete material around it has earned.

Abstraction feels like depth to the writer because the writer has the pictures in their head. The reader does not. Your job is to hand them over.`,
    modelPassage: {
      text: 'Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great (and dirty) city.',
      source: 'Charles Dickens, Bleak House (1853), chapter 1',
    },
    questions: [
      'Dickens could have written "London was foggy and polluted." What does the passage give you that this summary does not?',
      'Find the one place where Dickens lets himself comment instead of show. Why do you think he allows it there?',
    ],
    exercise: {
      prompt: 'Pick one abstraction — loneliness, ambition, shame, or failure — and write a scene or portrait that makes the reader feel it without using the word or any synonym.',
      constraints: [
        'The abstraction you chose (and its synonyms) may not appear.',
        'At least five specific, nameable objects.',
        'One particular moment, not a habitual "he would always...".',
      ],
      minWords: 250,
      maxWords: 400,
    },
    rubric: ['Concreteness', 'Specific nouns', 'Telling selection', 'Implied abstraction', 'Clarity'],
    pitfalls: [
      'Using a synonym to smuggle the abstraction back in ("alone", "isolated" for loneliness).',
      'Piling up concrete details without choosing; ten generic objects are worse than two telling ones.',
      'Writing a habitual summary ("every evening he would...") instead of one evening.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-03',
    track: 'foundations',
    title: 'Verbs do the work',
    masterLens: 'Crane and Tolstoy: the verb as engine',
    hook: 'Nouns are the furniture of a sentence. Verbs are the people moving through the room.',
    body: `When a sentence feels limp, the problem is almost always the verb. Look at this: *There was a man standing at the door who was holding a letter.* Three verbs, all weak. Now: *A man at the door held out a letter.* One verb, and it moves.

Weak verbs come in families. Learn to spot them.

- **Being verbs** — *was, is, were, seemed, became.* Necessary sometimes. But "She was angry" is a report; "She snapped the pencil" is an event.
- **Light verbs with noun phrases** — *made a decision, gave a response, had a conversation, took a walk.* Each hides a better verb inside a noun: *decided, answered, argued, walked.*
- **Filter verbs** — *saw, heard, felt, noticed, realized, watched.* "She noticed the window was open" puts the character's perception between the reader and the window. "The window was open" — or better, "Rain was coming in at the open window" — delivers it directly.
- **The passive** — *The vase was broken.* By whom? Passive voice has uses (when the actor is unknown or unimportant, or when you want to hide them), but as a habit it drains agency from your prose. Someone does something; say who.

A strong verb is specific. *Walk* is fine; *limp, stride, shuffle, pace, slink* each carry a character and a mood. But beware the thesaurus: *he ambulated* is not stronger than *he walked*, only fussier. The right verb is the one a sharp observer would choose, not the one with the most syllables.

Stephen Crane could make a landscape act. In *The Red Badge of Courage* the cold doesn't simply leave — it passes *reluctantly*; the fogs are *retiring*; the army *awakened* and began to *tremble*. The scene is full of motion before a single soldier does anything. This is not decoration; it sets the mood of nervous waiting that the whole novel inherits.

One more principle: put the verb near the subject. Readers hold the subject in mind until the verb arrives, and every word in between is a weight. "The committee, after months of argument about the budget and the timing and the question of who would chair it, finally agreed" makes the reader carry *committee* for twenty words. Sometimes that suspension is the effect you want. Usually it isn't.

Today's practice is mechanical on purpose. You will draft fast, then go back and interrogate every verb. It will feel pedantic. It is how writers develop an ear: by doing consciously, for a while, what later becomes instinct.`,
    modelPassage: {
      text: 'The cold passed reluctantly from the earth, and the retiring fogs revealed an army stretched out on the hills, resting. As the landscape changed from brown to green, the army awakened, and began to tremble with eagerness at the noise of rumors.',
      source: 'Stephen Crane, The Red Badge of Courage (1895), opening',
    },
    questions: [
      'List every verb in the passage. Which ones give the landscape or the army a human quality, and what mood does that create?',
      'Rewrite the first sentence using only "was" and "were" as verbs. What is lost?',
    ],
    exercise: {
      prompt: 'Write about someone doing a physical task they are good at — fixing, cooking, packing, playing — while thinking about something else entirely. Show the thinking only through how they do the task.',
      constraints: [
        'No filter verbs: saw, heard, felt, noticed, realized, watched, seemed.',
        'At most three uses of was/were in the whole piece.',
        'No "made a decision" / "gave a look" / "took a step" constructions.',
        'Then, in revision, underline every verb and replace any you cannot defend.',
      ],
      minWords: 250,
      maxWords: 400,
    },
    rubric: ['Verb strength', 'Concreteness', 'Implied interiority', 'Economy', 'Rhythm'],
    pitfalls: [
      'Swapping plain verbs for fancy ones ("he perambulated"). Specific beats ornate.',
      'Adverb crutches: "walked slowly" when "trudged" exists.',
      'Fixing the verbs but leaving every sentence the same length; watch the rhythm too.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-04',
    track: 'foundations',
    title: 'Rhythm and sentence length',
    masterLens: 'Melville and Seneca: the long breath and the short blow',
    hook: 'Prose has a pulse. Readers feel it before they understand a word, and they stop reading when it goes flat.',
    body: `Read a page of your writing aloud and listen. If every sentence is roughly the same length and the same shape — subject, verb, object, period — you will hear a drone. The reader hears it too, though they may only describe it as *boring*.

Rhythm comes mostly from varying sentence length and structure. A long sentence accumulates: it carries the reader through a sequence, piling clause on clause, letting tension build or pleasure extend. A short sentence stops. It lands.

The most reliable effect in prose is a short sentence after long ones. The long sentences create momentum; the short one cashes it in. Seneca built his letters this way — a winding passage on how people waste their days in errands and ambitions, and then a blunt line that turns the whole thing toward the reader. (His English translators vary, so look at the shape, not the words: long reasoning, short verdict.)

Melville opens *Moby-Dick* with three words. Then he lets the next sentence run, interrupting itself with dashes, sprawling across purse and shore and the watery world. The contrast tells you who this narrator is: abrupt, then expansive; guarded, then restless.

Some tools:

- **The cumulative sentence** begins with a main clause and adds modifiers: *She stood at the sink, her hands in the cold water, the radio murmuring about rain, the plates waiting.* It mimics the way attention moves.
- **The periodic sentence** withholds the main point until the end: *Of all the things he had lost that year — the job, the apartment, the friendship with Daniel — it was the dog he could not stop thinking about.* It creates suspense.
- **The fragment.** Used rarely, it isolates. *Nothing.* Used constantly, it is a tic.
- **Parallelism and the triad.** Three items in matching form feel complete; breaking the pattern on the third creates surprise.

Punctuation is rhythm notation. A comma is a short breath. A semicolon joins two thoughts that lean on each other. A dash interrupts. A period is a full stop — and a writer who uses mostly periods writes in a different meter from one who uses mostly commas.

Don't count words mechanically, but do develop the habit of looking at the *shape* of a paragraph. Are there any sentences under six words? Any over thirty? If not, you're probably writing in a single gear.

Rhythm is also meaning. A sentence about panic can run breathlessly; a sentence about stillness can be short and spaced. When rhythm and content align, readers don't notice the technique. They just feel that the prose is alive.`,
    modelPassage: {
      text: 'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
      source: 'Herman Melville, Moby-Dick (1851), opening',
    },
    questions: [
      'What does the short first sentence do that a longer opening could not? What does the second sentence reveal about the speaker that the first concealed?',
      'Where does the second sentence interrupt itself? What do the interruptions tell you about the narrator’s state of mind?',
    ],
    exercise: {
      prompt: 'Write a paragraph-driven piece about waiting for news — at a hospital, a phone, an inbox. Let the sentences themselves enact the waiting and the arrival.',
      constraints: [
        'At least one sentence over 40 words.',
        'At least three sentences under 6 words.',
        'One cumulative sentence and one periodic sentence (mark them for yourself).',
        'Read it aloud before submitting.',
      ],
      minWords: 250,
      maxWords: 400,
    },
    rubric: ['Rhythm', 'Sentence variety', 'Alignment of rhythm and meaning', 'Concreteness', 'Control of punctuation'],
    pitfalls: [
      'Varying length randomly. Each short sentence should land something.',
      'Long sentences that are merely long, joined by "and" without accumulation or direction.',
      'Fragments as a habit. Two or three in a page is plenty.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-05',
    track: 'foundations',
    title: 'Cutting (the iceberg)',
    masterLens: 'Hemingway: the iceberg — omit what you know',
    hook: 'What you leave out, if you know it, makes what you keep stronger. What you leave out because you don’t know it leaves a hole.',
    body: `Hemingway described his method as an iceberg: seven-eighths below the water. The writer knows far more than the page shows, and the reader *feels* the submerged mass in the weight of what is said. The key condition is that the writer actually knows the omitted part. Omission without knowledge is vagueness; omission with knowledge is pressure.

Cutting is the craft that makes the iceberg. It operates at every scale.

**Words.** Most drafts can lose a fifth of their words without losing meaning. Cut *that* when it's not needed. Cut *in order to* to *to*. Cut *began to* and *started to* unless the beginning matters. Cut adverbs that repeat the verb (*whispered quietly*). Cut throat-clearing: *It is important to note that*, *I think that*, *In many ways*.

**Sentences.** Look for the sentence that explains the sentence before it. *She slammed the door. She was furious.* The second sentence is the writer not trusting the first. Cut it.

**Paragraphs and scenes.** The most common structural fat in beginner work is the warm-up: three paragraphs of the character waking, dressing, walking, before the story starts. Find the first sentence where something is at stake. That's usually your opening. Endings have the same disease: a final paragraph that explains what the story meant. Cut it and see if the previous paragraph ends the piece more powerfully. It almost always does.

**Backstory.** You need to know your character's whole history. The reader needs one or two pieces of it, delivered at the moment they matter.

In "Hills Like White Elephants," a man and a woman wait for a train and talk about the landscape, drinks, and "a simple operation." The story never names what they are discussing. It never states their history or how either of them feels. It doesn't need to: Hemingway knew all of it, and every line is shaped by that knowledge.

The practical method: write long, then cut hard. Drafting and cutting use different parts of the mind, and trying to write lean in the first draft often produces prose that is merely thin. Get everything down. Then go back with the question: *what can the reader infer?* Remove that.

A useful exercise is the percentage cut: take a finished draft and remove a fixed proportion — a third, say — without losing anything essential. You'll be surprised how much of a piece was scaffolding.

Cutting feels like loss. It isn't. Every word you remove gives the remaining words more room to mean.`,
    modelPassage: {
      text: 'The hills across the valley of the Ebro were long and white. On this side there was no shade and no trees and the station was between two lines of rails in the sun. Close against the side of the station there was the warm shadow of the building and a curtain, made of strings of bamboo beads, hung across the open door into the bar, to keep out flies.',
      source: 'Ernest Hemingway, "Hills Like White Elephants" (1927), opening',
    },
    questions: [
      'Nothing happens in this paragraph, yet it sets up the whole story. What does the contrast between "this side" and the hills across the valley suggest?',
      'What would be lost if Hemingway added a sentence telling us who is waiting at the station and why?',
    ],
    exercise: {
      prompt: 'Write a scene in which two people discuss something important without ever naming it — a diagnosis, a debt, a betrayal, a decision. Know exactly what it is. Then cut your draft by a third.',
      constraints: [
        'The important thing is never named or explained.',
        'No backstory paragraphs.',
        'Write long first (400+ words), then cut to the word range below.',
        'Final line may not explain or summarize.',
      ],
      minWords: 250,
      maxWords: 400,
    },
    rubric: ['Economy', 'Implied subtext', 'Clarity despite omission', 'Concrete detail', 'Ending'],
    pitfalls: [
      'Omitting what you never figured out. Decide the hidden thing in detail first.',
      'Cutting so hard the reader cannot follow who is speaking or where we are.',
      'Hinting so heavily ("the thing we don’t talk about") that the omission becomes coy.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-06',
    track: 'foundations',
    title: 'The telling detail',
    masterLens: 'Chekhov: the one detail that implies the whole',
    hook: 'One right detail is worth a paragraph of description. The trick is learning which one.',
    body: `Chekhov is supposed to have said that you don't need to describe the moon shining; show the glint of light on a piece of broken glass. Whether or not he said it, the principle is his. A *telling detail* is a particular that implies far more than it states. It is chosen, not collected.

Compare two ways to show that a marriage is over. One: *They no longer talked, and the house felt cold and empty.* Two: *He had started buying his own milk and keeping it on the bottom shelf.* The second is a single fact, and it contains the whole situation — the separateness, the pettiness, the household still technically shared. The reader does the work and is rewarded for it.

How do you find telling details?

**Look for the unexpected particular.** Expected details confirm what the reader assumed and so convey nothing. A funeral with black clothes and weeping tells us nothing. A funeral where the widow keeps checking her phone tells us a great deal, though we don't yet know what.

**Look for details that show a habit or a choice.** Things people do repeatedly or choose deliberately reveal character: the books someone displays versus the books they actually read; how a man folds his shirts; what a teenager has taped to the inside of a locker.

**Look for details that carry contradiction.** A tidy desk with one drawer that won't close. A wealthy family's home where no one has fixed the doorbell in years. Contradiction suggests depth.

**Prefer the detail that only this scene would produce.** Ask: could this detail appear in a thousand other stories? If so, it's furniture. Find the one that couldn't.

In "The Lady with the Dog," Chekhov shows us the aftermath of a seduction. The woman is distraught, talking about her shame. Gurov, the seducer, cuts himself a slice of watermelon and eats it without haste. Nothing is said about his character, yet we know him completely: his calm, his practice, his distance from her feelings. The watermelon is the telling detail. And it sets up the story's real subject — because this man, unlike all his previous affairs, is about to be changed.

Notice that telling details are often small and almost comic. Grand symbolic details — a storm during an argument, a dying flower in a sad room — tend to feel staged. The ordinary object, precisely observed, carries more.

Writers find these details by observing life closely and writing them down. Start carrying a notebook. The most valuable thing you can collect is the small fact that surprised you.`,
    modelPassage: {
      text: 'There was a water-melon on the table. Gurov cut himself a slice and began eating it without haste. There followed at least half an hour of silence.',
      source: 'Anton Chekhov, "The Lady with the Dog" (1899), trans. Constance Garnett',
    },
    questions: [
      'This comes just after Anna, ashamed, has been speaking emotionally. What does the watermelon tell you about Gurov that a direct description could not?',
      'Why "without haste"? What would change if Chekhov had written "began eating it"?',
    ],
    exercise: {
      prompt: 'Write a portrait of a person through exactly three telling details — an object they own, a habit, and a single action in one moment. Let the reader understand something about them they would never say about themselves.',
      constraints: [
        'Exactly three focal details; everything else is support.',
        'No adjectives describing the person’s character (kind, bitter, lonely...).',
        'At least one detail must contain a contradiction.',
      ],
      minWords: 200,
      maxWords: 350,
    },
    rubric: ['Selection of detail', 'Implication', 'Concreteness', 'Economy', 'Character insight'],
    pitfalls: [
      'Choosing symbolic props (a wilting rose) instead of observed particulars.',
      'Explaining the detail after giving it ("which showed how lonely she was").',
      'Using details that could belong to anyone. Make it this person only.',
    ],
    microConstraint: null,
  },
  {
    id: 'f-07',
    track: 'foundations',
    title: 'Review & revise the week',
    masterLens: 'Tolstoy: revision as re-seeing',
    hook: 'Writing is rewriting. This week you made drafts. Today you learn what a draft is for.',
    body: `Tolstoy rewrote *War and Peace* many times; his wife copied out the manuscript again and again in her own hand. Almost every writer you admire produced terrible first drafts. What separates them from people who want to be writers is not talent at drafting. It is the willingness to go back.

Revision is not proofreading. Proofreading fixes commas. Revision — *re-vision* — means seeing the piece again, as a stranger would, and changing what it is.

Work at three levels, in this order.

**1. The whole.** Read the draft once quickly without stopping. Then ask: what is this piece actually about? Not what you meant it to be about — what it *is* about, on the page. Often the real subject is hiding in one paragraph, and the rest is approach. Can you say in one sentence what the reader should be left holding? If not, that's the first problem to solve, and no amount of sentence polishing will fix it.

**2. The parts.** Now look at structure. Where does the piece really begin? (Often, a paragraph or two in.) Where does it really end? (Often, a paragraph before you stopped.) Is anything in the wrong order? Is anything missing — a scene the reader needs, a step in an argument? Is anything there only because you liked writing it?

**3. The sentences.** Only now go line by line, applying what you learned this week: plain sentences, concrete nouns, strong verbs, varied rhythm, ruthless cutting, telling details. Read aloud. Mark every place you stumble.

A few truths about revision:

- **Distance helps.** You can't see a draft clearly the hour you finish it. A day is good. A week is better. This is one reason to keep an archive.
- **Your favorite sentence is suspect.** The line you're proudest of is often the one written for you rather than for the piece.
- **Feedback is data, not verdict.** When a reader tells you something isn't working, they're almost always right that there's a problem and often wrong about the fix.
- **Revision can make things worse.** If a draft loses its life, go back. Version history exists for this reason.

Tolstoy's sentence about Ivan Ilych — that his life had been "most simple and most ordinary and therefore most terrible" — is the kind of line that only comes from long thinking. The word *therefore* does something shocking: it says the terror is *caused* by the ordinariness. That is an idea fully seen. Drafts gesture; revisions see.

Today you'll take a piece from earlier this week and revise it properly, at all three levels.`,
    modelPassage: {
      text: "Ivan Ilych's life had been most simple and most ordinary and therefore most terrible.",
      source: 'Leo Tolstoy, The Death of Ivan Ilych (1886), trans. Louise and Aylmer Maude, chapter 2',
    },
    questions: [
      'What does "therefore" claim? Rewrite the sentence with "and" instead of "therefore" and describe what changes.',
      'This sentence opens the account of Ivan’s life, after we already know he is dead. Why might Tolstoy state the verdict before the evidence?',
    ],
    exercise: {
      prompt: 'Choose one of this week’s drafts (or the Day 0 freewrite). Write one sentence stating what it is really about. Then rewrite the piece from the top so that every paragraph serves that sentence.',
      constraints: [
        'Start with the one-sentence "this is about" statement (it does not count toward the piece).',
        'The new opening must begin later than the old one.',
        'Cut at least one paragraph you liked.',
        'Apply one technique from each of lessons 1–6 and know where you used it.',
      ],
      minWords: 250,
      maxWords: 500,
    },
    rubric: ['Clarity of purpose', 'Structure', 'Economy', 'Sentence quality', 'Improvement over original'],
    pitfalls: [
      'Polishing sentences before deciding what the piece is about.',
      'Revising timidly: changing words while keeping the same structure that didn’t work.',
      'Trying to save every good line. Some belong in a different piece.',
    ],
    microConstraint: null,
  },
];
