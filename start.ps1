# 백엔드(Django) 실행 (git bash, 가상환경 활성화)
Start-Process "C:\Program Files\Git\git-bash.exe" -ArgumentList "--cd=$PSScriptRoot/backend", "-c", "source ../.venv/Scripts/activate && python manage.py runserver"

# 프론트엔드(React) 실행 (git bash, npm install 후 npm start)
Start-Process "C:\Program Files\Git\git-bash.exe" -ArgumentList "--cd=$PSScriptRoot/frontend", "-c", "npm install && npm start" 