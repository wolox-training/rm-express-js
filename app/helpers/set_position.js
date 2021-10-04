/* eslint-disable complexity */
exports.position = points => {
  const developer = points <= 4 && 'Developer';
  const lead = points <= 9 && 'Lead';
  const tl = points <= 19 && 'TL';
  const em = points <= 29 && 'EM';
  const head = points <= 49 && 'HEAD';
  const ceo = points >= 50 && 'CEO';
  const pos = developer || lead || tl || em || head || ceo;
  return pos;
};
