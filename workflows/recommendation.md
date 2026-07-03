# 推荐工作流

> 由入口 skill 在**模式 A** 下加载。从零生成冲稳保方案时使用。  
> **先**完成 [SKILL.md](../SKILL.md) §「使用前：更新 skill」，**再**读本文件。

## 前置

- P0：省份、**高考年份**、位次、科类/选科、批次（缺则暂停）
- 认知不足 → 必做 [shared/guided-discovery.md](../shared/guided-discovery.md)
- 采集：[shared/intake-8d.md](../shared/intake-8d.md)

## 十步流程

```
Step 0  场景识别 → 决策赛道；**特殊身份** → [special-admissions.md](../shared/special-admissions.md)
Step 1  intake-8d + guided-discovery；**分省规则** → [province-volunteer-checklist.md](../shared/province-volunteer-checklist.md)；**体检按需**（见 intake-8d，非默认追问）
Step 2  政策检索（national-policy-quickref + WebSearch）
Step 3  data-query → **全量 2025→报考年预测底表**（见 [rank-adjustment.md](../shared/rank-adjustment.md)）+ 计划调整 + **输入自洽**
Step 4  **方向全景**（guided-discovery Step④；分册域扫全；**不设方向个数上限**）
Step 5  **逐题收窄**（guided-discovery Step⑤；一次一题；**禁止固定 N 个截断**）→ 考生标记感兴趣/排除
Step 6  对**全部**标记项 **ADI 深评** + 专业过滤 + **2026目录新增五步筛查**（[new-major-guide.md](../shared/new-major-guide.md)）
Step 7  **按 Step 3 底表分池** → 意愿排序 → 冲稳保内部分配 + **[structure-sanity-check.md](../shared/structure-sanity-check.md) 结构门禁**（同组重复=阻断）
Step 8  推荐卡片 + [candidate-matrix.md](../shared/templates/candidate-matrix.md)（层级须与位次偏差率一致）
Step 9  过程稿 `09-report-draft.md` + **用户最终方案** `FINAL-志愿方案.md`（[final-deliverable.md](../shared/templates/final-deliverable.md)）+ 可选 `11-major-outlook.md`
Step 10 anti-hallucination 自检 + **结构合理性复检** + **输出「交付前检查记录」** → 更新 `manifest.md` → **对话内输出总结果摘要 + FINAL 文件路径** → 生成 `handoff-to-evaluation.md`（用户要评估时）
```

**每步必落盘**：见 [shared/step-artifacts.md](../shared/step-artifacts.md)。Step 完成即写入 `outputs/{case-id}/` 并更新 `manifest.md`。

## 分步产出一览

| Step | 产出文件 |
|------|----------|
| 0 | `00-scenario.md` |
| 1 | `01-intake.md`（Q&A 增量追加） |
| 2 | `02-policy.md` |
| 3 | `03-data-query.md` |
| 4 | `04-direction-panorama.md` |
| 5 | `05-narrowing.md`（Q&A 增量追加） |
| 6 | `06-adi.md` |
| 7 | `07-structure.md` |
| 8 | `08-candidates.md` |
| 9 | `09-report-draft.md` |
| 10 | `10-preflight-check.md` |
| 交接 | `handoff-to-evaluation.md` + **对话内交接提示词** |

## 决策赛道

详见 [weight-framework.md](../shared/weight-framework.md) 第一节。摘要：

| 场景 | 城市:专业:院校:安全 |
|------|---------------------|
| 默认 | 35:30:20:15 |
| 目标明确 | 15:35:20:30 |
| 压线生 | 20:25:15:**40** | 并行 [supplemental-batches.md](supplemental-batches.md)；**实例 10** |
| 医学 | 20:**45**:25:10 |
| 考公 | 20:25:**40**:15 | 见 [examples.md](../examples.md) **实例 11** |
| 迷茫型 | 先 guided-discovery **全景 → 逐题收窄 → 标记 → ADI**；暂不按权重排序 |
| 家庭敏感 | 25:25:15:35（另须过滤中外合作/高学费金融） |

## 方向全景（Step 4 必做，不设个数上限）

加载 [guided-discovery.md](../shared/guided-discovery.md) Step ④ 生成规则。交付须含四层汇总表：

| 层级 | 含义 |
|------|------|
| ✅ 首推 | 与 Q1/Q3、选科、排斥项高度一致 |
| ⚠️ 可考虑 / 保底 | 有代价或家长备选，须标注 |
| ❌ 明确不推荐 | 排斥项、硬门槛、无统考等 |

**禁止**：仅输出少量模板方向；未扫全分册域即进入冲稳保；**禁止固定 N 个截断**。

## 逐题收窄（Step 5 必做）

加载 [guided-discovery.md](../shared/guided-discovery.md) Step ⑤。全景后仍**一次一题**（一天快照、域对比、家庭分歧等），直到考生能标记感兴趣/排除。**不得**跳过收窄直接排志愿。

