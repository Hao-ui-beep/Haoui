# 🔧 故障排除指南

本文档包含常见问题及其解决方案。

---

## 📋 目录

- [安装问题](#安装问题)
- [数据库问题](#数据库问题)
- [API问题](#api问题)
- [性能问题](#性能问题)
- [Docker问题](#docker问题)
- [前端问题](#前端问题)

---

## 🔨 安装问题

### Q1: `pip install` 失败

**症状**：
```
ERROR: Could not install packages due to an OSError
```

**解决方案**：

```bash
# 方案1: 使用管理员权限
pip install -r requirements.txt --user

# 方案2: 升级pip
python -m pip install --upgrade pip

# 方案3: 使用国内镜像源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

---

### Q2: `psycopg2` 安装失败

**症状**：
```
Error: pg_config executable not found
```

**解决方案**：

**Windows**:
```bash
# 使用二进制版本
pip install psycopg2-binary
```

**Linux**:
```bash
# 安装PostgreSQL开发包
sudo apt-get install libpq-dev python3-dev

# 然后重新安装
pip install psycopg2
```

**Mac**:
```bash
# 使用Homebrew
brew install postgresql
pip install psycopg2
```

---

### Q3: 虚拟环境激活失败

**症状**：
```
venv\Scripts\activate : 无法加载文件
```

**解决方案（Windows）**：

```powershell
# 设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 然后重新激活
.\venv\Scripts\activate
```

---

## 🗄️ 数据库问题

### Q1: 数据库连接失败

**症状**：
```
sqlalchemy.exc.OperationalError: could not connect to server
```

**检查清单**：

1. **PostgreSQL是否运行？**
   ```bash
   # Windows
   net start postgresql-x64-14
   
   # Linux
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. **连接信息是否正确？**
   ```env
   # 检查 .env 文件
   DATABASE_URL=postgresql://postgres:password@localhost:5432/returntotime
   ```

3. **数据库是否存在？**
   ```bash
   psql -U postgres
   \l  # 列出所有数据库
   CREATE DATABASE returntotime;  # 如果不存在则创建
   ```

4. **防火墙是否阻止？**
   ```bash
   # 允许5432端口
   # Windows: 控制面板 -> 防火墙 -> 高级设置
   # Linux: sudo ufw allow 5432
   ```

---

### Q2: 密码认证失败

**症状**：
```
FATAL: password authentication failed for user "postgres"
```

**解决方案**：

```bash
# 1. 重置PostgreSQL密码
psql -U postgres
ALTER USER postgres WITH PASSWORD 'newpassword';

# 2. 检查pg_hba.conf
# 找到文件位置：
psql -U postgres -c "SHOW hba_file;"

# 编辑文件，确保包含：
# local   all   postgres   md5
# host    all   all        127.0.0.1/32   md5

# 3. 重启PostgreSQL
# Windows: net stop postgresql-x64-14 && net start postgresql-x64-14
# Linux: sudo systemctl restart postgresql
```

---

### Q3: 表不存在

**症状**：
```
sqlalchemy.exc.ProgrammingError: relation "users" does not exist
```

**解决方案**：

```bash
# 初始化数据库
cd backend
python init_db.py

# 或使用管理工具
cd ..
python manage.py init-db
```

---

## 🌐 API问题

### Q1: CORS错误

**症状（浏览器控制台）**：
```
Access to fetch at 'http://localhost:5000/api/...' has been blocked by CORS policy
```

**解决方案**：

1. **检查Flask-CORS配置**：
   ```python
   # app.py 中应该有：
   from flask_cors import CORS
   CORS(app)
   ```

2. **配置允许的源**：
   ```python
   # 在 config.py 中：
   CORS_ORIGINS = ['http://localhost:8000', 'http://127.0.0.1:5500']
   ```

3. **使用代理**（推荐）：
   ```javascript
   // 前端通过相对路径调用
   fetch('/api/stories')  // 而不是 http://localhost:5000/api/stories
   ```

---

### Q2: 502 Bad Gateway

**症状**：
```
nginx: 502 Bad Gateway
```

**检查清单**：

1. **后端是否运行？**
   ```bash
   curl http://localhost:5000/
   ```

2. **检查nginx配置**：
   ```bash
   nginx -t  # 测试配置
   ```

3. **查看日志**：
   ```bash
   # Nginx错误日志
   tail -f /var/log/nginx/error.log
   
   # Flask日志
   tail -f backend/app.log
   ```

---

### Q3: 请求超时

**症状**：
```
RequestException: Connection timeout
```

**解决方案**：

1. **增加超时时间**：
   ```python
   # 在 app.py 中
   app.config['TIMEOUT'] = 120  # 秒
   ```

2. **使用异步处理**：
   ```python
   # 对于耗时操作，使用后台任务
   from threading import Thread
   
   def long_task():
       # 处理耗时任务
       pass
   
   Thread(target=long_task).start()
   ```

---

## ⚡ 性能问题

### Q1: 响应速度慢

**诊断步骤**：

1. **检查系统资源**：
   ```bash
   python backend/monitor.py
   ```

2. **分析慢查询**：
   ```python
   # 启用SQLAlchemy日志
   app.config['SQLALCHEMY_ECHO'] = True
   ```

3. **添加数据库索引**：
   ```python
   # 在模型中添加索引
   class ChatMessage(db.Model):
       session_id = db.Column(db.Integer, db.ForeignKey('chat_sessions.id'), index=True)
   ```

**优化方案**：

1. **使用连接池**：
   ```python
   app.config['SQLALCHEMY_POOL_SIZE'] = 10
   app.config['SQLALCHEMY_POOL_RECYCLE'] = 3600
   ```

2. **启用缓存**：
   ```bash
   # 安装Redis
   pip install flask-caching redis
   ```

3. **使用CDN**：
   - 将静态资源放到CDN
   - 减少服务器负载

---

### Q2: 内存占用过高

**诊断**：
```bash
# 使用监控工具
python backend/monitor.py watch
```

**解决方案**：

1. **限制上传文件大小**：
   ```python
   app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB
   ```

2. **及时清理临时文件**：
   ```python
   import os
   import time
   
   # 删除超过24小时的文件
   for file in os.listdir('uploads'):
       if time.time() - os.path.getmtime(file) > 86400:
           os.remove(file)
   ```

3. **使用流式处理**：
   ```python
   # 对大文件使用流式上传
   @app.route('/upload', methods=['POST'])
   def upload():
       file.save(path, buffer_size=8192)
   ```

---

## 🐳 Docker问题

### Q1: Docker构建失败

**症状**：
```
ERROR: failed to solve: process "/bin/sh -c pip install -r requirements.txt" did not complete successfully
```

**解决方案**：

1. **清理Docker缓存**：
   ```bash
   docker system prune -a
   ```

2. **使用国内镜像**：
   ```dockerfile
   # Dockerfile中添加
   RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
   ```

3. **检查网络连接**：
   ```bash
   docker build --no-cache -t returntotime-api .
   ```

---

### Q2: 容器无法访问

**症状**：
```
curl: (7) Failed to connect to localhost port 5000: Connection refused
```

**检查清单**：

1. **容器是否运行？**
   ```bash
   docker ps
   ```

2. **端口是否映射？**
   ```bash
   docker-compose ps
   # 应该看到 0.0.0.0:5000->5000/tcp
   ```

3. **查看容器日志**：
   ```bash
   docker-compose logs api
   ```

4. **进入容器检查**：
   ```bash
   docker exec -it returntotime_api bash
   curl http://localhost:5000/
   ```

---

### Q3: 数据库连接问题

**症状（Docker环境）**：
```
could not connect to server: Connection refused
```

**解决方案**：

1. **使用服务名而非localhost**：
   ```env
   # .env 文件中
   DATABASE_URL=postgresql://postgres:password@postgres:5432/returntotime
   # 注意：使用 'postgres' 而不是 'localhost'
   ```

2. **等待数据库启动**：
   ```yaml
   # docker-compose.yml
   api:
     depends_on:
       postgres:
         condition: service_healthy
   ```

---

## 🌐 前端问题

### Q1: API调用失败

**症状（浏览器控制台）**：
```
Failed to fetch
```

**检查清单**：

1. **后端是否运行？**
   ```bash
   curl http://localhost:5000/
   ```

2. **API地址是否正确？**
   ```javascript
   // api-integration.js
   const API_BASE_URL = 'http://localhost:5000';  // 确认端口
   ```

3. **查看Network面板**：
   - 打开开发者工具（F12）
   - 切换到Network标签
   - 查看请求状态

**降级处理**：

系统会自动降级到模拟模式，如果看到模拟响应说明后端未连接。

---

### Q2: 界面样式错误

**症状**：
- 样式不显示
- 布局混乱

**解决方案**：

1. **清除浏览器缓存**：
   - Ctrl + Shift + Delete
   - 清除缓存和Cookie

2. **强制刷新**：
   - Ctrl + F5 (Windows)
   - Cmd + Shift + R (Mac)

3. **检查CSS加载**：
   - 打开开发者工具
   - 查看Console是否有CSS错误

---

### Q3: JavaScript错误

**症状（控制台）**：
```
Uncaught ReferenceError: ReturnToTimeAPI is not defined
```

**解决方案**：

1. **检查脚本加载顺序**：
   ```html
   <!-- 确保api-integration.js在主脚本之前加载 -->
   <script src="api-integration.js"></script>
   <script>
       // 使用ReturnToTimeAPI
   </script>
   ```

2. **检查文件路径**：
   ```html
   <!-- 确认文件路径正确 -->
   <script src="./api-integration.js"></script>
   ```

---

## 🆘 获取更多帮助

如果以上方案都无法解决问题：

1. **查看日志**：
   ```bash
   # 后端日志
   tail -f backend/app.log
   
   # 系统日志
   journalctl -u returntotime
   ```

2. **运行诊断**：
   ```bash
   python backend/monitor.py
   ```

3. **运行测试**：
   ```bash
   python backend/test_api.py
   ```

4. **联系支持**：
   - 📧 Email: support@returntotime.com
   - 🐛 GitHub Issues
   - 💬 社区论坛

---

## 📚 相关文档

- [快速开始](QUICKSTART.md)
- [部署指南](DEPLOYMENT_GUIDE.md)
- [API文档](backend/README.md)
- [项目总览](README.md)

---

<div align="center">

**遇到问题不要慌，按步骤排查就能解决！** 💪

</div>
