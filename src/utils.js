export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const groupByYear = (list) => {
  const yearsSet = new Set();

  list.forEach((date) => {
    yearsSet.add(new Date(date.date).getFullYear());
  });

  return Array.from(yearsSet).map((year) => {
    const amount = list.reduce((sum, curDate) => {
      const curYear = new Date(curDate.date).getFullYear();
      if (curYear === year) {
        sum += curDate.amount;
      }
      return sum;
    }, 0);

    return {
      amount,
      year,
    };
  });
};

export const groupByMonth = (list) => {
  // Использую не текущий год, чтобы по неактуальным данным можно было протестировать код
  // const currentYear = new Date().getFullYear();
  const currentYear = 2018;

  return months.map((month, monthIdx) => {
    const amount = list.reduce((sum, curDate) => {
      const curYear = new Date(curDate.date).getFullYear();
      const curMonth = new Date(curDate.date).getMonth();
      if (currentYear === curYear && curMonth === monthIdx) {
        sum += curDate.amount;
      }
      return sum;
    }, 0);

    return {
      amount,
      month,
    };
  });
};
