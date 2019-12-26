package com.jk.service;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "service-provider")
public interface CommentService extends CommentServiceApi {
}
