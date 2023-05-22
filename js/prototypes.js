/**
 * 
 * @returns 
*/

String.prototype.validateEmail = function () {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @returns 
*/

String.prototype.capFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * 
 * @returns 
*/

Number.prototype.roundPrice = function() {
    let total = this;
    let round = total.toString().charAt(total.toString().length - 1);

    if(round != 0){
        if(round >= 6){
            round = 10 - round;
        }else if(round <= 5){
            round = round * -1;
        }
    }

    total = parseInt(total) + parseInt(round);

    return total;
}

/**
 * 
 * @returns 
*/

Element.prototype.getTextOptSelected = function() {
    return this.options[this.selectedIndex].text;
}

/**
 * 
 * @param {string} attribute 
 * @returns 
*/

Element.prototype.getDataOptSelected = function(attribute){
    return this.options[this.selectedIndex].getAttribute(attribute);
}

/**
 * 
 * @returns 
*/

Element.prototype.getAllDataOptSelected = function() {
    const option = this.options[this.selectedIndex].attributes;
    let array = {};

    for (const attr of option) {
        array[attr.name] = attr.value;
    }

    return array;
}

/**
 * 
 * @param {*} value 
*/

Element.prototype.setValue = function(value){
    const eventChange = new Event("change");
    this.value = value;
    this.dispatchEvent(eventChange);
}

/**
 * 
 * @param {*} array 
 * @param {*} attribute 
*/

Element.prototype.setMultipleValues = function(array, attribute){
    const event = new Event("change");
    let values = [];

    for(const object of array){
        values[values.length] = object[attribute];
    }

    this.value = values;
    this.dispatchEvent(event);
}

/**
 * 
 * @param {*} fila 
 * @param {*} array 
 * @param {*} position 
*/

Element.prototype.addRow = function (fila, array, position){
    let tablaRef = this.getElementsByTagName('tbody')[0];
    let nuevaFila;

    switch (position) {
        case 'first':
            nuevaFila = tablaRef.insertRow(0);
        break;
        case 'last':
            nuevaFila = tablaRef.insertRow(tablaRef.rows.length)
        break;
        default:
            nuevaFila = tablaRef.insertRow(position);
        break;
    }

    for(const [key, value] of Object.entries(array)){
        nuevaFila[key] = value;
    }

    nuevaFila.innerHTML = fila;
}

/**
 * 
*/

Element.prototype.deleteRow = function() {
    this.parentNode.removeChild(this);
}

/**
 * 
 * @param {*} attribute 
 * @param {*} order 
 * @returns 
*/

Array.prototype.orderByString = function(attribute, order) {
    this.sort(function (a,b) {
        return order == 'asc' ? ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] < b[attribute]) ? 1 : -1 )):
                                ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] > b[attribute]) ? 1 : -1 ));
    });

    return this;
}

/**
 * 
 * @param {*} type 
 * @param {*} order 
 * @param {*} date 
 * @param {*} number 
 * @returns 
*/

Array.prototype.orderByDateOrNumber = function(type, order, date = null, number = null) {
    this.sort(function (a, b) {
        let v1, v2;

        switch (type) {
            case 'date':
                v1 = new Date(a[date]);
                v2 = new Date(b[date]);
            break;
            case 'number':
                v1 = a[number];
                v2 = b[number];
            break;
        }

        let sort1 = v1, sort2 = v2;

        return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
    });

    return this;
}

/**
 * 
 * @param {string} attribute 
 * 
 * @returns array agruped by attribute value
 * 
 * Example:
 * 
 *  var array = [
        { date: '2022-05-28', indicator: 1 },
        { date: '2022-05-28', indicator: 2 },
        { date: '2022-07-05', indicator: 1 }
    ];
 * 
 *  var newArray = array.groupBy('date');
 *  console.log(newArray);
 *  
 *  for(const [key, value] of Object.entries(array.groupByAttr('date'))){
        console.log({date: key, values: value});
    }
*/

Array.prototype.groupByAttr = function(attribute) {
    return this.reduce(function(group, obj) {
        group[obj[attribute]] = group[obj[attribute]] || [];
        group[obj[attribute]].push(obj);
        return group;
    }, {});
};

/**
 * 
 * @param {*} arrays 
 * @param {*} attribute 
 * @returns 
*/

Array.prototype.fusionByAttribute = function(arrays, attribute){
    let newArray = [];
    let finalArray = [];

    arrays.forEach(element => {
        let obj = objectGroupBy(element, attribute);
        newArray.push(obj);
    });

    newArray.forEach(element => {
        for(const [key, value] of Object.entries(element)){
            switch (finalArray.hasOwnProperty(key)) {
                case false:
                    finalArray[key] = value[0];
                    break;
                case true:
                    for (const [key2, value2] of Object.entries(value[0])) {
                        if(!finalArray[key].hasOwnProperty(key2)){
                            finalArray[key][key2] = value2;
                        }
                    }
                    break;
            }
        }
    });

    return finalArray;
}

/**
 * 
 * @param {*} val 
 * @returns 
*/

Array.prototype.getIndex = function(val) {
    const value = (element) => element == val;

    return this.findIndex(value);
}
