# 评估工作流

> 由入口 skill 在**模式 B** 下加载。用户已有志愿表时使用。

## 前置

- P0：省份、**高考年份**、科类/选科、位次、批次、**志愿表**
- 缺 P0 → 暂停；无志愿表 → 切 [recommendation.md](recommendation.md)
- 采集规范：[shared/intake-8d.md](../shared/intake-8d.md)

## 流程

```
Step 0  intake-8d + data-query 查真实位次/批次线 + **输入自洽**
Step 1  规则合规（national-policy-quickref + 招生章程）；**体检按需** → 见下节
Step 2  位次匹配 + 冲稳保（rank-adjustment，含计划调整 + **层级↔位次对齐**）
Step 3  **[structure-sanity-check.md](../shared/structure-sanity-check.md) 结构梯度 + 退档/滑档风险**
Step 4  社会现实 + ADI 四维（adi-assessment + social-reality-guide + career-prospects-6d + **new-major-guide** 若含 2026目录新增）
Step 5  按 weight-framework 加权评级 + 起草报告（risk-notes 模板）
Step 6  评级 D/F 或 ADI ❌ 过多 → 切 recommendation，终止本流程
Step 7  anti-hallucination 自检 + **结构合理性复检** + **输出「交付前检查记录」** → 更新 `manifest.md` → 定稿 `evaluation-report.md` → **对话内输出评估总结果 + 报告文件路径**
```

**每步必落盘**：见 [shared/step-artifacts.md](../shared/step-artifacts.md)。与推荐共用 `outputs/{case-id}/` 时，评估产出为 `eval-*.md`。

## 分步产出一览（模式 B）

| Step | 产出文件 |
|------|----------|
| 0 | `eval-00-intake.md` |
| 1 | `eval-01-rules.md` |
| 2 | `eval-02-rank.md` |
| 3 | `eval-03-structure.md` |
| 4 | `eval-04-adi.md` |
| 5 | `eval-05-rating.md` |
| 6 | `eval-06-decision.md`（D/F → `handoff-to-recommendation.md`） |
| 7 | `eval-07-preflight.md` + `evaluation-report.md` |

**评估入口**：读 [agent-handoff.md](../shared/agent-handoff.md) 中 `handoff-to-evaluation.md` 文件列表，**勿**重读推荐对话。

**A/B 顺序说明**：本流程 Step3 结构先于 Step4 ADI，与推荐 Step5 ADI → Step6 结构**语义等价**。Step3 发现保垫/退档问题后，Step4 若 ADI ❌ 须回到「七、结构问题」一并修订；严重时可 D 级切 [recommendation.md](recommendation.md)。

## Step 4：社会现实 + ADI 校验（必做）

对志愿表中**每个不同专业方向**做 ADI 四维（[adi-assessment.md](../shared/adi-assessment.md)）：

| 校验项 | 无数据时的动作 |
|--------|----------------|
| ADI 四维 A/D/I/R | 见 adi-assessment 问卷；任一 =1 → 建议替换 |
| 核心 4 门课 | 查培养方案（支撑 A 维度） |
| 中位数毕业生去向 | 查就业质量报告 |
| 工作一天 | 引用 social-reality-guide |
| 2030 趋势 | 🟢/🟡/🔴 |
| 与排斥项/家庭冲突 | 建议替换 |
| **2026目录新增**（《目录（2026年）》38 专业 / 首招 / 超常布局） | [new-major-guide.md](../shared/new-major-guide.md)：须标 `2026目录新增` |

禁止只写「就业一般」。**2026目录新增**须写清**路径 B 替代**与**无位次风险**，不得因「名字新」给高评级。

## Step 1：体检信息（按需）

非常规必做项。按 [intake-8d.md](../shared/intake-8d.md)「体检信息（按需补充）」：

| 情况 | 动作 |
|------|------|
| 志愿含军警/医学/航海/飞行/消防/公安/化学师范等，或用户提及视力色觉身高 | 加载 [physical-exam-majors.md](../shared/physical-exam-majors.md)；缺结论 → 报告标「待核验」 |
| 普通专业、无体检相关信号 | 不追问；报告脚注提醒填报前核对体检表与章程 |

