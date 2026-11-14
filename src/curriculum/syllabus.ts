import type { TrackId } from '../data/types';
import type { SyllabusEntry } from './types';

/**
 * The syllabus map. Each track is authored in order; ids and default
 * prerequisites (the previous lesson in the track) are assigned below.
 * To add a lesson: append a row to its track. See README "Adding lessons".
 */
type Row = {
  level: 1 | 2 | 3 | 4;
  title: string;
  objective: string;
  masterLens: string;
  exerciseSeed: string;
  rubricCriteria?: string[];
  estMinutes?: number;
  prerequisites?: string[];
};

const RUBRIC: Record<TrackId, string[]> = {
  foundations: ['Clarity', 'Concreteness', 'Verb strength', 'Rhythm', 'Economy'],
  essay: ['Clarity of claim or question', 'Evidence and specificity', 'Structure and movement', 'Voice', 'Economy'],
  philosophy: ['Precision of terms', 'Strength of reasoning', 'Engagement with objections', 'Concrete examples', 'Prose clarity'],
  fiction: ['Scene and conflict', 'Character', 'Concrete detail', 'Subtext', 'Prose rhythm'],
  novel: ['Specificity', 'Dramatic potential', 'Coherence with premise', 'Character depth', 'Prose clarity'],
  screen: ['Visual storytelling', 'Dialogue economy', 'Scene change', 'Format correctness', 'Character'],
  style: ['Technique captured', 'Originality of material', 'Control of syntax', 'Concreteness', 'Voice awareness'],
  compression: ['Image', 'Compression', 'Sound and rhythm', 'Surprise', 'Precision'],
};

const PREFIX: Record<TrackId, string> = {
  foundations: 'f', essay: 'e', philosophy: 'p', fiction: 'fi', novel: 'n', screen: 's', style: 'st', compression: 'c',
};

