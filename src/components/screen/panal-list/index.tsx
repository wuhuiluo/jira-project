import React, { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useMount, cleanObject, useDebounce } from "../../../utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ObjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const client = useHttp()
  const debouncedParam = useDebounce(param, 2000)

  useMount(() => {
    client("users").then(setUsers);
  })

  useEffect(() => {
    // @ts-ignore
    client('projects', { data: cleanObject(param) }).then(res => setList(res))
  }, [debouncedParam])

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 3.2rem;
`
