---
slug: gaokao-volunteer-er
displayName: 高考志愿 · 评估与推荐
version: 1.3.2
summary: >-
  高考志愿填报统一入口：评估志愿表、冲稳保推荐、引导式专业发现、ADI 四维匹配与社会现实对照。
description: >-
  高考志愿填报统一入口：评估已有志愿表、从零生成冲稳保推荐、引导式专业发现、
  社会现实对照与6维职业解读。自动识别用户意图并路由。Use when 高考志愿、志愿填报、
  报志愿、选专业、冲稳保、志愿评估、志愿表审核、不知道填什么、多少分能上、
  推荐学校、专业干什么、就业怎么样、新专业、2026目录新增、具身智能、低空经济、目录新增专业、
  艺术生、体育生、军校、警校、强基、综评、专项计划、中外合作、体检受限、专科、征集志愿。
tags:
  - gaokao
  - 高考
  - 高考志愿
  - 志愿填报
  - 志愿评估
  - 志愿推荐
  - 冲稳保
  - 选专业
  - 选校
  - 位次匹配
  - 平行志愿
  - 专业选择
  - 职业规划
  - 就业指导
  - 退档风险
  - 院校专业组
  - ADI
  - cursor-skill
  - agent-skill
license: MIT
homepage: https://github.com/kylin-l/gaokao-volunteer-skills
name: gaokao-volunteer-er
---

# 高考志愿填报

统一入口 skill。根据用户意图自动选择**推荐**或**评估**工作流，共用 `shared/` 资源。

**核心原则**：位次优先、规则先行、用实例代替空话、看中位数不看神话、不做录取承诺。

**谨慎原则**：信息不全则暂停；数据标注来源与年份；ADI ❌ 默认不推荐；用户坚持须书面确认；不替用户提交志愿系统。

---

## Step 0：意图路由（每次对话先做）


| 信号                           | 模式       | 加载工作流                                                            |
| ---------------------------- | -------- | ---------------------------------------------------------------- |
| 提供了志愿表 / 「帮我看看志愿表」/ 「有没有坑」   | **B 评估** | [workflows/evaluation.md](workflows/evaluation.md)               |
| 「不知道填什么」/ 「帮我推荐」/ 只有分数位次无志愿表 | **A 推荐** | [workflows/recommendation.md](workflows/recommendation.md)       |
| 「专业干什么」/ 「就业怎么样」/ 概念问答       | **C 科普** | [social-reality-guide.md](shared/social-reality-guide.md) + [social-reality/](shared/social-reality/README.md) |
| 艺术/体育统考、军校警校、强基综评、专项、中外合作 | **E 特殊** | [shared/special-admissions.md](shared/special-admissions.md) → 再 A/B |
| 压线、专科、滑档、征集志愿                     | **F 专科** | [workflows/supplemental-batches.md](workflows/supplemental-batches.md) |
| 仅查批次线/位次                     | **D 查数** | [shared/data-query.md](shared/data-query.md)                     |
| 推荐完成后要审核                     | **B 评估** | 对刚生成的方案走 evaluation                                              |


**不确定时**问一句：

> 你是已有志愿表想让我检查，还是还没有方案需要我从零推荐？

**全流程闭环**：A 推荐 → 用户确认 → B 评估终审 → 修改后可选再 A。

---

## 社会认知引导（A/B 共用）

以下情况在推荐/评估中**必须**引用通俗实例，不可只列专业名：

- 「不知道填什么 / 都行 / 听父母的」
- 说不清专业学什么、毕业去哪
- 选专业只因「名字好听 / 听说赚钱 / 短视频种草」
- 点名 **2026目录新增、风口专业**（具身智能、低空经济、脑机接口等）
- 家长与学生目标冲突

资源：[guided-discovery.md](shared/guided-discovery.md) · [social-reality/](shared/social-reality/README.md) · [special-admissions.md](shared/special-admissions.md) · [new-major-guide.md](shared/new-major-guide.md) · [examples.md](examples.md)（15 例）

---

## 信息收集（共用）


