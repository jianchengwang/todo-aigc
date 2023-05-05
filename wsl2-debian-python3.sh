#!/bin/bash

cat /etc/apt/sources.list
# deb http://mirrors.aliyun.com/debian stretch main contrib non-free
# deb-src http://mirrors.aliyun.com/debian stretch main contrib non-free
# deb http://mirrors.aliyun.com/debian stretch-updates main contrib non-free
# deb-src http://mirrors.aliyun.com/debian stretch-updates main contrib non-free
# deb http://mirrors.aliyun.com/debian-security stretch/updates main contrib non-free
# deb-src http://mirrors.aliyun.com/debian-security stretch/updates main contrib non-free

sudo apt update && sudo apt upgrade
sudo apt install -y wget git gcc make
sudo apt install -y build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev

wget https://www.python.org/ftp/python/3.10.11/Python-3.10.11.tgz
tar -xf Python-3.10.*.tgz
cd Python-3.10.*/
./configure --enable-optimizations
make -j 4
sudo make altinstall

update-alternatives --install /usr/bin/python python /usr/local/bin/python3.10 3
sudo apt install python3-pip

# python3.10 -m venv sample_app_venv
# source sample_app_venv/bin/activate

# https://zhuanlan.zhihu.com/p/621142457
# https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local
# https://developer.nvidia.com/cuda-11-5-2-download-archive?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/11.5.2/local_installers/cuda-repo-wsl-ubuntu-11-5-local_11.5.2-1_amd64.deb
sudo dpkg -i cuda-repo-wsl-ubuntu-11-5-local_11.5.2-1_amd64.deb
sudo apt-key add /var/cuda-repo-wsl-ubuntu-11-5-local/7fa2af80.pub
sudo apt-get update
sudo apt-get -y install cuda


