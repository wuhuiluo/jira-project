import React, { useState } from "react";
import { useProject } from "utils/use-project";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "../../../utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useUsers } from "utils/use-users";


export const ProjectList = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const debouncedParam = useDebounce(param, 2000)
  const { isLoading, error, data: list } = useProject(debouncedParam)
  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []}></List>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 3.2rem;
`
