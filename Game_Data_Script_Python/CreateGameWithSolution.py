from Trie import Trie
import itertools

def word_freq(word):
    """
    Returns frequency of all alphabets in `word`
    """
    freq = [0]*26
    for ch in word:
        freq[ord(ch)-ord('a')]+=1
    return freq

def word_possible(word_freq, digram_freq):
    for w_f, d_f in zip(word_freq, digram_freq):
        if w_f>d_f:
            return False
    return True

def get_word_list(full_word_list_txt, digram):
    """
    Returns a list of all words that can possibly be created 
    on the basis of the frequency count
    """
    #calculate digram frequency
    digram_str = []
    for row in digram:
        digram_str.extend(row)
    digram_str = ''.join(digram_str)
    digram_freq = word_freq(digram_str)
    #load word list
    word_list_file = open(full_word_list_txt, 'r')
    word_list = []
    for line in word_list_file:
        word = line.strip()
        if word_possible(word_freq(word), digram_freq):
            word_list.append(word)
    return word_list

def dfs_recursive(row, col, digram, combination, vis, combination_set, trie):
    for i,j in itertools.product([-1, 0, 1], repeat=2):
            next_row = row + i
            next_col = col + j
            # out of range
            if next_row not in range(len(digram)) or next_col not in range(len(digram[0])):
                continue
            # if already visited
            if vis[next_row][next_col]:
                continue
            # if word with the combination as the prefix does not exist
            if not trie.find_prefix(combination)[0]:
                continue
            #if the combination is the valid word
            if trie.find_prefix(combination)[2]:
                combination_set.add(combination)
            #mark as visited and continue the search
            vis[next_row][next_col] = True
            combination += digram[next_row][next_col]
            dfs_recursive(next_row, next_col, digram, combination, vis, combination_set, trie)
            #unmark
            combination = combination[:-1]
            vis[next_row][next_col] = False

def create_solution_file(solution):
    for i in range(len(solution)):
        solution[i]= '"'+ solution[i] + '"'
    solution=', '.join(solution)
    file_object  = open("solution.txt", "w+")
    file_object.write("[\n"+solution+"\n]")
    file_object.close()

def begin_dfs(digram, trie):
    """
    Returns a set of all words that can be created using the `digram`, 
    using `trie` as the dictionary of all plausible words
    """
    vis = [[False]*4 for i in range(4)]
    combination_set = set()
    for i,j in itertools.product(range(4), repeat=2):
            combination = ""+digram[i][j]
            vis[i][j] = 1
            dfs_recursive(i, j, digram, combination, vis, combination_set, trie)
            vis[i][j] = 0
    return combination_set

if __name__ == "__main__":
    full_word_list = "words_alpha.txt"

    trie = Trie()
    game_box= [
        ['c', 's', 'e', 't'], 
        ['w', 'a', 'n', 'a'], 
        ['o', 'm', 'o', 'e'], 
        ['d', 'e', 'r', 'g']]

    word_list = get_word_list(full_word_list, game_box)
    trie.add_word_list(word_list)
    solution_list = list(begin_dfs(game_box, trie))
    create_solution_file(solution_list)
    # print(solution_list)