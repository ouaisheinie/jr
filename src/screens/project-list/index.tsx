import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useCallback } from "react";
import { useMount, useDebounce, useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // 基本类型可以放到依赖里，组件状态可以放到依赖里，非组件状态的对象，绝不可以放到依赖里。
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
