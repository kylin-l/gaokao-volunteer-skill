# 志愿案例产出目录

每个考生案例一个子目录，由推荐/评估工作流**按步写入**。

命名：`{省拼音}-{年份}-{物理|历史}-{位次}/`  
示例：`shanxi-2026-physics-7201/`

规范见 [shared/step-artifacts.md](../shared/step-artifacts.md)。

**勿提交含真实姓名、准考证号的文件到公开仓库**。`outputs/{case-id}/` 已加入 `.gitignore` 且不打入 SkillHub 包；**`outputs/README.md` 会随发版保留**（见 `scripts/prepare-publish.mjs`）。