const FOUNDATIONS: Row[] = [
  { level: 1, title: 'The plain sentence', objective: 'Write declarative sentences with concrete subjects and working verbs, free of padding.', masterLens: 'Hemingway: the declarative sentence that trusts the noun', exerciseSeed: 'A room just after someone has left it, in plain sentences only.' },
  { level: 1, title: 'Concrete over abstract', objective: 'Replace abstractions with specific, observable particulars that let the reader reach the idea.', masterLens: 'Dickens and Tolstoy: the abstraction made visible', exerciseSeed: 'Make the reader feel loneliness, ambition, shame or failure without naming it.' },
  { level: 1, title: 'Verbs do the work', objective: 'Drive sentences with specific active verbs instead of being verbs, filters and noun phrases.', masterLens: 'Crane and Tolstoy: the verb as engine', exerciseSeed: 'Someone doing a skilled physical task while thinking about something else.' },
  { level: 1, title: 'Rhythm and sentence length', objective: 'Vary sentence length and structure so rhythm reinforces meaning.', masterLens: 'Melville and Seneca: the long breath and the short blow', exerciseSeed: 'Waiting for news, with sentences that enact the waiting.' },
  { level: 1, title: 'Cutting (the iceberg)', objective: 'Omit what the reader can infer, so known-but-unstated material creates pressure.', masterLens: 'Hemingway: the iceberg — omit what you know', exerciseSeed: 'Two people discuss something important without naming it; cut by a third.' },
  { level: 1, title: 'The telling detail', objective: 'Choose single particulars that imply character and situation.', masterLens: 'Chekhov: the one detail that implies the whole', exerciseSeed: 'A portrait through exactly three telling details.' },
  { level: 1, title: 'Review & revise the week', objective: 'Revise at three levels — purpose, structure, sentences — in that order.', masterLens: 'Tolstoy: revision as re-seeing', exerciseSeed: 'Rewrite one of this week’s drafts around a one-sentence statement of what it is about.', rubricCriteria: ['Clarity of purpose', 'Structure', 'Economy', 'Sentence quality', 'Improvement over original'] },
  { level: 2, title: 'Voice: who is speaking? (the angry narrator)', objective: 'Build a distinct first-person voice whose claims and revelations diverge.', masterLens: 'Dostoevsky: the voice that argues with its reader', exerciseSeed: 'An angry monologue addressed to someone who wronged the speaker.', rubricCriteria: ['Distinctness of voice', 'Emotional range', 'Specificity', 'Dramatic irony', 'Rhythm'] },
  { level: 2, title: 'Dialogue and subtext', objective: 'Write dialogue in which what is meant differs from what is said.', masterLens: 'Hemingway and Chekhov: what people say instead of what they mean', exerciseSeed: 'Two people at a mundane task; one has unwelcome news, never stated.', rubricCriteria: ['Subtext', 'Distinct voices', 'Dialogue as action', 'Economy', 'Clarity of situation'] },
  { level: 2, title: 'Scene: a want and an obstacle', objective: 'Build a scene on goal, conflict and turn.', masterLens: 'Dostoevsky: the scene as a collision of wills', exerciseSeed: 'A character wants something small and specific; something stands in the way.', rubricCriteria: ['Clarity of want', 'Obstacle and escalation', 'The turn', 'Character through action', 'Concrete detail'] },
  { level: 2, title: 'Argument in a paragraph (claim, reason, objection)', objective: 'Defend a debatable claim with evidence and a fairly stated objection.', masterLens: 'Mill and Seneca: the argument that meets its opponent', exerciseSeed: 'Two paragraphs defending a belief a reasonable person could deny.', rubricCriteria: ['Clarity of claim', 'Evidence', 'Fairness of objection', 'Strength of reply', 'Plain language'] },
  { level: 2, title: 'The aphorism: compress an idea', objective: 'Compress a held idea into memorable, precise, surprising single lines.', masterLens: 'Nietzsche and Pascal: the thought in one breath', exerciseSeed: 'A paragraph on ambition or time, compressed into ten aphorisms.', rubricCriteria: ['Compression', 'Surprise', 'Concrete imagery', 'Precision', 'Genuine claim'] },
  { level: 2, title: 'Point of view and interiority', objective: 'Control point of view and render inner life through free indirect style.', masterLens: 'Woolf: the narrative that slips into the mind', exerciseSeed: 'One moment written in first person and again in close third.', rubricCriteria: ['POV control', 'Free indirect style', 'Interiority', 'Concrete perception', 'Distinctness of versions'] },
  { level: 2, title: 'Review, revise, and the first Archive milestone', objective: 'Assess two weeks of work honestly and fully revise the most promising piece.', masterLens: 'Marcus Aurelius: the daily practice, examined', exerciseSeed: 'Revise the piece with the most potential and write a note on what you learned.', rubricCriteria: ['Choice of piece', 'Depth of revision', 'Application of the fortnight', 'Self-assessment honesty', 'Prose quality'] },
  { level: 3, title: 'Paragraph architecture', objective: 'Shape paragraphs around a single movement with a deliberate first and last sentence.', masterLens: 'Orwell: the paragraph as a unit of thought', exerciseSeed: 'Five paragraphs, each with one job, about a place that changed.' },
  { level: 3, title: 'Transitions and the logic of "and then"', objective: 'Connect sentences and paragraphs by cause, contrast and consequence rather than mere sequence.', masterLens: 'Montaigne: the digression that returns', exerciseSeed: 'An account of a day where every transition is causal (but, so, therefore), never "and then".' },
  { level: 3, title: 'Precision of diction', objective: 'Choose the exact word over the near-synonym, the plain word over the inflated one.', masterLens: 'Flaubert by way of Chekhov: le mot juste without preciousness', exerciseSeed: 'Describe a meal in 250 words; then defend twenty word choices in a margin list.' },
  { level: 4, title: 'Tone control', objective: 'Hold a consistent tone — and break it once, on purpose.', masterLens: 'Didion: cool surface, pressure beneath', exerciseSeed: 'A distressing event narrated in a calm, exact tone that cracks once.' },
  { level: 4, title: 'Syntax as meaning: the periodic sentence', objective: 'Use suspended syntax and sentence architecture to create meaning and suspense.', masterLens: 'Baldwin: the long sentence that earns its landing', exerciseSeed: 'A paragraph built around three periodic sentences, each landing a revelation.' },
  { level: 4, title: 'Revising a page in five passes', objective: 'Run a full revision protocol: purpose, structure, scene, sentence, sound.', masterLens: 'Tolstoy: revision as discipline', exerciseSeed: 'Take any archived page through five named passes, keeping each version.', estMinutes: 60 },
];

