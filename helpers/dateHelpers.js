const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const fullDate = `${day}/${month}/${year}`;

  const strMonth = date.toLocaleString('pt-BR', { month: 'short' });

  return {
    fullDate,
    strMonth,
    year
  };
}

const getEmployeeAge = (employeeBirth) => {
  const [day, month, year] = employeeBirth.split(' ');

  const monthMap = {
    'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
  };

  const birthdayMonth = monthMap[month];
  
  const birthdayDate = new Date(year, birthdayMonth, day);
  const currentDate = new Date();

  let employeeYears = currentDate.getFullYear() - birthdayDate.getFullYear();

  currentDate.setFullYear(birthdayDate.getFullYear());

  if(currentDate >= birthdayDate) {
    return `${employeeYears} anos`;
  }
  else{
    return `${employeeYears - 1} anos`;
  }

}

module.exports = { getCurrentDate, getEmployeeAge }