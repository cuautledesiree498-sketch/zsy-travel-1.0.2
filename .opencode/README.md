# ZSY Travel 项目内 OpenCode 中转说明

## 固定文件
- 任务文件：`C:\Users\Administrator\travel-website\my-travel-site\.opencode\task.txt`
- 回传文件：`C:\Users\Administrator\travel-website\my-travel-site\.opencode\reply.txt`

## 推荐原因
把中转文件放在项目内部，通常比跨到 `.openclaw\workspace` 更少触发权限确认。

## 你每次发给 OpenCode 的固定指令
```text
请读取这个任务文件：
C:\Users\Administrator\travel-website\my-travel-site\.opencode\task.txt

按文件里的要求执行。
把最终结果写入这个回传文件：
C:\Users\Administrator\travel-website\my-travel-site\.opencode\reply.txt

要求：
1. 先完整读取任务文件
2. 严格按任务约束执行，不要擅自扩大修改范围
3. 回传内容必须包含：
   - 改了哪些文件
   - 每个文件改了什么
   - 关键 diff 或关键代码片段
   - 有没有报错 / 风险 / 未完成项
4. 如果无法完成，也要把失败原因写入回传文件
```