const ESSAY: Row[] = [
  { level: 1, title: 'The personal essay: an experience and its meaning', objective: 'Pair a concrete experience with reflection that discovers rather than announces its meaning.', masterLens: 'Orwell: the small incident that opens a large question', exerciseSeed: 'An essay about one small incident that still bothers you.', prerequisites: ['f-07'] },
  { level: 1, title: 'Scene and summary in nonfiction', objective: 'Alternate dramatized scenes with efficient summary in factual writing.', masterLens: 'Didion: the scene as evidence', exerciseSeed: 'A year of your life in summary, with one day dramatized in full.' },
  { level: 1, title: 'The letter (Seneca-style)', objective: 'Write a moral letter to a real friend that teaches through one example and one objection.', masterLens: 'Seneca: philosophy as correspondence', exerciseSeed: 'A letter to a friend about how they are spending their time.' },
  { level: 1, title: 'The op-ed: one claim, 700 words', objective: 'Argue one timely claim for a general reader with a hook, evidence and a fair counterargument.', masterLens: 'Orwell: plain words in public', exerciseSeed: 'An op-ed on a campus or local issue you know firsthand.', rubricCriteria: ['Clarity of claim', 'Hook', 'Evidence', 'Counterargument', 'Economy'] },
  { level: 2, title: 'Argumentative essay: thesis and counter-thesis', objective: 'Sustain an argument across sections, giving the opposing case its full strength.', masterLens: 'Mill: steelmanning the opponent', exerciseSeed: 'Argue a position on whether ambition is a virtue.' },
  { level: 2, title: 'Exploratory essay (Montaigne): thinking on the page', objective: 'Let an essay follow a question to an unplanned conclusion, with the turns visible.', masterLens: 'Montaigne: the essay as an attempt', exerciseSeed: '"Of Procrastination": an essay that finds out what you think.' },
  { level: 2, title: 'Memoir: the double perspective', objective: 'Hold the experiencing self and the remembering self in tension.', masterLens: 'Baldwin: the child seen by the man', exerciseSeed: 'A childhood moment told with both what you knew then and know now.' },
  { level: 2, title: "The essay's turn", objective: 'Build an essay toward a turn that reframes what came before.', masterLens: 'Didion: the late revelation', exerciseSeed: 'An essay about a habit that turns to reveal what the habit protects.' },
  { level: 3, title: 'Finance memo: bottom line up front', objective: 'Write a decision memo that states the recommendation first and supports it in plain, quantified prose.', masterLens: 'Orwell: clarity as an ethic', exerciseSeed: 'A one-page memo recommending whether a student club should invest its reserve.', rubricCriteria: ['Bottom line up front', 'Quantified claims', 'Risks stated plainly', 'Plain language', 'Economy'] },
  { level: 3, title: 'Investment thesis: variant perception', objective: 'State what the market believes, what you believe instead, why, and what would prove you wrong.', masterLens: 'Seneca on fortune: knowing what you cannot control', exerciseSeed: 'A thesis on a public company you follow, with the bear case at full strength.', rubricCriteria: ['Variant perception', 'Evidence', 'Bear case fairness', 'Falsifiability', 'Plain language'] },
  { level: 3, title: 'Clear business prose: cutting the jargon', objective: 'Translate corporate abstraction into concrete, accountable sentences.', masterLens: 'Orwell: politics and plain English', exerciseSeed: 'Rewrite a real piece of corporate or university communication in plain English, then defend the changes.', rubricCriteria: ['Plainness', 'Accountability (who does what)', 'Concreteness', 'Accuracy', 'Economy'] },
  { level: 3, title: 'Profile: observing a person', objective: 'Render a real person through observed detail, quotation and scene.', masterLens: 'Chekhov: the doctor’s eye', exerciseSeed: 'A profile of someone with an unusual job, from one observed hour.' },
  { level: 3, title: 'Long-form reporting: structure from material', objective: 'Find the structure of a reported piece in its material rather than imposing one.', masterLens: 'Orwell: the reporter who goes there', exerciseSeed: 'Plan and open a reported piece on a place in your town; write the first 800 words.', estMinutes: 60 },
  { level: 4, title: 'The braided essay', objective: 'Weave two or three strands of material so they illuminate each other.', masterLens: 'Woolf: parallel currents', exerciseSeed: 'Braid a family story, a historical fact and a present-day scene.' },
  { level: 4, title: 'Memoir: writing about family without revenge', objective: 'Write about people you love or resent with fairness and complexity.', masterLens: 'Baldwin: love and indictment together', exerciseSeed: 'A portrait of a family member that grants them their own reasons.' },
  { level: 4, title: 'The essay that changes its mind', objective: 'Dramatize a genuine change of mind within an essay.', masterLens: 'Montaigne: the self that contradicts itself', exerciseSeed: 'Begin defending a belief; let evidence force you to revise it.' },
  { level: 4, title: 'Long-form reporting: the 3,000-word piece', objective: 'Sustain a reported narrative with scenes, sources and a controlling question.', masterLens: 'Didion: the reporter as witness', exerciseSeed: 'Draft a section of a long reported piece built around one question.', estMinutes: 75 },
  { level: 4, title: 'Essay collection: sequencing a book', objective: 'Order a set of essays so the collection builds an argument larger than its parts.', masterLens: 'Montaigne: the book as a portrait', exerciseSeed: 'Write the introduction to an imagined collection of your essays.' },
];

