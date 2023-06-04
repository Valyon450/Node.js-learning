function СheckAnagram(string1 , string2) {
    
    if (string1.length != string2.length)
        return false;
            
    return string1.split("").sort().join("") == string2.split("").sort().join("")
}

console.log(СheckAnagram('Тартак', 'ТНМК')); // false
console.log(СheckAnagram('котяра', 'ояртак')); // true