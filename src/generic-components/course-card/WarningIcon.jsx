import React from 'react';
import { Tooltip } from 'antd';
import { WarningOutlined, WarningFilled, WarningTwoTone } from '@ant-design/icons';

const WarningIcon = ({ message }) => {
    return (
        <>
            {message ?
                <Tooltip title={message} placement="bottom" color="red">
                    <WarningTwoTone twoToneColor="red" style={{ fontSize: '18px' }} />
                </Tooltip >
                :
                <Tooltip title="No warnings" placement="bottom" color="grey">
                    <WarningOutlined style={{ fontSize: '18px', color: 'grey' }} />
                </Tooltip>
            }
        </>
    );
};

export default WarningIcon;