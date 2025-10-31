/**
 * Return To Time - 前端API集成
 * 提供与后端API交互的JavaScript函数
 */

const API_BASE_URL = 'http://localhost:5000';

// ==================== 工具函数 ====================

/**
 * 通用API请求函数
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || '请求失败');
        }
        
        return data;
    } catch (error) {
        console.error('API请求错误:', error);
        throw error;
    }
}

// ==================== 聊天API ====================

/**
 * 创建新的聊天会话
 */
async function createChatSession() {
    return await apiRequest('/api/chat/session', {
        method: 'POST'
    });
}

/**
 * 发送聊天消息
 */
async function sendChatMessage(sessionId, message) {
    return await apiRequest('/api/chat/message', {
        method: 'POST',
        body: JSON.stringify({
            session_id: sessionId,
            message: message
        })
    });
}

/**
 * 获取聊天历史
 */
async function getChatHistory(sessionId) {
    return await apiRequest(`/api/chat/history/${sessionId}`);
}

// ==================== 图片上传API ====================

/**
 * 上传图片进行AI修复
 */
async function uploadImage(file, repairType = 'ai_expand') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('repair_type', repairType);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData
            // 注意：不设置Content-Type，让浏览器自动设置
        });
        
        return await response.json();
    } catch (error) {
        console.error('图片上传错误:', error);
        throw error;
    }
}

/**
 * 查询图片修复状态
 */
async function getRepairStatus(repairId) {
    return await apiRequest(`/api/repair/status/${repairId}`);
}

// ==================== 订阅API ====================

/**
 * 创建订阅
 */
async function createSubscription(featureName, planType, price) {
    return await apiRequest('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({
            feature_name: featureName,
            plan_type: planType,
            price: price
        })
    });
}

/**
 * 验证支付
 */
async function verifyPayment(subscriptionId) {
    return await apiRequest(`/api/subscribe/verify/${subscriptionId}`, {
        method: 'POST'
    });
}

/**
 * 获取订阅列表
 */
async function getSubscriptions() {
    return await apiRequest('/api/subscriptions');
}

// ==================== 用户故事API ====================

/**
 * 获取用户故事
 */
async function getStories() {
    return await apiRequest('/api/stories');
}

/**
 * 提交用户故事
 */
async function submitStory(authorName, authorAge, content, icon = '📸') {
    return await apiRequest('/api/stories', {
        method: 'POST',
        body: JSON.stringify({
            author_name: authorName,
            author_age: authorAge,
            content: content,
            icon: icon
        })
    });
}

// ==================== 前端集成示例 ====================

/**
 * 初始化心灵对话功能
 */
async function initializeHealingChat() {
    let currentSessionId = null;
    
    // 创建会话
    try {
        const session = await createChatSession();
        currentSessionId = session.session_id;
        console.log('聊天会话已创建:', currentSessionId);
        
        // 加载初始消息
        const history = await getChatHistory(currentSessionId);
        displayChatHistory(history.messages);
        
        return currentSessionId;
    } catch (error) {
        console.error('初始化聊天失败:', error);
        alert('无法连接到服务器，请稍后重试');
    }
}

/**
 * 发送消息并显示响应
 */
async function sendMessage() {
    const sessionId = window.currentChatSessionId;
    const inputElement = document.getElementById('chatInput');
    const message = inputElement.value.trim();
    
    if (!message || !sessionId) return;
    
    try {
        // 显示用户消息
        addMessageToChat('user', message);
        inputElement.value = '';
        
        // 发送到服务器
        const response = await sendChatMessage(sessionId, message);
        
        // 显示AI响应
        addMessageToChat('ai', response.ai_response);
        
    } catch (error) {
        console.error('发送消息失败:', error);
        addMessageToChat('ai', '抱歉，我暂时无法回应。请稍后再试。');
    }
}

/**
 * 显示聊天历史
 */
function displayChatHistory(messages) {
    const container = document.getElementById('chatContainer');
    container.innerHTML = '';
    
    messages.forEach(msg => {
        addMessageToChat(msg.role, msg.content);
    });
}

/**
 * 添加消息到聊天界面
 */
