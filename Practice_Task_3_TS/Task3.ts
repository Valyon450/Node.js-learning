const Person = {
    FirstName: "Vadym",
    LastName: "Prokopenko",
    DateBirth: new Date("1992-5-14"),
    Children: ["Anton", "Olena"],
}

function DeepClone(Object: object) {
    
    return JSON.parse(JSON.stringify(Object));
}

var PersonClone = DeepClone(Person);

console.log(PersonClone.FirstName); // Vadym
console.log(PersonClone.LastName); // Prokopenko
console.log(PersonClone.DateBirth); // 1992-05-13T21:00:00.000Z
console.log(PersonClone.Children); // [ 'Anton', 'Olena' ]
console.log(Person.DateBirth === PersonClone.DateBirth); // false