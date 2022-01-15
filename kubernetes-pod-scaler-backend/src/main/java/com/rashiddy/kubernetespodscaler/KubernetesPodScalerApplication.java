package com.rashiddy.kubernetespodscaler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@SpringBootApplication
public class KubernetesPodScalerApplication {

    public static void main(String[] args) {
        SpringApplication.run(KubernetesPodScalerApplication.class, args);
    }

}
