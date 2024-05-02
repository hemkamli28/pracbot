
/home/ec2-user/.pm2/logs/myapp-error.log last 15 lines:
1|myapp    |     d = self.chunk()
1|myapp    |   File "/home/ec2-user/.local/lib/python3.9/site-packages/gunicorn/http/unreader.py", line 64, in chunk
1|myapp    |     return self.sock.recv(self.mxchunk)
1|myapp    |   File "/home/ec2-user/.local/lib/python3.9/site-packages/gunicorn/workers/base.py", line 203, in handle_abort
1|myapp    |     sys.exit(1)
1|myapp    | SystemExit: 1
1|myapp    | [2024-05-02 17:19:00 +0000] [3956] [INFO] Worker exiting (pid: 3956)
1|myapp    | [2024-05-02 17:19:01 +0000] [3971] [INFO] Booting worker with pid: 3971
1|myapp    | [2024-05-02 17:20:13 +0000] [3830] [INFO] Handling signal: int
1|myapp    | [2024-05-02 17:20:13 +0000] [3971] [INFO] Worker exiting (pid: 3971)
1|myapp    | [2024-05-02 17:20:13 +0000] [3830] [INFO] Shutting down: Master
1|myapp    | [2024-05-02 18:14:26 +0000] [3530] [INFO] Starting gunicorn 22.0.0
1|myapp    | [2024-05-02 18:14:26 +0000] [3530] [INFO] Listening at: http://0.0.0.0:8000 (3530)
1|myapp    | [2024-05-02 18:14:26 +0000] [3530] [INFO] Using worker: sync
1|myapp    | [2024-05-02 18:14:26 +0000] [3531] [INFO] Booting worker with pid: 3531