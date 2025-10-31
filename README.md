# Return To Time - AI影像修复与心理疗愈平台

<div align="center">

![Project Banner](https://img.shields.io/badge/Return%20To%20Time-v1.0.0-purple)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.0-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**让时光倒流，让回忆永存**

[快速开始](#快速开始) · [功能特性](#功能特性) · [技术架构](#技术架构) · [API文档](backend/README.md) · [部署指南](DEPLOYMENT_GUIDE.md)

</div>

---

## 📖 项目简介

Return To Time 是一个集成AI图像修复与心理疗愈的创新平台，致力于帮助用户：

- 🖼️ **修复珍贵照片** - 使用AI技术修复老照片、扩展图像、风格转换
- 🧘 **心理健康支持** - 提供24/7的AI心理顾问对话服务
- 💝 **情感连接** - 通过影像重温美好记忆，获得情感慰藉
- 🌟 **社区分享** - 分享修复故事，传递温暖与希望

---

## ✨ 功能特性

### 🎨 AI影像工作室

| 功能 | 描述 | 状态 |
|------|------|------|
| **AI扩图** | 智能扩展画面边界，完美构图 | ✅ |
| **老照片修复** | 去噪、去划痕、色彩还原 | ✅ |
| **AI设计师** | 艺术风格迁移，一键转换 | ✅ |
| **背景复刻** | 智能重建背景场景 | ✅ |
| **无痕改字** | 图片文字OCR识别与替换 | ✅ |
| **批量处理** | 多图并行修复，高效处理 | ✅ |
| **批量翻译** | 图片文字多语言翻译 | ✅ |
| **批量去水印** | 自动检测并去除水印 | ✅ |

### 💬 心灵对话空间

- **智能情绪识别** - 理解用户的情绪状态
- **温暖陪伴** - 提供专业、同理心的回应
- **对话历史** - 保存对话记录，持续关怀
- **隐私保护** - 所有对话严格保密

### 💳 灵活订阅系统

- **按月订阅** - 灵活选择，随时调整
- **按季订阅** - 享受优惠，长期使用
- **多功能组合** - 自由搭配所需服务
- **安全支付** - 支持微信/支付宝

---

## 🏗️ 项目结构

```
d:/deeim/xiufu/
├── index.html              # 前端主页面（深色奢华主题）
├── api-integration.js      # 前端API集成
├── DEPLOYMENT_GUIDE.md     # 完整部署指南
├── README.md               # 项目总览（本文件）
│
└── backend/                # 后端服务
    ├── app.py              # Flask主应用
    ├── config.py           # 配置管理
    ├── ai_services.py      # AI服务集成
    ├── init_db.py          # 数据库初始化
    ├── test_api.py         # API测试脚本
    ├── requirements.txt    # Python依赖
    ├── .env.example        # 环境变量模板
    ├── start.bat           # Windows启动脚本
    ├── README.md           # 后端API文档
    └── uploads/            # 图片上传目录
```

---

## 🚀 快速开始

### 方法1：一键启动（Windows）

```powershell
cd d:\deeim\xiufu\backend
start.bat
```

### 方法2：手动启动

#### 1. 安装依赖

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

#### 2. 配置环境

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，配置数据库和API密钥
```

#### 3. 初始化数据库

```bash
python init_db.py
```

#### 4. 启动服务

```bash
# 启动后端
python app.py

# 启动前端（新终端）
cd ..
python -m http.server 8000
```

#### 5. 访问应用

- 前端：http://localhost:8000
- 后端API：http://localhost:5000

---

## 💻 技术架构

### 前端技术栈

| 技术 | 用途 |
|------|------|
| **HTML5 + CSS3** | 页面结构和样式 |
| **JavaScript** | 交互逻辑 |
| **Fetch API** | 后端通信 |
| **CSS Variables** | 深色主题系统 |
| **CSS Animations** | 3D倾斜、光效动画 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Python** | 3.9+ | 后端语言 |
| **Flask** | 2.3.0 | Web框架 |
| **PostgreSQL** | 14+ | 数据库 |
| **SQLAlchemy** | 2.0 | ORM |
| **OpenAI API** | - | AI对话（可选） |
| **Gemini API** | - | AI对话（可选） |

### 数据库设计

```sql
-- 核心表结构
users               # 用户表
├── subscriptions   # 订阅记录
├── chat_sessions   # 聊天会话
│   └── chat_messages  # 聊天消息
└── image_repairs   # 图片修复记录

user_stories        # 用户故事
```

---

## 🎨 UI设计特色

### 深色奢华主题

- **配色方案**：紫蓝渐变 + 深色背景
- **玻璃态效果**：毛玻璃 + 渐变背景
- **发光系统**：多层次光效
- **3D交互**：鼠标跟随倾斜 + 光斑

### 交互动画

- ✨ 卡片3D倾斜效果
- 💫 鼠标跟随光效
- 🌟 渐变边框动画
- 🎯 弹性缓动动画

### 响应式设计

- 📱 移动端优化
- 💻 平板适配
- 🖥️ 桌面端完整体验

---

## 📡 API端点

### 聊天API

```http
POST /api/chat/session          # 创建会话
POST /api/chat/message           # 发送消息
GET  /api/chat/history/{id}      # 获取历史
```

### 图片API

```http
POST /api/upload                 # 上传图片
GET  /api/repair/status/{id}     # 查询状态
```

### 订阅API

```http
POST /api/subscribe              # 创建订阅
POST /api/subscribe/verify/{id}  # 验证支付
GET  /api/subscriptions          # 查询订阅
```

### 故事API

```http
GET  /api/stories                # 获取故事
POST /api/stories                # 提交故事
```

完整API文档：[backend/README.md](backend/README.md)

---

## 🧪 测试

### 运行自动化测试

```bash
cd backend
python test_api.py
```

### 手动测试

```bash
# 测试健康检查
curl http://localhost:5000

# 测试创建聊天会话
curl -X POST http://localhost:5000/api/chat/session

# 测试获取用户故事
curl http://localhost:5000/api/stories
```

---

## 📦 部署

### 开发环境

```bash
python app.py
```

### 生产环境

```bash
# 使用Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# 使用Docker
docker build -t returntotime-api .
docker run -d -p 5000:5000 returntotime-api
```

详细部署指南：[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🔧 配置说明

### 必需配置

```env
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/returntotime
```

### 可选配置（AI服务）

```env
# OpenAI (推荐)
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4

# 或 Google Gemini (免费)
GEMINI_API_KEY=your-key
```

**注意**：无API密钥时，系统自动使用智能模拟响应。

---

## 🌟 核心亮点

### 1. 智能降级机制

- ✅ AI服务失败自动切换到模拟模式
- ✅ 保证系统始终可用
- ✅ 用户体验不中断

### 2. 情绪识别系统

基于关键词的智能情绪分析：

```python
难过、伤心 → 同理心回应
焦虑、压力 → 放松引导
开心、快乐 → 正面强化
```

### 3. 安全与隐私

- 🔒 对话内容加密存储
- 🛡️ SQL注入防护
- 🔐 CORS跨域保护
- 🚫 文件上传验证

### 4. 性能优化

- ⚡ 数据库连接池
- 🚀 异步任务处理
- 💾 查询结果缓存
- 📊 负载均衡支持

---

## 📊 数据统计

当前功能：

- 🎨 8个AI影像功能
- 💬 智能对话系统
- 💳 灵活订阅方案
- 📖 用户故事分享

---

## 🤝 参与贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👥 团队

<div align="center">

**Return To Time Team**

致力于用科技温暖人心

</div>

---

## 📞 联系我们

- 📧 Email: support@returntotime.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourname/returntotime/issues)
- 📖 文档: [完整文档](https://docs.returntotime.com)

---

## 🎯 路线图

### v1.0.0 ✅
- [x] 基础UI设计
- [x] AI对话系统
- [x] 图片上传功能
- [x] 订阅支付系统
- [x] 用户故事模块

### v1.1.0 🚧
- [ ] 用户认证系统
- [ ] 个人图片库
- [ ] 批量处理优化
- [ ] 移动端App

### v2.0.0 📋
- [ ] 实时AI修复
- [ ] 视频修复功能
- [ ] 社区互动平台
- [ ] 高级分析工具

---

## 🙏 致谢

感谢以下开源项目：

- [Flask](https://flask.palletsprojects.com/) - 轻量级Web框架
- [PostgreSQL](https://www.postgresql.org/) - 强大的数据库
- [OpenAI](https://openai.com/) - AI技术支持
- [Google Gemini](https://ai.google/) - AI服务

---

<div align="center">

### 让每一张照片、每一份回忆都值得被珍藏 ❤️

**Return To Time - 时光机器，心灵港湾**

[开始使用](#快速开始) · [查看文档](backend/README.md) · [部署指南](DEPLOYMENT_GUIDE.md)

---

Made with ❤️ and ☕ by Return To Time Team

⭐ Star us on GitHub — it motivates us a lot!

</div>
