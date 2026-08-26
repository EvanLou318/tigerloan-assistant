// ==================== Mock 数据层 ====================
// 模拟 AI 能力：OCR、ASR、大模型

// 模拟延迟
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// ==================== 产品数据 ====================
export const mockProducts = [
  {
    id: 'p001',
    productName: '招商银行闪电贷',
    institution: '招商银行',
    minRate: 4.2,
    maxRate: 7.8,
    minAmount: 1,
    maxAmount: 30,
    loanTerm: '12-36个月',
    repaymentMethod: '等额本息',
    conditions: '年龄22-55周岁；月收入≥5000元；征信良好，近3个月查询≤6次',
    status: 'active',
    createdAt: '2026-08-10 09:30:00',
    source: 'text',
  },
  {
    id: 'p002',
    productName: '建设银行公积金贷',
    institution: '建设银行',
    minRate: 3.45,
    maxRate: 5.6,
    minAmount: 5,
    maxAmount: 50,
    loanTerm: '6-60个月',
    repaymentMethod: '等额本息/先息后本',
    conditions: '公积金连续缴存≥12个月；基数≥3000元；征信无当前逾期',
    status: 'active',
    createdAt: '2026-08-08 14:20:00',
    source: 'image',
  },
  {
    id: 'p003',
    productName: '工商银行融e借',
    institution: '工商银行',
    minRate: 3.6,
    maxRate: 6.0,
    minAmount: 2,
    maxAmount: 80,
    loanTerm: '6-36个月',
    repaymentMethod: '等额本息',
    conditions: '年龄18-60周岁；代发工资客户优先；负债率≤50%',
    status: 'active',
    createdAt: '2026-08-05 10:15:00',
    source: 'pdf',
  },
  {
    id: 'p004',
    productName: '农业银行网捷贷',
    institution: '农业银行',
    minRate: 3.8,
    maxRate: 6.5,
    minAmount: 1,
    maxAmount: 20,
    loanTerm: '12-36个月',
    repaymentMethod: '等额本息',
    conditions: '年龄20-55周岁；月收入≥3000元；征信良好',
    status: 'disabled',
    createdAt: '2026-07-28 16:40:00',
    source: 'text',
  },
  {
    id: 'p005',
    productName: '浦发银行点贷',
    institution: '浦发银行',
    minRate: 5.2,
    maxRate: 9.0,
    minAmount: 1,
    maxAmount: 30,
    loanTerm: '6-36个月',
    repaymentMethod: '等额本息',
    conditions: '年龄22-50周岁；有稳定工作；负债率≤60%',
    status: 'active',
    createdAt: '2026-08-12 11:00:00',
    source: 'voice',
  },
]

