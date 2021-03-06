import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostText,
  Fragment,
} from "./ReactWorkTags";
import { isFn, isStr, Placement, isUndefined } from "./utils";

export default function createFiber(vnode, returnFiber) {
  //
  const fiber = {
    type: vnode.type, // 类型
    key: vnode.key, // key
    props: vnode.props, // 属性
    // 不同累的组件，stateNode也不同
    stateNode: null, // 当前node节点为原生标签的时候 stateNode就是--> dom 节点；类组件的时候是指 --> 实例,执行之后才能拿到node节点，即子节点；函数组件的是为null
    child: null, // 第一个子节点 ，fiber结构，链表结构
    sibling: null, // 下一个兄弟节点（fiber）
    return: returnFiber, // 父节点 fiber
    // 标记节点是什么类型，
    flags: Placement,
    // alternate: null, // 老节点 组件更新时会用到
    deletions: null, // 要删除子阶段null 或者[]
    index: null, // 当前层级下的下标，从0开始
    // tag: 1, //
    // type: "div", // type为字符串时，代表当前节点是原生标签。为funcion 为class对象
  };

  const { type } = vnode;
  // console.log("type", type);
  if (isStr(type)) {
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    // 函数组件以及类组件
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent;
  } else if (isUndefined(type)) {
    // 文本
    // 单独处理文本节点，以便后续渲染能找到
    fiber.tag = HostText;
    fiber.props = { children: vnode };
  } else {
    // fragment
    fiber.tag = Fragment;
  }

  return fiber;
}
