package com.rashiddy.kubernetespodscaler.services;

import com.rashiddy.kubernetespodscaler.data.Event;
import reactor.core.publisher.Flux;

public interface EventUnicastService {

    /**
     * Add message to stream
     * @param next - message which will be added to stream
     */
    void onNext(Event next);

    Flux<Event> getMessages();
}