// ==================== 客户数据 ====================
export const mockCustomers = [
  {
    id: 'c001',
    name: '张明',
    phone: '138****6688',
    idCard: '310***********1234',
    age: 32,
    gender: '男',
    source: 'friend',
    city: '上海',
    maritalStatus: '已婚',
    education: '本科',
    monthlyIncome: 15000,
    housingFundBase: 3500,
    totalDebt: 80000,
    creditCardUsage: 45,
    queryCount1m: 2,
    queryCount3m: 5,
    queryCount6m: 8,
    maxOverdueMonths: 0,
    propertyValue: 280,
    hasMortgage: false,
    carValue: 15,
    expectedAmount: 20,
    expectedRate: 5.0,
    employer: '上海某科技有限公司',
    position: '产品经理',
    materials: [
      { id: 'm001', type: '身份证', source: 'upload', time: '2026-08-15 10:30', confidence: 0.99 },
      { id: 'm002', type: '银行流水', source: 'upload', time: '2026-08-15 10:32', confidence: 0.95 },
      { id: 'm003', type: '征信报告', source: 'photo', time: '2026-08-15 10:35', confidence: 0.92 },
    ],
    createdAt: '2026-08-15 10:25:00',
    updatedAt: '2026-08-15 11:00:00',
  },
  {
    id: 'c002',
    name: '李芳',
    phone: '139****2233',
    idCard: '420***********5678',
    age: 28,
    gender: '女',
    source: 'online',
    city: '北京',
    maritalStatus: '未婚',
    education: '硕士',
    monthlyIncome: 22000,
    housingFundBase: 5000,
    totalDebt: 30000,
    creditCardUsage: 20,
    queryCount1m: 1,
    queryCount3m: 2,
    queryCount6m: 3,
    maxOverdueMonths: 0,
    propertyValue: 0,
    hasMortgage: false,
    carValue: 0,
    expectedAmount: 15,
    expectedRate: 4.0,
    employer: '北京某互联网公司',
    position: '高级运营',
    materials: [
      { id: 'm004', type: '身份证', source: 'upload', time: '2026-08-14 14:00', confidence: 0.99 },
      { id: 'm005', type: '工资流水', source: 'upload', time: '2026-08-14 14:05', confidence: 0.97 },
    ],
    createdAt: '2026-08-14 13:50:00',
    updatedAt: '2026-08-14 14:30:00',
  },
  {
    id: 'c003',
    name: '王强',
    phone: '136****4455',
    idCard: '510***********9012',
    age: 45,
    gender: '男',
    source: 'walkin',
    city: '成都',
    maritalStatus: '离异',
    education: '大专',
    monthlyIncome: 8000,
    housingFundBase: 1200,
    totalDebt: 150000,
    creditCardUsage: 75,
    queryCount1m: 4,
    queryCount3m: 9,
    queryCount6m: 12,
    maxOverdueMonths: 2,
    propertyValue: 150,
    hasMortgage: true,
    carValue: 8,
    expectedAmount: 10,
    expectedRate: 8.0,
    employer: '成都某制造企业',
    position: '车间主任',
    materials: [
      { id: 'm006', type: '身份证', source: 'photo', time: '2026-08-13 09:00', confidence: 0.98 },
      { id: 'm007', type: '征信报告', source: 'upload', time: '2026-08-13 09:10', confidence: 0.90 },
    ],
    createdAt: '2026-08-13 08:50:00',
    updatedAt: '2026-08-13 09:30:00',
  },
]

// ==================== AI 模拟 ====================

// 模拟 OCR 识别身份证
export async function mockOCRIdCard() {
  await delay(2500)
  return {
    success: true,
    data: {
      name: '张明',
      idNumber: '310115199201011234',
      gender: '男',
      age: 34,
      city: '上海',
      ethnicity: '汉',
      birthDate: '1992-01-01',
      address: '上海市浦东新区张江路100号',
      issueAuthority: '上海市公安局浦东分局',
      validFrom: '2020-01-01',
      validTo: '2040-01-01',
    },
    confidence: 0.99,
    source: '身份证正面+反面',
  }
}

// 模拟 OCR 识别银行流水
export async function mockOCRBankStatement() {
  await delay(3000)
  return {
    success: true,
    data: {
      bank: '招商银行',
      monthlyAvgIncome: 15320,
      monthlyAvgExpense: 8500,
      dailyAvgBalance: 42000,
      period: '近6个月',
      largeTransactions: [
        { date: '2026-07-15', amount: 50000, type: '转入', note: '大额交易' },
        { date: '2026-06-20', amount: 30000, type: '转出', note: '大额交易' },
      ],
      lateNightTransactions: [],
      stability: '良好',
    },
    confidence: 0.95,
    source: '银行流水PDF',
  }
}

// 模拟 OCR 识别征信报告
export async function mockOCRCreditReport() {
  await delay(3500)
  return {
    success: true,
    data: {
      queryCount1m: 2,
      queryCount3m: 5,
      queryCount6m: 8,
      queryCount12m: 15,
      maxOverdueMonths: 0,
      maxOverdueAmount: 0,
      currentOverdue: '无',
      totalDebt: 80000,
      loanBalance: 50000,
      creditCardUsed: 30000,
      creditCardTotal: 60000,
      creditCardUsage: 50,
      guaranteeBalance: 0,
    },
    confidence: 0.92,
    source: '央行征信报告',
  }
}

// 模拟 OCR 识别收入证明/工资流水
export async function mockOCRIncomeProof() {
  await delay(2500)
  return {
    success: true,
    data: {
      employer: '上海某科技有限公司',
      position: '产品经理',
      monthlyIncome: 15320,
      incomeSource: '工资代发',
      companyPhone: '021-88886666',
    },
    confidence: 0.93,
    source: '收入证明',
  }
}