## Step 3：结构合理性（必过）

加载 [structure-sanity-check.md](../shared/structure-sanity-check.md)。重点：

| 检查 | 写入报告位置 |
|------|--------------|
| 保垫、梯度、全冲全保 | 七、结构问题与优化 |
| 层级↔位次逐项复核 | 四、志愿逐项分析 |
| 调剂退档、大类分流 | 风险摘要 + 四 |
| 2026 探索占稳保 | 七点五 + 七 |
| 预算/考公目标不一致 | 三、方案评级表扣分项 |

多项不通过 → 录取安全维度重扣，可能 D 级。

## 评级

按 [weight-framework.md](../shared/weight-framework.md) 评估权重计算。摘要：

| 总分感 | 评级 | 动作 |
|--------|------|------|
| ≥85 | A | 微调即可 |
| 70–84 | B | 改 2–3 处 |
| 55–69 | C | 重构部分志愿 |
| <55 | D | 建议重生成 |
| 规则 ❌ | F | 先修正硬性冲突 |

## 报告模板

```markdown
# 高考志愿评估报告

## 一、基本信息
## 二、总体结论（评级 A/B/C/D/F）
## 三、方案评级表（按 weight-framework 各维度）
| 规则合规 | 录取安全 | 专业匹配(ADI) | 社会现实 | 院校层次 | 地域 | 综合 |

## 四、志愿逐项分析
| 序号 | 院校-专业 | 层级 | 位次 | ADI | 风险 | 建议 |
## 五、ADI 逐项评估（A/D/I/R + 综合判定）
## 六、社会现实提示（你以为 vs 实际上 + 实例 + 2030）
## 七、结构问题与优化（必须修改 / 建议优化）
## 七点五、2026 目录新增专节（志愿表含 2026目录新增/首招时必填）

| 专业 | 2026新增 | 招生核验 | 母体学科 | 路径 B | 志愿层级 | 风险 |
|------|----------|----------|----------|--------|----------|------|
| | ✅/需核验 | 强/中/弱 | | 冲/稳/保/探索 | 无位次/首招/… |

须对照 [new-major-guide.md](../shared/new-major-guide.md)：无往年位次占稳/保 → **结构问题**；缺路径 B → 建议补充。格式参考 [examples.md](../examples.md) 实例 6–7。

## 八、下一步清单
## 九、待核实 / 免责声明
## 十、交付前检查记录（必含，见 anti-hallucination）
```

## 白话规则（对认知不足考生）

| 他们以为 | 用实例纠正 |
|----------|-----------|
| 专业名=职业 | 工商管理≠经理 |
| 好学校=好就业 | 看城市+专业 |
| 热门=适合我 | 计算机/数学弱要说明 |
| 医生律师最体面 | 长学制/规培成本 |

## 特殊场景

| 场景 | 加载 | 对话实例 |
|------|------|----------|
| 艺术/体育 | [special-admissions.md](../shared/special-admissions.md) + 对应 social-reality 分册 | [examples.md](../examples.md) **实例 8–9** |
| 军警/专项/中外合作/定向 | special-admissions + 体检按需 | **实例 12–13** |
| 压线生 | [supplemental-batches.md](supplemental-batches.md) | **实例 10** |
| 考公导向 | weight-framework 考公赛道 | **实例 11** |
| 专业+院校省份（浙鲁等） | [province-volunteer-checklist.md](../shared/province-volunteer-checklist.md) | **实例 14** |
| 大类招生 | 章程分流规则置顶 | **实例 15** |
| A/B 方案对比 | 增对比章节 | — |

## 谨慎交付

- Step 6 触发 → 不进入 Step 7，改走 recommendation
- Step 7 自检、**结构检查**或**检查记录含 ❌ 阻断项** → **不得**输出含具体校名的最终报告
- Step 7 通过后 → **对话内必输出**：评级结论摘要 + `evaluation-report.md` **完整路径**（格式同 recommendation Step 10 总结果块）
- 规则合规 ❌ → 评级 **F**，优先列必须修改项
- 数据缺口多 → 降级为「待查清单 + 方向建议」，不给精确冲稳保序号
