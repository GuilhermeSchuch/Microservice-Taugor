const dataToArray = (dataStr) => {
  if (dataStr.includes(',')) {
    return dataStr.split(', ');
  }
  else{
    return [dataStr];
  }
}

module.exports = { dataToArray }