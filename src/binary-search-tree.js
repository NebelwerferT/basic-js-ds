const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    const rec = (node, data) => {
      if (!node) return new Node(data);
      if (node.data === data) return node;
      if (node.data <= data) node.right = rec(node.right, data);
      else node.left = rec(node.left, data);
      return node;
    }
    this.tree = rec(this.tree, data);
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    const deepFind = (node, data) => {
      if (!node) return null;
      if (node.data === data) return node;
      return (node.data <= data) ? deepFind(node.right, data) : deepFind(node.left, data);
    }
    return deepFind(this.tree, data);
  }

  remove(data) {
    const rmData = (node, data) => {
      let curMin;
      if (!node) return null;
      if (node.data !== data) {
        if (node.data < data) node.right = rmData(node.right, data);
        if (node.data > data) node.left = rmData(node.left, data);
        return node;
      }
      if (!node.right && !node.left) return null;
      if (!node.right) { node = node.left; return node; }
      if (!node.left) { node = node.right; return node; }
      curMin = node.right;
      while (curMin.left) curMin = curMin.left;
      node.right = rmData(node.right, curMin.data);
      node.data = curMin.data;
      return node;
    }
    this.tree = rmData(this.tree, data);
  }

  min() {
    return this.minmax('left');
  }

  max() {
    return this.minmax('right');
  }

  minmax(direction) {
    let minmax = (!this.three) ? this.tree : this.tree.data;
    if (!minmax) return minmax;
    let node = this.tree;
    while (true) {
      node = node[direction];
      if (!node) return minmax;
      minmax = node.data;
    }
  }
}