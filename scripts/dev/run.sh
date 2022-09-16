echo "[DEV MODE] HP-INDUS-FRONTEND démarré, il sera dispoible dans quelques instants."
cd ../..
nohup ionic serve --external & echo $! > ./pid.file &
