// 协调

import { isArray, isStringOrNumber, updateNode } from "./utils";
import createFiber from "./ReactFiber";

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

export function updateHostComponent(wip) {
  // 原生标签 初次渲染
  // const {stateNode, type} = wip;
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    updateNode(wip.stateNode, wip.props);
  }
  // 子节点
  reconcileChildren(wip, wip.props.children);
}

export function updateClassComponent(wip) {
  //
  const { type, props } = wip;
  const instance = new type(props);
  const children = instance.render();

  reconcileChildren(wip, children);
}

export function updateFunctionComponent(wip) {
  const { type, props } = wip;
  const children = type(props); // ?
  reconcileChildren(wip, children);
}

export function updateFragmentComponent(wip) {
  //
  reconcileChildren(wip, wip.props.children);
}

export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children);
}