const PHILOSOPHY: Row[] = [
  { level: 1, title: 'Argument reconstruction', objective: 'Restate a philosophical argument as numbered premises and a conclusion, then test each premise.', masterLens: 'Pascal: the wager laid bare', exerciseSeed: 'Reconstruct an argument you heard this week, then find its weakest premise.', prerequisites: ['f-11'] },
  { level: 1, title: 'Thought experiments', objective: 'Design an imagined case that isolates one variable in a moral or metaphysical question.', masterLens: 'Borges: the impossible case as instrument', exerciseSeed: 'A thought experiment about being remembered versus being good.' },
  { level: 1, title: 'Aphorism sequences', objective: 'Build a sequence of aphorisms that develop an idea across entries.', masterLens: 'Nietzsche: the aphoristic book', exerciseSeed: 'Twelve linked aphorisms on fame.', prerequisites: ['f-12'] },
  { level: 1, title: 'The philosophical dialogue', objective: 'Stage a disagreement between two voices that both deserve to win.', masterLens: 'Plato by way of Murdoch: ideas in characters', exerciseSeed: 'A dialogue between an ambitious student and a stoic about whether to pursue fame.' },
  { level: 2, title: 'The confessional monologue', objective: 'Write a first-person confession whose reasoning reveals more than the speaker intends.', masterLens: 'Dostoevsky: the underground confession', exerciseSeed: 'A confession by someone justifying a small cruelty.', prerequisites: ['f-08'] },
  { level: 2, title: 'Parables', objective: 'Embody an idea in a short narrative whose meaning resists a single moral.', masterLens: 'Kafka: the parable without a key', exerciseSeed: 'A parable about a man who waits for permission.' },
  { level: 2, title: 'Objection and reply', objective: 'Structure an argument as a sequence of objections, each answered or conceded.', masterLens: 'Aquinas by way of Pascal: the disputed question', exerciseSeed: 'Defend a claim about free will against three objections.' },
  { level: 2, title: 'Defining a term', objective: 'Define a contested term through examples, counterexamples and boundary cases.', masterLens: 'Murdoch: attention as moral vision', exerciseSeed: 'What is "wasting" a life? Define it with cases.' },
  { level: 3, title: 'The philosophical essay: a problem, not a position', objective: 'Organize an essay around a genuine problem, giving each side its due before taking one.', masterLens: 'Sartre: philosophy from situations', exerciseSeed: 'An essay on whether we can choose what we value.' },
  { level: 3, title: 'Writing the absurd', objective: 'Render the absurd — the gap between human longing and an indifferent world — in lucid prose.', masterLens: 'Camus: lucidity against the absurd', exerciseSeed: 'A meditation on a repetitive task that ends in revolt or acceptance.' },
  { level: 3, title: 'The examined day', objective: 'Write a private, unflinching self-examination in the manner of a philosophical journal.', masterLens: 'Marcus Aurelius: notes to oneself', exerciseSeed: 'Ten journal entries examining one day honestly.' },
  { level: 3, title: 'Pseudonymous voices', objective: 'Argue a position through an invented author whose views are not yours.', masterLens: 'Kierkegaard: indirect communication', exerciseSeed: 'An essay by a pseudonymous aesthete defending a life of pleasure.' },
  { level: 4, title: 'The fragment', objective: 'Write philosophical fragments that gain meaning from juxtaposition.', masterLens: 'Pascal: the Pensées as method', exerciseSeed: 'Twenty fragments on death and distraction, then order them.' },
  { level: 4, title: 'Philosophy in fiction: the idea embodied', objective: 'Dramatize an idea through a character who lives it rather than states it.', masterLens: 'Dostoevsky: the idea as character', exerciseSeed: 'A scene in which a character acts on a theory and pays for it.' },
  { level: 4, title: 'Polemic without cruelty', objective: 'Attack an idea with force and wit while staying fair to the people who hold it.', masterLens: 'Nietzsche and Orwell: the hammer and the conscience', exerciseSeed: 'A polemic against a fashionable belief in your field.' },
  { level: 4, title: 'Building a long argument', objective: 'Sustain a multi-section argument with signposting, cumulative evidence and a conclusion that earns itself.', masterLens: 'Mill: the long argument made readable', exerciseSeed: 'Outline and draft the opening of a 5,000-word argument on living for posterity.', estMinutes: 60 },
];

