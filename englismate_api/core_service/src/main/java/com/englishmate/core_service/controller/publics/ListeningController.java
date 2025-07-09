package com.englishmate.core_service.controller.publics;

import com.englishmate.common_service.utils.ResponseUtils;
import com.englishmate.core_service.dto.lesson.ListeningLessonDTO;
import com.englishmate.core_service.dto.lesson.ListeningLessonDetailDTO;
import com.englishmate.core_service.entity.enumerations.LessonLevel;
import com.englishmate.core_service.service.ListeningService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/public/listening")
@RequiredArgsConstructor
public class ListeningController {

    private final ListeningService listeningService;

    /**
     * Get all listening lessons with optional filters for level, topic, and title (with pagination)
     */
    @GetMapping("/lessons")
    public ResponseEntity<List<ListeningLessonDTO>> getAllListeningLessons(
            @RequestParam(required = false) Long level,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String title,
            Pageable pageable) {
        Page<ListeningLessonDTO> page = listeningService.getAllListeningLessons(level, category, title, pageable);
        final HttpHeaders
                headers = ResponseUtils.generatePaginationHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);

        return ResponseEntity.ok()
                .headers(headers)
                .body(page.getContent());
    }

    /**
     * Get listening lesson by id
     */
    @GetMapping("/lessons/{id}")
    public ResponseEntity<ListeningLessonDetailDTO> getListeningLessonById(@PathVariable Long id) {
        ListeningLessonDetailDTO result = listeningService.getListeningLessonById(id);
        return ResponseEntity.ok(result);
    }

    /**
     * Get all lesson levels
     */
    @GetMapping("/levels")
    public ResponseEntity<List<LessonLevel>> getAllLessonLevels() {
        List<LessonLevel> result = listeningService.getAllLessonLevels();
        return ResponseEntity.ok(result);
    }

    /**
     * Get all topics (course titles)
     */
    @GetMapping("/topics")
    public ResponseEntity<List<String>> getAllTopics() {
        List<String> result = listeningService.getAllTopics();
        return ResponseEntity.ok(result);
    }
}
