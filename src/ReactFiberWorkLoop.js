import { updateHostComponent } from "./ReactFiberReconciler";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags";
import { isStr, Placement } from "./utils";

let wip = null; // work in progress 当前正在工作中
let wipRoot = null;

// 初次渲染
export function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
}

function performUnitOfWork() {
  // 根据当前节点类型来更新
  const { tag, type } = wip;
  console.log(wip.type);
  if (isStr(type)) {
    updateHostComponent(wip);
  }
  // switch (tag) {
  //   case HostComponent:
  //     updateHostComponent(wip);
  //     break;
  //   case FunctionComponent:
  //     updateFunctionComponent(wip);
  //     break;
  //   case ClassComponent:
  //     updateClassComponent(wip);
  //     break;
  //   case HostText:
  //     updateHostTextComponent(wip);
  //     break;
  //   case Fragment:
  //     updateFragmentComponent(wip);
  //     break;
  //   default:
  //     break;
  // }

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

function workLoop(IdleDeadLine) {
  // workLoop  浏览器是否有空闲时间
  // console.log(wip); wip && IdleDeadLine.timeRemaining() > 0
  while (wip && IdleDeadLine.timeRemaining() > 0) {
    performUnitOfWork();
  }
  // 无任务时
  if (!wip && wipRoot) {
    commitRoot();
  }
}

requestIdleCallback(workLoop);

function commitRoot() {
  // 提交
  commitWorker(wipRoot);
  // 重复调用
  wipRoot = null;
}

function commitWorker(wip) {
  // 当前wip
  if (!wip) {
    return;
  }
  // 1.提交自己；
  let parentNode = wip.return.stateNode;
  const { flags, stateNode } = wip;

  if (flags & Placement && stateNode) {
    // flags 是placement 并且node节点存在，是不是dom节点
    // parentNode 是父级
    parentNode.appendChild(stateNode);
  }

  // 2.提交子节点，
  commitWorker(wip.child);
  // 3.提交兄弟
  commitWorker(wip.sibling);
}
