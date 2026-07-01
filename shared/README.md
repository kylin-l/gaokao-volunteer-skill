# 共享资源索引

`gaokao-volunteer` 统一入口 skill 的 evaluation 与 recommendation 工作流共用本目录。

## 文件说明

| 文件 | 用途 |
|------|------|
| `intake-8d.md` | 8 维信息采集 |
| `guided-discovery.md` | 引导式专业发现 |
| `social-reality-guide.md` | 社会现实通俗对照 |
| `career-prospects-6d.md` | 专业 6 维职业评估 |
| `adi-assessment.md` | ADI 四维专业匹配（乘法模型） |
| `weight-framework.md` | 评估/推荐/ADI 权重框架 |
| `rank-adjustment.md` | 位次匹配与计划调整 |
| `national-policy-quickref.md` | 全国志愿模式速查 |
| `data-query.md` | 真实数据查询流程 |
| `official-sources.md` | 官方信息源优先级 |
| `anti-hallucination.md` | 反幻觉与表达规范 |
| `data/official-source-index.json` | 省考试院 URL 索引 |
| `templates/*` | 报告与交付模板 |

## 使用顺序

```
信息收集 → intake-8d.md
查真实数据 → data-query.md + official-sources.md
位次匹配 → rank-adjustment.md + ../reference.md
专业/就业解读 → career-prospects-6d.md + social-reality-guide.md
专业去留 → adi-assessment.md
权重与评级 → weight-framework.md
输出报告 → templates/* + anti-hallucination.md（交付前必过）
```

## 模板目录

- [templates/candidate-matrix.md](templates/candidate-matrix.md) — 候选矩阵
- [templates/data-check.md](templates/data-check.md) — 数据口径核验
- [templates/family-brief.md](templates/family-brief.md) — 家庭决策摘要
- [templates/risk-notes.md](templates/risk-notes.md) — 风险与待核验项
