/**
 * Remove duplicate values, if any, from a sorted linked list.
 *
 * The algorithm should be O(n) time complexity, therefore it cannot use `find()`.
 *
 * @param sortedLinkedList
 *  a possibly empty link list with all values in lexical order.
 *
 * @returns {LinkedList}
 *  the original linked list with any duplicate values removed.
 
 duplicates are removed by adjusting the next pointers to bypass the duplicate nodes. The function modifies the existing linked list in place and returns the modified list. If two consecutive nodes have the same value, the second node is skipped by updating the next pointer of the current node. This process continues until the end of the list is reached.
 */

function removeDuplicates(sortedLinkedList) {
    // Start from the head of the linked list
    let current = sortedLinkedList.head;

    // Iterate through the linked list until the last node is reached
    while (current?.next) {
        // Check if the current node's value is equal to the next node's value
        if (current.value === current.next.value) {
            // If equal, skip the next node by updating the current node's next reference
            current.next = current.next.next;
        } else {
            // If not equal, move to the next node in the linked list
            current = current.next;
        }
    }

    // Return the modified linked list with duplicates removed
    return sortedLinkedList;
}

// Export the removeDuplicates function for external use
module.exports = removeDuplicates;