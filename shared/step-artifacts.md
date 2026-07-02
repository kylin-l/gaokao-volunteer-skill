# 分步产出物（Step Artifacts）

> 推荐 A、评估 B **每一步必须落盘一份产出**，供断点续做、Agent 交接、人工复核。  
> 与 [agent-handoff.md](agent-handoff.md)、[templates/step-manifest.md](templates/step-manifest.md) 配合。

---

## 一、落盘位置

```
outputs/{case-id}/
├── manifest.md                 # 总索引（每步状态、路径、更新时间）
├── 00-scenario.md              # A Step 0 / B 场景
├── 01-intake.md                # A Step 1
├── …
├── 10-preflight-check.md       # A Step 10
├── handoff-to-evaluation.md    # A 结束 → 评估（Step 10 通过后生成）
└── （评估 B 另见下文 eval-* 文件）
```

### case-id 命名

`{省拼音}-{年份}-{物理|历史}-{位次}`  
示例：`shanxi-2026-physics-7201`

缺位次时用 `score{分数}` 占位，P0 补齐后重命名目录。

### 写到哪里

| 优先级 | 路径 | 说明 |
|--------|------|------|
| 1 | 用户项目根 `outputs/{case-id}/` | 默认 |
| 2 | skill 仓库旁 `gaokao-volunteer-skills/outputs/{case-id}/` | 无独立项目时 |
| 3 | 仅对话输出 | **须**注明「应保存为 `outputs/...`」并给出完整 Markdown |

**每步完成时**：更新 `manifest.md` 对应行（状态 ✅ / 待补 / 跳过及原因）。

---

## 二、模式 A · 推荐（Step 0–10）

| Step | 产出文件 | 必含内容 | 阻断下一 step |
|------|----------|----------|---------------|
| **0** | `00-scenario.md` | 模式 A/B/C…、决策赛道、特殊身份结论 | 未识别模式 |
| **1** | `01-intake.md` | P0 表、分省勾选、guided-discovery Q&A 日志（一次一题追加）、输入自洽 | P0 缺 |
| **2** | `02-policy.md` | 当年批次线/政策要点、来源 URL+年份 | — |
| **3** | `03-data-query.md` | 位次锚点、近 3 年位次表、计划调整备注、data-check 缺口 | 缺位次且无核实路径 |
| **4** | `04-direction-panorama.md` | **全分册域**方向全景 ✅/⚠️/❌；统考门槛结论 | 未扫全 |
| **5** | `05-narrowing.md` | 逐题收窄 Q&A 日志；考生**感兴趣/排除**标记 | 未标记 |
| **6** | `06-adi.md` | **全部**标记方向的 ADI 深评；2026 新增筛查 | ADI ❌ 主力未处理 |
| **7** | `07-structure.md` | 冲稳保分配、结构门禁核对、偏差率表 | 结构阻断项 |
| **8** | `08-candidates.md` | 推荐卡片 + [candidate-matrix](templates/candidate-matrix.md) | — |
| **9** | `09-report-draft.md` | 完整推荐报告草稿（交付物一～八） | — |
| **10** | `10-preflight-check.md` | [交付前检查记录](anti-hallucination.md) + 结论 | ❌ 阻断交付 |
| **交接** | `handoff-to-evaluation.md` | 见 [agent-handoff.md](agent-handoff.md)；**索引各步文件路径** | 用户要评估时 |

### 增量写入（Step 1、5）

`01-intake.md` / `05-narrowing.md` 采用 **追加** 而非重写：

```markdown
### [时间] Q：……
**答**：……
**影响**：排除 / 收窄 / 待全景
```

---

## 三、模式 B · 评估（Step 0–7）

评估可**新建** `outputs/{case-id}/` 或**接续**推荐同一目录。

| Step | 产出文件 | 必含内容 |
|------|----------|----------|
| **0** | `eval-00-intake.md` | P0、志愿表原文、输入自洽 |
| **1** | `eval-01-rules.md` | 章程/选科/体检核对 |
| **2** | `eval-02-rank.md` | 位次匹配、冲稳保复核、计划调整 |
| **3** | `eval-03-structure.md` | structure-sanity 结果、结构问题清单 |
| **4** | `eval-04-adi.md` | 各专业 ADI + 社会现实 |
| **5** | `eval-05-rating.md` | 加权评级、修改建议 |
| **6** | `eval-06-decision.md` | 继续评估 / 切推荐；D/F 时 **handoff-to-recommendation.md** |
| **7** | `eval-07-preflight.md` | 交付前检查记录 + 评估报告定稿 |

最终评估报告可合并为 `evaluation-report.md`，或在 `eval-07` 中附全文。

---

## 四、manifest.md（总索引）

每步完成后更新。模板见 [templates/step-manifest.md](templates/step-manifest.md)。

交接时评估 Agent **先读 manifest**，再按索引加载必要文件，**禁止**重读整段对话。

---

## 五、与完整报告的关系

| 产物 | 用途 |
|------|------|
| `04`～`08` 等分步文件 | 细粒度交接、断点续做 |
| `09-report-draft.md` | 给用户看的完整推荐方案 |
| `handoff-to-evaluation.md` | 给评估 Agent 的**入口**（摘要 + manifest 指针） |

完整报告**可**由分步文件汇编生成；分步文件是**源**，报告是**视图**。

---

## 六、禁止

- ❌ 完成某 Step 却无对应产出文件（或对话替代但未注明保存路径）
- ❌ 交接时只贴聊天摘要、不指向 `outputs/{case-id}/`
- ❌ 评估 Agent 要求用户重讲 P0 / 方向全景（应读 `01` `04` `05` `06`）