const FICTION: Row[] = [
  { level: 1, title: 'The scene, revisited', objective: 'Write a scene with a clear goal, escalating conflict and a turn, in a fresh situation.', masterLens: 'Chekhov: the scene that turns quietly', exerciseSeed: 'A job interview where the applicant realizes they do not want the job.', prerequisites: ['f-10'] },
  { level: 1, title: 'Dialogue and subtext, deeper', objective: 'Sustain subtext across a longer exchange where power shifts.', masterLens: 'Hemingway: the quarrel about nothing', exerciseSeed: 'Two siblings divide a dead parent’s belongings.', prerequisites: ['f-09'] },
  { level: 1, title: 'Character through action', objective: 'Reveal character through choices under pressure rather than description.', masterLens: 'Tolstoy: character as conduct', exerciseSeed: 'A character finds a wallet; show who they are by what they do.' },
  { level: 1, title: 'Choosing point of view', objective: 'Choose the point of view that gives a story its tension.', masterLens: 'Woolf: the angle of entry', exerciseSeed: 'One event told from the least obvious character’s POV.', prerequisites: ['f-13'] },
  { level: 2, title: 'Interiority under pressure', objective: 'Render thought in real time during action without stalling the scene.', masterLens: 'Dostoevsky: the feverish mind', exerciseSeed: 'A character tells a lie in conversation; render the inner traffic.' },
  { level: 2, title: 'Setting as pressure', objective: 'Make setting an active force on character and plot.', masterLens: 'Chekhov: weather and provincial air', exerciseSeed: 'A scene where the place itself prevents someone from leaving.' },
  { level: 2, title: 'Time: scene versus summary', objective: 'Control narrative time by moving between scene, summary and ellipsis.', masterLens: 'Tolstoy: years in a paragraph, an hour in ten pages', exerciseSeed: 'Ten years of a friendship in summary, ending in one scene.' },
  { level: 2, title: 'Flashback without stalling', objective: 'Integrate the past into a present-tense story without losing momentum.', masterLens: 'Woolf: memory as present tense', exerciseSeed: 'A present scene interrupted by one memory that changes its meaning.' },
  { level: 3, title: 'The unreliable narrator', objective: 'Let the reader see past a narrator who misunderstands or misrepresents events.', masterLens: 'Dostoevsky: the narrator who protests too much', exerciseSeed: 'A narrator explains why they were right to end a friendship.' },
  { level: 3, title: 'Short-story structure', objective: 'Shape a complete story with an opening situation, complication, crisis and resolution.', masterLens: 'Chekhov: the story that ends in change, not answers', exerciseSeed: 'Plan a 2,500-word story in five beats and draft the first scene.' },
  { level: 3, title: 'Endings', objective: 'End a story on an image or action that resonates rather than explains.', masterLens: 'Joyce by way of Chekhov: the open ending', exerciseSeed: 'Write three alternative endings for an archived story.' },
  { level: 3, title: 'The story in a single day', objective: 'Compress a life into one day through structure and memory.', masterLens: 'Woolf: the day as a vessel', exerciseSeed: 'One day in the life of a character on the day they decide to quit.' },
  { level: 3, title: 'Minor characters', objective: 'Make secondary characters vivid in a few strokes without stealing the story.', masterLens: 'Dickens: the character in a sentence', exerciseSeed: 'A party scene with five guests, each fixed in one detail and one line.' },
  { level: 4, title: 'Irony and the double vision', objective: 'Hold sympathy and judgment of a character at the same time.', masterLens: 'Chekhov: the compassionate irony', exerciseSeed: 'A sympathetic portrait of a vain man on his best day.' },
  { level: 4, title: 'Point-of-view shifts with purpose', objective: 'Move between viewpoints in a story so each shift reveals something new.', masterLens: 'Tolstoy: the mobile narrator', exerciseSeed: 'A dinner seen in four sections from four guests.' },
  { level: 4, title: 'The epiphany and its alternatives', objective: 'Handle moments of realization without melodrama — or replace them with something truer.', masterLens: 'Joyce, Chekhov, and the refusal of revelation', exerciseSeed: 'A character almost realizes the truth and turns away.' },
  { level: 4, title: 'The complete short story', objective: 'Draft a complete short story of up to 3,000 words.', masterLens: 'Chekhov: economy at full length', exerciseSeed: 'A complete story about a man who wants to be remembered.', estMinutes: 90 },
  { level: 4, title: 'Revising a story', objective: 'Revise a complete story structurally, not just line by line.', masterLens: 'Tolstoy: the rewritten draft', exerciseSeed: 'Revise your complete story: new opening, cut a scene, sharpen the ending.', estMinutes: 60 },
];

