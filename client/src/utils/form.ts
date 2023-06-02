const validate = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请完整填写必要信息'));
    } else {
        callback();
    }
}

const expForm = {
    ruleForm: {
        name: '',
        position: '',
        timeRange: [],
        description: '',
    },
    rules: {

    }
}

const awardForm = {
    ruleForm: {
        name: '',
        level: '',
        time: null,
        description: ''
    },
    rules: {

    }
}

export const form : any = {
    // 基础信息
    1001: {
        ruleForm: {
            name: '',
            sex: '',
            birthDay: null,
            phone: '',
            email: '',
            nativePlace: '',
            politicalStatus: '',
            highestEdu: '',
        },
        rules: {
            name: [
                { required: true, message: '请输入你的真实姓名', validator: validate, trigger: 'blur' },
                { min: 3, max: 50, message: '姓名长度应该在3-50之间', trigger: 'blur' },
            ],
            sex: [
                {
                    required: true,
                    validator: validate,
                    message: '请选择你的性别',
                    trigger: 'change',
                },
            ],
            birthDay: [
                {
                    type: 'date',
                    required: true,
                    validator: validate,
                    message: '请选择出生日期',
                    trigger: 'change',
                },
            ],
            phone: [
                { 
                    required: true, 
                    validator: validate,
                    message: '请输入你的电话号码', 
                    trigger: 'blur' 
                },
            ],
            email: [
                { 
                    type: 'email',
                    required: true, 
                    validator: validate,
                    message: '请输入你的邮箱', 
                    trigger: 'blur'
                },
            ],
            politicalStatus: [
                {
                    required: false,
                    trigger: 'change',
                },
            ],
            highestEdu: [
                {
                    required: false,
                    trigger: 'change',
                }
            ]
        }
    },
    // 求职信息
    1002: {
        ruleForm: {
            position: '', // 意向岗位
            city: [], // 意向城市
            status: '', // 求职状态
            isDefault: false, // 是否为默认求职信息
        },
        rules: {
            position: [
                {
                    required: true, 
                    validator: validate,
                    message: '请输入你的意向岗位', 
                    trigger: 'blur' 
                }
            ],
            city: [
                {
                    required: true, 
                    validator: validate,
                    message: '请输入你的意向城市', 
                    trigger: 'blur' 
                }
            ],
            status: [
                {
                    required: true, 
                    validator: validate,
                    message: '请选择你的求职状态', 
                    trigger: 'change' 
                }
            ],
            isDefault: [
                {
                    required: false,  
                    trigger: 'blur' 
                }
            ],
        }
    },
    // 教育经历
    1003: {
        ruleForm: {
            school: '',
            level: '', 
            academy: '', 
            major: '', 
            timeRange: [],
            fullGpa: 4.0, 
            currentGpa: null, 
            rank: '', 
            course: '', 
        },
        rules: {

        }
    },
    // 校园经历
    1010: expForm,
    // 工作经历
    1011: expForm,
    // 项目经历
    1012: expForm,
    // 荣誉奖项
    1020: awardForm,
    // 资格证书
    1021: awardForm,
    // 专业技能
    1030: {
        ruleForm: {
            content: ''
        },
        rules: {

        }
    },
    // 自我评价
    1031: {
        ruleForm: {
            content: ''
        },
        rules: {

        }
    },
    1099: {
        ruleForm: {
            content: ''
        },
        rules: {

        }
    },
}