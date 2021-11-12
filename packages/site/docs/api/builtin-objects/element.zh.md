---
title: Element
order: 3
---

在 G 中有以下继承关系：

-   DisplayObject -> Element -> Node -> EventTarget

# 继承自

[Node](/zh/docs/api/builtin-objects/node)

# 属性

## id

场景图中唯一，后续可以通过 getElementById 查询：

```js
const circle = new Circle({
    id: 'my-id',
    style: { r: 10 },
});

circle.id; // 'my-id';
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/id

## name

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/name

## className

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/className

## attributes

只读，返回样式属性，例如：

```js
const circle = new Circle({ style: { r: 10 } });

circle.attributes.r; // 10;
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attributes

## children

返回子元素列表，和 Node.childNodes 等价。

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/children

## childElementCount

返回子元素列表长度。

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/childElementCount

## firstElementChild

和 Node.firstChild 等价。

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/firstElementChild

## lastElementChild

和 Node.lastChild 等价。

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/lastElementChild

# 方法

## getAttribute

https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute

## removeAttribute

https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute

## setAttribute

https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute

## getBoundingClientRect

返回浏览器坐标系下的包围盒，不考虑子元素。

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect

## getClientRects

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects

## destroy

销毁自身，会移除一切事件监听器，停止正在进行的动画。

## 节点查询

### matches

是否匹配选择器字符串

https://developer.mozilla.org/en-US/docs/Web/API/Element/matches

### getElementById

### getElementsByName

### getElementsByClassName

### getElementsByTagName

### querySelector

### querySelectorAll

### find

### findAll

## 节点操作

基于 Node 已有的节点操作能力，提供一些更便捷的操作，例如批量添加兄弟节点、替换所有子节点等。

### append(...nodes: this[])

在当前节点的子节点列表末尾批量添加一组节点。

```js
parent.appendChild(child1);
parent.appendChild(child2); // parent -> [child1, child2]
parent.append(child3, child34); // parent -> [child1, child2, child3, child4]
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append

### prepend(...nodes: this[])

在当前节点的子节点列表头部批量添加一组节点。

```js
parent.appendChild(child1);
parent.appendChild(child2); // parent -> [child1, child2]
parent.prepend(child3, child34); // parent -> [child3, child4, child1, child2]
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/prepend

### after(...nodes: Element[])

在当前节点之后批量添加一些兄弟节点，例如一次性添加一批：

```js
circle.after(sibling1, sibling2); // [circle, sibling1, sibling2]
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/after

### before(...nodes: Element[])

在当前节点之前批量添加一些兄弟节点，例如一次性添加一批：

```js
circle.before(sibling1, sibling2); // [sibling1, sibling2, circle]
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/before

### remove(destroy = true)

将自身从场景图中移除，可以选择是否同时销毁，默认会销毁。

```js
circle.remove();
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/remove

### replaceWith(...nodes: Element[])

在父节点的子节点列表中，用传入的节点列表替换该节点：

```js
parent.appendChild(child1);
parent.appendChild(child2); // parent -> [child1, child2]
child1.replaceWith(node1, node2); // parent -> [node1, node2, child2]
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/replaceWith

### replaceChildren(...nodes: Element[])

替换该节点的所有子节点。不传参数时则会清空该节点的所有子节点：

```js
parent.replaceChildren(child1, child2);
parent.replaceChildren(); // 清空
```

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/replaceChildren

## 动画

### getAnimations

返回应用在当前元素上的动画对象列表，详见[动画系统](/zh/docs/api/animation)

https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations

### animate

应用 Keyframe 动画，详见[动画系统](/zh/docs/api/animation)

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate