import type { LessonContent } from '../data/types';

/** Level-1 lessons, Essay & Nonfiction and Philosophical Prose. Original prose; public-domain passages. */
export const LEVEL1_ESSAY_PHILOSOPHY: LessonContent[] = [
  {
    id: 'e-01',
    track: 'essay',
    title: 'The personal essay: an experience and its meaning',
    masterLens: 'Orwell: the small incident that opens a large question',
    hook: 'A personal essay is not a diary entry. It is an experience held up to the light until it shows something the writer did not know when it happened.',
    body: `The personal essay has two halves, and beginners usually write only one. Either they tell the story — what happened, in order — and stop, leaving the reader to wonder why they were told. Or they skip the story and deliver the meaning — *I learned that kindness matters* — which is a greeting card, not an essay.

A real personal essay holds both, and the energy lives in the space between them. Something happened (the *experience*), and the writer, thinking hard about it on the page, discovers what it meant (the *reflection*). The best reflections are surprising. They don't confirm the obvious lesson; they find a stranger, truer one.

Orwell wrote an essay about shooting an elephant while serving as a colonial policeman in Burma. The incident itself takes a few pages: an elephant runs loose, kills a man, and Orwell, with a crowd of locals watching, shoots it although it has calmed down. The meaning he draws is not "violence is bad." It is something harder: that he pulled the trigger because he could not bear to look foolish in front of the crowd, and that this is how empire works — the ruler becomes a puppet of the people he rules, performing the role they expect. One small, specific, shameful afternoon opens onto a political truth.

How to build one:

- **Choose a small experience that still bothers you.** Not your grandmother's death or your greatest triumph — those arrive pre-loaded with meaning. Choose the time you laughed at the wrong moment, the argument you lost and keep re-running, the job you quit after one day. If it still itches, there is something in it you haven't understood.
- **Tell it in scene.** Specific place, specific time, real dialogue, physical details. The reader must live through it before they will trust your thoughts about it.
- **Then think on the page.** Ask the questions honestly: why did I do that? Why do I still remember it? What was I afraid of? Let the reflection go somewhere you didn't plan.
- **Implicate yourself.** The essayist who comes out looking good is suspect. Orwell's essay works because he admits his own cowardice.
- **Widen at the end, but only as far as you've earned.** One incident can open onto a general truth, but the general truth must be visibly growing out of the particular.

A useful test: if your final paragraph could have been written before the experience, the essay hasn't discovered anything yet. Keep thinking until the meaning surprises you.

Notice too how Hazlitt, in the passage below, begins with a personal preference stated as plainly as possible. The essay's job will be to make that preference *mean* something about solitude and freedom. Personal essays often start this way: with a small claim about the self that turns out to be a large claim about people.`,
    modelPassage: {
      text: 'One of the pleasantest things in the world is going a journey; but I like to go by myself. I can enjoy society in a room; but out of doors, nature is company enough for me. I am then never less alone than when alone.',
      source: 'William Hazlitt, "On Going a Journey" (1822), opening',
    },
    questions: [
      'Hazlitt opens with a plain personal preference. What larger question about people does "never less alone than when alone" begin to raise?',
      'The third sentence contains a paradox. Why might an essayist put a paradox this early, before giving any experience as evidence?',
    ],
    exercise: {
      prompt: 'Write a personal essay about one small incident that still bothers you. Tell it as a scene, then think on the page until you find what it meant — something you did not know when it happened.',
      constraints: [
        'One incident, lasting less than a day.',
        'At least half the essay is the scene, with concrete detail and at least one line of dialogue.',
        'Implicate yourself: show something unflattering about your own behavior or motives.',
        'The final paragraph may not state a moral that could have been written in advance.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Concrete scene', 'Honesty and self-implication', 'Depth of reflection', 'Connection of particular to general', 'Economy'],
    pitfalls: [
      'Choosing an experience whose meaning is already obvious (a death, a victory).',
      'All story and no thinking, or all thinking and no story.',
      'Ending on a moral you knew before you started writing.',
    ],
    microConstraint: null,
  },
  {
    id: 'e-02',
    track: 'essay',
    title: 'Scene and summary in nonfiction',
    masterLens: 'Didion: the scene as evidence',
    hook: 'Nonfiction moves at two speeds: summary covers ground, scene stops time. Knowing when to shift gears is most of the craft.',
    body: `Every nonfiction writer faces the same problem: life is long and the page is short. You cannot dramatize everything. So you use two tools.

**Summary** compresses time. *For three years I worked nights at a hotel in Queens.* One sentence, three years. Summary is efficient, gives context, and moves the reader quickly to where the story matters.

**Scene** expands time. One night, one hour, one exchange, rendered moment by moment with dialogue, gesture and physical detail. Scene is where readers *experience* rather than learn. It is slow and expensive — it uses a lot of words for a little time — and it is where the emotional and intellectual weight of a piece lands.

Good nonfiction alternates. A paragraph of summary to cover the hotel years; then a scene of the one night that mattered — the guest who called the front desk at 3 a.m. and asked if anyone had ever died in his room. The summary makes the scene possible; the scene makes the summary mean something.

Joan Didion's essays are a model of this alternation. She will cover a year, or the history of a place, in a few cool sentences, then stop dead in a single scene — a conversation in a kitchen, a detail glimpsed at a party — and render it so precisely that it becomes evidence. In her work a scene is rarely decoration. It is proof of a claim she may never state outright.

Some principles:

- **Summarize the routine; dramatize the exception.** The thousand ordinary nights get one sentence. The night something broke gets the scene.
- **Signal the shift.** Readers need to know when time is slowing. Phrases like *one day*, *that evening*, or a sudden specific date tell them: pay attention, we're entering a moment.
- **Scenes need the tools of fiction.** Place, time, sensory detail, dialogue, a person who wants something. Nonfiction is not excused from craft because it's true.
- **Summary needs its own craft.** Good summary is not vague. *I was unhappy for a long time* is weak; *For two winters I ate dinner standing at the counter* is summary with a telling detail inside it.
- **End a scene when it has done its work.** Then return to summary, or to reflection.

Thoreau, in *Walden*, spends long stretches in summary and argument — what he spent on lumber, why most men live badly. Then, in the passage below, he drops suddenly into a single afternoon at his woodpile. The phrase "One day" is the gearshift. What follows is one of the most vivid scenes in the book, and it does argumentative work: his mock-epic account of an ant war turns into a meditation on human war.

Today you will practice the gearshift deliberately: a long stretch of time in summary, and one moment from it in full.`,
    modelPassage: {
      text: 'One day when I went out to my wood-pile, or rather my pile of stumps, I observed two large ants, the one red, the other much larger, nearly half an inch long, and black, fiercely contending with one another.',
      source: 'Henry David Thoreau, Walden (1854), "Brute Neighbors"',
    },
    questions: [
      'Find the exact words that shift the reader from summary into scene. What else in the sentence signals that time has slowed down?',
      'Why might Thoreau correct himself mid-sentence ("or rather my pile of stumps")? What does that small revision tell you about the narrator?',
    ],
    exercise: {
      prompt: 'Write about a stretch of your life — a job, a school year, a friendship, a season at home — mostly in summary, then dramatize one moment from it as a full scene.',
      constraints: [
        'The summary covers at least six months in no more than two paragraphs.',
        'The scene covers less than an hour and includes dialogue and at least three sensory details.',
        'Mark the gearshift with a clear signal (a date, "one night", a specific place).',
        'Each summary paragraph contains at least one telling detail, not just generalization.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Efficient summary', 'Vivid scene', 'Control of the shift', 'Choice of moment', 'Concreteness'],
    pitfalls: [
      'Summary that is vague ("things were hard") instead of compressed and specific.',
      'Choosing a scene that is merely typical rather than the exception that matters.',
      'Dramatizing everything, so nothing stands out.',
    ],
    microConstraint: null,
  },
  {
    id: 'e-03',
    track: 'essay',
    title: 'The letter (Seneca-style)',
    masterLens: 'Seneca: philosophy as correspondence',
    hook: 'Seneca taught philosophy by writing letters to one friend about his actual life. Writing to one person forces you to be clear, specific and honest.',
    body: `More than a hundred of Seneca's letters to his friend Lucilius survive, and they are among the most readable philosophy ever written. They read less like treatises than like messages from a wise, slightly anxious friend who happens to be thinking about how to live. The form is the secret.

When you write to one specific person, several things happen at once. You stop showing off, because you know your reader and they know you. You become concrete, because you are addressing their situation, not humanity's. You anticipate their objections, because you can hear them in your head. And you are forced to be useful: a letter that doesn't help the friend is a failed letter.

Seneca's letters follow a recognizable pattern:

1. **Start from something small and real.** A recent visit, a noise from the street, an illness, a line from a book. Seneca often begins with what Lucilius has written to him, or with what happened that day.
2. **Move to a principle.** From the incident he draws a general point — about time, fear, wealth, friendship, death.
3. **Make it practical.** He doesn't stop at the principle; he gives an exercise, a habit, a daily practice.
4. **Raise the friend's objection.** *But you will say...* and then he answers it.
5. **Implicate himself.** Seneca admits his own failures, which keeps the advice from sounding superior. He is a fellow patient, not the doctor.
6. **End with a gift.** Many letters close with a quotation or short saying he's "paying" his friend — a compact line to take away.

His first letter, below, is about time. Notice that he doesn't argue abstractly that time is precious. He describes how time is *taken* from us — torn, removed, slipping — so precisely that the reader feels robbed.

A letter like this is an excellent form for you. It joins argument and intimacy. It lets you think about how to live without the pomposity of a treatise. And it's a natural home for the themes you care about: ambition, time, the opinions of others, what makes a life wasted or well spent.

One caution: don't imitate Seneca's diction. "Greetings from Seneca to his friend Lucilius" is charming in a translation from Latin; in your own letter it is costume. Write to a real friend as you actually speak to them, with their actual problems. Keep his structure; abandon his toga.

Another: the letter must be about the friend, not about you showing wisdom. The best test is whether the friend, reading it, would feel addressed — would recognize their own week in your sentences.`,
    modelPassage: {
      text: 'Continue to act thus, my dear Lucilius—set yourself free for your own sake; gather and save your time, which till lately has been forced from you, or filched away, or has merely slipped from your hands. Make yourself believe the truth of my words,—that certain moments are torn from us, that some are gently removed, and that others glide beyond our reach. The most disgraceful kind of loss, however, is that due to carelessness.',
      source: 'Seneca, Moral Letters to Lucilius, Letter 1, trans. Richard M. Gummere (1917)',
    },
    questions: [
      'Seneca describes three ways time is lost. Restate them in your own words. Why is the third worse than the other two?',
      'The passage addresses one friend, yet it reads as if it is about you. How does the second person ("my dear Lucilius", "your time") create that effect?',
    ],
    exercise: {
      prompt: 'Write a letter to a real friend (or your past self) about how they are spending their time — or about one fear, ambition, or habit of theirs you have noticed.',
      constraints: [
        'Begin from a specific recent incident or something they said.',
        'Move to one principle, then to one practical suggestion they could try this week.',
        'Raise their likely objection ("You will say...") and answer it.',
        'Admit one way you fail at your own advice. End with a short line they could remember.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Specificity of address', 'Clarity of principle', 'Practicality', 'Self-implication', 'Voice (not costume)'],
    pitfalls: [
      'Imitating Seneca’s archaic diction instead of writing as you speak.',
      'Lecturing humanity instead of writing to one person about their actual life.',
      'Advice without self-implication, which sounds superior.',
    ],
    microConstraint: null,
  },
  {
    id: 'e-04',
    track: 'essay',
    title: 'The op-ed: one claim, 700 words',
    masterLens: 'Orwell: plain words in public',
    hook: 'An op-ed has one job: to change a stranger’s mind about one thing, in the time it takes to drink a coffee.',
    body: `The opinion piece is the most public form of the essay. It is written for strangers who did not ask to hear from you, who are busy, and who may disagree. Everything about the form follows from that.

**One claim.** Not three, not a tour of the issue. A good op-ed can be summarized in a single debatable sentence: *Our university should stop ranking students by GPA.* *Index funds are making markets less efficient.* *Phones should be banned from high-school classrooms.* If you can't state yours in one sentence, you aren't ready to write.

**A hook.** The first paragraph earns the reader's attention, often with something concrete and current: a news event, a striking fact, a short scene. Then, quickly — usually by the second or third paragraph — the claim itself, stated plainly.

**Evidence a stranger will accept.** Personal experience can open a piece, but it rarely persuades alone. Combine it with facts, numbers, examples, expert findings. Choose the two or three strongest pieces of evidence and develop them; don't list twelve.

**The counterargument.** As you learned in lesson 11, the best persuasion meets the opposition at full strength. Name the strongest objection a reader is forming and answer it. This is the paragraph that moves skeptical readers; leaving it out tells them you haven't thought about their view.

**A close that returns to the stakes.** End with what follows if the reader agrees — a concrete action, a changed picture of the issue — or by returning to your opening image with new meaning.

**Plain language.** Orwell argued that political writing decays into stale phrases and euphemism, which let writers avoid thinking and let readers avoid noticing. An op-ed written in plain, concrete words is both more persuasive and more honest. Prefer *people will lose their jobs* to *workforce adjustments may occur*.

Thomas Paine's pamphlets are early masterpieces of the form. In December 1776, with the revolutionary army near collapse, he opened *The American Crisis* with a sentence so sharp that Washington had the essay read aloud to his troops. Look at how quickly the passage below moves from hook to claim to a vivid contrast, and how every sentence is built to be remembered.

Practical rules for the form:

- Keep paragraphs short — two to four sentences. Op-eds are read on phones.
- Write for an intelligent reader who knows nothing about the topic.
- Cut every sentence that doesn't advance the claim.
- Avoid insulting opponents. You are trying to persuade the undecided, not delight the converted.

You're a finance student; you know things most readers don't. That is an advantage. Choose a claim where your specialized knowledge lets you tell the general reader something surprising and true.`,
    modelPassage: {
      text: 'These are the times that try men’s souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country; but he that stands by it now, deserves the love and thanks of man and woman. Tyranny, like hell, is not easily conquered; yet we have this consolation with us, that the harder the conflict, the more glorious the triumph.',
      source: 'Thomas Paine, The American Crisis, No. 1 (1776), opening',
    },
    questions: [
      'Paine’s first sentence is a hook. What does the second sentence do that the first does not? Where is the actual claim?',
      '"Summer soldier" and "sunshine patriot" are compressed images. What argument is packed inside each phrase?',
    ],
    exercise: {
      prompt: 'Write an op-ed arguing one debatable claim about something you know firsthand — your campus, your field of study, your city, your generation’s relationship with money or technology.',
      constraints: [
        'State the claim in one sentence at the top (it does not count toward the piece).',
        'A concrete hook in the first paragraph; the claim stated by the third.',
        'At least two pieces of specific evidence (a number, an example, a finding).',
        'One paragraph giving the strongest counterargument fairly, then your answer.',
        'No paragraph longer than four sentences.',
      ],
      minWords: 500,
      maxWords: 750,
    },
    rubric: ['Clarity of claim', 'Hook', 'Evidence', 'Counterargument', 'Economy'],
    pitfalls: [
      'Several claims competing for attention.',
      'Evidence that is all personal anecdote.',
      'Contempt for people who disagree, which repels the undecided reader.',
    ],
    microConstraint: null,
  },
  {
    id: 'p-01',
    track: 'philosophy',
    title: 'Argument reconstruction',
    masterLens: 'Pascal: the wager laid bare',
    hook: 'Before you can judge an argument, you have to see its skeleton. Most arguments hide their weakest bone.',
    body: `Arguments in the wild are messy. They come wrapped in rhetoric, examples, emotion and digression. A philosopher's first job is to strip all that away and lay out the bare structure: the premises (the claims assumed or supported) and the conclusion (what they are supposed to prove). This is called *reconstruction*, and it is one of the most useful intellectual skills you can develop — for philosophy, for essays, for investment memos, for arguing with anyone about anything.

The standard form looks like this:

1. Premise.
2. Premise.
3. Therefore, conclusion.

Take Pascal's famous wager. In prose, he says that we must bet on whether God exists; that if we bet God exists and are right we gain everything, and if wrong we lose nothing; so we should bet that God exists. Reconstructed:

1. We cannot avoid wagering on whether God exists.
2. If we wager that God exists and are right, we gain infinite reward.
3. If we wager that God exists and are wrong, we lose nothing (or very little).
4. If we wager against God and are wrong, we lose infinitely.
5. A rational person chooses the option with the best expected outcome.
6. Therefore, a rational person wagers that God exists.

Now the argument can be examined. Is premise 1 true — can't we suspend judgment? Is premise 3 true — do we really lose nothing by living as believers? Premise 2 assumes there is only one possible God to bet on; what about many competing ones? Each premise becomes a place to test. That is the point: reconstruction turns a persuasive speech into something you can actually evaluate.

How to reconstruct:

- **Find the conclusion first.** What is the argument trying to make you believe? Words like *therefore*, *so*, *hence*, *thus* often signal it.
- **Find the stated premises.** What reasons are given?
- **Supply the hidden premises.** Most arguments skip steps that the arguer thinks are obvious. These unstated premises are often where the argument is weakest. In the wager, premise 5 is rarely stated but carries enormous weight.
- **Check validity.** If all the premises were true, would the conclusion have to follow? If not, something is missing.
- **Check soundness.** Are the premises actually true?
- **Locate the weakest premise.** Every argument has one. Name it.

Be charitable. Reconstruct the strongest version of the argument, not a weak one you can easily defeat. Philosophers call this the principle of charity, and it's not just politeness: refuting a weak version proves nothing, while finding the flaw in the strongest version teaches you something real.

This skill transfers everywhere. A stock pitch, a political speech, a professor's lecture, your own essay draft — each contains an argument, and each argument has a skeleton you can lay bare.`,
    modelPassage: {
      text: 'Let us weigh the gain and the loss in wagering that God is. Let us estimate these two chances. If you gain, you gain all; if you lose, you lose nothing. Wager, then, without hesitation that He is.',
      source: 'Blaise Pascal, Pensées (1670), §233, trans. W. F. Trotter',
    },
    questions: [
      'Pascal states only part of the argument here. Write down one premise he leaves unstated that the conclusion depends on.',
      '"If you lose, you lose nothing." Is that true? Give one thing a person might lose by wagering as Pascal advises.',
    ],
    exercise: {
      prompt: 'Find an argument you heard or read this week — from a professor, a podcast, a news article, an investor, a friend. Reconstruct it charitably as numbered premises and a conclusion, then write a short essay identifying and testing its weakest premise.',
      constraints: [
        'Begin with a one-paragraph summary of the argument as it was presented.',
        'Then the numbered reconstruction, including at least one hidden premise you supply.',
        'Then 2-3 paragraphs on the weakest premise: why it is weak, and what would happen to the argument without it.',
        'Reconstruct the strongest version, not a straw man.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Accuracy of reconstruction', 'Identification of hidden premises', 'Charity', 'Strength of critique', 'Prose clarity'],
    pitfalls: [
      'Reconstructing a weak version so the critique is easy.',
      'Missing the hidden premise that carries the real weight.',
      'Confusing "I disagree with the conclusion" with "the argument is invalid".',
    ],
    microConstraint: null,
  },
  {
    id: 'p-02',
    track: 'philosophy',
    title: 'Thought experiments',
    masterLens: 'Borges: the impossible case as instrument',
    hook: 'A thought experiment is a laboratory built out of imagination. It isolates one variable so you can see what you really believe.',
    body: `Philosophers cannot run controlled experiments on justice, identity or the good life. So they invent them. A thought experiment is an imagined scenario designed to test an intuition or an argument by isolating a single factor.

The most famous ones are startlingly simple. In Plato's *Republic*, Glaucon tells the story of the Ring of Gyges: a shepherd finds a ring that makes him invisible, and soon he uses it to seduce the queen, kill the king and take the throne. The question it poses is sharp: if you could never be caught, would you still act justly? Is justice valued for itself, or only for its reputation? The ring removes one variable — the consequences of being seen — and leaves the question naked.

Borges did something similar in fiction. His stories imagine a man who remembers absolutely everything, a library containing every possible book, a map as large as the territory it describes. Each impossible situation works as an instrument: by pushing an idea to its limit, it shows us something about memory, meaning or representation that ordinary cases hide.

What makes a good thought experiment:

- **It isolates one variable.** The Ring of Gyges removes the possibility of being caught; everything else about the situation is ordinary. If you change five things at once, you can't tell which one produced the intuition.
- **It is vivid and concrete.** An invisible shepherd, not "an agent with perfect concealment." Concreteness makes intuitions trustworthy and memorable.
- **It forces a choice.** A good thought experiment makes the reader commit: yes or no, this or that. The discomfort of choosing is where insight happens.
- **It is followed by reflection.** The scenario is the beginning, not the end. What does your answer reveal? Does it conflict with something else you believe?

Dangers:

- **Rigging.** It is easy to design a scenario that smuggles in the answer you want. Test it by asking whether a thoughtful opponent would accept the setup.
- **Distracting details.** If readers argue about whether the scenario is realistic, it has failed. Add only what's needed.
- **Mistaking intuition for proof.** A thought experiment shows what we *believe*. Those beliefs could still be wrong.

Thought experiments are especially useful for the questions you're drawn to. Imagine a man offered a deal: he will be remembered forever, by everyone, but he will never know it — he will die believing himself forgotten. Would he take it? Would you? What does the answer reveal about why people want to be remembered? That is a thought experiment, and it might also be the seed of a novel.

Today you'll design one, and then write the reflection that follows it.`,
    modelPassage: {
      text: 'Suppose now that there were two such magic rings, and the just put on one of them and the unjust the other; no man can be imagined to be of such an iron nature that he would stand fast in justice.',
      source: 'Plato, Republic, Book II, trans. Benjamin Jowett (1871)',
    },
    questions: [
      'What single variable does the ring remove? What question about justice is left once it is gone?',
      'Glaucon claims "no man" would stay just. Is that a conclusion of the thought experiment or an assumption built into it? Explain.',
    ],
    exercise: {
      prompt: 'Design a thought experiment about being remembered versus being good — or about another question you care about (ambition, money, honesty, time). Present the scenario vividly, then write the reflection: what your answer reveals and what objection it faces.',
      constraints: [
        'The scenario changes exactly one thing about ordinary life. Say which.',
        'Present it concretely, as a specific person in a specific situation.',
        'End the scenario with a forced choice.',
        'Reflection: state your answer, what it reveals, and one objection to drawing that conclusion.',
      ],
      minWords: 300,
      maxWords: 550,
    },
    rubric: ['Isolation of variable', 'Vividness', 'Fairness of setup', 'Depth of reflection', 'Prose clarity'],
    pitfalls: [
      'Changing many variables at once, so the result means nothing.',
      'Rigging the scenario so only one answer is possible.',
      'Presenting the scenario without the reflection that makes it philosophy.',
    ],
    microConstraint: null,
  },
  {
    id: 'p-03',
    track: 'philosophy',
    title: 'Aphorism sequences',
    masterLens: 'Nietzsche: the aphoristic book',
    hook: 'One aphorism is a spark. A sequence of them, well ordered, is a fire: each one lights the next.',
    body: `In lesson 12 you compressed a single idea into a single line. Now you'll learn what Nietzsche, Pascal and Marcus Aurelius understood: aphorisms gain power in sequence. Placed side by side, they comment on each other, contradict each other, and build an argument that no single line could make.

Nietzsche's books are not random heaps of sayings. *Beyond Good and Evil* is divided into sections with themes, and within them the aphorisms are arranged so that each one turns, sharpens or undercuts the one before. Reading them is like listening to someone think in bursts — and the gaps between entries are part of the meaning. The reader does the work of connecting them, and that work is the pleasure.

Look at the two aphorisms below. The first is about memory and pride: we remember doing something shameful, our pride insists we couldn't have, and memory gives way. The second, about suicide as consolation, seems unrelated. But set side by side, they share a subject: the stories we tell ourselves to get through. Self-deception that protects, consolations that sustain. The sequence suggests a thought neither states.

How sequences work:

- **Variation on a theme.** Approach one subject — fame, say — from many angles: its causes, its costs, its illusions, its comedy.
- **Turn and counter-turn.** One aphorism makes a claim; the next complicates it; a third reverses it. The reader watches the thought develop.
- **Shifts of scale.** Move between the personal (*I wanted them to notice me*) and the general (*Every monument is a request*). The alternation keeps the sequence alive.
- **Rhythm of length.** Mix one-liners with short paragraphs. A sequence of identical lengths becomes monotonous.
- **Order matters.** The same twelve aphorisms in different orders make different arguments. The final one carries extra weight; often it lands the sequence or opens it outward.

Writing a sequence:

1. Choose a theme you have real thoughts about.
2. Write thirty or forty raw aphorisms quickly, without judging.
3. Cut ruthlessly to the best dozen — the ones that actually claim something.
4. Arrange them. Try several orders. Look for pairs that spark against each other.
5. Revise each line for precision now that you can see how it sits among its neighbours.

The danger with sequences is repetition: twelve ways of saying the same thing. Each entry should add something — a new angle, a qualification, a counterexample, a joke. If two aphorisms make the same point, keep the sharper one.

Another danger is fake depth multiplied. A sequence of vague, wise-sounding lines is worse than one, because the reader quickly learns that none of them will pay off. Test each line: what exactly does it claim? Could someone disagree?`,
    modelPassage: {
      text: '"I did this," says my memory. "I could not have done this," says my pride, and remains inexorable. Eventually—the memory yields.\n\n—\n\nThe thought of suicide is a great consolation: by means of it one gets successfully through many a bad night.',
      source: 'Friedrich Nietzsche, Beyond Good and Evil (1886), §68 and §157, trans. Helen Zimmern',
    },
    questions: [
      'What do these two aphorisms have in common once they are placed side by side? State the shared idea in one sentence of your own.',
      'In §68, why is "Eventually—the memory yields" more effective than "and so the memory changes"? What does the dash do?',
    ],
    exercise: {
      prompt: 'Write a sequence of twelve linked aphorisms on fame, being remembered, or ambition. Arrange them so that they build, turn, and land.',
      constraints: [
        'Exactly twelve entries, numbered.',
        'At least three move between the personal and the general.',
        'At least one entry contradicts or complicates an earlier one.',
        'Mix lengths: some single lines, at least two of three or more sentences.',
        'After the sequence, one sentence explaining why the last entry comes last.',
      ],
      minWords: 200,
      maxWords: 450,
    },
    rubric: ['Compression', 'Development across the sequence', 'Variety of angle', 'Precision', 'Genuine claims'],
    pitfalls: [
      'Twelve versions of the same point.',
      'Random order: no development, turn, or landing.',
      'Vague, profound-sounding lines that claim nothing.',
    ],
    microConstraint: null,
  },
  {
    id: 'p-04',
    track: 'philosophy',
    title: 'The philosophical dialogue',
    masterLens: 'Plato by way of Murdoch: ideas in characters',
    hook: 'A dialogue lets ideas argue with each other in human voices. Done well, both sides deserve to win and the reader is left to decide.',
    body: `The dialogue is philosophy's oldest literary form. Plato wrote almost all his philosophy as conversations — Socrates questioning generals, poets, sophists and young aristocrats on the streets and in the houses of Athens. Centuries later the novelist and philosopher Iris Murdoch returned to the form, writing Platonic dialogues of her own about art and religion. Why would serious thinkers choose drama over the treatise?

Because a dialogue does things an essay can't. It shows ideas held by people, with motives, tempers and blind spots. It lets the reader watch a position being tested in real time. It makes room for doubt: the author doesn't have to declare a winner. And it is far more readable — conflict between voices is naturally dramatic.

In the *Republic*, Thrasymachus bursts into the conversation, furious at what he considers Socrates' evasions, and declares that justice is simply the interest of the stronger. Notice in the passage below how much character is packed into a few lines: his arrogance (demanding praise for his definition), his expectation of being cheated of it, and Socrates' quiet, dangerous request — *let me first understand you*. The argument and the personalities are inseparable.

What makes a good philosophical dialogue:

- **Both positions are strong.** If one character is a straw man who exists only to lose, readers will sense the rigging and stop trusting you. Give the side you disagree with your best arguments for it. Ideally, a reader should be unsure which side you hold.
- **The speakers are people.** They have reasons for believing what they believe — histories, interests, fears. Thrasymachus isn't just a position; he is a man who enjoys power and resents being made a fool of.
- **The argument moves.** Each exchange should advance, test, or complicate. Positions should shift under pressure; concessions should be made and regretted.
- **Questions do the work.** Socrates' method is to ask: what do you mean by that? Would you say the same in this other case? Questions expose assumptions more effectively than counter-assertions.
- **The ending is earned, not imposed.** Many of Plato's early dialogues end in *aporia* — puzzlement, no answer. That can be more honest than a forced resolution.

Practical craft: dialogue in philosophy still benefits from everything you learned in lesson 9. Keep lines short. Cut pleasantries. Give each speaker a recognizably different way of talking. Let a character evade, joke, or lose their temper when the argument gets close to something they care about.

For your work this is an especially natural form. You can stage the arguments your novel is about — fame against obscurity, ambition against tranquility — in two voices, and discover what each side actually has to say before you ever write a scene.`,
    modelPassage: {
      text: 'Listen, then, he said; I proclaim that justice is nothing else than the interest of the stronger. And now why do you not praise me? But of course you won’t.\n\nLet me first understand you, I replied. Justice, as you say, is the interest of the stronger. What, Thrasymachus, is the meaning of this?',
      source: 'Plato, Republic, Book I, trans. Benjamin Jowett (1871)',
    },
    questions: [
      'What do you learn about Thrasymachus as a person from "And now why do you not praise me? But of course you won’t"?',
      'Socrates asks for clarification instead of disagreeing. Why is that a more dangerous move than a counter-argument?',
    ],
    exercise: {
      prompt: 'Write a philosophical dialogue between an ambitious student who wants to be famous and a friend (or older stranger) who thinks this is a mistake. Both should argue well.',
      constraints: [
        'Each speaker gives at least two real arguments; neither is a straw man.',
        'Each speaker concedes at least one point during the conversation.',
        'Use questions as the main tool at least twice.',
        'Give each a distinct way of speaking. End without declaring a winner.',
      ],
      minWords: 350,
      maxWords: 600,
    },
    rubric: ['Strength of both sides', 'Character in voice', 'Movement of argument', 'Use of questioning', 'Honest ending'],
    pitfalls: [
      'A straw-man opponent who exists only to lose.',
      'Speakers who sound identical.',
      'Speeches instead of exchange: long monologues taking turns.',
    ],
    microConstraint: null,
  },
];
