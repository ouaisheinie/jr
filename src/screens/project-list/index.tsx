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
  const [, setParam] = useState({
    name: "", // 项目名称
    personId: "",
  });

  const [keys, setKeys] = useState<("name" | "personId")[]>([
    "name",
    "personId",
  ]);
  const [param] = useUrlQueryParam(keys);
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

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
