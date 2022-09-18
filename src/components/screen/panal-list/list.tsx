import React from "react";
import { User } from './search-panel'
import { Table } from 'antd'
import dayjs from "dayjs";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: string;
}

interface ListProps {
  list: Project[];
  users: User[]
}

export const List: React.FC<ListProps> = ({ users, list }) => {
  return (
    <Table pagination={false} columns={[{
      title: '名称',
      width: 150,
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: '部门',
      dataIndex: 'organization'
    }, {
      title: "负责人",
      render(value, project) {
        return <span>
          {users.find((user) => user.id === project.personId)?.name || "未知"}
        </span>
      }
    }, {
      title: '创建时间',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    }]} dataSource={list} />
  );
};