const NOVEL: Row[] = [
  { level: 1, title: 'Premise', objective: 'State a novel’s premise as a character, a desire, an obstacle and an irony.', masterLens: 'Tolstoy: Ivan Ilych’s life as a single ironic premise', exerciseSeed: 'Write five versions of your novel’s premise in one sentence each.', prerequisites: ['f-10'] },
  { level: 1, title: 'Theme as a question', objective: 'Frame a novel’s theme as a question the story tests rather than a message it delivers.', masterLens: 'Dostoevsky: the question argued through characters', exerciseSeed: 'State your novel’s question and write a scene that argues one side.' },
  { level: 1, title: 'Want versus need', objective: 'Distinguish what a protagonist pursues from what they actually need.', masterLens: 'Tolstoy: Ivan’s propriety versus his need for truth', exerciseSeed: 'A scene where your protagonist gets what he wants and it is not enough.' },
  { level: 2, title: 'Structure in three movements', objective: 'Map a novel into beginning, middle and end with turning points between them.', masterLens: 'Chekhov’s gun at novel scale', exerciseSeed: 'A one-page map of your novel’s three movements and two turning points.' },
  { level: 2, title: 'Motifs', objective: 'Develop recurring images or objects that accumulate meaning across a long work.', masterLens: 'Woolf: the recurring image', exerciseSeed: 'Choose three motifs for your novel and write a scene that plants one.' },
  { level: 2, title: 'The opening chapter', objective: 'Write an opening that establishes voice, situation and question without exposition dumps.', masterLens: 'Dostoevsky: the first page as pressure', exerciseSeed: 'The first 800 words of your novel.', estMinutes: 60 },
  { level: 3, title: 'Pacing', objective: 'Control the speed of a long narrative through scene length, summary and withholding.', masterLens: 'Tolstoy: slow time and fast time', exerciseSeed: 'Rewrite one of your scenes twice: once slow, once fast.' },
  { level: 3, title: 'Chapters', objective: 'Shape chapters as units with their own arc and an ending that pulls forward.', masterLens: 'Dickens: the serial instalment', exerciseSeed: 'Outline five chapters, each with an opening line and a closing hook.' },
  { level: 3, title: 'Subplot', objective: 'Design a subplot that mirrors or counterpoints the main plot.', masterLens: 'Tolstoy: Levin against Anna', exerciseSeed: 'Invent a secondary character whose arc inverts your protagonist’s.' },
  { level: 3, title: 'The middle', objective: 'Sustain the middle of a novel with escalation and reversal.', masterLens: 'Dostoevsky: the cat-and-mouse middle', exerciseSeed: 'Write the scene at the exact midpoint of your novel, where something reverses.' },
  { level: 4, title: 'The climax', objective: 'Bring the novel’s question to its sharpest dramatic test.', masterLens: 'Tolstoy: the black sack and the light', exerciseSeed: 'Draft your novel’s climactic scene.' },
  { level: 4, title: 'The ending', objective: 'End a novel so it answers the plot and leaves the question resonating.', masterLens: 'Camus: the ending that asks', exerciseSeed: 'Write the last page of your novel.' },
  { level: 4, title: 'Revising a long draft', objective: 'Plan a structural revision of a long manuscript from a reverse outline.', masterLens: 'Tolstoy: the copied and recopied manuscript', exerciseSeed: 'A reverse outline of your draft chapters and a revision plan.', estMinutes: 60 },
  { level: 4, title: 'The synopsis and the one-page map', objective: 'Summarize a novel in one page without losing its life.', masterLens: 'Orwell: clarity under constraint', exerciseSeed: 'A one-page synopsis of your novel.' },
];