// 模拟 OCR 识别社保公积金
export async function mockOCRSocialSecurity() {
  await delay(2800)
  return {
    success: true,
    data: {
      employer: '上海某科技有限公司',
      housingFundBase: 3500,
      socialSecurityBase: 12000,
      housingFundMonths: 36,
      socialSecurityMonths: 42,
    },
    confidence: 0.91,
    source: '社保公积金截图',
  }
}

// 模拟 OCR 识别房产证
export async function mockOCRProperty() {
  await delay(3000)
  return {
    success: true,
    data: {
      propertyValue: 280,
      propertyArea: 89.5,
      propertyAddress: '上海市浦东新区张江路100号',
      hasMortgage: false,
      mortgageBalance: 0,
    },
    confidence: 0.87,
    source: '房产证',
  }
}

// 模拟 OCR 识别营业执照
export async function mockOCRBusinessLicense() {
  await delay(2600)
  return {
    success: true,
    data: {
      employer: '上海某科技有限公司',
      position: '法定代表人',
      businessType: '有限责任公司',
      registeredCapital: 500,
      establishDate: '2015-03-12',
      businessStatus: '存续',
    },
    confidence: 0.94,
    source: '营业执照',
  }
}

// 模拟 ASR 语音转文字
export async function mockASR(text = null) {
  await delay(2000)
  const defaultText = '张三，男，32岁，在上海某科技公司做产品经理，月收入一万五，公积金基数3500，名下在浦东有套房值280万没有贷款，还有一辆车值15万，征信良好没有逾期，近三个月查询5次，想贷20万'
  return {
    success: true,
    text: text || defaultText,
    duration: 15,
    language: '普通话',
  }
}

// 模拟大模型从语音提取结构化信息
export async function mockLLMExtractVoice(text) {
  await delay(2000)
  return {
    success: true,
    data: {
      name: '张三',
      gender: '男',
      age: 32,
      city: '上海',
      employer: '某科技公司',
      position: '产品经理',
      monthlyIncome: 15000,
      housingFundBase: 3500,
      propertyValue: 280,
      hasMortgage: false,
      carValue: 15,
      creditOverdue: false,
      queryCount3m: 5,
      expectedAmount: 20,
    },
    confidence: 0.88,
    source: '语音口述',
  }
}

// 模拟大模型从客户口述语音中自动识别"资料类型"并结构化提取建档字段
export async function mockVoiceExtractCustomer(text) {
  await delay(2200)
  return {
    success: true,
    transcript: text,
    // 大模型自动识别出的资料类型（一段语音可能包含多类资料信息）
    recognizedTypes: ['客户基本信息', '收入信息'],
    summary: '已自动识别 2 类资料，共提取 10 个字段',
    confidence: 0.9,
    source: '语音口述',
    data: {
      // —— 客户基本信息 ——
      name: { value: '张三', confidence: 0.98 },
      phone: { value: '13812345678', confidence: 0.96 },
      gender: { value: '男', confidence: 0.99 },
      age: { value: 32, confidence: 0.97 },
      city: { value: '上海', confidence: 0.92 },
      occupation: { value: '产品经理', confidence: 0.86 },
      source: { value: 'friend', confidence: 0.82 },
      remark: { value: '朋友介绍，意向信用贷 20 万，重点关注利率和放款速度', confidence: 0.8 },
      // —— 收入信息 ——
      employer: { value: '某科技公司', confidence: 0.88 },
      monthlyIncome: { value: 15000, confidence: 0.9 },
    },
  }
}

// 模拟大模型产品信息提取
export async function mockLLMExtractProduct(rawText) {
  await delay(2500)
  return {
    success: true,
    data: {
      productName: '建设银行公积金贷',
      institution: '建设银行',
      minRate: 3.45,
      maxRate: 5.6,
      minAmount: 5,
      maxAmount: 50,
      loanTerm: '6-60个月',
      repaymentMethod: '等额本息/先息后本',
      conditions: '公积金连续缴存≥12个月；基数≥3000元；征信无当前逾期',
    },
    confidence: 0.90,
  }
}

