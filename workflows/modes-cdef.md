# 辅模式流程（C / D / E / F）

> 由 [SKILL.md](../SKILL.md) Step 0 路由。主流程见 [recommendation.md](recommendation.md)（A）、[evaluation.md](evaluation.md)（B）。

**终止原则**：C/D 默认**不给**具体冲稳保校名；E 未过资格核对**不得**进 A/B；F 专科方案须附录或并行本科，不单列糊弄。

---

## 模式 C：科普（专业干什么 / 就业怎么样）

```
Step 1  识别专业或方向关键词 → [social-reality-guide.md](../shared/social-reality-guide.md) 分册索引 → 打开 1 个分册
Step 2  按模板输出（必含）：你以为 vs 实际上 · 一天快照或典型去向 · 适合/不适合 · 2030 🟢/🟡/🔴
Step 3  终止或转场：用户要继续报志愿 / 填表 → 切 **A 推荐** 或 **B 评估**（先 intake-8d P0）
```

**不加载**：candidate-matrix、冲稳保排序、完整 ADI 问卷（除非用户明确要选该专业）。

**命中名称陷阱 / 2026目录新增** → 额外链 [career-prospects-6d.md](../shared/career-prospects-6d.md) 或 [new-major-guide.md](../shared/new-major-guide.md)。

---

## 模式 D：查数（批次线 / 位次 / 计划）

```
Step 1  采集 P0：省份 + **高考年份** + 科类/选科（缺则暂停）
Step 2  [data-query.md](../shared/data-query.md) 查官方源 → 填 [templates/data-check.md](../shared/templates/data-check.md)
Step 3  交付 data-check + 数据来源表；**终止**，不给报考建议、不给冲稳保校名
```

**转场**：用户说「那帮我推荐/看看志愿表」→ 切 **A** 或 **B**（沿用已查数据，标注年份）。

---

## 模式 E：特殊招生（艺术/体育/军警/强基/专项/中外等）

```
Step 1  [special-admissions.md](../shared/special-admissions.md) 路由表 → 识别类型 + 对应 social-reality 分册
Step 2  资格核对（未过则 **阻断**，不进 A/B）：双过线/术科/专项公示/学费预算/体检政审意愿
Step 3  通过后声明「按特殊批逻辑」→ 切 **A 推荐** 或 **B 评估**；按需加载 [physical-exam-majors.md](../shared/physical-exam-majors.md)
```

**实例**：艺术 **8** · 体育 **9** · 中外 **12** · 专项 **13**（[examples.md](../examples.md)）。

---

## 模式 F：专科 / 压线 / 征集

```
Step 1  [supplemental-batches.md](supplemental-batches.md) 判定：专科为主 / 本科滑档 / 仅附录提醒
Step 2  输出专科冲稳保（保+垫 ≥50%）或本科方案 **附录** 专科/征集提醒
Step 3  位次仍够本科且用户要完整表 → **并联 A**；仅专科则交付后终止。压线须 [structure-sanity-check.md](../shared/structure-sanity-check.md) 保垫项
```

**实例**：**10**（本科冲 + 专科保）。

---

## 与 A/B 的衔接

| 从 | 到 | 条件 |
|----|-----|------|
| C | A/B | 用户明确要报志愿 |
| D | A/B | data-check 已填，P0 齐全 |
| E | A/B | special-admissions Step2 通过 |
| F | A | 压线生本科+专科并行 |
| A | B | 推荐交付后用户要审核 |
| B | A | 评级 D/F 或 ADI ❌ 过多 |
