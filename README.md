# 高考志愿 Skill 包

**统一入口**：[`SKILL.md`](SKILL.md)（`gaokao-volunteer`）

一个 skill 自动路由到推荐或评估工作流。输出前须过 [shared/anti-hallucination.md](shared/anti-hallucination.md) 自检。

## 目录结构

```
gaokao-volunteer/
├── SKILL.md                      ← 唯一 Cursor 入口（路由 + 原则）
├── workflows/
│   ├── recommendation.md         ← 模式 A：从零生成方案
│   └── evaluation.md             ← 模式 B：审计志愿表
├── shared/
│   ├── intake-8d.md              ← 8 维信息采集
│   ├── guided-discovery.md       ← 引导式专业发现
│   ├── adi-assessment.md         ← ADI 四维专业匹配
│   ├── weight-framework.md       ← 评估/推荐权重框架
│   ├── social-reality-guide.md   ← 社会现实通俗对照
│   ├── career-prospects-6d.md    ← 专业 6 维职业
│   ├── rank-adjustment.md        ← 位次与计划调整
│   ├── data-query.md             ← 数据查询流程
│   ├── anti-hallucination.md     ← 反幻觉与谨慎规范
│   ├── templates/                ← 报告模板
│   └── data/official-source-index.json
├── examples.md                   ← 6 个完整实例
└── reference.md                  ← 术语与冲稳保换算
```

## 路由规则

| 用户意图 | 工作流 |
|----------|--------|
| 有志愿表 / 要检查 | evaluation |
| 无方案 / 要推荐 | recommendation |
| 推荐完要审核 | recommendation → evaluation |
| 问概念 / 查数据 | social-reality-guide / data-query |

## 核心流程

```
intake-8d → guided-discovery（迷茫型）→ ADI 筛查 → 权重排序/评级 → 交付
                                              ↓
                                    anti-hallucination 自检
```

## 谨慎要求（摘要）

- P0（省份/年份/位次/科类）不全 → 暂停，不给具体校名
- 位次/薪资/就业须标注来源、年份，用「约/参考/区间」
- ADI ❌ 默认不推荐；用户坚持须书面确认
- 冲/稳/保/垫为研究分层，非录取承诺

详见 [shared/README.md](shared/README.md) 完整索引。
