"""
Return To Time - 项目管理工具
统一的命令行接口，用于开发、测试、部署等操作
"""

import os
import sys
import subprocess
from pathlib import Path

# 项目根目录
ROOT_DIR = Path(__file__).parent
BACKEND_DIR = ROOT_DIR / 'backend'

def print_header(title):
    """打印标题"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60 + "\n")

def run_command(cmd, cwd=None):
    """运行命令"""
    try:
        subprocess.run(cmd, shell=True, cwd=cwd, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 命令执行失败: {e}")
        return False

def setup():
    """初始化项目"""
    print_header("🚀 初始化项目")
    
    print("1️⃣  创建虚拟环境...")
    if not (BACKEND_DIR / 'venv').exists():
        run_command(f"python -m venv {BACKEND_DIR / 'venv'}")
    else:
        print("   ✅ 虚拟环境已存在")
    
    print("\n2️⃣  安装依赖...")
    pip_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'pip')
    run_command(f"{pip_cmd} install -r requirements.txt", cwd=BACKEND_DIR)
    
    print("\n3️⃣  创建环境变量文件...")
    env_file = BACKEND_DIR / '.env'
    if not env_file.exists():
        env_example = BACKEND_DIR / '.env.example'
        if env_example.exists():
            import shutil
            shutil.copy(env_example, env_file)
            print("   ✅ 已复制 .env.example 到 .env")
            print("   ⚠️  请编辑 .env 文件配置数据库等信息")
        else:
            print("   ❌ 未找到 .env.example 文件")
    else:
        print("   ✅ .env 文件已存在")
    
    print("\n4️⃣  创建必要目录...")
    (BACKEND_DIR / 'uploads').mkdir(exist_ok=True)
    (BACKEND_DIR / 'logs').mkdir(exist_ok=True)
    (BACKEND_DIR / 'backups').mkdir(exist_ok=True)
    print("   ✅ 目录创建完成")
    
    print("\n✅ 项目初始化完成！")
    print("下一步: python manage.py init-db")

def init_db():
    """初始化数据库"""
    print_header("🗄️  初始化数据库")
    
    python_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'python')
    run_command(f"{python_cmd} init_db.py", cwd=BACKEND_DIR)

def start_dev():
    """启动开发服务器"""
    print_header("🚀 启动开发服务器")
    
    python_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'python')
    run_command(f"{python_cmd} app.py", cwd=BACKEND_DIR)

def start_prod():
    """启动生产服务器"""
    print_header("🚀 启动生产服务器")
    
    gunicorn_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'gunicorn')
    run_command(
        f"{gunicorn_cmd} -w 4 -b 0.0.0.0:5000 --timeout 120 app:app",
        cwd=BACKEND_DIR
    )

def test():
    """运行测试"""
    print_header("🧪 运行测试")
    
    python_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'python')
    run_command(f"{python_cmd} test_api.py", cwd=BACKEND_DIR)

def monitor():
    """启动监控"""
    print_header("📊 系统监控")
    
    python_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'python')
    run_command(f"{python_cmd} monitor.py watch", cwd=BACKEND_DIR)

def backup():
    """备份数据库"""
    print_header("💾 备份数据库")
    
    python_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'python')
    run_command(f"{python_cmd} backup_db.py backup", cwd=BACKEND_DIR)

def restore():
    """恢复数据库"""
    print_header("🔄 恢复数据库")
    
    python_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'python')
    run_command(f"{python_cmd} backup_db.py list", cwd=BACKEND_DIR)

def docker_build():
    """构建Docker镜像"""
    print_header("🐳 构建Docker镜像")
    
    run_command("docker-compose build", cwd=ROOT_DIR)

def docker_up():
    """启动Docker容器"""
    print_header("🐳 启动Docker容器")
    
    run_command("docker-compose up -d", cwd=ROOT_DIR)

def docker_down():
    """停止Docker容器"""
    print_header("🐳 停止Docker容器")
    
    run_command("docker-compose down", cwd=ROOT_DIR)

def docker_logs():
    """查看Docker日志"""
    print_header("🐳 Docker日志")
    
    run_command("docker-compose logs -f", cwd=ROOT_DIR)

def performance_test():
    """运行性能测试"""
    print_header("⚡ 性能测试")
    
    locust_cmd = str(BACKEND_DIR / 'venv' / 'Scripts' / 'locust')
    print("启动Locust性能测试...")
    print("访问 http://localhost:8089 查看测试界面")
    print("按 Ctrl+C 停止测试\n")
    
    run_command(
        f"{locust_cmd} -f locustfile.py --host=http://localhost:5000",
        cwd=BACKEND_DIR
    )

def show_help():
    """显示帮助信息"""
    print("""
    ╔══════════════════════════════════════════════════╗
    ║     Return To Time - 项目管理工具               ║
    ╚══════════════════════════════════════════════════╝
    
    开发命令:
        setup           - 初始化项目（创建虚拟环境、安装依赖）
        init-db         - 初始化数据库
        dev             - 启动开发服务器
        prod            - 启动生产服务器
        test            - 运行API测试
        monitor         - 启动系统监控
    
    数据库命令:
        backup          - 备份数据库
        restore         - 恢复数据库
    
    Docker命令:
        docker:build    - 构建Docker镜像
        docker:up       - 启动Docker容器
        docker:down     - 停止Docker容器
        docker:logs     - 查看Docker日志
    
    测试命令:
        perf            - 运行性能测试（Locust）
    
    示例:
        python manage.py setup          # 初始化项目
        python manage.py init-db        # 初始化数据库
        python manage.py dev            # 启动开发服务器
        python manage.py docker:up      # 使用Docker启动
    
    文档:
        README.md               - 项目总览
        QUICKSTART.md           - 快速开始
        DEPLOYMENT_GUIDE.md     - 部署指南
        backend/README.md       - API文档
    """)

def main():
    """主函数"""
    if len(sys.argv) < 2:
        show_help()
        return
    
    command = sys.argv[1]
    
    commands = {
        'setup': setup,
        'init-db': init_db,
        'dev': start_dev,
        'prod': start_prod,
        'test': test,
        'monitor': monitor,
        'backup': backup,
        'restore': restore,
        'docker:build': docker_build,
        'docker:up': docker_up,
        'docker:down': docker_down,
        'docker:logs': docker_logs,
        'perf': performance_test,
        'help': show_help,
        '-h': show_help,
        '--help': show_help
    }
    
    if command in commands:
        commands[command]()
    else:
        print(f"❌ 未知命令: {command}")
        print("运行 'python manage.py help' 查看所有命令")

if __name__ == '__main__':
    main()
