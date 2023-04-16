import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { groupByMonth, groupByYear } from "./utils";

const withTransform = (ComponentForTransform, transformType) => {
  return ({ list }) => {
    let transformedList = _.cloneDeep(list);

    switch (transformType) {
      case "sort": {
        transformedList.sort((elA, elB) => {
          return new Date(elB.date) - new Date(elA.date);
        });
        break;
      }
      case "year": {
        transformedList = groupByYear(transformedList);
        break;
      }
      case "month": {
        transformedList = groupByMonth(transformedList);
        break;
      }
      default: {
        break;
      }
    }

    return <ComponentForTransform list={transformedList} />;
  };
};

function MonthTable(props) {
  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, itemIdx) => (
            <tr key={itemIdx}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function YearTable(props) {
  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, itemIdx) => (
            <tr key={itemIdx}>
              <td>{item.year}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortTable(props) {
  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, itemIdx) => (
            <tr key={itemIdx}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MonthTableWithTransform = withTransform(MonthTable, "month");
const YearTableWithTransform = withTransform(YearTable, "year");
const SortTableWithTransform = withTransform(SortTable, "sort");

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API_URI);

        setList(data.list);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  return (
    <div id="app">
      {!!list.length ? (
        <>
          <MonthTableWithTransform list={list} />
          <YearTableWithTransform list={list} />
          <SortTableWithTransform list={list} />
        </>
      ) : null}
    </div>
  );
};

export default App;
