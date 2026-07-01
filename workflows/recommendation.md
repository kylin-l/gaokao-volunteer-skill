# 推荐工作流

> 由入口 skill 在**模式 A** 下加载。从零生成冲稳保方案时使用。

## 前置

- P0：省份、**高考年份**、位次、科类/选科、批次（缺则暂停）
- 认知不足 → 必做 [shared/guided-discovery.md](../shared/guided-discovery.md)
- 采集：[shared/intake-8d.md](../shared/intake-8d.md)

## 九步流程

```
Step 0  场景识别 → 决策赛道；**特殊身份** → [special-admissions.md](../shared/special-admissions.md)
Step 1  intake-8d + guided-discovery；**分省规则** → [province-volunteer-checklist.md](../shared/province-volunteer-checklist.md)；**体检按需**（见 intake-8d，非默认追问）
Step 2  政策检索（national-policy-quickref + WebSearch）
Step 3  data-query → 可行集 + rank-adjustment 计划调整 + **输入自洽**（intake-8d）
Step 4  2–3 个方向包 + social-reality 确认
Step 5  用户选定 → ADI 筛查 + 专业过滤 + **2026目录新增专业五步筛查**（[new-major-guide.md](../shared/new-major-guide.md)）
Step 6  按赛道权重排序 → 冲稳保分配 + **[structure-sanity-check.md](../shared/structure-sanity-check.md) 结构门禁**
Step 7  推荐卡片 + [candidate-matrix.md](../shared/templates/candidate-matrix.md)（层级须与位次偏差率一致）
Step 8  起草交付物 + family-brief + risk-notes
Step 9  anti-hallucination 自检 + **结构合理性复检** + **输出「交付前检查记录」**（通过后方可交付）→ 建议走 evaluation 终审
```

## 决策赛道

详见 [weight-framework.md](../shared/weight-framework.md) 第一节。摘要：

| 场景 | 城市:专业:院校:安全 |
|------|---------------------|
| 默认 | 35:30:20:15 |
| 目标明确 | 15:35:20:30 |
| 压线生 | 20:25:15:**40** | 并行 [supplemental-batches.md](supplemental-batches.md)；**实例 10** |
| 医学 | 20:**45**:25:10 |
| 考公 | 20:25:**40**:15 | 见 [examples.md](../examples.md) **实例 11** |
| 迷茫型 | 先 guided-discovery + ADI，暂不按权重排序 |
| 家庭敏感 | 25:25:15:35（另须过滤中外合作/高学费金融） |

## 方向包模板（必填实例）

```markdown
### 方向包 A：[名称]

**同分数段实例**：
> 化名，[省][科类]位次 X，[校+专业] → [城市][岗位]，N 年约 X–Y k/月

**一天快照**：……
**ADI 摘要**：A_/D_/I_/R_ → 综合判定 ✅/🟡/⚠️/❌
**6维摘要**：……
**主要代价**：……
**不适合如果**：……
```

## 2026 目录新增专业推荐项（Step 5 必查）

涉及 **《本科专业目录（2026年）》新增**、首招、超常布局专业时，加载 [new-major-guide.md](../shared/new-major-guide.md)：

1. **目录 + 省计划 + 章程**三重核验，无位次不得标稳/保
2. **母体学科**评分（强/中/弱），弱则改推传统对口专业
3. **ADI 加严**：无就业报告 → D≤2；战略 AI 类本科默认 D≤3
4. **双路径**：每个 2026 新增方向包须含「路径 A：2026目录新增 + 路径 B：稳妥替代」
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

## 结构合理性门禁（Step 6 必过）

加载 [structure-sanity-check.md](../shared/structure-sanity-check.md)，至少核对：

1. **保+垫充足**（压线生保+垫 ≥50%）
2. **层级↔位次**：每条志愿算偏差率，禁止名稳实冲
3. **调剂**：不服从 + 组内跨度大 → risk-notes 标退档
4. **2026 探索**：首招无位次不得占稳/保
5. **方向包一致**：矩阵主力与 Step4 选定方向对齐

不通过 → 回到 Step 6 调整，或降级为 data-check + 方向建议。

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

```markdown
# 高考志愿推荐方案
## 一、考生画像
## 二、方向包 + ADI 确认 + 社会现实确认
## 三、冲稳保总览
## 四、推荐卡片
## 五、候选矩阵
## 六、结构说明
## 七、填报 checklist
## 八、风险摘要
## 八点五、2026 目录新增专节（含 2026 新增/首招：双路径、母体学科、招生核验、层级限制）
## 九、免责声明
## 十、交付前检查记录（必含，见 anti-hallucination）
## 十一、建议：提交 evaluation 工作流终审
```

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

## 谨慎交付

- Step 9 自检、**结构门禁**或**检查记录含 ❌ 阻断项** → **不得**交付含具体校名的方案
- ADI ❌ 专业默认不进冲/稳/保主力；用户坚持须书面确认
- 缺位次 → 只输出 data-check，不给候选矩阵
