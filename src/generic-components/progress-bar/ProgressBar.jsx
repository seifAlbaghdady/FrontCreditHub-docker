import { Progress, Tooltip, Space } from 'antd';

const ProgressBar = (props) => {
    const progressDetails = props.progressDetails || {
        "Total": {
            "courses": 0,
            "credits": 0
        },
        "Requirements": {
            "University Requirements": {
                "done": 0,
                "total": 7
            },
            "College Requirements": {
                "done": 0,
                "total": 19
            },
            "Program Requirements": {
                "done": 0,
                "total": 36
            },
            "Elective Group (1)": {
                "done": 0,
                "total": 2
            },
            "Elective Group (2)": {
                "done": 0,
                "total": 4
            }
        }
    };
    
    const CreditsPerecent = (progressDetails.Total.credits / 175) * 100;
    return (
        <>
            
            <Space wrap>
                <Tooltip
                    title={
                        <div style={{ width: "600px" }}>
                            {Object.entries(progressDetails.Requirements).map(([key, value]) => {
                                return (
                                    <p key={key}>
                                        {/*  strikethrough if done */}
                                        {value.done === value.total ? <s>{key}: {value.done}/{value.total} Courses</s> : `${key}: ${value.done}/${value.total} Courses`}
                                    </p>
                                )
                            })}
                        </div>
                    }>
                    <Progress percent={CreditsPerecent} format={(credits) => `${parseInt(credits * (175 / 100))} / 175 credits`} type="dashboard" />
                </Tooltip>
            </Space>
        </>

    )
}

export default ProgressBar;