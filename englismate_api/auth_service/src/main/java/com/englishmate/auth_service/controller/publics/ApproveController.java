package com.englishmate.auth_service.controller.publics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public/approve")
public class ApproveController {
    @GetMapping()
    public ResponseEntity<Boolean> approve() {
        return  ResponseEntity.ok(Boolean.TRUE);
    }
}
