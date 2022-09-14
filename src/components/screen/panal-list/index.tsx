import React, { useEffect, useState } from "react";
import qs from 'qs';
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useMount, cleanObject, useDebounce } from "../../../utils/index";

export const ObjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000)

  const apiUrl = process.env.REACT_APP_API_URL

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  useEffect(() => {
    // @ts-ignore
    fetch(`http://localhost:3001/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