// 模拟大模型匹配判断
export async function mockLLMMatch(customer, products) {
  await delay(3000)
  const results = {
    approved: [],
    rejected: [],
  }

  for (const product of products) {
    if (product.status !== 'active') continue

    const reasons = []
    const failedConditions = []

    // 模拟准入条件判断
    // 产品1: 招商银行闪电贷
    if (product.id === 'p001') {
      if (customer.age >= 22 && customer.age <= 55) reasons.push('年龄22-55周岁 ✓')
      else failedConditions.push({ condition: '年龄22-55周岁', value: customer.age })
      if (customer.monthlyIncome >= 5000) reasons.push(`月收入${customer.monthlyIncome}元≥5000元 ✓`)
      else failedConditions.push({ condition: '月收入≥5000元', value: customer.monthlyIncome })
      if (customer.queryCount3m <= 6) reasons.push(`近3个月查询${customer.queryCount3m}次≤6次 ✓`)
      else failedConditions.push({ condition: '近3个月查询≤6次', value: customer.queryCount3m, suggestion: `近3个月查询${customer.queryCount3m}次，超过要求6次，建议等待${Math.ceil((customer.queryCount3m - 6) / 2)}个月后再申请` })
    }

    // 产品2: 建设银行公积金贷
    if (product.id === 'p002') {
      if (customer.housingFundBase >= 3000) reasons.push(`公积金基数${customer.housingFundBase}元≥3000元 ✓`)
      else failedConditions.push({ condition: '公积金基数≥3000元', value: customer.housingFundBase, suggestion: '建议补充公积金缴存记录或选择其他产品' })
      if (customer.maxOverdueMonths === 0) reasons.push('征信无当前逾期 ✓')
      else failedConditions.push({ condition: '征信无当前逾期', value: `逾期${customer.maxOverdueMonths}个月`, suggestion: `当前逾期${customer.maxOverdueMonths}个月，建议先结清逾期款项` })
    }

    // 产品3: 工商银行融e借
    if (product.id === 'p003') {
      const debtRatio = customer.totalDebt / (customer.monthlyIncome * 12) * 100
      if (customer.age >= 18 && customer.age <= 60) reasons.push('年龄18-60周岁 ✓')
      else failedConditions.push({ condition: '年龄18-60周岁', value: customer.age })
      if (debtRatio <= 50) reasons.push(`负债率${debtRatio.toFixed(1)}%≤50% ✓`)
      else failedConditions.push({ condition: '负债率≤50%', value: `${debtRatio.toFixed(1)}%`, suggestion: `当前负债率${debtRatio.toFixed(1)}%，建议降低负债到50%以下` })
    }

    // 产品5: 浦发银行点贷
    if (product.id === 'p005') {
      if (customer.age >= 22 && customer.age <= 50) reasons.push('年龄22-50周岁 ✓')
      else failedConditions.push({ condition: '年龄22-50周岁', value: customer.age })
      const debtRatio = customer.totalDebt / (customer.monthlyIncome * 12) * 100
      if (debtRatio <= 60) reasons.push(`负债率${debtRatio.toFixed(1)}%≤60% ✓`)
      else failedConditions.push({ condition: '负债率≤60%', value: `${debtRatio.toFixed(1)}%`, suggestion: `当前负债率${debtRatio.toFixed(1)}%，建议降低负债到60%以下` })
    }

    if (failedConditions.length === 0) {
      results.approved.push({
        productId: product.id,
        productName: product.productName,
        institution: product.institution,
        minRate: product.minRate,
        maxRate: product.maxRate,
        maxAmount: product.maxAmount,
        loanTerm: product.loanTerm,
        reasons: reasons,
      })
    } else {
      results.rejected.push({
        productId: product.id,
        productName: product.productName,
        institution: product.institution,
        failedConditions: failedConditions,
      })
    }
  }

  // 排序：准入产品按利率从低到高，拒贷产品按不满足条件数量从少到多
  results.approved.sort((a, b) => a.minRate - b.minRate)
  results.rejected.sort((a, b) => a.failedConditions.length - b.failedConditions.length)

  return results
}

