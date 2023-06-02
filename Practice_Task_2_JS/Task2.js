function СheckAnagram(String1 , String2) {
    
    if (String1.length != String2.length)
        return false;
    
        
    if (String1.split("").sort().join("") == String2.split("").sort().join(""))
        return true;
    else
        return false;
}

console.log(СheckAnagram('Тартак', 'ТНМК')); // false
console.log(СheckAnagram('котяра', 'ояртак')); // true