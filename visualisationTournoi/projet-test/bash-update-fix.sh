#!/bin/bash
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
