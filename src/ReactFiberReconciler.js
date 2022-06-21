// 协调

import { isArray, isStringOrNumber } from "./utils";
import createFiber from "./ReactFiber";

export function updateHostComponent(wip) {
  // 原生标签 初次渲染
  // const {stateNode, type} = wip;
  // console.log(wip.type);
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
  }
  // 子节点
  reconcileChildren(wip, wip.props.children);
}
// 协调，核心就是diff,初次渲染
function reconcileChildren(wip, children) {
  // 单个节点时，此处 children为 对象，多个节点时， children 为数组。
  if (isStringOrNumber(children)) return;
  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    if (newChild == null) {
      continue;
    }
    const newFiber = createFiber(newChild, wip);
    console.log(newFiber);
    if (previousNewFiber === null) {
      // head node
      wip.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    // 每次记录当前 fiber
    previousNewFiber = newFiber;
  }
}

export function updateClassComponent() {
  //
}

export function updateFunctionComponent() {
  //
}

export function updateFragmentComponent() {
  //
}

export function updateHostTextComponent() {
  //
}
