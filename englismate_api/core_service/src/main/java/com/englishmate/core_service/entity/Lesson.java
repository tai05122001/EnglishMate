package com.englishmate.core_service.entity;

import com.englishmate.core_service.entity.enumerations.SkillType;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "lesson")
public class Lesson implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "skill_type", nullable = false)
    private SkillType skillType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "lesson_order")
    private Integer order;

    @Column
    private Integer duration; // duration in minutes

    @Column(columnDefinition = "TEXT")
    private String content;

    // Getters and setters (có thể dùng Lombok nếu project đã dùng)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public SkillType getSkillType() { return skillType; }
    public void setSkillType(SkillType skillType) { this.skillType = skillType; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Integer getOrder() { return order; }
    public void setOrder(Integer order) { this.order = order; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
} 