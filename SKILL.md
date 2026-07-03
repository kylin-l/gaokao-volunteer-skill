---
slug: gaokao-volunteer-er
displayName: 高考志愿 · 评估与推荐
version: 1.4.7
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

**方向呈现原则（迷茫型 / 模式 A Step 4–5）**：

1. **先扫全**：按 [social-reality/](shared/social-reality/README.md) 分册输出**方向全景**（✅/⚠️/❌），**不设方向个数上限**。
2. **再逐题收窄**：全景之后仍用**一次一题**（生活快照、排斥确认、域对比、家庭分歧）缩小范围，**不得**用固定个数（如 2/3/5 个）截断选项。
3. **再标记 + ADI**：考生明确标记感兴趣/排除后，对**全部**标记项做 ADI 深评（仍不限个数）。
4. **最后志愿**：冲稳保矩阵可混合多个专业类；「1 主 + 备」仅描述**志愿表权重**，不是方向选择个数上限。

不得套用「物理类默认三件套」等模板。详见 [guided-discovery.md](shared/guided-discovery.md)。

**分步产出（交接）**：推荐/评估**每一步**写入 `outputs/{case-id}/` 对应文件，并更新 `manifest.md`。规范见 [step-artifacts.md](shared/step-artifacts.md)；Agent 交接见 [agent-handoff.md](shared/agent-handoff.md)。

---

## 使用前：更新 skill（先于 Step 0，可跳过）

读 frontmatter `version`（当前 **1.4.5**），**一句话**提醒用户；说「继续」则直接进入 Step 0。

- **默认**：给出 `skillhub upgrade gaokao-volunteer-er --dir <skills-dir>`（重装用 `install --force`）；路径不明先问用户或 `skillhub list`
- **用户说「帮我更新」**：确认后在 Shell 代执行；成功后建议新开对话
- **Git 开发仓**：`git pull`（确认后可代执行）

> 当前版本 **{version}**。要更新请执行上述命令，或回复「帮我更新」/「继续」。

**禁止**：未确认擅自升级；硬编码安装路径；`--scope user`（已废弃）。

---

## Step 0：意图路由（每次对话先做）


| 信号                           | 模式       | 加载工作流                                                         |
| ---------------------------- | -------- | ------------------------------------------------------------- |
| 提供了志愿表 / 「帮我看看志愿表」/ 「有没有坑」   | **B 评估** | [workflows/evaluation.md](workflows/evaluation.md)            |
| 「不知道填什么」/ 「帮我推荐」/ 只有分数位次无志愿表 | **A 推荐** | [workflows/recommendation.md](workflows/recommendation.md)    |
| 「专业干什么」/ 「就业怎么样」/ 概念问答       | **C 科普** | [workflows/modes-cdef.md](workflows/modes-cdef.md) §C         |
| 艺术/体育统考、军校警校、强基综评、专项、中外合作    | **E 特殊** | [workflows/modes-cdef.md](workflows/modes-cdef.md) §E → 再 A/B |
| 压线、专科、滑档、征集志愿                | **F 专科** | [workflows/modes-cdef.md](workflows/modes-cdef.md) §F         |
| 仅查批次线/位次                     | **D 查数** | [workflows/modes-cdef.md](workflows/modes-cdef.md) §D         |
| 推荐完成后要审核 / **交接** / 看看有没有坑   | **B 评估** | 生成交接包 + **交接提示词** → 新会话 evaluation                            |


**不确定时**问一句：

> 你是已有志愿表想让我检查，还是还没有方案需要我从零推荐？

**全流程闭环**：A 推荐 → 用户确认 → B 评估终审 → 修改后可选再 A。

---

## 每模式最小加载集（防漏读）

本轮对话**只加载**下表「必加载」；「按需」仅在触发信号为真时加载。**不要**一次读完整个 `shared/`。


| 模式       | 必加载                                                                                                                                                       | 按需加载                                                           |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **A 推荐** | `recommendation.md` · `step-artifacts.md` · `intake-8d.md` · `anti-hallucination.md` · `structure-sanity-check.md`                                        | `guided-discovery`（迷茫）· `agent-handoff`（Step10 后）· …           |
| **B 评估** | `evaluation.md` · `step-artifacts.md` · `agent-handoff.md` · `intake-8d.md` · `structure-sanity-check.md` · `anti-hallucination.md` · `adi-assessment.md` | 读 `outputs/{case-id}/handoff-to-evaluation.md` · …             |
| **C 科普** | `modes-cdef.md` §C · `social-reality-guide.md` · **1 个** social-reality 分册                                                                                | `career-prospects-6d`（名称陷阱）· `new-major-guide`（2026）           |
| **D 查数** | `modes-cdef.md` §D · `data-query.md` · `templates/data-check.md`                                                                                          | `official-sources.md`                                          |
| **E 特殊** | `modes-cdef.md` §E · `special-admissions.md`                                                                                                              | `physical-exam-majors` · 对应 social-reality 分册 → 再加载 A 或 B 必加载集 |
| **F 专科** | `modes-cdef.md` §F · `supplemental-batches.md`                                                                                                            | 压线并联时 + A 必加载集 · `structure-sanity-check`                      |


---

## A / B 步骤对照（顺序等价说明）

推荐先 **ADI 定专业**，再 **结构排冲稳保**；评估先 **结构找退档坑**，再 **ADI 审专业**。语义等价，勿跳过任一侧。


