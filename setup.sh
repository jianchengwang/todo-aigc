#!/bin/bash

# git
yum install git
ssh-keygen -t rsa -b 4096 -C "jiancheng_wang@yahoo.com"
cat ~/.ssh/id_rsa.pub
git config --global user.name "jianchengwang"
git config --global user.email "jiancheng_wang@yahoo.com"

# python3
yum remove python36

yum install -y  gcc zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum install -y  libffi-devel

cd /root/tmp
## wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tar.xz
wget https://www.python.org/ftp/python/3.8.6/Python-3.8.6.tar.xz
tar -xvJf  Python-3.8.6.tar.xz

mkdir -p /usr/local/python3
cd Python-3.8.6
./configure --prefix=/usr/local/python3
make && make install

ln -s /usr/local/python3/bin/python3 /usr/local/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/local/bin/pip3

python3 -V
pip3 -V

rm -rf Python-3.8.6 Python-3.8.6.tar.xz 