exports.convertDateAsString = stringDate => {
    return stringDate.split("-").reverse().join("-");
}

exports.calculateAge = stringDate => {
    const yearOfBirth = stringDate.split("-")[0];
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
}