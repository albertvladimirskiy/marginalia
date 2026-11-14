/** A recurring daily reminder as an .ics file (floating local time, no push server). */
export function reminderIcs(time: string, now = new Date()): string {
  const [h = '21', m = '00'] = time.split(':');
  const y = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const start = `${y}${mo}${d}T${h.padStart(2, '0')}${m.padStart(2, '0')}00`;
  const end = `${y}${mo}${d}T${String((Number(h) + 1) % 24).padStart(2, '0')}${m.padStart(2, '0')}00`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Marginalia//Daily writing//EN',
    'BEGIN:VEVENT',
    `UID:marginalia-daily-${y}${mo}${d}@marginalia`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:Write (Marginalia)',
    'DESCRIPTION:Today\'s session. 100 words keeps the thread.',
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Time to write',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
