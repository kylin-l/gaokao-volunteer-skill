# Changelog

本文件供 SkillHub 发布时读取变更说明（`npm run publish` 自动带上 `--changelog`）。

## 1.4.5

- **发版包**：保留 `outputs/README.md`；案例子目录仍排除（`prepare-publish` 白名单）
- **gitignore**：`outputs/**` 明确忽略案例目录

## 1.4.4

- **隐私**：`outputs/` 加入 `.gitignore`；SkillHub 发布包排除案例产出目录
- 修复 v1.4.3 误将考生案例目录打入发布包的问题

## 1.4.3

- **对话交付**：Step 10（推荐）/ Step 7（评估）须在对话内输出**总结果摘要** + **FINAL/报告完整路径**
- `anti-hallucination` 检查表新增第 10 项；`agent-handoff` / `step-artifacts` 同步

## 1.4.2

- **单文件用户交付**：`FINAL-志愿方案.md` 合并全表 + 填报步骤；`09` 降为过程稿
- 新增 `shared/templates/final-deliverable.md`

## 1.4.1

- **45 志愿全表模板**：新增 `shared/templates/volunteer-full-table.md`（校专综评四段 · 推荐依据 · 前景）
- **前景专题模板**：新增 `shared/templates/major-outlook.md`（发展·就业·AI + 45 条速查）
- **Step 9 交付**：`step-artifacts.md` / `recommendation.md` 明确 `10-volunteer-full-table` + `11-major-outlook` 落盘要求
- **manifest**：`step-manifest.md` 增加 9+ 全表与前景两行

## 1.4.0

- **方向全景**：引导发现改为先扫全、再逐题收窄，不设方向个数上限
- **分步落盘**：新增 `shared/step-artifacts.md` 与 `outputs/{case-id}/` 分步产出规范
- **十步推荐流程**：`workflows/recommendation.md` 对齐 Step 0–10 落盘清单
- **交接增强**：`shared/agent-handoff.md` 支持「交接」触发词、读档 `outputs/` 与交接提示词
- **评估流程**：`workflows/evaluation.md` 补充分步产出要求

## 1.3.5

- 添加 Markdown 相对链接校验脚本，接入 validate 发布前检查

## 1.3.4

- 加固流程加载集、检查记录与 C/D/E/F 辅模式

## 1.0.0

- 首次发布
