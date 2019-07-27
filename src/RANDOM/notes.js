
// CHECK IF OBJECT IS EMPTY
isEmpty = (obj) => {
for(let key in obj) {
    if(obj.hasOwnProperty(key))
        return false;
}
return true;
}

// MAP OBJECT TO ARRAY WITH OUT KEYS
myArray = Object.keys(myObject).map(i => myObject[i]);