| 阶段    | A 推荐                                        | B 评估                               |
| ----- | ------------------------------------------- | ---------------------------------- |
| 采集    | Step 0–1 intake + 分省                        | Step 0 intake + 查数                 |
| 规则/数据 | Step 2–3 政策 + data-query + 输入自洽             | Step 1–2 章程 + 位次 + 层级对齐            |
| 结构    | Step **7** structure-sanity（排完冲稳保后）         | Step **3** structure-sanity（先看表结构） |
| 专业    | Step **4–6** 全景 → 逐题收窄 → 标记 → ADI + 2026 筛查 | Step **4** ADI + 社会现实              |
| 交付    | Step 8–9 矩阵 + FINAL + **对话总结果/路径**          | Step 5 评级报告 + **对话总结果/路径**         |
| 门禁    | Step **10** 自检 + **检查记录**                   | Step 6–7 终止判断 + **检查记录**           |


**评估注意**：Step3 结构问题与 Step4 ADI ❌ 叠加时，报告「七、结构问题」与「建议替换」须同时写清；必要时评级 D → 切 A。

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


| 路径                                                                                   | 内容                                 |
| ------------------------------------------------------------------------------------ | ---------------------------------- |
| [workflows/modes-cdef.md](workflows/modes-cdef.md)                                   | 辅模式 C/D/E/F 三步流程                   |
| [workflows/recommendation.md](workflows/recommendation.md)                           | 推荐 10 步流程                          |
| [workflows/evaluation.md](workflows/evaluation.md)                                   | 评估 8 步流程（Step 0–7）                 |
| [shared/](shared/README.md)                                                          | 共享 reference（数据/职业/模板）             |
| [shared/weight-framework.md](shared/weight-framework.md)                             | 评估/推荐/ADI 权重                       |
| [shared/adi-assessment.md](shared/adi-assessment.md)                                 | ADI 四维问卷                           |
| [shared/social-reality-guide.md](shared/social-reality-guide.md)                     | 社会现实总入口                            |
| [shared/social-reality/](shared/social-reality/README.md)                            | 专业白话分册（14 册）                       |
| [shared/special-admissions.md](shared/special-admissions.md)                         | 特殊招生类型                             |
| [shared/physical-exam-majors.md](shared/physical-exam-majors.md)                     | 体检受限对照                             |
| [shared/province-volunteer-checklist.md](shared/province-volunteer-checklist.md)     | 分省志愿差异                             |
| [workflows/supplemental-batches.md](workflows/supplemental-batches.md)               | 专科批与征集                             |
| [shared/new-major-guide.md](shared/new-major-guide.md)                               | **2026** 目录新增专业五步筛查                |
| [shared/structure-sanity-check.md](shared/structure-sanity-check.md)                 | 志愿结构合理性检查                          |
| [shared/anti-hallucination.md](shared/anti-hallucination.md)                         | 反幻觉与交付自检                           |
| [shared/step-artifacts.md](shared/step-artifacts.md)                                 | **分步产出物**与 `outputs/{case-id}/` 规范 |
| [shared/agent-handoff.md](shared/agent-handoff.md)                                   | Agent 交接（读文件，不读长对话）                |
| [outputs/README.md](outputs/README.md)                                               | 案例产出目录说明                           |
| [shared/templates/volunteer-full-table.md](shared/templates/volunteer-full-table.md) | **45 志愿全字段表**模板                    |
| [shared/templates/major-outlook.md](shared/templates/major-outlook.md)               | 发展·就业·AI 前景专题模板                    |
| [reference.md](reference.md)                                                         | 规则术语                               |


---

## 特殊类型


| 类型          | 处理                                                               |
| ----------- | ---------------------------------------------------------------- |
| 艺术/体育       | [special-admissions.md](shared/special-admissions.md)；双过线；综合分/术科 |
| 军警/fire     | 体检政审；[physical-exam-majors.md](shared/physical-exam-majors.md)   |
| 强基/综评/专项    | 资格与锁档；见 special-admissions                                       |
| 定向/公费       | 服务期与违约；ADI-R 不合规不推荐                                              |
| 中外合作        | 标注学费；家庭 medium 以下默认不推荐                                           |
| 压线/专科       | [supplemental-batches.md](workflows/supplemental-batches.md)     |
| 2026目录新增/首招 | [new-major-guide.md](shared/new-major-guide.md)；卡片标 `2026目录新增`   |
| 提前批         | 只推真正愿意去的；说明录取后普通批作废                                              |
| 仅查数据        | 只输出 data-check，不给报考建议                                            |


---

## 表达规范

- 说人话，先结论后解释
- 每个建议带依据（位次 / 排斥项 / 就业报告 / 行业周期）
- 性别仅在有公开供需或制度数据时使用
- 方向全景 / 方向条目 / 评估报告必须含**同分数段真人路径实例**（全景中每条 ✅/⚠️ 至少一行实例或「待查就业报告」）
- 模式 A/B 交付物**必须含「交付前检查记录」**（见 [anti-hallucination.md](shared/anti-hallucination.md)）
- 模式 A、**院校专业组省**：Step 9 产出 `**FINAL-志愿方案.md`**；Step 10 **对话内必输出**总结果摘要 + 文件完整路径 + **下一步引导**（提示用户回复「交接」做评估）；见 [recommendation.md](workflows/recommendation.md)

