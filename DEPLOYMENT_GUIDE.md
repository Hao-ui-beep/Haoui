# Return To Time - 完整部署指南

<div align="center">

🚀 **从开发到生产的完整部署流程**

</div>

---

## 📋 目录

1. [本地开发环境](#本地开发环境)
2. [数据库设置](#数据库设置)
3. [AI服务配置](#ai服务配置)
4. [启动服务](#启动服务)
5. [测试验证](#测试验证)
6. [生产部署](#生产部署)
7. [常见问题](#常见问题)

---

## 💻 本地开发环境

### 前置要求

| 软件 | 版本 | 下载地址 |
|------|------|----------|
| Python | 3.9+ | https://www.python.org/ |
| PostgreSQL | 14+ | https://www.postgresql.org/ |
| Node.js | 16+ | https://nodejs.org/ (可选) |

### 快速启动

#### Windows系统

```powershell
# 1. 进入后端目录
cd d:\deeim\xiufu\backend

# 2. 运行启动脚本（自动完成所有设置）
start.bat
```

启动脚本会自动：
- ✅ 创建虚拟环境
- ✅ 安装依赖
- ✅ 初始化数据库
- ✅ 启动服务器

#### Linux/Mac系统

```bash
# 1. 进入后端目录
cd backend

# 2. 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 3. 安装依赖
pip install -r requirements.txt

# 4. 初始化数据库
python init_db.py

# 5. 启动服务器
python app.py
```

---

## 🗄️ 数据库设置

### PostgreSQL安装

#### Windows

1. 下载安装器：https://www.postgresql.org/download/windows/
2. 运行安装程序
3. 设置密码（记住这个密码！）
4. 默认端口：5432

#### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Mac (使用Homebrew)

```bash
brew install postgresql
brew services start postgresql
```

### 创建数据库

```sql
-- 登录PostgreSQL
psql -U postgres

-- 创建数据库
CREATE DATABASE returntotime;

-- 创建用户（可选）
CREATE USER rttime_user WITH PASSWORD 'your_password';

-- 授权
GRANT ALL PRIVILEGES ON DATABASE returntotime TO rttime_user;

-- 退出
\q
```

### 配置数据库连接

编辑 `backend/.env` 文件：

```env
# PostgreSQL连接字符串
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/returntotime

# 或使用创建的用户
# DATABASE_URL=postgresql://rttime_user:your_password@localhost:5432/returntotime
```

### 初始化数据库表

```bash
cd backend
python init_db.py
```

成功后会看到：

```
✅ 数据库表创建成功
✅ 添加了 5 个用户故事
✅ 添加了 2 个示例用户
✅ 添加了 2 个示例订阅
```

---

## 🤖 AI服务配置

### 选项1：OpenAI GPT-4（推荐）

#### 获取API密钥

1. 访问 https://platform.openai.com/
2. 注册/登录账号
3. 进入 API keys 页面
4. 点击 "Create new secret key"
5. 复制API密钥

#### 配置

编辑 `.env` 文件：

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
```

### 选项2：Google Gemini（免费）

#### 获取API密钥

1. 访问 https://makersuite.google.com/
2. 登录Google账号
3. 点击 "Get API Key"
4. 复制API密钥

#### 配置

编辑 `.env` 文件：

```env
GEMINI_API_KEY=your-gemini-api-key-here
```

### 选项3：无API密钥运行

如果不配置API密钥，系统会自动使用**智能模拟响应系统**：

- ✅ 基于关键词的情绪识别
- ✅ 多样化的回复模板
- ✅ 无需外部API
- ⚠️ 回复质量较AI服务低

---

## 🚀 启动服务

### 后端服务

```bash
# 开发模式
cd backend
python app.py

# 生产模式（使用Gunicorn）
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

服务器启动后访问：
- API文档：http://localhost:5000
- 健康检查：http://localhost:5000/

### 前端服务

#### 方法1：直接打开HTML

```bash
# 在浏览器中打开
d:\deeim\xiufu\index.html
```

#### 方法2：使用Live Server（VSCode）

1. 安装 Live Server 扩展
2. 右键 `index.html`
3. 选择 "Open with Live Server"

#### 方法3：使用Python HTTP服务器

```bash
cd d:\deeim\xiufu
python -m http.server 8000
```

访问：http://localhost:8000

---

## ✅ 测试验证

### 1. 运行API测试

```bash
cd backend
python test_api.py
```

应该看到：

```
✅ 所有测试完成
API服务运行正常！
```

### 2. 手动测试

#### 测试聊天功能

```bash
curl -X POST http://localhost:5000/api/chat/session
```

#### 测试用户故事

```bash
curl http://localhost:5000/api/stories
```

### 3. 前端测试

打开浏览器开发者工具（F12），查看：

- Console：是否有错误
- Network：API调用是否成功

---

## 🌐 生产部署

### 使用Docker部署

#### 1. 创建Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制代码
COPY . .

# 暴露端口
EXPOSE 5000

# 启动命令
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

#### 2. 构建镜像

```bash
docker build -t returntotime-api .
```

#### 3. 运行容器

```bash
docker run -d \
  -p 5000:5000 \
  -e DATABASE_URL=postgresql://... \
  -e SECRET_KEY=your-secret-key \
  -e OPENAI_API_KEY=sk-... \
  --name returntotime \
  returntotime-api
```

### 使用Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: returntotime
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:your_password@postgres:5432/returntotime
      SECRET_KEY: your-secret-key
      OPENAI_API_KEY: ${OPENAI_API_KEY}
    depends_on:
      - postgres

volumes:
  postgres_data:
```

启动：

```bash
docker-compose up -d
```

### 云服务器部署

#### 1. 选择云服务商

- 阿里云
- 腾讯云
- AWS
- Heroku

#### 2. 服务器配置

- CPU: 2核+
- 内存: 4GB+
- 存储: 20GB+
- 系统: Ubuntu 20.04+

#### 3. 部署步骤

```bash
# 1. 连接服务器
ssh user@your-server-ip

# 2. 安装依赖
sudo apt update
sudo apt install python3.9 python3-pip postgresql nginx

# 3. 克隆代码
git clone your-repo-url
cd returntotime/backend

# 4. 设置虚拟环境
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 5. 配置环境变量
cp .env.example .env
nano .env  # 编辑配置

# 6. 初始化数据库
python init_db.py

# 7. 使用Supervisor管理进程
sudo apt install supervisor
```

#### 4. Nginx配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 5. 启用HTTPS

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## ❓ 常见问题

### Q1: 数据库连接失败？

**检查项**：
- PostgreSQL是否运行？
  ```bash
  # Windows
  net start postgresql-x64-14
  
  # Linux
  sudo systemctl status postgresql
  ```
- 连接字符串是否正确？
- 用户名密码是否匹配？

### Q2: API调用返回CORS错误？

**解决方案**：

在 `app.py` 中已经配置了CORS：
```python
from flask_cors import CORS
CORS(app)
```

如果仍有问题，检查前端URL是否在允许列表中。

### Q3: 图片上传失败？

**检查项**：
- `uploads` 文件夹是否存在？
- 文件大小是否超过16MB？
- 文件格式是否支持？

```bash
mkdir backend/uploads
chmod 755 backend/uploads
```

### Q4: AI服务无响应？

**可能原因**：
- API密钥错误
- API配额用完
- 网络连接问题

**解决方案**：
- 检查API密钥
- 查看日志：`tail -f app.log`
- 系统会自动降级到模拟模式

### Q5: 性能问题？

**优化建议**：
- 使用Gunicorn多进程
- 启用Redis缓存
- 使用CDN加速静态资源
- 数据库索引优化

---

## 📞 技术支持

如遇到问题，请：

1. 查看日志文件：`backend/app.log`
2. 运行测试脚本：`python test_api.py`
3. 检查GitHub Issues
4. 联系技术支持

---

## 🎉 部署成功！

恭喜您成功部署 Return To Time！

**接下来您可以：**

- ✨ 上传照片进行AI修复
- 💬 与AI心理顾问对话
- 💳 测试订阅支付功能
- 📖 查看用户故事

**让每一张照片、每一份回忆都值得被珍藏** ❤️

---

<div align="center">

Made with ❤️ by Return To Time Team

</div>
