const eminence = '#631D76';
const charcoalGray = '#2E2532';
const white = '#FBFBFB';
const raisenBlack = '#201A23';
const pantone = '#9E4770';

export default {
  light: {
    text: raisenBlack,
    background: white,
    tint: eminence,
    tabIconDefault: charcoalGray,
    tabIconSelected: eminence,
    borderColor: raisenBlack,
    feedBackground: white,
    postIconDefault: pantone,
    postIconSelected: eminence,
    titleCapital: eminence,
    titleSmall: raisenBlack,
  },
  dark: {
    text: white,
    background: charcoalGray,
    tint: white,
    tabIconDefault: eminence,
    tabIconSelected: white,
    borderColor: white,
    feedBackground: raisenBlack,
    postIconDefault: white,
    postIconSelected: pantone,
    titleCapital: eminence,
    titleSmall: raisenBlack
  },
};
