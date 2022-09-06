echo "BUILD AND DEPLOY SCRIPT"
ionic build --prod

tomcatLocation='C:/bin/apache-tomcat-9.0.55/webapps/hp-indus/'

echo "Suppression de l'ancienne version d'hp-indus-frontend"
rm -r $tomcatLocation
mkdir $tomcatLocation

echo "Copie des sources vers " $tomcatLocation

cd www/
cp -r . $tomcatLocation