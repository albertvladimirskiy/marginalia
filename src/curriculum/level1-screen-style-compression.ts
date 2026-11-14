import type { LessonContent } from '../data/types';

/** Level-1 lessons, Screenwriting, Style & Imitation, Compression & Poetry. Original prose; public-domain passages or labelled original demonstrations. */
export const LEVEL1_SCREEN_STYLE_COMPRESSION: LessonContent[] = [
  {
    id: 's-01',
    track: 'screen',
    title: 'Scene headings and the action line',
    masterLens: 'Hemingway: only what the camera sees',
    hook: 'A screenplay is not a novel with dialogue. It is a set of instructions for what an audience will see and hear, written in a format that has its own grammar.',
    body: `Screenwriting has strict conventions, and readers in the industry judge a script within the first page by whether the writer knows them. Fortunately, the core is simple. Today you'll learn the two most important elements: the **scene heading** and the **action line**.

**The scene heading** (or slug line) tells the reader where and when we are. It has three parts, written in capitals:

- **INT.** or **EXT.** — interior or exterior.
- **The location** — as short as possible: KITCHEN, HOSPITAL CORRIDOR, BUS STOP.
- **The time** — usually just DAY or NIGHT.

So: *INT. KITCHEN - NIGHT.* Every time the location or time changes, you need a new heading. A heading is a promise to the production: we will build or find this place.

**The action line** describes what we see and hear. Its rules come from a single principle: *you can only write what the camera can record.* That rules out a lot of what prose writers rely on:

- **No thoughts or feelings stated directly.** *She feels betrayed* can't be filmed. *She sets down the phone and turns it face down* can.
- **Present tense, active voice.** *He opens the door,* not *He opened the door* or *The door is opened.*
- **Short paragraphs.** Usually no more than three or four lines. White space is pacing; a dense block reads slowly and suggests a slow film.
- **Introduce characters in capitals** the first time, with an age and one telling detail: *MARA (30s) wears a hospital ID she has forgotten to take off.*
- **No camera directions unless essential.** Directors decide shots. You describe what matters.
- **Every line earns its place.** One page of script is roughly one minute of screen time. Wasted words waste minutes.

Hemingway, who trained as a newspaper reporter, wrote prose that is almost cinematic in this sense: objects, gestures, landscape, dialogue — and almost no interiority. His work is a good bridge from prose to screen. The discipline is the same: show what can be seen, and let the audience infer the rest.

The model passage today is an original demonstration of format. Notice how little it explains. A man, a kitchen, a phone, a gesture. Everything we need to understand his situation is visible. The phone turned face down does the work of a paragraph of interiority.

Some tips for practice: read your action lines and ask of each sentence, *could a camera record this?* If not, translate it into behavior. And ask, *would the audience miss this if it were gone?* If not, cut it.

Today's exercise is silent on purpose. Without dialogue, all meaning must come through image and action — the purest test of screen writing.`,
    modelPassage: {
      text: 'INT. KITCHEN - NIGHT\n\nA single light over the stove. DANIEL (50s), still in his work shirt, eats cereal standing up.\n\nHis phone buzzes on the counter. He reads the screen. Stops chewing.\n\nHe turns the phone face down. Finishes the bowl. Rinses it. Dries it. Puts it away.\n\nThe phone buzzes again. He doesn’t look at it.',
      source: 'Original demonstration of screenplay format, written for this lesson',
    },
    questions: [
      'The passage never says what the message is or how Daniel feels. What do you infer, and which actions give it to you?',
      'Why "Rinses it. Dries it. Puts it away." as three separate sentences? What does the rhythm do on the page and on screen?',
    ],
    exercise: {
      prompt: 'Write a two-page silent scene in screenplay format: a character receives news or makes a decision, and we understand it only through what they do.',
      constraints: [
        'At least one scene heading in correct format (INT./EXT., LOCATION, DAY/NIGHT); two if the location changes.',
        'No dialogue at all. Sound effects are allowed.',
        'Present tense; introduce the character in capitals with age and one detail.',
        'No sentence describes a thought or feeling directly.',
        'No action paragraph longer than four lines.',
      ],
      minWords: 250,
      maxWords: 500,
    },
    rubric: ['Visual storytelling', 'Format correctness', 'Economy', 'Character', 'Scene change'],
    pitfalls: [
      'Describing thoughts and feelings the camera cannot see.',
      'Dense paragraphs that read like a novel.',
      'Camera directions that do the director’s job instead of yours.',
    ],
    microConstraint: null,
  },
  {
    id: 's-02',
    track: 'screen',
    title: 'Visual storytelling',
    masterLens: 'Chekhov: the gesture that tells',
    hook: 'On screen, a good image replaces a page of exposition. The audience believes what it sees far more than what it’s told.',
    body: `Film is a visual medium that most beginning screenwriters treat as a verbal one. Their characters explain their backstories, announce their feelings and summarize their situations to each other. The camera merely records people talking. It's the screen equivalent of telling instead of showing — and it wastes the medium's greatest power.

Visual storytelling means conveying character, situation and emotion through what the audience sees: setting, objects, behavior, composition, contrast. A single well-chosen image can establish what a page of dialogue cannot.

Consider how much an image can carry. A man's apartment is spotless except for a child's drawing taped to the fridge, curling with age. We know he lives alone, that there was a child, that he can't bring himself to take it down. No one has to say "my daughter doesn't speak to me anymore."

Joseph Conrad, writing about fiction in 1897, put the novelist's ambition in a phrase that sounds like a manifesto for cinema: above all, *to make you see*. He was talking about prose, but the principle applies twice as strongly on screen. Seeing is believing; being told is merely being informed.

Chekhov's stories and plays offer the same lesson in a different register. His characters reveal themselves through gestures — eating a slice of watermelon, fiddling with a cigarette case, staring at a samovar — while their dialogue drifts around the subject. On screen, those gestures are the story.

Tools of visual storytelling:

- **Setting as character.** Where we first meet someone tells us who they are. A woman introduced in a crowded open-plan office and the same woman introduced alone in a car park at night are different people.
- **Telling objects.** Choose props that carry history: a wedding ring worn on a chain, an unopened letter, a trophy used as a doorstop.
- **Behavior over speech.** How someone eats, dresses, waits, or avoids a mirror.
- **Contrast.** Juxtapose images — a lavish party, then the same host alone washing glasses at 4 a.m.
- **Repetition with change.** Show an image early, then return to it altered. A setup and payoff the audience reads without words.

A useful constraint: for every line of dialogue you're tempted to write that explains something, ask whether an image could do it instead. Usually it can, and usually the image is better.

Today's exercise asks you to establish a character's entire situation in one silent minute of screen time. It's the opening of a film, where audiences decide whether they care. Make every image count.`,
    modelPassage: {
      text: 'My task which I am trying to achieve is, by the power of the written word, to make you hear, to make you feel—it is, before all, to make you see.',
      source: 'Joseph Conrad, preface to his 1897 novel of the ship Narcissus (US title: The Children of the Sea)',
    },
    questions: [
      'Conrad lists hearing, feeling and seeing, and puts seeing "before all". Why might seeing come before feeling for an audience?',
      'Conrad was writing about prose. How does his principle change, or intensify, when the medium is film?',
    ],
    exercise: {
      prompt: 'Write the opening one minute (about one page) of a film that establishes a character’s whole situation — job, loneliness, ambition, or loss — through images alone. Then write a short note on what each key image communicates.',
      constraints: [
        'Screenplay format; no dialogue and no voice-over.',
        'At least three telling objects or settings.',
        'One contrast or juxtaposition.',
        'After the scene, a note of 50-100 words listing what the audience should understand and which image delivers it.',
      ],
      minWords: 250,
      maxWords: 450,
    },
    rubric: ['Visual storytelling', 'Choice of images', 'Economy', 'Character', 'Format correctness'],
    pitfalls: [
      'Generic images (rain on a window) instead of specific, telling ones.',
      'Images that require explanation the audience will never get.',
      'Sneaking exposition back in through text on screen or a voice-over.',
    ],
    microConstraint: null,
  },
  {
    id: 's-03',
    track: 'screen',
    title: 'Dialogue economy',
    masterLens: 'Hemingway: the clipped exchange',
    hook: 'Screen dialogue is spoken by actors who can convey half the meaning with a look. Write the other half, and no more.',
    body: `Novel dialogue can afford to be leisurely. Screen dialogue cannot. Every line costs screen time, and every line competes with the actor's face, voice and body, which communicate constantly. The best screen dialogue is economical: short lines, each doing at least two jobs, with plenty of room for performance.

What does it mean for a line to do two jobs? A line might advance the plot *and* reveal character. It might deliver information *and* shift power. It might be funny *and* threatening. A line that does only one thing — especially if that one thing is information — is usually a candidate for cutting.

Hemingway's story "The Killers" reads almost like a script. Two men walk into a diner and order food. Their dialogue is flat, repetitive, banal — *I don't know what I want to eat* — and it is terrifying, because the flatness itself signals menace. These men are in no hurry. They are toying with the counterman. Within a few lines we sense they are dangerous without anyone saying so. The banality is doing double duty: surface conversation, buried threat.

Principles of economy:

- **Short lines.** Most screen dialogue is one sentence or less. Long speeches should be rare and earned.
- **Enter late, leave early.** Skip greetings and goodbyes. Start the scene at the first moment of tension and cut when the turn happens.
- **Let silence and action answer.** A character who doesn't respond, or responds with a gesture, often says more than a reply.
- **Cut "as you know" exposition ruthlessly.** If both characters know it, they won't say it. Find another way to inform the audience, or trust them to catch up.
- **Avoid on-the-nose lines.** "I'm so angry at you!" is the actor's job, not yours. Write what the character would actually say while angry — probably something about the dishes.
- **Give each character a rhythm.** One speaks in fragments; another in complete sentences. One asks questions; another deflects. Differences in rhythm let audiences tell voices apart.

A useful revision method: read your scene aloud, then cut every line you can without losing meaning. Then cut every word from the remaining lines that you can. You will be surprised how often the scene improves at half the length.

Today's exercise imposes a hard limit: no line over twelve words. The constraint will feel artificial, but it trains you to find the compressed, sharp version of what characters say — and to let action carry the rest.`,
    modelPassage: {
      text: 'The door of Henry’s lunch-room opened and two men came in. They sat down at the counter.\n"What’s yours?" George asked them.\n"I don’t know," one of the men said. "What do you want to eat, Al?"\n"I don’t know," said Al. "I don’t know what I want to eat."',
      source: 'Ernest Hemingway, "The Killers" (1927), opening',
    },
    questions: [
      'Nothing threatening is said, yet the exchange feels uneasy. What in the repetition and rhythm creates that feeling?',
      'If you were directing this, what would the actors do while saying these lines? What does the dialogue leave for performance?',
    ],
    exercise: {
      prompt: 'Write a three-page argument scene in screenplay format between two people who need something from each other — a landlord and tenant, a boss and employee, two partners splitting up.',
      constraints: [
        'No line of dialogue longer than twelve words.',
        'Start at the first moment of tension; no greetings.',
        'At least three moments where action or silence replaces a line.',
        'No "as you know" exposition. Each character has a distinct rhythm of speech.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Dialogue economy', 'Subtext', 'Distinct voices', 'Use of silence and action', 'Format correctness'],
    pitfalls: [
      'On-the-nose lines that state feelings directly.',
      'Short lines that are merely clipped, with no subtext.',
      'Both characters speaking in the same rhythm.',
    ],
    microConstraint: null,
  },
  {
    id: 'st-01',
    track: 'style',
    title: 'Copywork: Hemingway',
    masterLens: 'Hemingway: the and-chain and the repeated noun',
    hook: 'Copying a master’s sentences by hand is the oldest writing exercise there is. You can’t see what makes prose work until you’ve made it with your own fingers.',
    body: `For centuries, writers learned by copying. Benjamin Franklin described taking essays from *The Spectator*, making notes, setting them aside, and trying to rewrite them from his notes, then comparing his version with the original to see where it fell short. Painters copy masterpieces in museums for the same reason. Copywork forces you to slow down to the speed of composition and notice choices you'd skim past as a reader.

The Style & Imitation track moves through three stages for each master: **copywork** (reproduce exactly and analyze), **pastiche** (apply the method to new material) and **departure** (keep one technique and abandon the rest). Today is copywork, with Hemingway, whose early stories are public domain and whose sentences are deceptively simple — which is exactly why they repay close study.

How to do copywork properly:

1. **Copy the passage by hand, or type it slowly.** Not copy-paste. Feel each word arrive.
2. **Notice as you go.** Where does the sentence stop? Where does it run on? What word is repeated? What kind of word ends each sentence?
3. **Analyze afterwards.** Count sentence lengths. List the verbs. Note what is described and what is omitted. Look at punctuation — Hemingway uses commas sparingly and *and* generously.
4. **Write down what you noticed.** Specifically. Not "simple style" but "four of six sentences begin with a noun phrase; *and* joins clauses that a different writer would subordinate; the emotional content is entirely in the landscape."

Things to watch for in Hemingway:

- **The and-chain.** Clauses joined by *and* rather than subordinated with *because*, *although*, *while*. The effect is of facts presented without interpretation — the reader supplies the connections.
- **Repeated nouns.** Where most writers vary words to avoid repetition, Hemingway repeats: *the river... the river... the river*. Repetition creates rhythm and a kind of incantatory plainness.
- **Concrete nouns, few adjectives.** The adjectives that do appear are basic: *white, dry, clear, cold*.
- **Interiority through landscape.** Characters rarely state feelings; the world described reflects them.
- **Omission.** Something important is almost always missing.

In the passage below, from "Big Two-Hearted River," Nick Adams is dropped off in a burned-over landscape. The story never says outright what he's recovering from; readers sense it in the care with which he does ordinary things, and in the devastated country itself. Copy it, then study it.

Copywork can feel like a step backward — you're not producing your own work. It's the opposite. You're internalizing patterns that will appear, transformed, in your own sentences for years.`,
    modelPassage: {
      text: 'The train went on up the track out of sight, around one of the hills of burnt timber. Nick sat down on the bundle of canvas and bedding the baggage man had pitched out of the door of the baggage car. There was no town, nothing but the rails and the burned-over country.',
      source: 'Ernest Hemingway, "Big Two-Hearted River," In Our Time (1925), opening',
    },
    questions: [
      'List every noun in the passage. What kinds of things does Hemingway name, and what kinds does he never name?',
      '"There was no town, nothing but the rails and the burned-over country." What feeling does this sentence create, without naming one?',
    ],
    exercise: {
      prompt: 'Copy the model passage by hand or by slow typing at the top of your draft. Then write an analysis of what you noticed: sentence lengths, joins, repetitions, nouns, verbs, omissions, and the feeling it produces.',
      constraints: [
        'The copied passage goes first, exactly as written (it counts toward the piece).',
        'Then at least six specific observations, each pointing to particular words.',
        'At least one observation on what is omitted and how you can tell.',
        'End with one technique you want to steal and one you want to avoid.',
      ],
      minWords: 250,
      maxWords: 450,
    },
    rubric: ['Accuracy of copy', 'Specificity of observation', 'Insight into technique', 'Attention to omission', 'Clarity'],
    pitfalls: [
      'Vague observations ("it’s very simple") instead of pointing to specific words.',
      'Summarizing the content instead of analyzing the sentences.',
      'Copying carelessly, missing the punctuation and repetitions that carry the style.',
    ],
    microConstraint: null,
  },
  {
    id: 'st-02',
    track: 'style',
    title: 'Pastiche: Hemingway',
    masterLens: 'Hemingway: method, not mannerism',
    hook: 'Pastiche means borrowing a writer’s method for your own material. The test is whether you took the engine or only the paint.',
    body: `In copywork you studied Hemingway's sentences closely. Now you'll apply his method to new material: a scene set in your own world, written as if Hemingway had written it. This is pastiche, and it's an essential stage between studying a style and finding your own.

The danger in pastiche is mistaking surface for method. Surface is the most obvious, imitable features: short sentences, the word *and*, bullfights and cafés and wine, men called "the man" and women called "the girl." A pastiche made of surface features reads as parody. Method is what produces the effect: **omission** (the important thing unsaid), **concreteness** (objects carrying feeling), **plain diction**, **flat declarative statements**, and **dialogue that circles the subject**. A pastiche built on method could be set in a dorm room, a trading floor or a hospital waiting area and still feel unmistakably like the master.

Hemingway's famous final sentence of *A Farewell to Arms*, below, shows method in miniature. The narrator's beloved has just died. The sentence describes leaving the hospital and walking in the rain. Nothing more. The grief is entirely in what's omitted, and in the rain, which has run through the whole novel as an omen of death. By his own account, Hemingway rewrote the ending dozens of times before arriving at this flatness. The flatness is the achievement.

How to write a strong pastiche:

- **Pick contemporary, personal material.** Something you know: a phone call with a parent, a night out that went wrong, a break-up by text. The contrast between old method and new material reveals the method clearly.
- **Decide what is omitted, in detail.** The iceberg requires that you know the hidden part. Write it down privately before you begin.
- **Write in plain diction.** Short Anglo-Saxon words. Very few adjectives. Repeat nouns rather than varying them.
- **Let objects and landscape carry emotion.** A cold coffee, a parking lot, the light in a stairwell.
- **Write evasive dialogue.** People talk around the thing.
- **End flat.** On an action or image, not a reflection.

Then read it critically. Where did you slip into surface imitation — a sentence that's short only because Hemingway's were? Where did the method work — a moment where the omission creates real pressure?

Pastiche is not the goal. It's practice for a kind of control. Once you can deliberately write in a style that isn't yours, you begin to see your own habits as choices too — and choices can be changed.`,
    modelPassage: {
      text: 'After a while I went out and left the hospital and walked back to the hotel in the rain.',
      source: 'Ernest Hemingway, A Farewell to Arms (1929), last sentence',
    },
    questions: [
      'The narrator’s lover has just died. What does this sentence leave out, and why is the omission more powerful than a description of grief?',
      'Count the "and"s. What does the chain of actions, joined this way, suggest about the narrator’s state?',
    ],
    exercise: {
      prompt: 'Write a scene from your own contemporary life using Hemingway’s method: a phone call with a parent, a break-up, a night out that went wrong, a conversation after bad news.',
      constraints: [
        'Contemporary setting you know firsthand. No bullfights, cafés, or wars.',
        'Before drafting, write privately what is omitted (does not count).',
        'Plain diction; repeat nouns rather than varying them; few adjectives.',
        'At least some dialogue that circles the real subject.',
        'End on an action or image, flat.',
      ],
      minWords: 300,
      maxWords: 500,
    },
    rubric: ['Technique captured', 'Originality of material', 'Control of syntax', 'Concreteness', 'Voice awareness'],
    pitfalls: [
      'Borrowing surface (short sentences, "the girl") without the omission that drives them.',
      'Period costume: setting the scene in Hemingway’s world instead of yours.',
      'Ending with an explanation or reflection.',
    ],
    microConstraint: null,
  },
  {
    id: 'st-03',
    track: 'style',
    title: 'Departure: from Hemingway',
    masterLens: 'Hemingway, then away',
    hook: 'The point of imitating a master is to leave. Keep the one tool you’ll use forever; return the rest.',
    body: `You have copied Hemingway and written in his manner. Now comes the most important stage: **departure**. You keep one technique — the one that genuinely serves you — and abandon everything else, rewriting your pastiche in your own voice.

Writers who never depart become imitators. Their work reads as secondhand; reviewers say "Hemingway-esque" and mean it as a criticism. Writers who never imitate at all often stay limited to the habits they started with. Departure is the move that turns influence into skill: the borrowed technique, absorbed, becomes part of a voice that is recognizably yours.

Look at the original demonstration below. It takes the kind of flat, omissive scene a Hemingway pastiche produces and rewrites it, keeping omission — the central event is still unstated — but abandoning the plain diction, the and-chains, and the flat affect. The narrator now has a voice: ironic, a little anxious, prone to precise and odd comparisons. The iceberg is still there; the water around it looks different.

How to depart:

1. **Reread your pastiche** (from the previous lesson) and identify every Hemingway technique you used. List them.
2. **Choose one to keep.** Which one actually helped? Which produced the moment of greatest pressure or truth? For many writers it's omission. For some it's the concrete object carrying emotion, or evasive dialogue.
3. **Identify your own instincts.** What did you have to suppress to write the pastiche? Long sentences? Humor? Interiority? Strange metaphors? Philosophical asides? Those suppressed impulses are clues to your voice.
4. **Rewrite the same scene,** keeping the one technique and letting everything else come back.
5. **Compare.** Which version is more alive? Where does the kept technique work better in its new setting?

This is not about rejecting Hemingway. You're learning that a technique and a style are different things. A technique — omission, the telling detail, free indirect style — is a tool anyone can use. A style is the particular combination of tools, rhythms, and obsessions that only one writer has. You are collecting tools from many masters in order to build a style no one else has.

You admire writers who sound nothing like Hemingway — Dostoevsky's feverish confession, Seneca's intimate argument, Camus's lucid heat. Over this track you'll imitate several of them and depart from each. What remains, after all those departures, is you.

Today's work is a rewrite, not a new piece. The comparison is the lesson.`,
    modelPassage: {
      text: 'Pastiche: He put the phone down. The coffee was cold. He drank it anyway and looked at the parking lot.\n\nDeparture: I put the phone down the way you put down something that might go off. The coffee had gone cold an hour ago, which I took personally, and I drank it anyway because throwing it out felt like admitting the morning was over. Outside, the parking lot went on being a parking lot. Nobody had told it anything.',
      source: 'Original demonstration (technique after Hemingway), written for this lesson',
    },
    questions: [
      'Both versions omit what the phone call was about. What technique did the departure keep, and what did it abandon?',
      '"Nobody had told it anything." What does this line reveal about the narrator that the pastiche version could not?',
    ],
    exercise: {
      prompt: 'Rewrite your Hemingway pastiche (or any archived scene) keeping exactly one Hemingway technique and letting your own instincts back in. Then add a short note comparing the two versions.',
      constraints: [
        'Name, at the top, the one technique you are keeping (it counts toward the piece).',
        'The same scene and events as the original.',
        'At least two choices Hemingway would never make (a long sentence, a metaphor, humor, interiority).',
        'End with a note of 60-120 words: which version is more alive, and why.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Technique retained well', 'Voice awareness', 'Originality', 'Control of syntax', 'Quality of comparison'],
    pitfalls: [
      'Keeping several techniques, so the rewrite is still a pastiche.',
      'Abandoning the kept technique too, so nothing is learned.',
      'A comparison note that only says "I like the second one better".',
    ],
    microConstraint: null,
  },
  {
    id: 'c-01',
    track: 'compression',
    title: 'The image',
    masterLens: 'Chekhov: the glint on broken glass',
    hook: 'An image is a picture made of words that carries a feeling the words never name. It is the smallest unit of poetry and the secret engine of good prose.',
    body: `An image in writing is a concrete, sensory rendering — usually visual, but also sound, smell, touch, taste — that does more than describe. It carries emotion, idea or atmosphere without stating it. *The lone and level sands stretch far away* is an image: it shows sand and contains the whole idea of oblivion.

The image is the foundation of poetry, and every prose writer benefits from mastering it. A strong image can replace a paragraph of explanation. It's also memorable: readers forget arguments but remember pictures.

In 1913 Ezra Pound published a two-line poem that became a manifesto for a movement called Imagism. By his own account, he saw a series of beautiful faces in the Paris Metro and tried for a long time to write about the experience; he wrote a thirty-line poem, destroyed it, wrote a shorter one, and finally, more than a year later, arrived at the version below. The poem is barely a sentence. It sets two images side by side — faces in a crowd; petals on a wet, black bough — and lets the reader feel the connection: beauty glimpsed and vanishing, fragile brightness against darkness. There is no verb, no statement, no "like." The juxtaposition does everything.

Principles of the image:

- **Be concrete and specific.** Not *a flower* but *a crushed marigold in the gutter*. Specificity creates vividness and credibility.
- **Engage more than sight.** Sound, smell, temperature and texture are underused and powerful. The smell of a hospital corridor carries more than its appearance.
- **Avoid stock images.** Rain for sadness, sunrise for hope, a wilting rose for loss — these have been used so often they no longer carry feeling. Find an image only *this* situation would produce.
- **Let the image carry the feeling; don't explain it.** If you write *the empty swing moved in the wind, reminding her of her lost childhood*, the second half kills the first.
- **Use juxtaposition.** Two images placed side by side can generate a third meaning, as in Pound's poem.
- **Compress.** Cut every word that doesn't sharpen the picture.

How to find images: observe. Carry a notebook. Write down what you actually notice, not what you think you should notice. The best images come from attention, not imagination — from the particular way light hit a specific puddle on a specific evening.

Today you'll write ten one-sentence images of your street at night. The constraint forces observation: you have to go and look, or remember precisely, and you have to find ten distinct things worth seeing.`,
    modelPassage: {
      text: 'The apparition of these faces in the crowd;\nPetals on a wet, black bough.',
      source: 'Ezra Pound, "In a Station of the Metro" (1913)',
    },
    questions: [
      'The poem has no verb and never says the faces are like petals. What does the semicolon do in place of "like"?',
      'Why "wet, black bough" instead of just "bough"? What do those two adjectives add to the feeling of the faces?',
    ],
    exercise: {
      prompt: 'Write ten one-sentence images of your street (or another place you know well) at night. Then choose your best two and write two sentences on why each works.',
      constraints: [
        'Ten numbered images, each a single sentence.',
        'At least four use a sense other than sight.',
        'No stock images: no moon, no rain-as-sadness, no stars.',
        'No image may name an emotion.',
        'At least one image uses juxtaposition (two things side by side).',
      ],
      minWords: 200,
      maxWords: 400,
    },
    rubric: ['Image', 'Specificity', 'Range of senses', 'Freshness', 'Precision'],
    pitfalls: [
      'Stock images that have been used a thousand times.',
      'Explaining the feeling after showing the image.',
      'Generic nouns (tree, car, building) instead of specific ones.',
    ],
    microConstraint: null,
  },
  {
    id: 'c-02',
    track: 'compression',
    title: 'The line',
    masterLens: 'Pascal: the sentence as a whole thought',
    hook: 'A line is the unit of poetry the way a sentence is the unit of prose. Learn to make one line that stands alone, complete, and you’ve learned how to weigh every word.',
    body: `In poetry the line is fundamental. It is a unit of rhythm, of attention, of breath. Even in prose the principle applies: the best writers build sentences that work as complete units — balanced, weighted, finished — like Pascal's fragments or Marcus Aurelius's notes. Today's lesson is about making single lines that stand on their own.

A strong line has several qualities:

- **Completeness.** It contains a whole thought or image. It doesn't depend on the line before or after to make sense, even if it gains from them.
- **Weight.** Every word does work. Remove one and the line collapses; add one and it sags.
- **Rhythm.** The line has a shape you can hear. Read it aloud. Where are the stresses? Does it rise and fall, or drag?
- **Surprise.** Something in the line is unexpected — a word, a turn, a pairing — that makes the reader look twice.
- **Emphasis at the edges.** The beginning and end of a line are its strongest positions. Put the important words there.

William Blake's "Auguries of Innocence" opens with four lines that have become some of the most quoted in English. Each is complete: a world in a grain of sand, heaven in a wild flower, infinity in your palm, eternity in an hour. Each makes the same astonishing move — the immense contained in the tiny — but with a different image and a different scale. The parallel structure gives them rhythm; the variety keeps them alive. And each line ends on its most surprising word: *Sand*, *Flower*, *hand*, *hour*.

How to make lines:

1. **Start with a thought or image** you care about.
2. **Write it badly first,** as a full prose sentence.
3. **Compress.** Cut connectives, qualifiers, anything the reader can supply.
4. **Rearrange for emphasis.** Move the most important word to the end.
5. **Listen.** Read it aloud. Change words for sound and rhythm as well as sense.
6. **Test for completeness.** Read it alone. Does it stand?

Lines need not rhyme or follow a meter. Free verse lines get their power from compression, image and the placement of words. But every line, metered or not, should feel deliberately shaped rather than accidentally stopped.

This skill transfers directly to prose. Writers who can make one strong line can make strong sentences, strong final sentences of paragraphs, strong opening lines of stories. Pascal's fragments are prose, but each sentence is weighted like a line of poetry. Every essay you write will benefit from knowing how.

Today you'll write twelve single lines, each complete and unlike the others.`,
    modelPassage: {
      text: 'To see a World in a Grain of Sand\nAnd a Heaven in a Wild Flower,\nHold Infinity in the palm of your hand\nAnd Eternity in an hour.',
      source: 'William Blake, "Auguries of Innocence" (written c. 1803), opening',
    },
    questions: [
      'Each line contains something vast inside something small. Which pairing surprises you most, and why?',
      'Look at the last word of each line. Why do you think Blake placed those words at the ends?',
    ],
    exercise: {
      prompt: 'Write twelve single lines, each complete in itself and unlike the others: different subjects, shapes and rhythms. Then choose the best and explain in two or three sentences what makes it work.',
      constraints: [
        'Twelve numbered lines, each under 20 words and complete on its own.',
        'At least three end on a concrete noun; at least two use a strong contrast.',
        'Vary them: some images, some statements, some questions.',
        'Read each aloud; revise at least three for sound and note which ones.',
      ],
      minWords: 150,
      maxWords: 350,
    },
    rubric: ['Compression', 'Completeness of each line', 'Sound and rhythm', 'Surprise', 'Precision'],
    pitfalls: [
      'Lines that are fragments needing context to make sense.',
      'Twelve lines with the same shape and rhythm.',
      'Abstract statements ("Love is pain") instead of images or precise claims.',
    ],
    microConstraint: null,
  },
];