// ==================== 推演记录 Mock ====================
export const mockSimulations = [
  {
    id: 's001',
    customerId: 'c001',
    createdAt: '2026-08-16 15:30:00',
    adjustments: {
      monthlyIncome: { old: 15000, new: 25000 },
      totalDebt: { old: 80000, new: 50000 },
    },
    matchResult: {
      approved: [
        { productId: 'p002', productName: '建设银行公积金贷', reason: '月收入25000，公积金基数3500≥3000，符合准入' },
        { productId: 'p003', productName: '工商银行融e借', reason: '负债率降低至25%，符合≤50%要求' },
      ],
      rejected: [],
    },
  },
]

// ==================== 日程计划 Mock ====================
// 时间戳辅助：相对今天的天数
const _today = new Date()
const _t = (offset, hh, mm) => {
  const d = new Date(_today)
  d.setDate(d.getDate() + offset)
  d.setHours(hh, mm, 0, 0)
  return d.toISOString()
}

export const mockSchedules = [
  {
    id: 'sch001',
    title: '与张总确认招商闪电贷额度',
    startTime: _t(0, 10, 0),
    endTime: _t(0, 11, 0),
    reminderTime: _t(0, 9, 30),
    priority: 'P0',
    type: 'meeting',
    location: '客户公司·星汇中心 A 座 18F',
    remark: '携带征信报告，重点沟通放款时效',
    customerId: 'c001',
    customerName: '张志远',
    done: false,
    source: 'text',
    createdAt: '2026-08-19 09:00:00',
  },
  {
    id: 'sch002',
    title: '回访建设银行李经理',
    startTime: _t(0, 14, 30),
    endTime: _t(0, 15, 30),
    reminderTime: _t(0, 14, 0),
    priority: 'P1',
    type: 'call',
    location: '电话',
    remark: '确认新一批公积金贷准入门槛调整',
    customerId: null,
    customerName: '',
    done: false,
    source: 'voice',
    createdAt: '2026-08-19 09:15:00',
  },
  {
    id: 'sch003',
    title: '整理本周客户匹配报告',
    startTime: _t(0, 17, 0),
    endTime: _t(0, 18, 0),
    reminderTime: null,
    priority: 'P2',
    type: 'task',
    location: '',
    remark: '汇总 12 个客户的最新匹配结果',
    customerId: null,
    customerName: '',
    done: false,
    source: 'text',
    createdAt: '2026-08-19 09:30:00',
  },
  {
    id: 'sch004',
    title: '提交陈女士贷款材料补充',
    startTime: _t(1, 10, 0),
    endTime: _t(1, 11, 0),
    reminderTime: _t(1, 9, 0),
    priority: 'P0',
    type: 'task',
    location: '线上提交',
    remark: '营业执照、流水、收入证明',
    customerId: 'c002',
    customerName: '陈雪',
    done: false,
    source: 'text',
    createdAt: '2026-08-19 10:00:00',
  },
  {
    id: 'sch005',
    title: '与王先生沟通负债优化方案',
    startTime: _t(2, 15, 0),
    endTime: _t(2, 16, 30),
    reminderTime: _t(2, 14, 30),
    priority: 'P1',
    type: 'meeting',
    location: '咖啡厅·星巴克中山店',
    remark: '推演报告备齐，重点对比前后产品',
    customerId: 'c003',
    customerName: '王浩',
    done: false,
    source: 'text',
    createdAt: '2026-08-19 10:30:00',
  },
  {
    id: 'sch006',
    title: '参加银行产品培训',
    startTime: _t(-2, 14, 0),
    endTime: _t(-2, 16, 0),
    reminderTime: _t(-2, 13, 30),
    priority: 'P2',
    type: 'meeting',
    location: '招行分行 3F 会议室',
    remark: '',
    customerId: null,
    customerName: '',
    done: true,
    source: 'text',
    createdAt: '2026-08-17 10:00:00',
  },
]

