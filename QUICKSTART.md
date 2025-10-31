# ⚡ Return To Time - 5分钟快速开始

<div align="center">

**最快速度体验完整功能**

</div>

---

## 📋 准备工作（2分钟）

### ✅ 检查清单

- [ ] Python 3.9+ 已安装
- [ ] PostgreSQL 14+ 已安装并运行
- [ ] 浏览器（Chrome/Edge/Firefox）

### 🔍 快速检查

```powershell
# 检查Python
python --version

# 检查PostgreSQL
psql --version
```

---

## 🚀 三步启动（3分钟）

### 第一步：创建数据库（1分钟）

```powershell
# 打开PostgreSQL命令行
psql -U postgres

# 创建数据库（输入后回车）
CREATE DATABASE returntotime;

# 退出（输入后回车）
\q
```

### 第二步：一键启动后端（1分钟）

```powershell
# 进入后端目录
cd d:\deeim\xiufu\backend

# 运行启动脚本（会自动完成所有设置）
start.bat
```

**脚本会自动：**
- ✅ 创建虚拟环境
- ✅ 安装所有依赖
- ✅ 初始化数据库表
- ✅ 添加示例数据
- ✅ 启动API服务器

**等待看到：**
```
🚀 启动服务器...
服务器地址: http://localhost:5000
```

### 第三步：打开前端（30秒）

**方法1：直接打开**
```powershell
# 在文件管理器中双击打开
d:\deeim\xiufu\index.html
```

**方法2：使用VSCode Live Server**
1. 在VSCode中打开 `index.html`
2. 右键 → "Open with Live Server"

**方法3：Python HTTP服务器**
```powershell
# 新开一个终端
cd d:\deeim\xiufu
python -m http.server 8000

# 然后访问: http://localhost:8000
```

---

## 🎉 开始使用！

### 1. 测试AI对话

1. 点击页面上的 **"心理疗愈空间"** 按钮
2. 在弹出的对话框中输入：`我今天心情不太好`
3. 点击 **"发送"** 按钮
4. 查看AI的温暖回应！

### 2. 测试图片上传

1. 点击任意功能卡片（如"AI扩图"）
2. 在弹出的支付界面中：
   - 选择订阅计划
   - 点击"确认支付"
3. 模拟支付完成！

### 3. 查看用户故事

滚动到页面底部，查看自动加载的用户故事。

---

## 🔧 可选配置（提升体验）

### 配置AI服务（可选）

如果您想要更智能的AI回复：

#### OpenAI GPT-4

```powershell
# 编辑环境变量文件
cd backend
notepad .env

# 添加以下内容：
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
```

#### Google Gemini（免费）

```powershell
# 在.env中添加：
GEMINI_API_KEY=your-gemini-api-key-here
```

**获取API密钥：**
- OpenAI: https://platform.openai.com/
- Gemini: https://makersuite.google.com/

**注意**：不配置也能正常使用，系统会使用智能模拟响应！

---

## ✅ 验证安装

### 测试后端API

```powershell
cd backend
python test_api.py
```

应该看到：
```
✅ 所有测试完成
API服务运行正常！
```

### 手动测试

```powershell
# 测试健康检查
curl http://localhost:5000

# 应该返回：
{
  "status": "online",
  "service": "Return To Time API",
  "version": "1.0.0"
}
```

---

## 🐛 遇到问题？

### 问题1：`psql: command not found`

**解决**：将PostgreSQL添加到系统PATH

```
C:\Program Files\PostgreSQL\14\bin
```

### 问题2：`数据库连接失败`

**解决**：

1. 确认PostgreSQL正在运行：
```powershell
net start postgresql-x64-14
```

2. 检查`.env`文件中的数据库配置：
```env
DATABASE_URL=postgresql://postgres:你的密码@localhost:5432/returntotime
```

### 问题3：`端口被占用`

**解决**：

```powershell
# 查找占用5000端口的进程
netstat -ano | findstr :5000

# 结束进程（替换PID为实际进程ID）
taskkill /F /PID <PID>
```

### 问题4：`API调用失败`

**解决**：

1. 检查浏览器控制台（F12）
2. 确认后端正在运行
3. 检查`api-integration.js`中的API地址

---

## 📚 下一步

恭喜！您已成功启动 Return To Time。

**接下来您可以：**

1. 📖 阅读[完整文档](README.md)
2. 🔧 查看[部署指南](DEPLOYMENT_GUIDE.md)
3. 💻 查看[API文档](backend/README.md)
4. 🎨 自定义UI设计
5. 🤖 集成真实的AI服务

---

## 🆘 获取帮助

- 📧 Email: support@returntotime.com
- 💬 GitHub Issues
- 📖 完整文档

---

<div align="center">

**开始您的Return To Time之旅！** 🚀

让每一张照片、每一份回忆都值得被珍藏 ❤️

</div>
