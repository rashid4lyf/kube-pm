package com.rashiddy.kubernetespodscaler.data;


import lombok.Data;

@Data
public class Event {

    private String name;

    private int count;

    public Event() {}

    public Event(String name, int count) {
        this.name = name;
        this.count = count;
    }

}
