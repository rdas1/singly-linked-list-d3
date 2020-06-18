function Node(element) {
  this.element = element;
  this.next = null;
}

function SinglyLinkedList() {
  this._length = 0;
  this.head = null;
}

SinglyLinkedList.prototype.insert = function(value) {
  var node = new Node(value);
  var currentNode = this.head;
  
  // if list is empty, set node as head, increment length
  if (!currentNode) {
    this.head = node;
    this._length++;
    return node;
  }
  // otherwise, walk to end of list before insertion
  while (currentNode.next) {
    currentNode = currentNode.next;
  }
  // insert node at end of list, increment length
  currentNode.next = node;
  this._length++;
  return node;
}

// removes first occurence of element in list
SinglyLinkedList.prototype.removeElement = function(key) {
  var currentNode = this.head;
  var prev = null;
  
  // if head node contains the key to be deleted
  if (currentNode && currentNode.element === key) {
    this.head = currentNode.next;
    this._length--;
    return currentNode;
  }
  
  // traverse list and keep track of prev
  while (currentNode && currentNode.element !== key) {
    prev = currentNode;
    currentNode = currentNode.next;
  }
  
  // if key was not in list
  if (currentNode === null) return;
  
  // unlink the node with the key from list
  prev.next = currentNode.next;
  this._length--;
  return currentNode;
}