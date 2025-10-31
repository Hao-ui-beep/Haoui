# 🤝 贡献指南

感谢您考虑为 Return To Time 做出贡献！

---

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [测试要求](#测试要求)

---

## 🌟 行为准则

### 我们的承诺

为了营造开放和友好的环境，我们承诺：

- ✅ 使用友好和包容的语言
- ✅ 尊重不同的观点和经验
- ✅ 优雅地接受建设性批评
- ✅ 关注对社区最有利的事情
- ✅ 对其他社区成员表示同理心

### 不可接受的行为

- ❌ 使用性化的语言或图像
- ❌ 发表侮辱性/贬损性评论，人身攻击
- ❌ 公开或私下骚扰
- ❌ 未经明确许可发布他人私人信息
- ❌ 其他不道德或不专业的行为

---

## 🚀 如何贡献

### 报告Bug

发现Bug？请通过GitHub Issues报告：

1. **搜索现有Issue** - 确认问题未被报告
2. **使用Bug模板** - 填写详细信息
3. **提供重现步骤** - 清晰的复现路径
4. **附加截图** - 如果适用
5. **环境信息** - OS、Python版本、浏览器等

**Bug报告应包含：**

```markdown
### 描述
简短描述问题

### 重现步骤
1. 步骤1
2. 步骤2
3. 步骤3

### 预期行为
应该发生什么

### 实际行为
实际发生了什么

### 环境
- OS: Windows 11
- Python: 3.9.7
- PostgreSQL: 14.5
- 浏览器: Chrome 119

### 截图
如果有的话

### 额外信息
其他相关信息
```

### 提出功能建议

有好主意？我们很乐意听取！

1. **检查现有建议** - 避免重复
2. **详细描述** - 为什么需要这个功能
3. **使用案例** - 如何使用
4. **可选实现** - 如果有技术方案

### 提交代码

想要贡献代码？太好了！

1. **Fork 项目**
2. **创建分支** (`git checkout -b feature/AmazingFeature`)
3. **编写代码** - 遵循代码规范
4. **添加测试** - 确保测试通过
5. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
6. **推送分支** (`git push origin feature/AmazingFeature`)
7. **开启 Pull Request**

---

## 💻 开发流程

### 设置开发环境

```bash
# 1. Fork并克隆项目
git clone https://github.com/yourusername/returntotime.git
cd returntotime

# 2. 初始化项目
python manage.py setup

# 3. 配置数据库
# 编辑 backend/.env

# 4. 初始化数据库
python manage.py init-db

# 5. 启动开发服务器
python manage.py dev
```

### 开发分支策略

```
main          - 稳定版本，仅接受来自develop的合并
  ↑
develop       - 开发主分支
  ↑
feature/*     - 新功能分支
bugfix/*      - Bug修复分支
hotfix/*      - 紧急修复分支
```

### 命名规范

**分支命名：**
```
feature/user-authentication
feature/image-batch-processing
bugfix/fix-chat-message-display
hotfix/critical-security-fix
```

**提交信息：**
```
feat: 添加用户认证功能
fix: 修复聊天消息显示错误
docs: 更新API文档
style: 格式化代码
refactor: 重构AI服务模块
test: 添加聊天API测试
chore: 更新依赖包
```

---

## 📝 代码规范

### Python代码规范

遵循 [PEP 8](https://pep8.org/) 风格指南：

```python
# 良好示例
def calculate_total_price(items, discount=0):
    """
    计算总价格
    
    Args:
        items (list): 商品列表
        discount (float): 折扣率
    
    Returns:
        float: 总价格
    """
    total = sum(item.price for item in items)
    return total * (1 - discount)


# 避免
def calc(i,d=0):
    t=sum(x.p for x in i)
    return t*(1-d)
```

**关键点：**
- ✅ 使用4个空格缩进
- ✅ 函数和类名使用描述性名称
- ✅ 添加文档字符串
- ✅ 每行不超过79字符（文档120字符）
- ✅ 使用类型提示（Python 3.9+）

### JavaScript代码规范

```javascript
// 良好示例
async function sendChatMessage(sessionId, message) {
    try {
        const response = await fetch('/api/chat/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId, message })
        });
        
        return await response.json();
    } catch (error) {
        console.error('发送消息失败:', error);
        throw error;
    }
}

// 避免
async function send(s,m){
    let r=await fetch('/api/chat/message',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session_id:s,message:m})});
    return await r.json();
}
```

**关键点：**
- ✅ 使用2个空格缩进
- ✅ 使用const/let，避免var
- ✅ 使用箭头函数
- ✅ 添加错误处理
- ✅ 使用async/await

### HTML/CSS规范

```html
<!-- 良好示例 -->
<div class="feature-card">
    <h3 class="feature-title">AI扩图</h3>
    <p class="feature-description">智能扩展画面边界</p>
</div>

<style>
.feature-card {
    padding: var(--spacing-lg);
    background: var(--color-surface);
    border-radius: var(--radius-lg);
}
</style>
```

**关键点：**
- ✅ 语义化HTML标签
- ✅ 使用CSS变量
- ✅ BEM命名规范（可选）
- ✅ 移动优先响应式设计

---

## 📋 提交规范

### Commit Message格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type类型：**
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具变动

**示例：**

```
feat(chat): 添加消息已读状态

- 添加message_read字段到ChatMessage模型
- 实现标记消息已读的API端点
- 更新前端显示已读状态

Closes #123
```

### Pull Request规范

**标题格式：**
```
[类型] 简短描述
```

**描述模板：**
```markdown
## 变更说明
简要说明此PR的目的和内容

## 变更类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 文档更新
- [ ] 性能改进
- [ ] 重构

## 测试
- [ ] 添加了新测试
- [ ] 所有测试通过
- [ ] 手动测试通过

## 截图
如果是UI变更，请提供截图

## 相关Issue
Closes #123

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 自我审查了代码
- [ ] 添加了必要的注释
- [ ] 更新了相关文档
- [ ] 无编译警告
- [ ] 添加了测试
```

---

## 🧪 测试要求

### 运行测试

```bash
# 运行所有测试
python manage.py test

# 运行性能测试
python manage.py perf

# 检查代码质量
pylint backend/*.py
```

### 测试覆盖率

- API端点：100%
- 核心业务逻辑：80%+
- 工具函数：70%+

### 编写测试

```python
# test_example.py
import pytest
from app import app, db

@pytest.fixture
def client():
    """测试客户端"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """测试健康检查端点"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'online' in response.data

def test_create_chat_session(client):
    """测试创建聊天会话"""
    response = client.post('/api/chat/session')
    assert response.status_code == 200
    data = response.get_json()
    assert 'session_id' in data
```

---

## 📚 文档要求

### 代码文档

- ✅ 所有公共函数添加docstring
- ✅ 复杂逻辑添加注释
- ✅ API端点添加描述

### 用户文档

- ✅ 新功能更新README
- ✅ API变更更新API文档
- ✅ 重要变更更新CHANGELOG

---

## 🎯 优先级

### 高优先级

- 🔴 安全漏洞修复
- 🔴 关键Bug修复
- 🟠 性能问题
- 🟠 数据丢失风险

### 中优先级

- 🟡 新功能开发
- 🟡 一般Bug修复
- 🟡 用户体验改进

### 低优先级

- 🟢 代码重构
- 🟢 文档改进
- 🟢 测试覆盖

---

## ❓ 获取帮助

遇到问题？

- 💬 [GitHub Discussions](https://github.com/yourname/returntotime/discussions)
- 📧 Email: dev@returntotime.com
- 📖 查看 [开发文档](docs/)

---

## 🙏 感谢

感谢每一位贡献者！您的付出让 Return To Time 变得更好。

特别感谢：
- 所有提交Bug报告的用户
- 提供功能建议的社区成员
- 代码贡献者
- 文档翻译者

---

<div align="center">

**一起让 Return To Time 变得更好！** 💪

[开始贡献](https://github.com/yourname/returntotime/fork) | [查看Issues](https://github.com/yourname/returntotime/issues) | [讨论区](https://github.com/yourname/returntotime/discussions)

</div>
