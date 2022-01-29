package com.rashiddy.kubernetespodscaler.data;


import java.util.List;
import java.util.Map;

public record DeploymentInfo(Long id, String deploymentName, String replicas, Map<String, String> labels) { }
