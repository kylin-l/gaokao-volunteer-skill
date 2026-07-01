# 推荐工作流

> 由入口 skill 在**模式 A** 下加载。从零生成冲稳保方案时使用。

## 前置

- P0：省份、**高考年份**、位次、科类/选科、批次（缺则暂停）
- 认知不足 → 必做 [shared/guided-discovery.md](../shared/guided-discovery.md)
- 采集：[shared/intake-8d.md](../shared/intake-8d.md)

## 九步流程

```
Step 0  场景识别 → 决策赛道（见 [weight-framework.md](../shared/weight-framework.md)）
Step 1  intake-8d + guided-discovery
Step 2  政策检索（national-policy-quickref + WebSearch）
Step 3  data-query → 可行集 + rank-adjustment 计划调整
Step 4  2–3 个方向包 + social-reality 确认
Step 5  用户选定 → ADI 筛查（adi-assessment）+ 专业过滤（career-prospects-6d）
Step 6  按赛道权重排序 → 冲稳保分配
Step 7  推荐卡片 + [candidate-matrix.md](../shared/templates/candidate-matrix.md)
Step 8  起草交付物 + family-brief + risk-notes
Step 9  anti-hallucination 自检（通过后方可交付）→ 建议走 evaluation 终审
```

## 决策赛道

详见 [weight-framework.md](../shared/weight-framework.md) 第一节。摘要：

| 场景 | 城市:专业:院校:安全 |
|------|---------------------|
| 默认 | 35:30:20:15 |
| 目标明确 | 15:35:20:30 |
| 压线生 | 20:25:15:**40** |
| 医学 | 20:**45**:25:10 |
| 考公 | 20:25:**40**:15 |
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

## 冲稳保占比（45 志愿省参考）

| 层级 | 占比 | 数量 |
|------|------|------|
| 冲 | 20–30% | 8–12 |
| 稳 | 40–50% | 18–22 |
| 保 | 25–30% | 10–14 |
| 垫 | — | 2–3 个 |

原则：最想去的放前；默认建议服从调剂；保垫位次低于考生。

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
## 九、免责声明
## 十、建议：提交 evaluation 工作流终审
```

## 特殊类型

| 类型 | 处理 |
|------|------|
| 艺术/体育 | 双过线后再推荐，文化位次单独算 |
| 提前批 | 只推真正愿意去的；说明录取后普通批作废 |
| 中外合作 | 标注学费；家庭 medium 以下默认不推荐 |
| 定向/公费 | 标注服务期与违约成本 |
| 仅查数据 | 只输出 [data-check.md](../shared/templates/data-check.md)，不给报考建议 |

## 硬边界

必读 [shared/anti-hallucination.md](../shared/anti-hallucination.md)。

## 谨慎交付

- Step 9 自检未通过 → **不得**交付含具体校名的方案
- ADI ❌ 专业默认不进冲/稳/保主力；用户坚持须书面确认
- 缺位次 → 只输出 data-check，不给候选矩阵
