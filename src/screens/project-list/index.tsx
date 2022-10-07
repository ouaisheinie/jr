import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect, useCallback } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "", // 项目名称
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp();

  // 获取项目列表 或者更新
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]); // personId不会在 useDebounce 里面触发setTimeout 于是就直接执行

  const getUsers = useCallback(() => {
    client("users").then(setUsers);
  }, []);

  useMount(getUsers);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
