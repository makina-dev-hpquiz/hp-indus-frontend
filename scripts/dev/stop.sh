echo "[DEV MODE] EXTINCTION DE HP-INDUS-FRONTEND - PID : " $(cat ./pid.file)
cd ../..
kill $(cat ./pid.file)
echo ;

wait -n $(cat ./pid.file);

#Suppression fichier
rm pid.file
rm nohup.out