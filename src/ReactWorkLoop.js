import { updateHostComponent } from "./ReactReconciler";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags";

let wip = null; // work in progress 当前正在工作中

function performUnitOfWork() {
  // 根据当前节点类型来更新
  const { tag } = wip;

  switch (tag) {
    case HostComponent:
      updateHostComponent(wip);
      break;
    case FunctionComponent:
      updateFunctionComponent(wip);
      break;
    case ClassComponent:
      updateClassComponent(wip);
      break;
    case HostText:
      updateHostTextComponent(wip);
      break;
    case Fragment:
      updateFragmentComponent(wip);
      break;
    default:
      break;
  }

  // 下一个更新，更新时遵循深度优先
  if (wip.child) {
    wip = wip.child;
    return;
  }

  let next = wip;

  while (next) {
    if (wip.sibling) {
      wip = next.sibling;
    }
    next = next.return;
  }
  wip = null;
}