## 单条方向条目模板（全景中每条 ✅/⚠️ 使用）

```markdown
### [方向名称] · [✅/⚠️/❌]

**干什么**：……
**同分数段实例**：
> 化名，[省][科类]位次 X，[校+专业] → [城市][岗位]，N 年约 X–Y k/月
**一天快照**：……
**ADI 粗评**：A_/D_/I_/R_ → ✅/🟡/⚠️/❌
**主要代价**：……
**状态说明**：可报 / 需统考 / 排斥项冲突 / …
```

## 2026 目录新增专业推荐项（Step 6 必查）

涉及 **《本科专业目录（2026年）》新增**、首招、超常布局专业时，加载 [new-major-guide.md](../shared/new-major-guide.md)：

1. **目录 + 省计划 + 章程**三重核验，无位次不得标稳/保
2. **母体学科**评分（强/中/弱），弱则改推传统对口专业
3. **ADI 加严**：无就业报告 → D≤2；战略 AI 类本科默认 D≤3
4. **双路径**：每个 2026 新增**方向条目**须含「路径 A：2026目录新增 + 路径 B：稳妥替代」
5. 推荐卡片须带 **`2026目录新增`** 标签（见 new-major-guide 第四节）

**默认**：本科优先路径 B；2026 新增专业作冲/探索；详见 [examples.md](../examples.md) 实例 6–7。

## 冲稳保占比（45 志愿省参考）

| 层级 | 占比 | 数量 |
|------|------|------|
| 冲 | 20–30% | 8–12 |
| 稳 | 40–50% | 18–22 |
| 保 | 25–30% | 10–14 |
| 垫 | — | 2–3 个 |

原则：最想去的放前；默认建议服从调剂；保垫位次低于考生。

## 结构合理性门禁（Step 7 必过）

加载 [structure-sanity-check.md](../shared/structure-sanity-check.md)，至少核对：

1. **Step 3 全量底表** 已出；FINAL 每行预测与底表一致
2. **同组不重复**（院校专业组省）→ 重复则**阻断**
3. **保+垫充足**（压线生保+垫 ≥50%）
4. **调剂**：不服从 + 组内跨度大 → risk-notes 标退档
5. **2026 探索**：首招无位次不得占稳/保主力
6. **方向一致**：矩阵主力与 Step 4–6 标记方向对齐

不通过 → 回到 Step 7 调整，或降级为 data-check + 方向建议。

## 推荐卡片

```markdown
🏫 [学校] [标签]
📍 [城市] | 🎯 冲/稳/保/垫 | 近3年位次 ~XXXX
**理由**：……
**专业**：选科 ✅/⚠️/❌ | 6维一行 | 2030 🟢/🟡/🔴
**近三年位次** | 年 | 位次 | 走势 |
**注意**：大类分流/校区/学费/调剂
**退路**：转专业/考研/考公
```

## 交付物结构

### 用户最终交付（Step 9 必出）

| 文件 | 内容 |
|------|------|
| **`FINAL-志愿方案.md`** | **给用户的一页式方案**：三句话 + 完整志愿表 + 填报步骤 + 前景速读 |
| `09-report-draft.md` | 过程稿：推荐卡、详细评级（链向 FINAL，**不重复全表**） |
| `11-major-outlook.md` | 前景展开（可选） |

模板：[final-deliverable.md](../shared/templates/final-deliverable.md)

### 过程稿结构（`09-report-draft.md`，可选深读）

```markdown
# 高考志愿推荐方案
## 一、考生画像
## 二、方向全景 + 逐题收窄记录 + 考生标记 + ADI 深评 + 社会现实确认
## 三、冲稳保总览（摘要；完整全表见 FINAL-志愿方案.md）
## 四、推荐卡片
## 五、候选矩阵
## 六、结构说明
## 七、填报 checklist
## 八、风险摘要
## 八点五、2026 目录新增专节（含 2026 新增/首招：双路径、母体学科、招生核验、层级限制）
## 九、免责声明
## 十、交付前检查记录（必含，见 anti-hallucination）
## 十一、分步产出索引（见 outputs/{case-id}/manifest.md）
## 十二、Agent 交接包（见 outputs/{case-id}/handoff-to-evaluation.md）
## 十三、建议：提交 evaluation 工作流终审
```

### 45 志愿全表列结构（`FINAL-志愿方案.md` · **缺列阻断交付**）

模板：[final-deliverable.md](../shared/templates/final-deliverable.md) · 字段细则：[volunteer-full-table.md](../shared/templates/volunteer-full-table.md)

**录入列 → 解读列**（共 **10 列**，45 行每行须齐）：

| 序 | 院校名称·专业组 | 组内专业 1→6 | 调剂 | 注意 | 2026预测 | **位次偏差** | **推荐依据** | **校专综评** | **前景** |
|----|----------------|--------------|------|------|----------|-------------|-------------|-------------|----------|

