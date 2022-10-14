const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this._rootElem = null;
  } 

  root() {
    if (!this._rootElem) {
      return null;
    }
    return this._rootElem;
  }

  add(data) {
    this._rootElem = addElement(this._rootElem, data);

    function addElement(node, data) {
      if (!node)  return new Node(data);
      if (node.data === data) return node;    

      if (data > node.data) {
        node.right = addElement(node.right, data);
      } else {
        node.left = addElement(node.left, data);
      }
      return node;
    }
  }

  has(data) {
    return searchElement(this._rootElem, data);

    function searchElement(node, data) {
      if (!node) return false;
      if (node.data === data) return true;    

      if (data > node.data) {
        return searchElement(node.right, data);
      } else {
        return searchElement(node.left, data);
      }
    }
  }

  find(data) {
    return findElement(this._rootElem, data);

    function findElement(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (data > node.data) {
        return findElement(node.right, data);
      } else {
        return findElement(node.left, data);
      }
    }
  }

  remove(data) {
    this._rootElem = removeElement(this._rootElem, data);

    function removeElement(node, data) {
      if (!node) {
        return null;
      }

      if (data > node.data) {
        node.right = removeElement(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeElement(node.left, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;

        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = removeElement(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this._rootElem) {
      return null;
    }

    let node = this._rootElem;
    while(node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this._rootElem) {
      return null;
    }

    let node = this._rootElem;
    while(node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};