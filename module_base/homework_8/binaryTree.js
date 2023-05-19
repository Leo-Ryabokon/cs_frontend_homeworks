class BinaryNode {
    constructor(value, { parent, left, right }) {
        this.value = value;
        this.parent = parent ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

class BinaryTree {
    constructor(value, { left, right }) {
        this.root = new BinaryNode(value, { left, right });
    }

    // поиск рекурсия
    recFind(value) {
        function findNode(node) {
            if (node === null) {
                return null;
            }

            if (value === node.value) {
                return node;
            }

            if (value < node.value) {
                return findNode(node.left);
            }

            return findNode(node.right);
        }
        return findNode(this.root);
    };

    recMin(root = this.root) {
        let min = root.value;
        function findMin(node) {
            if (node === null) {
                return null;
            }

            if (node.value < min) {
                min = node.value;
            }

            return findMin(node.left);
        }

        findMin(this.root);

        return min;
    };

    recMax(root = this.root) {
        let max = root.value;
        function findMin(node) {
            if (node === null) {
                return null;
            }

            if (node.value > max) {
                max = node.value;
            }

            return findMin(node.right);
        }

        findMin(this.root);

        return max;
    };

    // поиск циклом
    find(value) {
        let current = this.root;

        while (current.value !== value) {
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }

            if (current === null) {
                return null;
            }
        }
        return current;
    };

    min(root = this.root) {
        let current = root;
        let last;

        while (current !== null) {
            last = current;
            current = current.left;
        }

        return last;
    };

    max(root = this.root) {
        let current = root;
        let last;

        while (current !== null) {
            last = current;
            current = current.right;
        }

        return last;
    };

    // вставка
    insert(value) {
        if (this.root === null) {
            this.root = new BinaryNode(value, {});
        } else {
            let current = this.root;
            let parent;

            while (true) {
                parent = current;
                if (value < current.value) {
                    current = current.left;
                    if (current === null) {
                        parent.left = new BinaryNode(value, { parent: parent });
                        return;
                    }
                } else {
                    current = current.right;
                    if (current === null) {
                        parent.right = new BinaryNode(value, { parent: parent });
                        return;
                    }
                }
            }
        }
    };

    // удаление
    delete(value) {
        let current = this.root;
        let parent;
        let isLeft = true;

        while (current.value !== value) {
            parent = current;

            if (value < current.value) {
                isLeft = true;
                current = current.left;
            } else {
                isLeft = false;
                current = current.right;
            }

            if (current === null) {
                console.log('Value not found.');
                return false;
            }
        }

        // если удаляемый узел не имеет потомков
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeft) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            // если нет правого потомка, узел заменяется левым поддеревом
        } else if (current.right === null) {
            if (current === this.root) {
                this.root = current.left;
            } else if (isLeft) {
                parent.left = current.left;
            } else {
                parent.right = current.left
            } // если нет левого потомка, узел заменяется правым поддеревом
        } else if (current.left === null) {
            if (current === this.root) {
                this.root = current.right;
            } else if (isLeft) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
            // если удаляемый узел имеет 2 потомка, узел заменяется преемником
        } else {
            let successor = this.#getSuccessor(current);

            if (current === this.root) {
                this.root = successor;
            } else if (isLeft) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }
            successor.left = current.left;
        }
        return true;
    };

    /*
    Метод возвращает узел со следующим значением после delNode.
    Для этого он сначала переходит к правому потомку, а затем
    отслеживает цепочку левых потомков этого узла.
    */
    #getSuccessor(node) {
        let successorParent = node;
        let successor = node;
        let current = node.right

        while (current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left;

            if (successor !== node.right) {
                successorParent.left = successor.right;
                successor.right = node.right
            }
        }
        return successor;
    };

    // обходы
    preOrder(localRoot = this.root) {
        if (localRoot !== null) {
            console.log(localRoot.value);
            this.inOrder(localRoot.left);
            this.inOrder(localRoot.right);
        }
    };

    inOrder(localRoot = this.root) {
        if (localRoot !== null) {
            this.inOrder(localRoot.left);

            console.log(localRoot.value);

            this.inOrder(localRoot.right);
        }
    };

    postOrder(localRoot = this.root) {
        if (localRoot !== null) {
            this.inOrder(localRoot.left);
            this.inOrder(localRoot.right);
            console.log(localRoot.value);
        }
    };
}

const tree = new BinaryTree(10, {});

tree.insert(7);
tree.insert(8);
tree.insert(3);
tree.insert(15);
tree.insert(13);
tree.insert(18);
console.log(tree.delete(3));
console.log(tree.find(3));
