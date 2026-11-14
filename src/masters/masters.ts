/**
 * The Master Library. All descriptions are original. Quote nothing from
 * in-copyright authors beyond a short phrase. To add a master, append an entry.
 */
export interface Master {
  id: string;
  name: string;
  dates: string;
  /** One paragraph on how they work. */
  method: string;
  techniques: [string, string, string, string, string];
  steal: string;
  avoid: string;
  exercises: [string, string, string];
  readingOrder: string[];
}

export const MASTERS: Master[] = [
  {
    id: 'dostoevsky', name: 'Fyodor Dostoevsky', dates: '1821–1881',
    method: 'Dostoevsky writes ideas as if they were diseases: a character catches a theory and the plot is the fever running its course. His scenes are crowded, loud and over-long by any workshop standard, yet they generate unbearable pressure because every person in the room wants something incompatible. His narrators argue with themselves and with an imagined reader, anticipating objections and sneering at them. He alternates feverish interiority with sudden, theatrical public scenes — the scandal, the confession, the confrontation — where private torment explodes in front of witnesses.',
    techniques: [
      'The idea as character: a person who lives out a theory to its end',
      'The self-interrupting narrator who argues with an imagined audience',
      'The scandal scene: private conflict detonated in public',
      'Doubles: characters who mirror each other’s worst possibilities',
      'Confession as evasion: characters who confess to avoid repenting',
    ],
    steal: 'The pressure of ideas embodied in people; the voice that knows it is being judged.',
    avoid: 'His digressions and his length; melodrama without his moral seriousness; 19th-century diction.',
    exercises: [
      'Write a monologue by someone who explains a theory that justifies something they want to do.',
      'Stage a public scene where a private grievance erupts in front of witnesses.',
      'Write two characters who are each other’s worst possible future.',
    ],
    readingOrder: ['Notes from Underground', 'Crime and Punishment', '"The Dream of a Ridiculous Man"', 'The Brothers Karamazov', 'Demons'],
  },
  {
    id: 'tolstoy', name: 'Leo Tolstoy', dates: '1828–1910',
    method: 'Tolstoy sees everything at once and judges almost nothing out loud. His omniscient narrator moves between minds and through history with total calm, attending to the bodily truth of experience — a hand, a smell, the way a person shifts in a chair while lying. He distrusts abstraction, ceremony and self-deception, and he exposes them by describing them precisely until they look absurd. The moral force of his work comes from the exactness of his attention rather than from argument.',
    techniques: [
      'Defamiliarization: describing a familiar ritual as if seen for the first time',
      'The physical detail that betrays a lie',
      'Mobile omniscience: entering any mind, including an animal’s',
      'The summary of a whole life in a paragraph, then an hour in ten pages',
      'Moral exposure through precise description, not commentary',
    ],
    steal: 'Attention to the body; the slow exposure of a comfortable lie.',
    avoid: 'Late-period sermonizing; long essay-chapters on history.',
    exercises: [
      'Describe a social ritual (a graduation, a job interview) as if you had never seen one.',
      'Show a character lying through a single physical detail.',
      'Summarize twenty years of a life in one paragraph, then write one hour of it in full.',
    ],
    readingOrder: ['The Death of Ivan Ilych', '"Master and Man"', 'Hadji Murat', 'Anna Karenina', 'War and Peace'],
  },
  {
    id: 'sartre', name: 'Jean-Paul Sartre', dates: '1905–1980',
    method: 'Sartre makes philosophy out of situations. His fiction places a consciousness in front of things — a pebble, a tree root, a café — and records the vertigo of seeing that nothing has to be the way it is. His essays build arguments from examples: the waiter playing at being a waiter, the person deciding in a moment of crisis. The method is phenomenological: describe experience exactly, and let the description carry the philosophical claim.',
    techniques: [
      'The philosophical claim built from a concrete everyday example',
      'Nausea: rendering the strangeness of mere existence in objects',
      'Bad faith dramatized: a character pretending to have no choice',
      'The journal form as a record of a mind changing',
      'Situations as tests of freedom and responsibility',
    ],
    steal: 'Philosophy grounded in a scene you can see; the diary of perception.',
    avoid: 'Abstract jargon; characters who are only mouthpieces.',
    exercises: [
      'Describe an ordinary object until it becomes strange.',
      'Show a character in bad faith: insisting they have no choice when they do.',
      'Write a diary of one week in which a perception slowly changes.',
    ],
    readingOrder: ['Nausea', '"The Wall"', 'No Exit', 'Existentialism Is a Humanism', 'The Words'],
  },
  {
    id: 'camus', name: 'Albert Camus', dates: '1913–1960',
    method: 'Camus writes with a classical clarity about the absurd: the collision between our hunger for meaning and a world that offers none. His fiction is spare, sun-struck and physical; his essays are lyrical arguments that refuse both despair and false hope. He prefers the plain sentence, the concrete image of heat and light, and conclusions reached through lucidity rather than consolation. His characters are often defined by refusing to perform the feelings society requires.',
    techniques: [
      'Flat, plain narration of extreme events',
      'Physical sensation (heat, light, sea) as moral atmosphere',
      'The lyrical argument: essay prose with an image at its center',
      'The refusal to perform expected emotion',
      'Revolt as conclusion: affirming life without appeal',
    ],
    steal: 'Clarity about dark matters; the body in the sun as a philosophical position.',
    avoid: 'Imitating his detachment until the prose goes dead; borrowing his North African setting.',
    exercises: [
      'Narrate a shocking event in the plainest possible sentences.',
      'Write an argument about meaning that rests on one physical image.',
      'Write a character who refuses to cry at a funeral; do not explain why.',
    ],
    readingOrder: ['The Stranger', 'The Myth of Sisyphus', 'The Plague', 'The Fall', 'Nuptials'],
  },
  {
    id: 'nietzsche', name: 'Friedrich Nietzsche', dates: '1844–1900',
    method: 'Nietzsche philosophizes in explosions. He compresses arguments into aphorisms, attacks ideas through their psychology (who benefits from believing this?), and writes with a performer’s sense of rhythm, mask and provocation. He alternates sections of a few lines with sustained polemic, and he loves the reversal — turning a moral value upside down to see what it hides.',
    techniques: [
      'The aphorism as compressed argument',
      'Genealogy: asking where a value came from and who it serves',
      'The reversal of a received value',
      'Masks and personae (Zarathustra)',
      'Rhythmic, exclamatory polemic',
    ],
    steal: 'Compression; the psychological question behind every belief.',
    avoid: 'Cruelty and grandiosity mistaken for insight; cynical inversions without evidence.',
    exercises: [
      'Write ten aphorisms on ambition; mark the two that actually claim something.',
      'Take a value you hold and trace who first benefited from it.',
      'Write a short polemic against a fashionable idea, fair to the people who hold it.',
    ],
    readingOrder: ['Twilight of the Idols', 'Beyond Good and Evil', 'The Gay Science', 'On the Genealogy of Morals', 'Thus Spoke Zarathustra'],
  },
  {
    id: 'seneca', name: 'Seneca', dates: 'c. 4 BC–AD 65',
    method: 'Seneca teaches through letters: intimate, practical, aimed at one friend’s actual life. Each letter starts from something small — a visit, an illness, a noise from the street — and moves to a principle, then turns the principle back on the reader as a challenge. He uses short, quotable sentences (sententiae) to land points, and he admits his own failures, which makes the advice bearable.',
    techniques: [
      'The letter that starts with an everyday incident',
      'The sententia: a short, balanced, memorable line',
      'Raising the friend’s objection and answering it',
      'Self-implication: the teacher admits his own faults',
      'Time as the central currency of a life',
    ],
    steal: 'The intimate address; turning philosophy into instructions for tomorrow.',
    avoid: 'Moralizing without self-implication; Latinate pomposity.',
    exercises: [
      'Write a letter to a friend that starts from something you saw today and ends in a challenge.',
      'Write five sententiae on how you spend your time.',
      'Write a letter that admits you fail at the advice you are giving.',
    ],
    readingOrder: ['On the Shortness of Life', 'Letters from a Stoic (selections)', 'On Anger', 'On Tranquility of Mind', 'On the Happy Life'],
  },
  {
    id: 'marcus', name: 'Marcus Aurelius', dates: '121–180',
    method: 'The Meditations are notes to self: short entries, repetitive by design, written to correct the writer rather than impress a reader. Marcus returns to the same few ideas — impermanence, duty, the smallness of fame — from new angles, often through a sudden shift of scale (cities as anthills, a famous life as already forgotten). The tone is stern and tender at once.',
    techniques: [
      'The note to self in the second person',
      'Shifting scale to cut vanity down',
      'Repetition as practice, not redundancy',
      'Physical analysis: describing a luxury by its components',
      'The morning resolution',
    ],
    steal: 'Writing as a daily discipline of attention; the change of scale.',
    avoid: 'Platitudes; borrowing the archaic "thou" of old translations.',
    exercises: [
      'Write ten entries addressed to yourself as "you" about one recurring failure.',
      'Describe something you desire as its physical components.',
      'Write about a famous person as if a thousand years have passed.',
    ],
    readingOrder: ['Meditations, Books II and IV', 'Meditations, complete'],
  },
  {
    id: 'hemingway', name: 'Ernest Hemingway', dates: '1899–1961',
    method: 'Hemingway builds emotion by omission. His early prose uses plain words, declarative sentences joined by "and", repeated nouns, and surfaces precise enough that the reader feels the submerged mass of what is not said. His dialogue is evasive and circular; his characters talk about drinks and landscapes while deciding their lives. He revised obsessively and cut whatever the reader could infer.',
    techniques: [
      'The iceberg: omit what you know',
      'The and-chain sentence of sequential facts',
      'Repetition of plain nouns instead of synonyms',
      'Evasive dialogue that circles the real subject',
      'Landscape as emotional correlative',
    ],
    steal: 'Omission backed by knowledge; trust in the concrete noun.',
    avoid: 'The macho pose; flat prose that omits because it knows nothing; the mannerism of "and".',
    exercises: [
      'Write a scene about a breakup in which the breakup is never mentioned.',
      'Describe a landscape that tells the reader what a character feels.',
      'Write a dialogue where both people talk about something trivial while deciding something serious.',
    ],
    readingOrder: ['In Our Time', '"Hills Like White Elephants"', 'The Sun Also Rises', 'A Farewell to Arms', 'A Moveable Feast'],
  },
  {
    id: 'kafka', name: 'Franz Kafka', dates: '1883–1924',
    method: 'Kafka reports the impossible in the calm, precise language of a legal memorandum. The nightmare premise arrives in the first sentence; everything after it is treated with scrupulous logic. Characters negotiate with incomprehensible authorities, try to behave correctly, and are never told the rules. His parables refuse a single key, inviting interpretations that the text then quietly undermines.',
    techniques: [
      'The impossible premise stated in the first line',
      'Deadpan, bureaucratic precision',
      'Authority that cannot be reached or understood',
      'The parable without a key',
      'Logic carried past the point of sense',
    ],
    steal: 'Calm narration of the unbearable; logic as horror.',
    avoid: 'Vague surrealism; using "Kafkaesque" weirdness without his precision.',
    exercises: [
      'Begin with an impossible event and narrate its consequences with total realism.',
      'Write a character trying to complete a process whose rules keep changing.',
      'Write a parable that resists a single moral.',
    ],
    readingOrder: ['"Before the Law"', 'The Metamorphosis', '"A Hunger Artist"', 'The Trial', 'Diaries (selections)'],
  },
  {
    id: 'chekhov', name: 'Anton Chekhov', dates: '1860–1904',
    method: 'Chekhov wrote as a doctor observes: exactly, without sentimentality, with compassion that never announces itself. His stories rarely have big plots; they turn on small shifts of feeling, often unresolved. He trusted telling details over description and let characters reveal themselves in what they talk about instead of what matters. His endings open rather than close.',
    techniques: [
      'The telling detail in place of description',
      'Objectivity: the narrator neither condemns nor excuses',
      'The quiet turn: a story that ends in changed feeling, not event',
      'Talk about trivia while lives collapse',
      'The open ending',
    ],
    steal: 'Compassionate objectivity; the small change that is the whole story.',
    avoid: 'Mistaking lack of plot for lack of structure; mood without change.',
    exercises: [
      'Write a story where the only event is a change in how someone sees another person.',
      'Portray a flawed character without judging them.',
      'End a story at the moment when a character understands their life is about to get harder.',
    ],
    readingOrder: ['"The Lady with the Dog"', '"Gooseberries"', '"The Bishop"', '"Ward No. 6"', 'The Cherry Orchard'],
  },
  {
    id: 'montaigne', name: 'Michel de Montaigne', dates: '1533–1592',
    method: 'Montaigne invented the essay as an "attempt": thinking on the page, in public, about whatever is in front of him. He digresses, contradicts himself, piles up classical examples and then undercuts them with an observation about his own body or habits. His subject is always the self as a sample of the human. The structure follows the movement of thought, not a thesis.',
    techniques: [
      'The essay as attempt: thinking that discovers its conclusion',
      'Digression that returns transformed',
      'Self-portrait as evidence about humanity',
      'Contradiction left visible',
      'The homely detail against the grand example',
    ],
    steal: 'Permission to think on the page; the self as a sample.',
    avoid: 'Shapeless rambling; quotation as decoration.',
    exercises: [
      'Write an essay "Of Procrastination" that ends somewhere you did not plan.',
      'Set a grand historical example against a small habit of your own.',
      'Contradict yourself halfway through an essay and keep both positions.',
    ],
    readingOrder: ['"Of Idleness"', '"Of Experience"', '"That to Philosophize Is to Learn to Die"', '"Of Cannibals"', '"Of Repentance"'],
  },
  {
    id: 'orwell', name: 'George Orwell', dates: '1903–1950',
    method: 'Orwell treats clarity as a moral duty: unclear language, he argued, makes unclear and dishonest thinking easy. He writes plain, concrete English, usually in the first person of a participant-witness, and his essays often start from a vivid incident before widening to politics. He distrusts jargon, euphemism and stale metaphor, and he revises toward the shortest accurate word.',
    techniques: [
      'The essay that opens with a concrete incident',
      'The participant-witness voice',
      'Hunting stale metaphor and euphemism',
      'Plain words for hard truths',
      'Political argument grounded in observed detail',
    ],
    steal: 'Clarity as honesty; going there and writing what you saw.',
    avoid: 'Turning his rules into dogma; contempt for readers who disagree.',
    exercises: [
      'Rewrite a paragraph of official prose in plain English and say what the original concealed.',
      'Write an essay that begins with an incident you witnessed and widens to a political point.',
      'List ten stale phrases you use and replace each with something seen.',
    ],
    readingOrder: ['"Shooting an Elephant"', '"Politics and the English Language"', '"Why I Write"', 'Down and Out in Paris and London', 'Homage to Catalonia'],
  },
  {
    id: 'baldwin', name: 'James Baldwin', dates: '1924–1987',
    method: 'Baldwin fuses personal witness and moral argument in long, rhythmic sentences that build like sermons and then land with terrible plainness. He writes from inside his own experience — family, church, city — and moves outward to indict a nation, without ever losing tenderness for the people he describes. He refuses the comfortable distance of the observer.',
    techniques: [
      'The long periodic sentence that lands on a plain verdict',
      'Personal memory as public evidence',
      'Love and indictment in the same paragraph',
      'Sermon rhythms: repetition, escalation, address',
      'Refusing the safe distance of the observer',
    ],
    steal: 'Moral seriousness carried by rhythm; the personal as argument.',
    avoid: 'Borrowing his voice or his subject; rhetoric without witness.',
    exercises: [
      'Write a paragraph that moves from a family memory to a judgment about your society.',
      'Write a long sentence that builds for sixty words and lands on a short clause.',
      'Write about someone you love and must criticize, without softening either.',
    ],
    readingOrder: ['Notes of a Native Son', 'The Fire Next Time', '"Sonny’s Blues"', 'Giovanni’s Room', 'Go Tell It on the Mountain'],
  },
  {
    id: 'didion', name: 'Joan Didion', dates: '1934–2021',
    method: 'Didion writes with a cool, exact surface over enormous pressure. Her essays assemble fragments, precise personal details and repeated phrases into patterns that suggest more than they state. She reports her own nerves as evidence, distrusts the stories people tell to make sense of things, and lets structure — breaks, refrains, lists — do the work of argument.',
    techniques: [
      'The cool register over high emotional stakes',
      'Refrain: a phrase returned to with shifting meaning',
      'Fragmented structure with white space as argument',
      'The precise personal detail as evidence',
      'Skepticism toward the stories we tell ourselves',
    ],
    steal: 'Control of tone; structure as meaning.',
    avoid: 'Imitating the surface coolness without the pressure beneath; quoting her (in copyright).',
    exercises: [
      'Write an essay about a bad year in a calm, exact register with one refrain.',
      'Assemble an essay from ten numbered fragments.',
      'Write about a story your family tells and what it conceals.',
    ],
    readingOrder: ['Slouching Towards Bethlehem', 'The White Album', 'The Year of Magical Thinking', 'Play It as It Lays'],
  },
  {
    id: 'woolf', name: 'Virginia Woolf', dates: '1882–1941',
    method: 'Woolf follows consciousness. Her narration slides between minds through free indirect style, letting long associative sentences mimic the movement of attention, memory and feeling within a single moment. She compresses whole lives into single days and uses recurring images (waves, a clock striking, a lighthouse) to stitch scattered perspectives together.',
    techniques: [
      'Free indirect style sliding into a character’s idiom',
      'The associative sentence that follows attention',
      'The single day as the vessel of a life',
      'Recurring images that bind perspectives',
      'Passing the narrative between minds through a shared event',
    ],
    steal: 'Interiority without tags; time as felt rather than measured.',
    avoid: 'Endless lyrical drift with no dramatic pressure.',
    exercises: [
      'Render a short errand through one mind, letting memory interrupt.',
      'Pass a scene between three characters through a single shared sound.',
      'Compress a life into one day; let objects carry the past.',
    ],
    readingOrder: ['Mrs Dalloway', 'A Room of One’s Own', 'To the Lighthouse', '"Modern Fiction"', 'The Waves'],
  },
  {
    id: 'borges', name: 'Jorge Luis Borges', dates: '1899–1986',
    method: 'Borges writes metaphysics as short fiction disguised as scholarship: reviews of imaginary books, footnoted histories of invented worlds, detective stories about infinity. His prose is precise and dry, his structures are puzzles, and his subjects are time, identity, memory and the infinite. He shows that an idea can be the protagonist.',
    techniques: [
      'The fictional essay or review of an imaginary book',
      'Invented sources and footnotes for authority',
      'The metaphysical idea as plot',
      'Mirrors, labyrinths and infinite libraries as motifs',
      'Compression: a novel’s idea in ten pages',
    ],
    steal: 'Ideas as plot; scholarly tone as a fiction device.',
    avoid: 'Puzzle without feeling; pastiche labyrinths.',
    exercises: [
      'Review a book that does not exist about a man who wanted to be remembered.',
      'Write a history of an invented custom, with sources.',
      'Turn a philosophical paradox into a short plot.',
    ],
    readingOrder: ['"The Garden of Forking Paths"', '"Funes the Memorious"', '"The Library of Babel"', '"Pierre Menard, Author of the Quixote"', 'Labyrinths'],
  },
  {
    id: 'murdoch', name: 'Iris Murdoch', dates: '1919–1999',
    method: 'Murdoch, a philosopher-novelist, dramatizes moral life as a struggle of attention: seeing other people justly rather than through the fog of the ego. Her novels are crowded, plotty and comic, full of enchanters, self-deceivers and people falling in and out of love, and they turn on moments when a character finally sees someone else as they are.',
    techniques: [
      'Moral vision: the turn from ego to attention',
      'The enchanter figure who distorts others’ perception',
      'Comedy of self-deception',
      'Philosophical ideas embodied in plot, not lecture',
      'The ensemble cast of interlocking desires',
    ],
    steal: 'Attention as ethics; philosophy that lives inside plot.',
    avoid: 'Over-plotting; characters who exist only to illustrate ideas.',
    exercises: [
      'Write a scene where a character finally sees someone else without self-interest.',
      'Write a charming manipulator through the eyes of someone under their spell.',
      'Build a scene around four people who each want something from one another.',
    ],
    readingOrder: ['Under the Net', 'The Sovereignty of Good', 'The Bell', 'A Severed Head', 'The Sea, the Sea'],
  },
  {
    id: 'kierkegaard', name: 'Søren Kierkegaard', dates: '1813–1855',
    method: 'Kierkegaard communicates indirectly. He writes under pseudonyms who hold views he does not, sets them against each other, and leaves the reader to choose. His prose mixes lyrical flights, ironic parables and anguished argument about faith, despair and becoming a self. He insists that truth must be lived, not merely understood.',
    techniques: [
      'Pseudonymous authors with views not the author’s',
      'Indirect communication: the reader must decide',
      'The ironic parable',
      'Lyrical philosophy of inner states (anxiety, despair)',
      'Either/or: two ways of life set side by side',
    ],
    steal: 'Arguing through masks; making the reader responsible.',
    avoid: 'Obscurity; theology the student does not hold, used as decoration.',
    exercises: [
      'Write an essay by a pseudonymous author who defends a life of pleasure.',
      'Write a reply by a second pseudonym who defends duty. Do not choose.',
      'Write a parable about a man who postpones becoming himself.',
    ],
    readingOrder: ['Fear and Trembling', 'Either/Or (selections: "Diapsalmata", "The Seducer’s Diary")', 'The Sickness unto Death', 'Works of Love'],
  },
  {
    id: 'pascal', name: 'Blaise Pascal', dates: '1623–1662',
    method: 'Pascal left his great work in fragments, and the fragment became a method: short, piercing observations about distraction, misery and grandeur, set against each other. A mathematician, he argues with startling precision and with images that stay — the reed, the infinite spaces, the man who cannot sit quietly in a room. His prose is balanced, antithetical and fiercely compressed.',
    techniques: [
      'The fragment that gains meaning by juxtaposition',
      'Antithesis: grandeur and misery in one sentence',
      'The startling image for an abstract truth',
      'Diversion: analyzing what we do to avoid thinking',
      'Mathematical precision in moral prose',
    ],
    steal: 'Compression and antithesis; the analysis of distraction.',
    avoid: 'Apologetics you do not believe; fragments that are merely unfinished.',
    exercises: [
      'Write twenty fragments on distraction and phones, then order them.',
      'Write five sentences that hold grandeur and misery together.',
      'Analyze one habit of yours as a way of not thinking about death.',
    ],
    readingOrder: ['Pensées (selections on diversion)', 'Pensées (the wager)', 'Pensées, complete (Trotter translation)'],
  },
  {
    id: 'thoreau', name: 'Thoreau & Emerson', dates: '1817–1862 / 1803–1882',
    method: 'Emerson writes in charged aphoristic sentences that build essays like strings of lightning; Thoreau grounds the same convictions in close observation — beans, ice, ants, the cost of a shack to the half-cent. Together they model prose that argues for self-reliance and deliberate living through both the oracular claim and the patient, measured fact.',
    techniques: [
      'The oracular sentence (Emerson)',
      'Accounting: argument by itemized cost (Thoreau)',
      'Naturalist observation as moral evidence',
      'Extravagance: deliberate exaggeration to wake the reader',
      'The essay built from journal entries',
    ],
    steal: 'Living deliberately on the page; measuring life in what it costs.',
    avoid: 'Preachiness; nature writing without precise observation.',
    exercises: [
      'Write an accounting of what your ambition costs you, in itemized detail.',
      'Observe one small natural event for twenty minutes and write it exactly.',
      'Write ten Emersonian sentences that each could open an essay.',
    ],
    readingOrder: ['Walden ("Economy", "Where I Lived")', '"Self-Reliance"', '"Civil Disobedience"', '"Experience"', 'Thoreau’s Journal (selections)'],
  },
];

export const masterById = new Map(MASTERS.map((m) => [m.id, m]));
