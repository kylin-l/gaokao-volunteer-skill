# 共享资源索引

`gaokao-volunteer` 统一入口 skill 的 evaluation 与 recommendation 工作流共用本目录。

## 文件说明

| 文件 | 用途 |
|------|------|
| `intake-8d.md` | 8 维信息采集 |
| `guided-discovery.md` | 引导式专业发现 |
| `social-reality-guide.md` | 社会现实总入口 |
| `social-reality/` | 专业分册（14 册，100+ 方向） |
| `special-admissions.md` | 艺术/体育/军警/强基/专项/定向/中外合作 |
| `physical-exam-majors.md` | 体检与专业受限对照 |
| `province-volunteer-checklist.md` | 分省志愿差异检查清单 |
| `career-prospects-6d.md` | 专业 6 维职业评估 |
| `adi-assessment.md` | ADI 四维专业匹配 |
| `weight-framework.md` | 评估/推荐/ADI 权重 |
| `rank-adjustment.md` | 位次匹配与计划调整 |
| `national-policy-quickref.md` | 全国志愿模式速查 |
| `data-query.md` | 真实数据查询流程 |
| `official-sources.md` | 官方信息源优先级 |
| `new-major-guide.md` | **2026** 目录新增专业：五步筛查、八大赛道、双路径 |
| `anti-hallucination.md` | 反幻觉与表达规范 |
| `data/official-source-index.json` | 省考试院 URL 索引 |
| `templates/*` | 报告与交付模板 |
| `../workflows/supplemental-batches.md` | 专科批与征集志愿 |

## 使用顺序

```
信息收集 → intake-8d.md
特殊身份？ → special-admissions.md + physical-exam-majors.md
分省规则 → province-volunteer-checklist.md
查真实数据 → data-query.md + official-sources.md
位次匹配 → rank-adjustment.md + ../reference.md
专业/就业 → career-prospects-6d.md + social-reality/* 分册
新专业 → new-major-guide.md（**2026目录**）+ social-reality/new-majors-2026.md
专业去留 → adi-assessment.md
权重评级 → weight-framework.md
压线/专科 → workflows/supplemental-batches.md
输出 → templates/* + anti-hallucination.md
```

## 模板目录

- [templates/candidate-matrix.md](templates/candidate-matrix.md)
- [templates/data-check.md](templates/data-check.md)
- [templates/family-brief.md](templates/family-brief.md)
- [templates/risk-notes.md](templates/risk-notes.md)
