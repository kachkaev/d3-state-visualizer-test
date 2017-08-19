import { tree } from 'd3-state-visualizer';
import oldTree from './lib-before-fix/charts/tree/tree';
import update from 'immutability-helper';

const defaultAppState = {
  test: [0],
  todoStore: {
    todos: [
      { title: 'd3' },
      { title: 'state' },
      { title: 'visualizer' },
      { title: 'tree' },
    ],
    completedCount: 1
  },
};

const appStates = [defaultAppState];
appStates.push(
  update(appStates[appStates.length - 1], { todoStore: { todos: { $unshift: [{ title: 'hey' }] } } })
);
appStates.push(
  update(appStates[appStates.length - 1], { test: {$push: [1]}} )
);
appStates.push(
  update(appStates[appStates.length - 1], { test: {$push: [2]}} )
);
appStates.push(
  update(appStates[appStates.length - 1], { test: {$push: [3]}} )
);
appStates.push(
  update(appStates[appStates.length - 1], { test: {
    1: {$set: [42] },
    3: {$set: [42] },
  } })
);

appStates.push(update(appStates[appStates.length - 1], { todoStore: { $set: {}}}));

const config = {
  state: defaultAppState,
  id: 'treeExample',
  size: 600,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  style: { border: '1px solid black' },
  tooltipOptions: { offset: { left: 30, top: 10 }, indentationSize: 2 },
  transitionDuration: 700
};
const stateDuration = 1000

const render = tree(document.getElementById('root'), config);
const oldRender = oldTree(document.getElementById('oldRoot'), config);

let i = 0;
setInterval(() => {
  i = (i + 1) % appStates.length;
  render(appStates[i]);
  oldRender(appStates[i]);
}, stateDuration);