function addMessageToChat(role, content) {
    const container = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}`;
    
    const p = document.createElement('p');
    p.textContent = content;
    messageDiv.appendChild(p);
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

/**
 * 处理图片上传
 */
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 验证文件类型
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('请上传PNG、JPG、GIF或WebP格式的图片');
        return;
    }
    
    // 验证文件大小（16MB）
    if (file.size > 16 * 1024 * 1024) {
        alert('图片大小不能超过16MB');
        return;
    }
    
    try {
        // 显示加载状态
        showLoading('正在上传图片...');
        
        // 上传图片
        const result = await uploadImage(file, 'ai_expand');
        console.log('上传成功:', result);
        
        // 轮询检查状态
        if (result.repair_id) {
            checkRepairStatus(result.repair_id);
        }
        
    } catch (error) {
        console.error('上传失败:', error);
        alert('图片上传失败，请重试');
        hideLoading();
    }
}

/**
 * 检查修复状态
 */
async function checkRepairStatus(repairId) {
    const maxAttempts = 30;
    let attempts = 0;
    
    const interval = setInterval(async () => {
        attempts++;
        
        try {
            const status = await getRepairStatus(repairId);
            console.log('修复状态:', status);
            
            if (status.status === 'completed') {
                clearInterval(interval);
                showResult(status);
                hideLoading();
            } else if (status.status === 'failed' || attempts >= maxAttempts) {
                clearInterval(interval);
                alert('图片处理失败，请重试');
                hideLoading();
            }
        } catch (error) {
            console.error('状态查询失败:', error);
        }
    }, 2000); // 每2秒检查一次
}

/**
 * 处理支付
 */
async function handlePayment(featureName, planType, price) {
    try {
        showLoading('正在创建订单...');
        
        // 创建订阅
        const result = await createSubscription(featureName, planType, price);
        console.log('订阅创建成功:', result);
        
        // 显示二维码
        displayPaymentQR(result);
        hideLoading();
        
        // 模拟支付验证（实际应用中应该由支付回调触发）
        setTimeout(async () => {
            const verified = await verifyPayment(result.subscription_id);
            if (verified.success) {
                alert('支付成功！订阅已激活');
                closeModal('paymentModal');
            }
        }, 5000);
        
    } catch (error) {
        console.error('支付处理失败:', error);
        alert('订阅创建失败，请重试');
        hideLoading();
    }
}

/**
 * 加载用户故事
 */
async function loadUserStories() {
    try {
        const result = await getStories();
        displayStories(result.stories);
    } catch (error) {
        console.error('加载故事失败:', error);
    }
}

/**
 * 显示用户故事
 */
function displayStories(stories) {
    const container = document.querySelector('.stories-container');
    if (!container) return;
    
    container.innerHTML = stories.map(story => `
        <div class="story-card">
            <div class="story-image">${story.icon}</div>
            <div class="story-content">
                <p class="story-quote">"${story.content}"</p>
                <p class="story-author">— ${story.author}${story.age ? `, ${story.age}岁` : ''}</p>
            </div>
        </div>
    `).join('');
}

// ==================== 工具函数 ====================

function showLoading(message = '加载中...') {
    // 实现加载状态显示
    console.log(message);
}

function hideLoading() {
    // 隐藏加载状态
}

function showResult(result) {
    // 显示结果
    console.log('处理完成:', result);
}

function displayPaymentQR(payment) {
    // 显示支付二维码
    console.log('支付二维码:', payment.payment_qr);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ==================== 页面加载时初始化 ====================

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Return To Time API Integration Loaded');
    
    // 自动加载用户故事
    loadUserStories();
    
    // 设置聊天输入框回车事件
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// ==================== 导出函数 ====================

// 将函数暴露到全局作用域，供HTML调用
window.ReturnToTimeAPI = {
    // 聊天
    createChatSession,
    sendChatMessage,
    getChatHistory,
    initializeHealingChat,
    sendMessage,
    
    // 图片
    uploadImage,
    getRepairStatus,
    handleImageUpload,
    
    // 订阅
    createSubscription,
    verifyPayment,
    getSubscriptions,
    handlePayment,
    
    // 故事
    getStories,
    submitStory,
    loadUserStories
};
