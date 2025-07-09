package com.englishmate.common_service.utils;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class CollectionUtils {

    private CollectionUtils() {}

    public static boolean isEmpty(Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }

    public static boolean isNotEmpty(Collection<?> collection) {
        return !isEmpty(collection);
    }

    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        map.put("a", "b");
        map.put("c", "b");

        List<String> keys = List.copyOf(map.keySet());

        keys.forEach(map::remove);

        System.out.println(map);
    }
}
