const {
  positionDeveloper,
  positionLead,
  positionTl,
  positionEm,
  positionHead,
  positionCeo
} = require('../helpers/constants');

/* eslint-disable complexity */
exports.calculatePosition = points => {
  const developer = points <= positionDeveloper.maxValue && positionDeveloper.name;
  const lead = points <= positionLead.maxValue && positionLead.name;
  const tl = points <= positionTl.maxValue && positionTl.name;
  const em = points <= positionEm.maxValue && positionEm.name;
  const head = points <= positionHead.maxValue && positionHead.name;
  const ceo = points >= positionCeo.minValue && positionCeo.name;
  const position = developer || lead || tl || em || head || ceo;
  return position;
};
