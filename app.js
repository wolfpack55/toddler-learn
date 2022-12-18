// Going to be a general file with all the stuff I'm going to need for
// all pages or a lot of pages

console.log('Starting app.js');

// Good small solution instead of making a million temp vars
// Credit: https://stackoverflow.com/a/64000817
const newElem = (tag, props = {}) => Object.assign(document.createElement(tag), props);
const appendElem = (parentElem, ...children) => children.reduce((p, sib) => (p.appendChild(sib), p), parentElem);
const queryElem = (qStr, el = document) => el.querySelector(qStr);