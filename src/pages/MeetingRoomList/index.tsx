import React, { useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import to from 'await-to-js';
import { Button, message, Popconfirm, Tag } from 'antd';
import { isNull } from 'lodash-es';

interface IMeetingRoomList {}
const MeetingRoomList = (props: IMeetingRoomList) => {
  const actionRef = useRef<ActionType>();

  const handleBooked = async (id: number) => {
    // const [err, _] = await to(deleteMeetingRoom(id));
    // if (isNull(err)) {
    //   message.success('预定成功');
    //   actionRef.current?.reload();
    // }
  };

  const columns: ProColumns<IKeyValue>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      key: 'index',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      copyable: true,
      width: 80,
    },
    {
      title: '容纳人数',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 80,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '设备',
      dataIndex: 'equipment',
      key: 'equipment',
      ellipsis: true,
      tip: '设备过长会自动收缩',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      key: 'description',
      tip: '描述过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '是否预定',
      dataIndex: 'isBooked',
      key: 'isBooked',
      hideInSearch: true,
      width: 80,
      render: (_, record) => {
        return (
          <Tag color={record.isBooked ? 'red' : 'green'}>
            {record.isBooked ? '已被预定' : '可预定'}
          </Tag>
        );
      },
    },
    {
      title: '创建时间',
      key: 'createdTime',
      dataIndex: 'createdTime',
      valueType: 'date',
      sorter: true,
      width: 100,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      key: 'updatedTime',
      dataIndex: 'updatedTime',
      valueType: 'date',
      sorter: true,
      width: 100,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 80,
      key: 'action',
      fixed: 'right',
      render: (_, record, action) => [
        <Popconfirm
          title={'是否预定会议室'}
          key={'booked'}
          description={'你确定预定该会议室吗?'}
          okText={'确定'}
          cancelText={'取消'}
          onConfirm={() => handleBooked(record.id)}
        >
          <Button type={'primary'} size={'small'}>
            预定
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<IKeyValue>
      rowKey={'id'}
      columns={columns}
      actionRef={actionRef}
      scroll={{ x: 'max-content' }}
      request={async (params) => {
        const { current, pageSize, ...restParams } = params;
        const [_, data] = await to(
          request('/meeting-room/list', {
            method: 'GET',
            params: {
              pageNum: current,
              pageSize: pageSize,
              ...restParams,
            },
          }),
        );
        return {
          data: data?.meetingRooms,
          success: true,
          total: data?.totalCount ?? 0,
        };
      }}
    />
  );
};

MeetingRoomList.defaultProps = {};

export default MeetingRoomList;
