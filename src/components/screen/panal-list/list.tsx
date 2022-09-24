import React from "react";
import { User } from './search-panel'
import { Table, TableProps } from 'antd'
import { Link } from 'react-router-dom'
import dayjs from "dayjs";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: string;
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List: React.FC<ListProps> = ({ users, ...props }) => {
  return (
    <Table rowKey={project => project.id} pagination={false} columns={[{
      title: '名称',
      width: 150,
      // dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
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
    }]} {...props} />
  );
};
