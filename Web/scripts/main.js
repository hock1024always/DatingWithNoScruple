// 模拟微信登录状态
let isLoggedIn = false;

// 获取DOM元素
const loginContainer = document.getElementById('loginContainer');
const uploadContainer = document.getElementById('uploadContainer');
const idCardInput = document.getElementById('idCardInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const submitBtn = document.getElementById('submitBtn');

// 模拟微信扫码登录
function simulateWeChatLogin() {
    // 这里应该是真实的微信扫码登录逻辑
    setTimeout(() => {
        isLoggedIn = true;
        loginContainer.classList.add('hidden');
        uploadContainer.classList.remove('hidden');
    }, 2000);
}

// 处理文件上传
idCardInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件');
            return;
        }

        // 预览图片
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewContainer.classList.remove('hidden');
            submitBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

// 处理表单提交
submitBtn.addEventListener('click', async () => {
    const file = idCardInput.files[0];
    if (!file) {
        alert('请选择要上传的图片');
        return;
    }

    // 创建FormData对象
    const formData = new FormData();
    formData.append('idCard', file);

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = '上传中...';

        // 这里应该是真实的文件上传API
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('上传失败');
        }

        const result = await response.json();
        
        // 下载压缩包
        if (result.downloadUrl) {
            window.location.href = result.downloadUrl;
        }

        alert('上传成功！');
        
        // 重置表单
        idCardInput.value = '';
        previewImage.src = '';
        previewContainer.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交';

    } catch (error) {
        console.error('上传失败:', error);
        alert('上传失败，请重试');
        submitBtn.disabled = false;
        submitBtn.textContent = '提交';
    }
});

// 启动微信登录模拟
simulateWeChatLogin();