- **位次偏差** = (2026预测 − 考生位次) / 考生位次；与 `03-data-query.md` 底表一致  
- **校专综评**四段：`字母｜校:…｜专:…｜业:…｜匹:…`  
- **前景**：`发展·就业·AI`，如 `增量·极强·🟡`  
- **禁止**：重生成/变体方案时删列「省篇幅」；过程稿 `09` 可不贴全表，**FINAL 必须全列**

**硬规范**：院校全称；推荐依据独立列（勿并入校专综评）；同校不同组分行；组线≠专业线须 `†` 脚注。

## 特殊类型

| 类型 | 处理 |
|------|------|
| 艺术/体育/军警/专项/中外/定向 | [special-admissions.md](../shared/special-admissions.md)；实例 **8–9、12–13** |
| 提前批 | 只推真正愿意去的；说明录取后普通批作废 |
| 2026目录新增/首招 | [new-major-guide.md](../shared/new-major-guide.md)；卡片标 `2026目录新增`；实例 **6–7** |
| 压线/专科/征集 | [supplemental-batches.md](supplemental-batches.md)；实例 **10** |
| 浙江/山东等专业+院校省 | [province-volunteer-checklist.md](../shared/province-volunteer-checklist.md)；实例 **14** |
| 大类招生 | 章程分流规则置顶；实例 **15** |
| 仅查数据 | 只输出 [data-check.md](../shared/templates/data-check.md)，不给报考建议 |

## 硬边界

必读 [shared/anti-hallucination.md](../shared/anti-hallucination.md)。

## Step 10 · 对话内总结果输出（必做）

Step 10 落盘完成后，**必须在当轮对话末尾**输出以下两块（不得仅在文件中写完而不告知用户）：

### 1. 总结果摘要

先结论、后细节；**不重复贴** 45 行全表（全表只在 `FINAL-志愿方案.md`）。

```markdown
## 志愿填报方案 · 总结果

**考生**：{省} {年} {科类} {分}/{位次} · {选科}

### 三句话

1. **主轨**：…
2. **备轨**：…
3. **铁律**：…（勿混组 / 服从调剂 / 关键核对项）

### 分层一览

| 层级 | 序号 | 代表院校 |
|------|------|----------|
| 冲 | … | … |
| 稳 | … | … |
| 保 | … | … |
| 垫 | … | … |

**交付前检查**：✅ 通过 / ❌ 未通过（未通过则不得列具体校名）

**下一步**：按 FINAL 序 1→N 录入省系统；**录入前建议先做志愿评估（见下方引导）**。
```

### 3. 下一步引导（FINAL 生成后必附）

`FINAL-志愿方案.md` 落盘且交付前检查 ✅ 后，在总结果与文件路径**之后**固定附上本段（引导用户交接，**不要**在同会话自动切模式 B）：

```markdown
---

### 接下来你可以

1. **打开最终方案** — 按表中序 1→N 在省系统录入（先存草稿，勿急于提交）
2. **志愿评估（推荐）** — 回复 **「交接」** 或 **「帮我审核志愿表」**，我会生成交接包；你**新开对话**粘贴提示词即可做模式 B 终审（查退档坑、组线、ADI、结构）
3. **自己先填** — 填完草稿后，把省系统导出或对照 FINAL，再发 **「审核」** 亦可

> 正式提交前务必核对当年招生计划与招生章程；本方案位次为预测估算，非录取承诺。
```

用户已说 **「交接」** 时 → 写入 `handoff-to-evaluation.md`、更新 `manifest.md`，并输出 [agent-handoff.md](../shared/agent-handoff.md) 的**完整交接提示词**（替代仅本段的简短引导）。

### 2. 文件路径（必含）

须给出**可点击的完整路径**（工作区绝对路径或 `outputs/{case-id}/` 相对路径二选一，优先绝对路径）：

```markdown
### 文件路径

| 用途 | 路径 |
|------|------|
| **最终方案（填报用）** | `{workspace}/outputs/{case-id}/FINAL-志愿方案.md` |
| 过程稿（推荐卡/深读） | `…/09-report-draft.md` |
| 前景展开（可选） | `…/11-major-outlook.md` |
| 案例索引 | `…/manifest.md` |
```

**禁止**：只写「已保存到 outputs」而不给出 `FINAL-志愿方案.md` 的完整路径；禁止对话摘要与 FINAL 全表结构不一致。

**禁止**：生成 FINAL 后仅给文件路径、**不附**「下一步引导」；用户未说「交接」时**不**自动生成 `handoff-to-evaluation.md`（仅口头引导即可）。

## 谨慎交付

- Step 10 自检、**结构门禁**或**检查记录含 ❌ 阻断项** → **不得**交付含具体校名的方案
- ADI ❌ 专业默认不进冲/稳/保主力；用户坚持须书面确认
- 缺位次 → 只输出 data-check，不给候选矩阵