| 优先级 | 信息项                     |
| --- | ----------------------- |
| P0  | 省份、**高考年份**、科类/选科、位次、批次 |
| P0+ | 志愿表（仅模式 B）              |
| P1  | 调剂意愿、批次规则               |
| P2  | 排斥项、家庭学费、就业地域           |
| P3  | 喜好、发展诉求（就业/考研/考公）       |


详见 [shared/intake-8d.md](shared/intake-8d.md)。**特殊身份**（第 8 项）→ 先 [special-admissions.md](shared/special-admissions.md)。  
专业方向筛查：[adi-assessment.md](shared/adi-assessment.md) · 权重：[weight-framework.md](shared/weight-framework.md) · 分省规则：[province-volunteer-checklist.md](shared/province-volunteer-checklist.md)

---

## 位次与冲稳保（摘要）


| 层级  | 位次关系（位次数字越小排名越靠前）       |
| --- | ----------------------- |
| 冲   | 目标校录取位次低于考生 0–15%（校更难）  |
| 稳   | 与考生位次偏差 ±5%             |
| 保   | 目标校录取位次高于考生 10–30%（校更易） |
| 垫   | 高于考生 >30%               |


详情与计划调整：[shared/rank-adjustment.md](shared/rank-adjustment.md)

---

## 硬边界（所有模式）

输出前必读 [shared/anti-hallucination.md](shared/anti-hallucination.md)：

- 缺位次 → 不给具体校名（模式 A/B）
- 禁止「稳上」「录取概率 XX%」
- 数据标注来源与年份
- 不替用户提交官方系统

---

## 资源索引


| 路径                                                         | 内容                     |
| ---------------------------------------------------------- | ---------------------- |
| [workflows/recommendation.md](workflows/recommendation.md) | 推荐 9 步流程               |
| [workflows/evaluation.md](workflows/evaluation.md)         | 评估 8 步流程（Step 0–7）     |
| [shared/](shared/README.md)                                | 共享 reference（数据/职业/模板） |
| [shared/weight-framework.md](shared/weight-framework.md)   | 评估/推荐/ADI 权重           |
| [shared/adi-assessment.md](shared/adi-assessment.md)       | ADI 四维问卷               |
| [shared/social-reality-guide.md](shared/social-reality-guide.md) | 社会现实总入口 |
| [shared/social-reality/](shared/social-reality/README.md) | 专业白话分册（14 册） |
| [shared/special-admissions.md](shared/special-admissions.md) | 特殊招生类型 |
| [shared/physical-exam-majors.md](shared/physical-exam-majors.md) | 体检受限对照 |
| [shared/province-volunteer-checklist.md](shared/province-volunteer-checklist.md) | 分省志愿差异 |
| [workflows/supplemental-batches.md](workflows/supplemental-batches.md) | 专科批与征集 |
| [shared/new-major-guide.md](shared/new-major-guide.md)   | **2026** 目录新增专业五步筛查 |
| [examples.md](examples.md)                                 | 15 个完整对话实例 |
| [reference.md](reference.md)                               | 规则术语                   |


---

## 特殊类型


| 类型    | 处理                     |
| ----- | ---------------------- |
| 艺术/体育 | [special-admissions.md](shared/special-admissions.md)；双过线；综合分/术科 |
| 军警/fire | 体检政审；[physical-exam-majors.md](shared/physical-exam-majors.md) |
| 强基/综评/专项 | 资格与锁档；见 special-admissions |
| 定向/公费 | 服务期与违约；ADI-R 不合规不推荐 |
| 中外合作  | 标注学费；家庭 medium 以下默认不推荐 |
| 压线/专科 | [supplemental-batches.md](workflows/supplemental-batches.md) |
| 2026目录新增/首招 | [new-major-guide.md](shared/new-major-guide.md)；卡片标 `2026目录新增` |
| 提前批   | 只推真正愿意去的；说明录取后普通批作废    |
| 仅查数据  | 只输出 data-check，不给报考建议  |


---

## 表达规范

- 说人话，先结论后解释
- 每个建议带依据（位次 / 排斥项 / 就业报告 / 行业周期）
- 性别仅在有公开供需或制度数据时使用
- 方向包和评估报告必须含**同分数段真人路径实例**