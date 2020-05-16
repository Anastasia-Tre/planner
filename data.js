

function Node(value) {
    this.data = value;
    this.next = null;
    this.previous = null;
}

function List() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}

List.prototype.add = function(value) {
    const node = new Node(value);

    if (this._length == 0) {
        this.head = node;
        this.tail = node;
        this._length++;
        return node;
    }

    if (value._date <= this.head.data._date) {
        let temp = this.head;
        this.head = node;
        node.next = temp;
        temp.previous = node;
        this._length++;
        return node;
    }


    let elem = this.head;
    for (let i = 0; i < this._length; i++) {
        if (value._date > elem.data._date) {
            if (elem.next == null) {
                elem.next = node;
                node.previous = elem;
                this.tail = node;
                break;
            }
            else {
                elem = elem.next;
            }
        }
        else {
            let temp = elem.previous;
            elem.previous = node;
            node.previous = temp;
            temp.next = node;
            node.next = elem;
            break;
        }
    }

    this._length++;

    return node;
};

List.prototype.index = function(index) {
    let elem = this.head;
    let count = 0;

    if (index < 0 || index >= this._length) {
        throw new Error("Not a corect index");
    }

    for (let i = 0; i < this._length; i++) {
        if (count == index) {
            return elem;
        }
        else {
            elem = elem.next;
            count++;
        }
    }
}

List.prototype.delete = function(index) {
    let count = 0;
    let current = this.head;
    let beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;

    if (index < 0 || index >= this._length) {
        throw new Error("Not a corect index");
    }

    if (index == 0) {
        this.head = current.next;

        if (!this.head) {
            this.head.previous = null;
        }
        else {
            this.tail = null;
        }
    }
    else if (index == this._length-1) {
        this.tail = this.tail.previous;
        this.tail.next = null;
    }
    else {
        while (count < index) {
            current = current.next;
            count++;
        }

        beforeNodeToDelete = current.previous;
        nodeToDelete = current;
        afterNodeToDelete = current.next;

        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }

    this._length--;
}



const Data = new List();
generateEvents(100);


function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}


function generateEvents(n) {

    const names = [
        'Birthday', 'MeetUP', 'Shopping', 'Event', 'Meeting', 
        'Game', 'Dinner', 'Lunch', 'Weekend', 'Task', 'Walking',
    ];

    const people = [
        'Mother', 'Father', 'Friend', 'Sister', 'Brother', 
        'Aunt', 'Family', 'Friends', 'Boyfriend', 'Girlfriend',
    ]

    for (let i = 0; i < n; i++) {
        let name = names[randomInteger(0, names.length)] + ' with '
                    + people[randomInteger(0, people.length)];
        let date = new Date(2020, 4, randomInteger(1, 31), randomInteger(0, 23));
        let record = new Record(name, date);
        Data.add(record);
    }
}


for (let i = 0; i < Data._length; i++) {
    let elem = Data.index(i);
    //console.log(elem.data._date, elem.data._name);
}
