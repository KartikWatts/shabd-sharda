class TrieNode:
    def __init__(self, char: str):
        self.char = char
        self.children = []
        self.word_finished = False
        self.counter = 1

    def __str__(self):
        return self.char

class Trie:
    def __init__(self):
        self.root = TrieNode('')

    def add_word(self, word: str):
        """
        Add a word in the `Trie`, starting from `Trie.root`
        """
        node = self.root
        #start adding
        for char in word:
            found_in_child = False
            # search for the character in the children of the present node
            for child in node.children:
                # if trienode for the next character exists
                if child.char == char:
                    # increment counter
                    child.counter+=1
                    # go to the child node
                    node = child
                    found_in_child = True
                    break
            # else create a new trie node
            if not found_in_child:
                new_node = TrieNode(char)
                node.children.append(new_node)
                node = new_node

        #adding done, now mark the node as word end
        node.word_finished = True

    def add_word_list(self, word_list):
        for word in word_list:
            self.add_word(word)

    def find_prefix(self, prefix: str):
        node = self.root
        # if the root has no children
        if not self.root.children:
            return False, 0, False
        for char in prefix:
            char_not_found = True
            # Try all the children of the present node
            for child in node.children:
                if child.char == char:
                    # We found the char existing in the child.
                    char_not_found = False
                    # Assign node as the child containing the char and break
                    node = child
                    break
            if char_not_found:
                return False, 0, False
        # we found the prefix
        return True, node.counter, node.word_finished