// 大模型提取日程字段（语音 / 手写录入共用）
export async function mockLLMExtractSchedule(text) {
  await delay(800)
  // 简单规则抽取
  const lower = text || ''
  const has = (k) => lower.includes(k)

  // 标题：取前 20 字符作为粗略标题
  const title = text ? text.slice(0, 20).replace(/[,。.!！?？;；]/g, '').trim() : ''

  // 时间
  let startTime = new Date()
  startTime.setHours(startTime.getHours() + 1, 0, 0, 0)
  const timeMatch = text && text.match(/(上午|下午|早上|晚上)?\s*(\d{1,2})[点时:：](\d{1,2})?\s*分?/)
  if (timeMatch) {
    let h = parseInt(timeMatch[2])
    if (timeMatch[1] === '下午' || timeMatch[1] === '晚上') h = (h < 12 ? h + 12 : h)
    const m = parseInt(timeMatch[3] || 0)
    const d = new Date()
    d.setHours(h, m, 0, 0)
    if (d < new Date()) d.setDate(d.getDate() + 1)
    startTime = d
  }

  // 优先级
  let priority = 'P1'
  if (has('紧急') || has('马上') || has('立刻') || has('重要')) priority = 'P0'
  if (has('不急') || has('有空') || has('抽空') || has('随便')) priority = 'P2'

  // 类型
  let type = 'task'
  if (has('电话') || has('回电') || has('拨打')) type = 'call'
  if (has('见') || has('面谈') || has('会议') || has('会面')) type = 'meeting'

  // 客户（简单识别）
  let customerName = ''
  const nameMatch = text && text.match(/与([一-龥]{2,4})[见面谈通话]/)
  if (nameMatch) customerName = nameMatch[1]

  return {
    data: {
      title: title || '新日程',
      startTime: startTime.toISOString(),
      endTime: new Date(startTime.getTime() + 60 * 60 * 1000).toISOString(),
      priority,
      type,
      location: has('电话') ? '电话' : (has('公司') ? '客户公司' : ''),
      remark: text,
      customerName,
      source: 'ai',
    },
    confidence: 0.86,
  }
}

