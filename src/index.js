import { tree } from 'd3-state-visualizer';
import update from 'immutability-helper';

const appState = {
  todoStore: {
    todos: [
      { title: 'd3' },
      { title: 'state' },
      { title: 'visualizer' },
      { title: 'tree' },
    ],
  },
  test: 1,
};

const appStates = [appState];
appStates.push(
  update(appState, { todoStore: { completedCount: {$set: 42 } } })
);
appStates.push(appState);
appStates.push(
  update(appState, { todoStore: { todos: { $unshift: [{ title: 'hey' }] } } })
);
appStates.push(
  update(appState, { todoStore: { todos: {4: {$set: [{ title: 'tada' }] }} }})
);
appStates.push(
  update(appState, { todoStore: { $unset: ['todos']} })
  // update(appState, { $unset: ['todoStore']})
);

const render = tree(document.getElementById('root'), {
  state: appState,
  id: 'treeExample',
  size: 1000,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  style: { border: '1px solid black' },
  tooltipOptions: { offset: { left: 30, top: 10 }, indentationSize: 2 },
});

let i = 0;
setInterval(() => {
  i = (i + 1) % appStates.length;
  render(appStates[i]);
}, 1000);
