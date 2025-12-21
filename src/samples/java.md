---
title: Java Sample
---

```java
import java.util.*;
import java.util.stream.Collectors;

public class FontTester {
    public static void main(String[] args) {
        // Testing: Generics <T>, Lambda ->, and != comparisons
        List<String> items = Arrays.asList("Alpha", "Beta", "Gamma", null);

        List<String> filtered = items.stream()
            .filter(i -> i != null && i.length() > 1)
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println("Result: " + filtered); // 0O1lI test
    }
}
```