const SCREEN: Row[] = [
  { level: 1, title: 'Scene headings and the action line', objective: 'Write correctly formatted scene headings and present-tense action that shows only what can be filmed.', masterLens: 'Hemingway: only what the camera sees', exerciseSeed: 'A two-page scene in screenplay format with no dialogue.', prerequisites: ['f-05'] },
  { level: 1, title: 'Visual storytelling', objective: 'Convey character and story through image and action rather than words.', masterLens: 'Chekhov: the gesture that tells', exerciseSeed: 'A character’s whole situation shown in one silent minute.' },
  { level: 1, title: 'Dialogue economy', objective: 'Cut screen dialogue to lines that do at least two jobs.', masterLens: 'Hemingway: the clipped exchange', exerciseSeed: 'A three-page argument with no line over twelve words.' },
  { level: 2, title: 'The scene as a unit of change', objective: 'Ensure every screen scene turns a value from positive to negative or the reverse.', masterLens: 'Dostoevsky: the scene of reversal', exerciseSeed: 'A scene in which a character enters winning and leaves losing.' },
  { level: 2, title: 'Subtext on screen', objective: 'Let actors carry meaning the lines do not state.', masterLens: 'Chekhov’s plays: talk of tea, lives collapsing', exerciseSeed: 'A family dinner scene where the real conflict is never mentioned.' },
  { level: 2, title: 'The cold open', objective: 'Write an opening that hooks before context is given.', masterLens: 'Kafka: the arrest without explanation', exerciseSeed: 'A cold open for a film about a man obsessed with legacy.' },
  { level: 3, title: 'Structure: acts and sequences', objective: 'Break a feature into sequences, each with its own question.', masterLens: 'Tolstoy: architecture beneath the flow', exerciseSeed: 'An eight-sequence outline for a feature.' },
  { level: 3, title: 'Character introductions', objective: 'Introduce characters on the page in a line that sets their essence.', masterLens: 'Dickens: the character in a sentence', exerciseSeed: 'Introduce six characters in one line of action each.' },
  { level: 3, title: 'Montage and screen time', objective: 'Compress and expand time on screen with montage, cuts and real-time scenes.', masterLens: 'Woolf: time elastic', exerciseSeed: 'A montage covering a decade of ambition.' },
  { level: 4, title: 'Series arcs', objective: 'Design season-long arcs alongside episode-level stories.', masterLens: 'Dickens: the serial as architecture', exerciseSeed: 'A season map: ten episodes, A and B stories.' },
  { level: 4, title: 'The pilot', objective: 'Write a pilot opening that sets world, character and engine.', masterLens: 'Dostoevsky: the world in an opening scene', exerciseSeed: 'The first ten pages of a pilot.', estMinutes: 75 },
  { level: 4, title: 'Rewriting for the actor', objective: 'Revise dialogue and action to leave room for performance.', masterLens: 'Chekhov: writing for the pause', exerciseSeed: 'Revise a scene by cutting a third of the dialogue and adding behavior.' },
];

const STYLE: Row[] = [
  { level: 1, title: 'Copywork: Hemingway', objective: 'Copy a public-domain passage by hand, then analyze its sentence patterns.', masterLens: 'Hemingway: the and-chain and the repeated noun', exerciseSeed: 'Copy the opening of "Hills Like White Elephants", then write 200 words on what you noticed.', prerequisites: ['f-01'] },
  { level: 1, title: 'Pastiche: Hemingway', objective: 'Apply Hemingway’s method to new material without borrowing his surface.', masterLens: 'Hemingway: method, not mannerism', exerciseSeed: 'A scene in a contemporary setting in Hemingway’s method.' },
  { level: 1, title: 'Departure: from Hemingway', objective: 'Keep one technique and abandon the rest, moving toward your own voice.', masterLens: 'Hemingway, then away', exerciseSeed: 'Rewrite your pastiche keeping only the omission principle.' },
  { level: 2, title: 'Copywork: Dostoevsky', objective: 'Copy and analyze the rhythms of a feverish first-person voice.', masterLens: 'Dostoevsky: self-interruption and the imagined reader', exerciseSeed: 'Copy a page of Notes from Underground (Garnett) and map its rhetorical moves.' },
  { level: 2, title: 'Pastiche: Dostoevsky', objective: 'Write a confession using Dostoevsky’s moves on contemporary material.', masterLens: 'Dostoevsky: the voice that argues with itself', exerciseSeed: 'A confession by someone obsessed with their online reputation.' },
  { level: 2, title: 'Departure: from Dostoevsky', objective: 'Keep the self-interrupting voice; abandon the rhetoric.', masterLens: 'Dostoevsky, then away', exerciseSeed: 'Rewrite the confession in your own idiom.' },
  { level: 3, title: 'Imitation: Woolf', objective: 'Practice free indirect style and the long, associative sentence.', masterLens: 'Woolf: the sentence that follows the mind', exerciseSeed: 'An ordinary errand rendered through a mind in the manner of Mrs Dalloway.' },
  { level: 3, title: 'Imitation: Didion (technique only)', objective: 'Practice cool tone, repetition and the precise personal detail, describing technique in your own words.', masterLens: 'Didion: the controlled cool', exerciseSeed: 'A personal essay opening in a cool, repetitive, exact register.' },
  { level: 3, title: 'Imitation: Seneca', objective: 'Write a moral letter that moves from anecdote to principle to challenge.', masterLens: 'Seneca: the epistolary sermon', exerciseSeed: 'A letter on anger to a friend who lost their temper.' },
  { level: 3, title: 'Imitation: Chekhov', objective: 'Write a short story with compassionate distance and an unresolved ending.', masterLens: 'Chekhov: objectivity with tenderness', exerciseSeed: 'A story of a small, unremarkable love affair.' },
  { level: 4, title: 'Imitation: Baldwin (technique only)', objective: 'Practice the long periodic sentence that combines personal witness with moral argument.', masterLens: 'Baldwin: witness and argument fused', exerciseSeed: 'An essay passage on your hometown that moves from scene to judgment.' },
  { level: 4, title: 'Imitation: Borges (technique only)', objective: 'Practice the scholarly fiction — invented sources, precise tone, metaphysical turn.', masterLens: 'Borges: the fictional essay', exerciseSeed: 'A review of a book that does not exist about a man who wanted to be remembered.' },
  { level: 4, title: 'Imitation: Kafka (technique only)', objective: 'Practice the calm report of an impossible situation.', masterLens: 'Kafka: deadpan nightmare logic', exerciseSeed: 'A bureaucratic process that cannot be completed, told plainly.' },
  { level: 4, title: 'Finding your own voice: the anti-pastiche', objective: 'Identify your recurring moves and write a piece that is unmistakably yours.', masterLens: 'All the masters, then none', exerciseSeed: 'A piece on any subject that could only have been written by you; list three moves you made.' },
];

