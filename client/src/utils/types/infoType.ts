/** 用户简历信息的类型
 * 1001: '基本信息',
 * 1002: '求职信息',
 * 1003: '教育经历',
 * 1010: '校园经历',
 * 1011: '工作经历',
 * 1012: '项目经历',
 * 1020: '荣誉奖项',
 * 1021: '资格证书',
 * 1030: '专业技能',
 * 1031: '自我评价',
 * 1099: '其他',
 */ 

// 用户基本信息（type => 1001）
export interface baseInfo {
    name: string | null,
    sex: string | null,
    birthDay: Date | null,
    phone: string | null,
    email: string | null,
    nativePlace: string | null,
    politicalStatus: string | null, // 政治面貌：中共党员、中共预备党员、共青团员、群众、民革党员、民盟盟员、民建会员、民进会员、农工党党员、致公党党员、九三学社社员、台盟盟员、无党派人士
    highestEdu: string | null; // 最高学历
}

// 求职信息（type => 1002）
export interface jobInfo {
    position: string | null, // 意向岗位
    city: Array<string> | null, // 意向城市
    status: string | null, // 求职状态
    isDefault: boolean | null, // 是否为默认求职信息
}

// 教育经历（type => 1003）
export interface eduInfo {
    school: string | null,
    level: string | null, // 专科、本科、研究生、博士等
    academy: string | null, // 学院
    major: string | null, // 主修专业
    timeRange: Array<Date> | null,
    fullGpa: number | null, // 满绩
    currentGpa: number | null, // 当前绩点
    rank: string, // 排名
    course: string | null, // 课程
}

// 经历（'1010'=>'校园经历'；'1011'=>'工作经历'； '1012'=>'项目经历'）
export interface expInfo {
    name: string | null,
    position: string | null,
    timeRange: Array<Date> | null,
    description: string | null,
}

// 奖状证书（'1020'=>'荣誉奖项'；'1021'=>'资格证书'）
export interface awardInfo {
    name: string | null,
    level: string | null,  // 国际级、 国家级、省市级、市区级、校级、院级
    time: Date | null,
    description: string | null
}