package com.rashiddy.kubernetespodscaler.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ReactiveWebsocketHandler implements WebSocketHandler  {

    private EventUnicastService eventUnicastService;

    private ObjectMapper objectMapper;

    @Autowired
    public ReactiveWebsocketHandler(EventUnicastService eventUnicastService, ObjectMapper objectMapper) {
        this.eventUnicastService = eventUnicastService;
        this.objectMapper = objectMapper;
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        Flux<WebSocketMessage> messages = session.receive()
                // .doOnNext(message -> { read message here or in the block below })
                .flatMap(message -> {
                    System.out.println(message.getPayloadAsText());
                    return eventUnicastService.getMessages();
                })
                .flatMap(o -> {
                    try {
                        return Mono.just(objectMapper.writeValueAsString(o));
                    } catch (JsonProcessingException e) {
                        return Mono.error(e);
                    }
                }).map(session::textMessage);
        return session.send(messages);
    }
}
