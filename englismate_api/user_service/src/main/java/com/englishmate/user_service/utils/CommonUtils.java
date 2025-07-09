package com.englishmate.user_service.utils;

import com.englishmate.user_service.entity.AbstractAuditEntity;

import java.time.Instant;

public final class CommonUtils {

    public static <T extends AbstractAuditEntity> void updateAuditFields(T entity, String name) {
        entity.setUpdatedAt(Instant.now());
        entity.setUpdatedBy(name);

    }

    public static <T extends AbstractAuditEntity> void createAuditFields(T entity, String name) {
        entity.setCreatedAt(Instant.now());
        entity.setCreatedBy(name);
    }

    public static <T extends AbstractAuditEntity> void deleteAuditFields(T entity, String name) {
        entity.setDeletedAt(Instant.now());
        entity.setDeletedBy(name);
    }
}
