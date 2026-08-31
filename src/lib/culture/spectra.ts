/** 64 ordered lines per tree, most Biblical → most permissive. */

function grid(stems: string[], degrees: string[]) {
  const out: string[] = [];
  for (let s = 0; s < 8; s++) {
    for (let d = 0; d < 8; d++) {
      out.push(degrees[d]!.replace("{x}", stems[s]!));
    }
  }
  return out;
}

const PRIV = [
  "I {x} — this is a closed question for me.",
  "I {x}, including when I am alone.",
  "I {x} in ordinary private life.",
  "I usually {x}, with few exceptions.",
  "I {x} more often than not.",
  "I {x} when it suits me.",
  "I {x} freely, without much inner resistance.",
  "I {x} without hesitation or second thought.",
];

const SOC = [
  "I {x} even if no one around me does.",
  "I {x} unless a mentor I trust made a careful case otherwise.",
  "I {x}, though a close friend could make me pause.",
  "I {x} unless the people I live with treat the opposite as normal.",
  "I tend to {x} when my friends are doing the same.",
  "I would {x} if it kept me inside the group I want.",
  "I would {x} whenever the people I want to belong with are already there.",
  "I would {x} without resistance if my circle expected it.",
];

export const SPECTRA: Record<string, string[]> = {
  "alcohol:individualistic": grid(
    [
      "refuse any alcoholic drink in any setting",
      "limit myself to a sip of wine in a clearly religious context",
      "allow one drink at a formal dinner and stop there",
      "drink alone only while staying fully in control",
      "go drinking by myself",
      "get noticeably intoxicated when I am alone",
      "drink until I cannot remember the night, if I am alone",
      "use a recreational drug if I were alone and unlikely to be caught",
    ],
    PRIV,
  ),
  "alcohol:communal": grid(
    [
      "refuse a drink even if every friend at the table is having one",
      "accept a drink only if a mentor I respect offered it",
      "be more likely to drink if a close friend is drinking",
      "go drinking if my friend is",
      "match my friends drink for drink to stay part of the group",
      "get drunk if the people I want to belong with were doing so",
      "keep going past my limit because the table has not stopped",
      "try a drug if a trusted friend insisted it was safe",
    ],
    SOC,
  ),
  "character:individualistic": grid(
    [
      "tell the truth even if it cost me a grade, a job, or a friendship",
      "refuse to shade the truth to make myself look better",
      "speak of people as if they could hear me",
      "stay honest, with only small convenient exceptions",
      "cheat on an assignment if I were sure I would not be caught",
      "cut people down in private if it helped me feel ahead",
      "lie in an official setting if it clearly benefited me",
      "harm someone's name on purpose to protect my own",
    ],
    PRIV,
  ),
  "character:communal": grid(
    [
      "refuse to join gossip even if my whole circle was doing it",
      "tell the truth even if a friend asked me to cover for them",
      "be more careless with my words when I am with close friends",
      "stretch the truth if my friends treated it as normal",
      "cheat if the people I study with were already cheating",
      "join in mocking someone if it made me belong",
      "lie for a friend even in an official setting",
      "help a group hide wrongdoing so I would not be left out",
    ],
    SOC,
  ),
  "practice:individualistic": grid(
    [
      "structure my day around prayer, Scripture, and gathered worship",
      "refuse to skip weekly worship for something merely optional",
      "read Scripture most days, even when I am busy",
      "pray when I remember, without a fixed discipline",
      "identify as Christian without regular practice",
      "skip worship indefinitely if it conflicted with my plans",
      "treat prayer as optional decoration on a life I run myself",
      "give prayer and Scripture no place in how I actually live",
    ],
    PRIV,
  ),
  "practice:communal": grid(
    [
      "keep my practices even if none of my friends shared them",
      "be more faithful when a friend will go with me",
      "skip a practice if my closest friends treated it as optional",
      "match the spiritual intensity of whoever I am with",
      "drop a public practice to avoid standing out in my group",
      "stop attending worship if my friends stopped",
      "hide my faith if it made the people I want uncomfortable",
      "mock religious practice if that is what my circle found funny",
    ],
    SOC,
  ),
  "sex:individualistic": grid(
    [
      "reserve sexual intimacy for marriage, including in private thought and media",
      "refuse pornography even when I am alone",
      "date only toward a serious, exclusive commitment",
      "be open to romance without a clear path toward marriage",
      "be comfortable with sexual intimacy outside marriage if I were in love",
      "treat casual sexual encounters as a private matter of preference",
      "pursue sexual experience for its own sake, with no relational claim",
      "use other people sexually whenever I wanted, if I could do it privately",
    ],
    PRIV,
  ),
  "sex:communal": grid(
    [
      "keep my standards even if a person I deeply liked asked me not to",
      "refuse to watch something sexual just because a friend group was",
      "be more likely to cross a line if the other person is someone I trust",
      "revise my boundaries if a partner I cared about wanted me to",
      "match the sexual norms of the friend group I want to belong to",
      "sleep with someone I was dating if they made it a condition of staying",
      "join a hookup culture if that is what my closest friends were doing",
      "pressure someone else if that is how my circle treated sex",
    ],
    SOC,
  ),
  "campus:individualistic": grid(
    [
      "organize my week around service and gathered worship before recreation",
      "prefer activities that build people up over ones that merely entertain me",
      "make room for rest and play, but not at the expense of my obligations",
      "choose extracurriculars mainly by what looks good or feels fun",
      "skip commitments I made if a more exciting option appeared",
      "treat campus life as a stage for my own status",
      "use clubs and teams mainly to collect people I can leverage",
      "sabotage a group I belong to if it advanced me personally",
    ],
    PRIV,
  ),
  "campus:communal": grid(
    [
      "keep serving even if none of my friends joined me",
      "show up to something good more readily if a friend is going",
      "join whatever activity my closest friends already do",
      "drop a wholesome activity if my friends found it uncool",
      "spend most nights wherever the loudest group is, regardless of the activity",
      "skip work I owe others in order to stay with a popular crowd",
      "help a friend group exclude someone if that is how they bond",
      "wreck a community event if my circle thought it would be funny",
    ],
    SOC,
  ),
  "academics:individualistic": grid(
    [
      "do my own work fully, even when a shortcut would never be found",
      "cite every source carefully and refuse to pad my work",
      "study with diligence even in courses I do not enjoy",
      "do enough to pass and look competent, without extra care",
      "cut corners on readings and labs if I can still get the grade",
      "plagiarize a paragraph if I were sure it would not be caught",
      "fabricate data or citations to save time",
      "buy the grade outright if I could do it privately",
    ],
    PRIV,
  ),
  "academics:communal": grid(
    [
      "refuse to share answers even if a friend was desperate",
      "study honestly even if my study group was sloppy",
      "let a friend copy notes I had already finished",
      "collaborate past the allowed line if the cohort treated it as normal",
      "use a shared answer key if my friends already had it",
      "cheat on an exam if the people around me were cheating",
      "lie to a professor to cover a friend",
      "run a cheating ring if that is how my circle got ahead",
    ],
    SOC,
  ),
  "work:individualistic": grid(
    [
      "tell the truth in every financial and labor dealing, even when it costs me",
      "keep my word on hours, invoices, and credit for work",
      "do assigned work thoroughly when no supervisor is watching",
      "do what is required, and little more, when I am not being measured",
      "shade a timesheet or expense if I felt underpaid",
      "take credit for others' work if I could do it quietly",
      "mislead a client or employer if it increased my pay",
      "steal or defraud in business if I believed I would not be caught",
    ],
    PRIV,
  ),
  "work:communal": grid(
    [
      "refuse a dishonest workplace practice even if it was 'how we do things'",
      "speak up if a team was about to mislead a client",
      "go along with small padding of hours if my team already did",
      "match the ethical shortcuts of the office I want to stay in",
      "hide a mistake for a colleague if loyalty seemed to require it",
      "join in taking credit from someone quieter on the team",
      "help the group lie to a client if my job seemed to depend on it",
      "participate in fraud if that was the price of remaining in the firm",
    ],
    SOC,
  ),
};
