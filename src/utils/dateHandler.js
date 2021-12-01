exports.convertDateAsString = stringDate => {
    const arr = stringDate.split("-");
    return arr.reverse().join("-");
}

exports.calculateAge = stringDate => {
    const yearOfBirth = stringDate.split("-")[0];
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
}