import type { TrackId } from '../data/types';

/**
 * Warm-up prompts: five minutes of loose writing that brushes against the
 * day's lesson without doing its exercise. One per written lesson; lessons
 * without one draw from their track's pool.
 */
export const WARMUPS: Record<string, string> = {
  'f-01': 'Describe the room you are in, one plain sentence at a time. Do not stop to choose better words.',
  'f-02': 'List everything you remember from a kitchen you grew up with. Objects only, no feelings.',
  'f-03': 'Write about the last hour of your day using as many different verbs as you can.',
  'f-04': 'Write one very long sentence about your walk or commute today. Then several very short ones.',
  'f-05': 'Write about something you have been avoiding saying to someone. Keep going past the point where you would normally stop.',
  'f-06': 'Think of someone you saw today, even a stranger. Write down every detail you noticed about them.',
  'f-07': 'Pick one sentence you wrote this week that you liked. Write about why it works, or why it does not.',
  'f-08': 'Complain about something small that annoyed you this week. Exaggerate. Let yourself be unfair.',
  'f-09': 'Write down a conversation you had or overheard recently, as close to word for word as you can remember.',
  'f-10': 'What did you want today that you did not get? Write the moment it slipped away.',
  'f-11': 'Write about an opinion you hold that most people around you do not. Why do you hold it?',
  'f-12': 'Write as many one-sentence truths about money, time or work as you can. Do not judge them yet.',
  'f-13': 'Describe this morning from the point of view of someone else who was there.',
  'f-14': 'Write honestly about what the last two weeks of daily writing have been like.',
  'e-01': 'Write about a small moment from this month that you keep coming back to. Just tell what happened.',
  'e-02': 'Summarize your last year in five sentences. Then pick one day from it and start describing it.',
  'e-03': 'Write to a friend about something you have noticed in their life lately. You will not send it.',
  'e-04': 'What is one thing about your campus, city or field that everyone accepts and you think is wrong?',
  'p-01': 'Write down a belief you hold and every reason for it you can think of, as fast as you can.',
  'p-02': 'Imagine one rule of the world changed: nobody can lie, or everyone forgets you each night. What happens?',
  'p-03': 'Write ten quick sentences about fame: some true, some half-true, some you do not believe.',
  'p-04': 'Write a quick argument between two parts of yourself about whether to write today.',
  'fi-01': 'Write about a time you got what you wanted and it was not what you expected.',
  'fi-02': 'Write a conversation about something trivial between two people who are angry at each other about something else.',
  'fi-03': 'Write about the last time you had to choose between the easy thing and the right thing.',
  'fi-04': 'Describe a family dinner or gathering from the point of view of the quietest person there.',
  'n-01': 'Write about the man in your novel: what does he want people to say about him after he dies?',
  'n-02': 'Write the question at the heart of your novel in as many different ways as you can.',
  'n-03': 'What does your protagonist want? What does he actually need? Write about the gap between them.',
  's-01': 'Describe what is around you as a camera would record it: only what can be seen and heard.',
  's-02': 'Describe a room that tells you exactly who lives there, without showing the person.',
  's-03': 'Write an argument in which nobody says more than five words at a time.',
  'st-01': 'Write about a place you have been outdoors, using only short, plain words.',
  'st-02': 'Write about a phone call that went badly, without ever saying what it was about.',
  'st-03': 'Write a paragraph in the voice you use with your closest friend.',
  'c-01': 'Write down ten things you saw, heard or smelled on your way here today, one line each.',
  'c-02': 'Write single sentences about small things: a key, a cup, a window. Make each one complete.',
};

const TRACK_POOLS: Record<TrackId, string[]> = {
  foundations: [
    'Describe what you ate today as precisely as you can.',
    'Write about a sound you heard this morning and everything it made you think of.',
    'Write the most boring hour of your week in exact detail.',
  ],
  essay: [
    'Write about something you changed your mind about this year.',
    'What is a small habit of yours that says something large about you?',
    'Write about a place in your town that you think nobody notices.',
  ],
  philosophy: [
    'Is it better to be remembered or to be good? Argue with yourself for five minutes.',
    'Write about something you believe but cannot prove.',
    'What would you do differently if nobody would ever find out?',
  ],
  fiction: [
    'Write a stranger you saw today into a person with a secret.',
    'Start with: "She had been waiting for the call all afternoon."',
    'Write about two people who want the same thing and cannot both have it.',
  ],
  novel: [
    'Write a day in your protagonist’s life ten years before the novel begins.',
    'What does your protagonist keep in his desk drawer? Describe it.',
    'Write the scene you are most afraid to write, badly, just to get it down.',
  ],
  screen: [
    'Describe a place you know as the opening image of a film.',
    'Write what two people do in a room, with no dialogue at all.',
    'Watch someone for a minute (or remember someone) and write only what they do.',
  ],
  style: [
    'Write about today in the voice of a writer you admire. Then notice what you borrowed.',
    'Rewrite your last text message as a sentence in a novel.',
    'Write a paragraph with no adjectives at all.',
  ],
  compression: [
    'Write ten one-line images of the weather today.',
    'Describe your morning in exactly thirty words. Then in ten.',
    'Write a list of things you have lost, one per line.',
  ],
};

/** Prompts for a free page ("Short on time? Write 100 words"), rotated by date. */
export const FREE_PAGE_PROMPTS: string[] = [
  'What is in front of you right now? Start there.',
  'Write about something that happened today that nobody else would think was important.',
  'What are you avoiding? Write about it for 100 words.',
  'Describe the last person you spoke to.',
  'Write about a place you would go back to if you could.',
  'What did you want to say today and did not?',
  'Write about an object in your room and where it came from.',
  'Write the first sentence of a story, then keep going.',
  'What has been on your mind all day? Put it on the page.',
  'Describe the weather, then describe how it matches or does not match your mood.',
  'Write about a decision you are putting off.',
  'Write down a memory that came back to you this week for no reason.',
  'Write about something you are proud of that you rarely mention.',
  'What would you write about if nobody would ever read it?',
];

const pick = <T>(arr: T[], seed: string): T => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return arr[h % arr.length]!;
};

export function warmupFor(lessonId: string | undefined, track: TrackId): string {
  return (lessonId && WARMUPS[lessonId]) || pick(TRACK_POOLS[track], lessonId ?? track);
}

export function freePagePrompt(date: string): string {
  return pick(FREE_PAGE_PROMPTS, date);
}
