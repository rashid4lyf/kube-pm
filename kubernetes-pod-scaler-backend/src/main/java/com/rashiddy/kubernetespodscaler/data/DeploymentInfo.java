package com.rashiddy.kubernetespodscaler.data;


import java.util.List;
import java.util.Map;

public record DeploymentInfo(Long id, String deploymentName, String status, String age, Map<String, String> labels) { }
