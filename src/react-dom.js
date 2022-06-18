import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import createFiber from "./ReactFiber";

function createRoot(container) {
  // container
  const root = { containerInfo: container };
  // 最终返回一个对象
  return new ReactDOMRoot(root);
}

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMRoot.prototype.render = function (children) {
  console.log("children", children); // vnode-->转换为fiber
  const root = this._internalRoot;

  updateContainer(children, root);
};

function updateContainer(element, container) {
  //
  const { containerInfo } = container;
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo,
  });

  // 组件初次渲染
  scheduleUpdateOnFiber(fiber);
}
export default {
  createRoot,
};
