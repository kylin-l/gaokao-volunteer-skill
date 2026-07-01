# 高考志愿 Skill 包（gaokao-volunteer-advisor）

统一 Cursor Agent Skill：自动路由**志愿评估**与**冲稳保推荐**，含 ADI 四维专业匹配、权重框架、反幻觉与谨慎交付规范。


| 字段              | 值                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| **slug**        | `gaokao-volunteer-advisor`（SkillHub 全站唯一标识，**首次发布后不可改**）                                                 |
| **version**     | `1.0.0`（与 `SKILL.md` / `package.json` 同步）                                                                |
| **displayName** | 高考志愿规划 · 冲稳保评估与推荐                                                                                        |
| **GitHub**      | [https://github.com/kylin-l/gaokao-volunteer-skills](https://github.com/kylin-l/gaokao-volunteer-skills) |


发布规范依据：[SkillHub release.md](https://skillhub.cn/ai/release.md)

## 能做什么


| 你说              | 模式      |
| --------------- | ------- |
| 「帮我看看志愿表有没有坑」   | 评估      |
| 「不知道填什么 / 帮我推荐」 | 推荐      |
| 「计算机专业干什么」      | 科普      |
| 推荐完要审核          | 推荐 → 评估 |


## 目录结构

```
├── SKILL.md                 ← 入口（frontmatter 含 slug/version/displayName）
├── package.json             ← 版本与 npm scripts
├── scripts/validate-frontmatter.mjs
├── workflows/
├── shared/
├── examples.md
└── reference.md
```

---

## 安装

### SkillHub 安装

```bash
# 安装 CLI（见下方「发布」一节）
skillhub install gaokao-volunteer-advisor --scope user
```

### GitHub 手动安装（Cursor）

```bash
git clone https://github.com/kylin-l/gaokao-volunteer-skills.git ~/.cursor/skills/gaokao-volunteer-advisor
```

安装目录名须与 `slug` 一致：`gaokao-volunteer-advisor`。

---

## 发布到 SkillHub

依据 [skillhub.cn/ai/release.md](https://skillhub.cn/ai/release.md)。

### 1. 发布前检查

**必填**（`SKILL.md` frontmatter）：


| 字段            | 要求                  |
| ------------- | ------------------- |
| `slug`        | kebab-case，2–128 字符 |
| `version`     | SemVer，如 `1.0.0`    |
| `displayName` | 展示名称                |


**建议**：`summary`、`description`、`tags`、`license`、`homepage`

**本地校验**：

```bash
npm run validate
```

### 2. 安装 / 升级 CLI

```bash
npm install -g @astron-team/skillhub
# 或
npx @astron-team/skillhub@latest <command>
```

> 若 CLI **不支持** `--host` / `--key`，请升级到 SkillHub 官方最新版；旧版可暂用：
> `skillhub login --registry https://api.skillhub.cn --token "$SKILLHUB_KEY"`

### 3. 登录

在 [SkillHub](https://skillhub.cn) 获取 API Key，**勿提交到仓库**。

```bash
export SKILLHUB_KEY="你的_KEY"

# 推荐（release.md）
skillhub login --key "$SKILLHUB_KEY" --host "https://api.skillhub.cn"

# 兼容旧 CLI
skillhub login --registry https://api.skillhub.cn --token "$SKILLHUB_KEY"
# 或
skillhub auth login --token "$SKILLHUB_KEY" --host "https://api.skillhub.cn"
```

### 4. 校验与发布

在**本仓库根目录**（含 `SKILL.md`）执行：

```bash
npm run validate

# dry-run（release.md 推荐）
skillhub publish . --host "https://api.skillhub.cn" --dry-run
# 旧 CLI：--registry https://api.skillhub.cn

# 正式发布
skillhub publish . --host "https://api.skillhub.cn"
# 或
npm run publish
```

### 5. 发布后

1. 等待安全扫描
2. 若需审核，等待通过
3. 在 SkillHub 技能详情页获取安装命令与 URL

**版本迭代**：修改内容 → 递增 `SKILL.md` 与 `package.json` 的 `version` → 再次 `publish`（已发版本不可覆盖）。

### Web UI 备选

1. [https://skillhub.cn](https://skillhub.cn) → 发布
2. 上传 zip（排除 `.git`）：
  ```bash
   zip -r gaokao-volunteer-advisor-1.0.0.zip . -x "*.git*" -x "node_modules/*" -x "*.zip"
  ```

### Windows 注意

CLI 若报 Unicode 错误：`chcp 65001` 后重试，或改用 Web UI 上传。

---

## 使用示例

```
河北物理类，位次 35000，不知道填什么，帮我推荐冲稳保
```

```
这是我填的志愿表，帮我看看有没有退档风险
```

## 谨慎说明

- 不构成录取承诺；冲/稳/保/垫为研究分层  
- 位次须来自省考试院官方源并标注年份  
- 详见 `shared/anti-hallucination.md`

## License

MIT