# Agent 交接包（推荐 ↔ 评估）

> **每一步产出落盘** → 交接时**读文件索引**，不依赖长对话上下文。  
> 产出规范：[step-artifacts.md](step-artifacts.md) · 索引模板：[templates/step-manifest.md](templates/step-manifest.md)

---

## 核心：交接 = 读 `outputs/{case-id}/`

| 角色 | 入口文件 | 动作 |
|------|----------|------|
| 推荐 Agent 结束 | `handoff-to-evaluation.md` | 评估新会话**先读此文件 + manifest** |
| 评估 Agent 结束（D/F） | `handoff-to-recommendation.md` | 推荐新会话从 manifest 标明的 Step 续做 |
| 人工 / 断点续做 | `manifest.md` | 看哪步 ✅，从下一 Step 继续 |

**禁止**：交接时只贴聊天摘要、不指向 `outputs/{case-id}/` 分步文件。

---

## 何时生成交接文件

### 触发信号（用户或 Agent 均可）

用户说出以下任一表述 → **立即执行交接**（写文件 + 输出交接提示词）：

| 用户说法 | 动作 |
|----------|------|
| **交接** / 执行交接 / 生成交接包 | → 评估：`handoff-to-evaluation.md` + 提示词 |
| **审核** / 看看有没有坑 / 评估一下志愿表 | 同上（默认 → 模式 B） |
| **回流** / 重新推荐 / 评估不通过 | → 推荐：`handoff-to-recommendation.md` + 回流提示词 |

未指定 case-id 时：用当前对话已建立的 `outputs/{case-id}/`，或按 P0 自动命名并告知用户。

| 场景 | 触发 | 产出 |
|------|------|------|
| 推荐 **Step 10** ✅，用户要「审核/有没有坑」 | 推荐 Agent | ① 写入 `handoff-to-evaluation.md` ② **对话内给出交接提示词**（见下节） |
| 评估评级 **D/F**，需重生成 | 评估 Agent | ① 写入 `handoff-to-recommendation.md` ② **对话内给出回流提示词** |
| 用户直接给志愿表 | 无推荐 | 新建 `outputs/{case-id}/`，从 `eval-00` 起 |
| 同会话已跑完推荐 | — | **不要**同会话 load evaluation；**新会话** + 交接提示词 + handoff 文件 |

---

## 交接提示词（触发时**必在对话内给出**）

落盘 `handoff-to-*.md` 的同时，**必须**再输出一块**可复制到新会话**的短提示词（用户不用自己组织语言）。

### 推荐 → 评估

```markdown
---
## 📋 交接提示词（复制到新会话）

请按 **模式 B（志愿评估）** 执行，不要重新推荐。

**case-id**：`{case-id}`
**工作区路径**：`outputs/{case-id}/`

请先阅读：
1. `outputs/{case-id}/handoff-to-evaluation.md`
2. `outputs/{case-id}/manifest.md`

按 handoff 文件中的 P0 文件列表加载上下文，从 evaluation.md Step 0 开始评估。
评估产出写入同目录 `eval-*.md` 并更新 manifest。

（若工作区无 outputs 目录，我将把 handoff 正文贴在下方，请以此为准。）
---
```

**推荐 Agent 须自行替换** `{case-id}`，并在提示词后附 **≤200 字摘要**（最大风险、待核验项）。

### 评估 → 推荐（D/F 回流）

```markdown
---
## 📋 回流提示词（复制到新会话）

请按 **模式 A（志愿推荐）** 从 handoff 标明 Step **续做**，不要重跑评估。

**case-id**：`{case-id}`
请先阅读：`outputs/{case-id}/handoff-to-recommendation.md` 与 `manifest.md`

主要修改项：（列出 1–3 条）
---
```

### 用户操作说明（提示词下方一句即可）

> 建议：**新开对话** → 粘贴上方提示词 → 附上 `@gaokao-volunteer-er`（或评估 skill）→ 发送。

---

## `handoff-to-evaluation.md` 模板

> Step 10 通过后写入 `outputs/{case-id}/handoff-to-evaluation.md`

```markdown
# 志愿方案交接包 → 评估

**case-id**：shanxi-2026-physics-7201  
**来源**：推荐 Agent · skill v1.3.8 · {生成时间}  
**manifest**：[manifest.md](./manifest.md)

## 一、请评估 Agent 先读这些文件（按序）

| 优先级 | 文件 | 用途 |
|--------|------|------|
| P0 | `01-intake.md` | 考生 P0、排斥、家庭 |
| P0 | `04-direction-panorama.md` | 方向全景 |
| P0 | `05-narrowing.md` | 逐题收窄 + 标记 |
| P0 | `06-adi.md` | ADI 深评 |
| P1 | `03-data-query.md` | 位次与数据来源 |
| P1 | `07-structure.md` | 结构门禁 |
| P1 | `08-candidates.md` | 志愿表/候选矩阵 |
| P2 | `10-preflight-check.md` | 推荐侧自检结论 |

**勿加载** `recommendation.md` 全文；**勿**要求用户重述 P0。

## 二、摘要（≤200 字）

（方向结论、最大风险、家长待确认、待核验项）

## 三、评估 Agent 执行

加载 [evaluation.md](../workflows/evaluation.md)，Step 0 起；产出写入同目录 `eval-*.md`，更新 `manifest.md`。
```

---

## `handoff-to-recommendation.md` 模板

> 评估 Step 6 判定 D/F 时写入

```markdown
# 评估回流包 → 推荐

**case-id**：___  
**评级**：D / F  
**manifest**：[manifest.md](./manifest.md)

## 必须修改项（≤5 条，详见 eval-03 / eval-04 / eval-05）
1.
2.

## 保留项（用户书面确认）
-

## 请推荐 Agent 从哪步续做

| 问题类型 | 续做 Step | 主要改读文件 |
|----------|-----------|--------------|
| 方向/ADI | 4–6 | `eval-04-adi.md` |
| 结构/冲稳保 | 7–8 | `eval-03-structure.md` |
| 数据缺口 | 3 | `eval-02-rank.md` |

加载 [recommendation.md](../workflows/recommendation.md)；**勿** load evaluation.md。
```

---

## 上下文纪律

| 禁止 | 应用 |
|------|------|
| 同会话 load recommendation + evaluation | 必拆 Agent + handoff 文件 |
| 交接粘贴 social-reality 全文 | 读 `04` `06` 即可 |
| 评估 Agent 重跑完整推荐 | 除非 D/F 回流包 |
| 某 Step 完成却无产出文件 | 见 step-artifacts.md |

---

## 对话内交付（无法写盘时）

若无法写入 `outputs/`，**每步**须在对话中输出：

```markdown
---
**Step N 产出** · 应保存为：`outputs/{case-id}/{文件名}.md`
---
（正文）
```

### Step 10 完成时（写盘成功亦必做）

推荐 **Step 10** / 评估 **Step 7** 通过后，对话内**必须**再输出：

1. **总结果摘要** — 三句话 + 冲稳保一览（不重复贴全表）  
2. **文件路径表** — 至少含 `FINAL-志愿方案.md`（推荐）或 `evaluation-report.md`（评估）的**完整路径**

模板见 [recommendation.md](../workflows/recommendation.md) §「Step 10 · 对话内总结果输出」。

Step 10 额外（用户要审核时）：① 完整 `handoff-to-evaluation.md` 正文 ② **交接提示词**块。
