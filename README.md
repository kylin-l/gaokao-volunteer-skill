# 高考志愿 Skill 包（gaokao-volunteer-er）

统一 Cursor Agent Skill：自动路由**志愿评估**与**冲稳保推荐**，含 ADI 四维专业匹配、权重框架、反幻觉与谨慎交付规范。


| 字段              | 值                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| **slug**        | `gaokao-volunteer-er`（SkillHub 全站唯一标识，**首次发布后不可改**）                                                 |
| **version**     | `1.0.0`（与 `SKILL.md` / `package.json` 同步）                                                                |
| **displayName** | 高考志愿 · 评估与推荐                                                                                          |
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
skillhub install gaokao-volunteer-er --scope user
```

### GitHub 手动安装（Cursor）

```bash
git clone https://github.com/kylin-l/gaokao-volunteer-skills.git ~/.cursor/skills/gaokao-volunteer-er
```

安装目录名须与 `slug` 一致：`gaokao-volunteer-er`。

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

SkillHub 仅允许特定扩展名（`.md`、`.json`、`.js` 等），**不可**直接发布含 `.gitignore` 或无扩展名 `LICENSE` 的仓库根目录。请使用 staging 脚本：

```bash
npm run validate

# dry-run（推荐先跑，会打印即将提交的变更说明）
npm run publish:dry-run

# 正式发布（自动从 CHANGELOG.md 读取当前 version 的变更说明并传给 --changelog）
npm run publish
```

**变更说明**：在 `CHANGELOG.md` 补充与 `SKILL.md` 中 `version` 一致的 `## x.y.z` 条目；**面向用户**写能感知的变化，勿写 gitignore、脚本名等开发细节（见 `CHANGELOG.md` 顶部说明）。

`prepare:publish` 会生成 `.skillhub-publish/`，仅包含白名单内文件；许可证见 `LICENSE.md`。

### 5. 发布后

1. 等待安全扫描
2. 若需审核，等待通过
3. 在 SkillHub 技能详情页获取安装命令与 URL

**版本迭代**：修改内容 → 递增 `SKILL.md` 与 `package.json` 的 `version` → 再次 `publish`（已发版本不可覆盖）。

### Web UI 备选

1. [https://skillhub.cn](https://skillhub.cn) → 发布
2. 上传 zip（排除 `.git`、`.gitignore`；或使用 `npm run prepare:publish` 后打包 `.skillhub-publish/`）：
  ```bash
   npm run prepare:publish
   cd .skillhub-publish && zip -r ../gaokao-volunteer-er-1.0.0.zip . && cd ..
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