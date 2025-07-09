package com.englishmate.core_service.repository;

import com.englishmate.core_service.entity.Grammar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrammarRepository extends JpaRepository<Grammar, Long> {
    // Add custom query methods if needed
} 