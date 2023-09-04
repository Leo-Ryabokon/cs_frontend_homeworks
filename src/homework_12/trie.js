class TrieNode {
    constructor(val, word) {
        this.val = val;
        this.word = word;
        this.children = new Map();
    }
}
class Trie {
    #buffer = [new TrieNode('')];

    constructor() {
    }

    addWord(iterable) {
        let cursor = 0;

        for (const str of iterable) {
            const
                current = this.#buffer[cursor],
                childrenIdx = current.children.get(str);

            if (childrenIdx != null) {
                cursor = childrenIdx;
            } else {
                const node = new TrieNode(str);

                const pointer = this.#buffer.push(node) - 1;

                current.children.set(str, pointer);
                cursor = pointer;
            }
        }

        this.#buffer[cursor].word = true;
    };

    go(val) {
        return new TrieView(0, this.#buffer).go(val);
    }
}

class TrieView {
    #start
    #buffer

    constructor(start, buffer) {
        this.#start = start;
        this.#buffer = buffer;
    }

    isWord() {
        if (this.#start === -1 || this.#buffer[this.#start] == null) {
            return false
        } else {
            return this.#buffer[this.#start].word;
        }
    }

    go(val) {
        if (this.#start === -1 || this.#buffer[this.#start] == null) {
            return this;
        }
        return  new TrieView(this.#buffer[this.#start].children.get(val) ?? -1, this.#buffer);
    }
}

const trie = new Trie();

trie.addWord('мясо');
trie.addWord('мясорубка');
trie.addWord('мир');

console.log(trie.go('м').go('я').go('с').go('о').isWord());
