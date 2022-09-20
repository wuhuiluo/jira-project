import React, { useState } from "react";
import { useProject } from "utils/use-project";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useMount, useDebounce } from "../../../utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";


export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({ name: "", personId: "" });
  const client = useHttp()
  const debouncedParam = useDebounce(param, 2000)
  const { isLoading, error, data: list } = useProject(debouncedParam)
  useMount(() => {
    client("users").then(setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users} dataSource={list || []}></List>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 3.2rem;
`