// ==================== AI 助理 · 意图识别 Mock ====================
// 纯 NLU 层：只做意图识别与实体提取，不碰 store；由调用方执行实际读写
export async function mockAssistantReply(text) {
  await delay(900 + Math.random() * 600)
  const t = (text || '').trim()
  const has = (...kws) => kws.some((k) => t.includes(k))

  // ---------- 实体提取 ----------
  const phoneMatch = t.match(/1[3-9]\d{9}/)
  const rateMatch = t.match(/(\d+(?:\.\d+)?)\s*%/)
  const amountMatch = t.match(/(\d+(?:\.\d+)?)\s*(万|k|K|千|元)/)
  // 姓名：『客户XX』『叫XX』『XX的』
  let name = ''
  const n1 = t.match(/客户[\s:：]*([\u4e00-\u9fa5]{2,4})/)
  const n2 = t.match(/(?:叫|姓名是?|联系)([\u4e00-\u9fa5]{2,4})/)
  const n3 = t.match(/([\u4e00-\u9fa5]{2,4})的/)
  if (n1) name = n1[1]
  else if (n2) name = n2[1]
  else if (n3) name = n3[1]
  // 金额归一化为元
  let amount = 0
  if (amountMatch) {
    const v = parseFloat(amountMatch[1])
    const unit = amountMatch[2]
    amount = unit === '万' ? v * 10000 : unit === '元' ? v : v * 1000
  }

  // ---------- 意图：日程创建 ----------
  if (has('日程', '提醒我', '安排', '约了', '见面', '面谈', '回访') && has('新建', '创建', '添加', '安排', '提醒', '明天', '后天', '下午', '上午', '晚上')) {
    const ai = await mockLLMExtractSchedule(t)
    return {
      intent: 'schedule_create',
      entities: { ...ai.data, rawText: t },
      reply: '好的，我已为你解析出以下日程安排，请确认：',
    }
  }

  // ---------- 意图：资料更新 ----------
  if (has('更新', '修改', '改成') && has('资料', '档案', '月收入', '收入', '负债', '公积金', '收入', '房产', '职业', '单位')) {
    const fieldMap = [
      { kws: ['月收入', '月均收入', '收入'], key: 'monthlyIncome', label: '月均收入' },
      { kws: ['负债', '欠款'], key: 'totalDebt', label: '总负债' },
      { kws: ['公积金基数', '公积金'], key: 'housingFundBase', label: '公积金基数' },
      { kws: ['房产价值', '房产'], key: 'propertyValue', label: '房产价值(万)' },
      { kws: ['工作单位', '单位', '雇主'], key: 'employer', label: '工作单位' },
      { kws: ['职业', '职位'], key: 'occupation', label: '职业' },
    ]
    const field = fieldMap.find((f) => has(...f.kws))
    if (field) {
      // 房产价值单位是万，其他金额是元
      const value = field.key === 'propertyValue' && amountMatch ? parseFloat(amountMatch[1]) : amount || (n2 ? t.slice(t.indexOf(n2[1]) + n2[1].length).trim() : '')
      return {
        intent: 'customer_update',
        entities: { name, phone: phoneMatch?.[0] || '', field: field.key, fieldLabel: field.label, value, rawText: t },
        reply: name
          ? `收到，准备更新客户「${name}」的${field.label}，请确认：`
          : `收到，准备更新客户档案的${field.label}。请告诉我客户姓名，或从下面选择：`,
      }
    }
  }

  // ---------- 意图：客户新增 ----------
  if (has('新增客户', '新建客户', '添加客户', '录入客户', '客户建档')) {
    return {
      intent: 'customer_create',
      entities: { name, phone: phoneMatch?.[0] || '', rawText: t },
      reply: phoneMatch
        ? `好的，已识别客户信息，将创建档案：`
        : '好的，请提供客户姓名和手机号，例如："新增客户 张三 13800138000"',
    }
  }
  // "新增客户张三 13800001111" 简写形态
  if (has('新增', '新建', '添加') && phoneMatch && name) {
    return {
      intent: 'customer_create',
      entities: { name, phone: phoneMatch[0], rawText: t },
      reply: '好的，已识别客户信息，将创建档案：',
    }
  }

  // ---------- 意图：产品录入/更新 ----------
  if (has('录入产品', '新增产品', '添加产品', '上新产品')) {
    return {
      intent: 'product_create',
      entities: {
        productName: (t.match(/(?:产品|录入)[:：\s]*([\u4e00-\u9fa5A-Za-z0-9]{2,15}贷)/) || [])[1] || '',
        institution: (t.match(/([\u4e00-\u9fa5]{2,6})(?:银行|金融|消费金融)/) || [])[0] || '',
        minRate: rateMatch ? parseFloat(rateMatch[1]) : '',
        maxAmount: amountMatch ? parseFloat(amountMatch[1]) : '',
        rawText: t,
      },
      reply: '已解析产品信息，将录入产品库，请确认：',
    }
  }
  if (has('更新产品', '修改产品') && rateMatch) {
    return {
      intent: 'product_update',
      entities: { rate: parseFloat(rateMatch[1]), rawText: t },
      reply: '收到，将更新产品利率信息，请确认：',
    }
  }

  // ---------- 意图：查询 ----------
  // 日程查询
  if (has('日程') && has('什么', '哪些', '几', '安排', '明天', '今天', '查看', '看看')) {
    return {
      intent: 'query_schedule',
      entities: { scope: has('明天') ? 'tomorrow' : has('今天') ? 'today' : 'upcoming' },
      reply: '',
    }
  }
  // 客户查询
  if (has('查', '搜索', '找', '看看', '档案', '资料') && (name || phoneMatch) && !has('更新', '修改')) {
    return {
      intent: 'query_customer',
      entities: { name, phone: phoneMatch?.[0] || '' },
      reply: '',
    }
  }
  // 产品查询
  if (has('产品') && has('哪些', '什么', '多少', '列表', '利率', '额度')) {
    return {
      intent: 'query_product',
      entities: {},
      reply: '',
    }
  }
  // 匹配建议
  if (has('匹配', '推荐') && name) {
    return {
      intent: 'query_match',
      entities: { name },
      reply: '',
    }
  }

  // ---------- 兜底 ----------
  return {
    intent: 'unknown',
    entities: {},
    reply: '我可以帮你完成这些事：\n· 客户：新增客户 张三 13800138000\n· 资料：更新张三的月收入为2万\n· 产品：录入产品 招行闪电贷 利率3.5%起\n· 日程：明天下午3点与张总面谈\n· 查询：张三的档案 / 明天有什么日程 / 有哪些产品',
  }
}
