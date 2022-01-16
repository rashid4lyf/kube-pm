
# we will use openjdk 8 with alpine as it is a very small linux distro
FROM adoptopenjdk/openjdk11:jre-11.0.13_8-ubuntu

# copy the packaged jar file into our docker image
COPY kubernetes-pod-scaler-backend/target/kubernetes-pod-scaler-backend-0.0.1-SNAPSHOT.jar /kubernetes-pod-scaler.jar

EXPOSE 8080
# set the startup command to execute the jar
CMD ["java", "-jar", "/kubernetes-pod-scaler.jar"]