const COMPRESSION: Row[] = [
  { level: 1, title: 'The image', objective: 'Render a precise image that carries feeling without statement.', masterLens: 'Chekhov: the glint on broken glass', exerciseSeed: 'Ten one-sentence images of your street at night.', prerequisites: ['f-06'] },
  { level: 1, title: 'The line', objective: 'Write lines of prose poetry where every word is weighed.', masterLens: 'Pascal: the sentence as a whole thought', exerciseSeed: 'Twelve single lines, each complete and unlike the others.' },
  { level: 2, title: 'Line breaks', objective: 'Use lineation to create emphasis, ambiguity and pace.', masterLens: 'Shelley: the sonnet’s turn', exerciseSeed: 'Write a prose paragraph, then lineate it three different ways.' },
  { level: 2, title: 'The list poem', objective: 'Build meaning through accumulation and a final turn.', masterLens: 'Ecclesiastes: the catalogue of seasons', exerciseSeed: 'A list poem of things a man did to be remembered.' },
  { level: 2, title: 'Compression drill: 500 to 100', objective: 'Reduce a passage to a fifth of its length without losing its center.', masterLens: 'Hemingway: the iceberg at full force', exerciseSeed: 'Cut an archived 500-word piece to 100 words.' },
  { level: 3, title: 'The prose poem', objective: 'Write a prose poem that moves by image and association rather than plot.', masterLens: 'Baudelaire by way of Kafka: the paragraph as poem', exerciseSeed: 'A prose poem about a monument.' },
  { level: 3, title: 'Observation in seventeen syllables', objective: 'Practice the moment-of-perception form with absolute concreteness.', masterLens: 'Thoreau: the attention of the naturalist', exerciseSeed: 'Twenty short observations from one walk.' },
  { level: 3, title: 'The epigraph and the title', objective: 'Use titles and epigraphs as compressed framing devices.', masterLens: 'Borges: the title as a door', exerciseSeed: 'Title and choose an epigraph (public domain) for five of your pieces; explain each.' },
  { level: 4, title: 'Elegy', objective: 'Write an elegy that mourns through particulars rather than declarations.', masterLens: 'Tolstoy and Ecclesiastes: vanity and tenderness', exerciseSeed: 'An elegy for someone who wanted to be remembered.' },
  { level: 4, title: 'The compressed essay', objective: 'Write an essay under 300 words that still turns.', masterLens: 'Montaigne: the essay in a page', exerciseSeed: 'A 300-word essay on wasted time.' },
];

function build(track: TrackId, rows: Row[]): SyllabusEntry[] {
  return rows.map((r, i) => {
    const id = `${PREFIX[track]}-${String(i + 1).padStart(2, '0')}`;
    const prev = i > 0 ? [`${PREFIX[track]}-${String(i).padStart(2, '0')}`] : [];
    return {
      id,
      track,
      level: r.level,
      title: r.title,
      objective: r.objective,
      masterLens: r.masterLens,
      exerciseSeed: r.exerciseSeed,
      rubricCriteria: r.rubricCriteria ?? RUBRIC[track],
      estMinutes: r.estMinutes ?? 45,
      prerequisites: r.prerequisites ?? prev,
    };
  });
}

export const SYLLABUS: SyllabusEntry[] = [
  ...build('foundations', FOUNDATIONS),
  ...build('essay', ESSAY),
  ...build('philosophy', PHILOSOPHY),
  ...build('fiction', FICTION),
  ...build('novel', NOVEL),
  ...build('screen', SCREEN),
  ...build('style', STYLE),
  ...build('compression', COMPRESSION),
];

export const syllabusById = new Map(SYLLABUS.map((e) => [e.id, e]));
