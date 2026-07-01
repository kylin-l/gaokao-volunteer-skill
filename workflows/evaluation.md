# 评估工作流

> 由入口 skill 在**模式 B** 下加载。用户已有志愿表时使用。

## 前置

- P0：省份、**高考年份**、科类/选科、位次、批次、**志愿表**
- 缺 P0 → 暂停；无志愿表 → 切 [recommendation.md](recommendation.md)
- 采集规范：[shared/intake-8d.md](../shared/intake-8d.md)

## 流程

```
Step 0  intake-8d + data-query 查真实位次/批次线
Step 1  规则合规（national-policy-quickref + 招生章程）
Step 2  位次匹配 + 冲稳保（rank-adjustment，含计划调整）
Step 3  结构梯度 + 退档/滑档风险
Step 4  社会现实 + ADI 四维（adi-assessment + social-reality-guide + career-prospects-6d）
Step 5  按 weight-framework 加权评级 + 起草报告（risk-notes 模板）
Step 6  评级 D/F 或 ADI ❌ 过多 → 切 recommendation，终止本流程
Step 7  anti-hallucination 自检（通过后方可交付）
```

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

禁止只写「就业一般」。

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
## 八、下一步清单
## 九、待核实 / 免责声明
```

## 白话规则（对认知不足考生）

| 他们以为 | 用实例纠正 |
|----------|-----------|
| 专业名=职业 | 工商管理≠经理 |
| 好学校=好就业 | 看城市+专业 |
| 热门=适合我 | 计算机/数学弱要说明 |
| 医生律师最体面 | 长学制/规培成本 |

## 特殊场景

- 压线生：强化保垫 + 征集志愿；评估权重见 weight-framework「压线生」
- 艺术/体育：双过线后再评估
- A/B 方案对比：增对比章节

## 谨慎交付

- Step 6 触发 → 不进入 Step 7，改走 recommendation
- Step 7 自检未通过 → **不得**输出含具体校名的最终报告
- 规则合规 ❌ → 评级 **F**，优先列必须修改项
- 数据缺口多 → 降级为「待查清单 + 方向建议」，不给精确冲稳保序号
