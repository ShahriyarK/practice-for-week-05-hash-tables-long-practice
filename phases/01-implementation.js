class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    // Your code here
    const loadFactor = this.count / this.capacity;
    // handle resizing
    if (loadFactor >= 0.7) this.resize();

    const index = this.hashMod(key);
    const newPair = new KeyValuePair(key, value);
    let current = this.data[index];
    // check for duplicate
    while (current) {
      if (current.key === newPair.key) {
        current.value = newPair.value;
        break;
      }
      current = current.next;
    }
    // insert new pair
    if (!current) {
      const prev = this.data[index];
      this.data[index] = newPair;
      newPair.next = prev;
      this.count++;
    }
  }

  read(key) {
    // Your code here
    const index = this.hashMod(key);
    let current = this.data[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return;
  }

  resize() {
    // Your code here
    this.capacity = this.capacity * 2;
    const oldData = this.data;
    // reset count
    this.count = 0;
    this.data = new Array(this.capacity).fill(null);
    // redistribute data
    oldData.forEach((pair) => {
      let current = pair;
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    });
  }

  delete(key) {
    // Your code here
    const index = this.hashMod(key);
    let target = this.data[index];
    // index points to null
    if (!target) return "Key not found";
    // target exists and key matches but it is a singular node
    else if (!target.next && target.key === key) {
      this.data[index] = undefined;
      this.count--;
    }
    // target exists and key matches but it has a next node
    else if (target.next && target.key === key) {
      this.data[index] = target.next;
      target.next = null;
      this.count--;
    }
    // target not found in the first node (target exists but key doesnt match), so we traverse the linked list
    else {
      let current = target.next;
      let prev = target;
      while (current) {
        if (current.key === key) {
          prev.next = current.next;
          this.count--;
          return;
        }
        prev = prev.next;
        current = current.next;
      }
      return "Key not found";
    }
  }
}

module.exports = HashTable;
